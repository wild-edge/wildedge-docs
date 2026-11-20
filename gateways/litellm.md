---
title: Set up LiteLLM
description: Send model calls from the LiteLLM proxy to WildEdge over OpenTelemetry.
---

# Set up LiteLLM <Badge type="tip" text="Beta" />

The LiteLLM proxy sends traces with its OpenTelemetry export. Verified on LiteLLM 1.106.6.

## 1. Find your project secret

<!--@include: ../parts/project-secret.md-->

## 2. Configure the LiteLLM proxy

Set these environment variables on the LiteLLM proxy, then restart it:

```sh
LITELLM_OTEL_V2=true
OTEL_EXPORTER=http/protobuf
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.wildedge.dev/api/otlp
OTEL_EXPORTER_OTLP_HEADERS=X-Project-Secret=<secret>
OTEL_SERVICE_NAME=litellm
```

- `LITELLM_OTEL_V2=true` turns on LiteLLM's OpenTelemetry export. It follows the OpenTelemetry GenAI conventions, which WildEdge reads.
- `OTEL_EXPORTER` picks the encoding. `http/json` works too.
- The exporter adds `/v1/traces` to the endpoint itself. Don't add it yourself.
- If your setup can only set an `Authorization` header, use `Authorization=Bearer <secret>` in place of `X-Project-Secret=<secret>`.
- `OTEL_SERVICE_NAME` names the gateway in your traces. Use any name you like.

LiteLLM leaves prompt and response text out of the export unless you set `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT`.

You don't need to change the LiteLLM config file.

## 3. Check that events arrive

Send one request through the proxy:

```sh
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer $LITELLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<model name>", "messages": [{"role": "user", "content": "Hello"}]}'
```

Use your proxy's address, one of your LiteLLM keys and a model name from your LiteLLM config.

Open **Events** in WildEdge. Events appear within a few minutes. You should see an inference event for the provider model that served the request. It carries the request's token counts and latency.

## What you get

- `gateway` is `litellm`, and `model_provider` is the provider that served the call, for example `openai`.
- `requested_model_id` is the model name your app sent, and `model_name` is the provider model LiteLLM routed it to.
- `request_id` is LiteLLM's call ID. A failed attempt and its fallback share it.
- `reported_cost_amount` is LiteLLM's estimate from its price list, in USD, so `reported_cost_is_estimated` is `true`. Models missing from the price list and failed calls have no cost.
- When the provider doesn't report usage, LiteLLM exports zero tokens. WildEdge records these token counts as unknown, not as zero.
- A stream your app cancels is recorded as failed, with error code `STREAM_CANCELLED` and no token counts.
- MCP tool calls, through LiteLLM's `/mcp` gateway or run for a chat completion, appear in the trace as tool spans.

See [Query gateway events](/llm-gateways#query-gateway-events) for the columns and an example query.

## Known limitations

- **Cache hits.** LiteLLM doesn't export a model call when it answers from its cache, so cache hits don't appear.
- **Tool loops.** When LiteLLM runs an MCP tool for a chat completion, it doesn't export the model call that reads the tool result. That call and its tokens are missing.

## Retries

LiteLLM retries `429`, `502`, `503`, `504` and connection errors with backoff, for up to 10 seconds in total. Set `OTEL_EXPORTER_OTLP_TIMEOUT` to change it. Then it drops the batch.

## Troubleshooting

LiteLLM logs export failures, for example `Failed to export spans batch`, with the HTTP status. See [status codes](/llm-gateways#troubleshooting).

- `404`: check that the endpoint is `https://ingest.wildedge.dev/api/otlp`, without `/v1/traces`.
- `413`: lower `OTEL_BSP_MAX_EXPORT_BATCH_SIZE`.
- `415`: set `OTEL_EXPORTER` to `http/protobuf` or `http/json`.

If requests succeed but no events appear, check that your LiteLLM version is supported and that `LITELLM_OTEL_V2=true` is set on the proxy process.

## Next

- [Investigate events and traces](/investigate), or [connect your AI agent](/connect-agent) to do it for you.
- Also using a WildEdge SDK? Follow [App + gateway](/setup/sdk-and-gateway) so each call is recorded once.
