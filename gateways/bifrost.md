---
title: Set up Bifrost
description: Send model calls from Bifrost to WildEdge with its otel plugin.
---

# Set up Bifrost <Badge type="tip" text="Beta" />

Bifrost sends traces with its `otel` plugin. Add the snippet below to your config to enable tracing. Verified on Bifrost v2.5.1.

## 1. Find your project secret

<!--@include: ../parts/project-secret.md-->

## 2. Add the otel plugin

Add the plugin to the `plugins` list in Bifrost's `config.json`, then restart Bifrost:

```json
"plugins": [
  {
    "enabled": true,
    "name": "otel",
    "config": {
      "service_name": "bifrost",
      "collector_url": "https://ingest.wildedge.dev/api/otlp/v1/traces",
      "trace_type": "genai_extension",
      "protocol": "http",
      "headers": { "X-Project-Secret": "<secret>" },
      "disable_content_logging": true
    }
  }
]
```

- `collector_url` is the full traces URL, including `/v1/traces`.
- `trace_type` must be `genai_extension`. It follows the OpenTelemetry GenAI conventions, which WildEdge reads.
- `protocol` must be `http`. WildEdge doesn't accept OTLP over gRPC.
- To keep the secret out of `config.json`, set the header value to `"env.WILDEDGE_PROJECT_SECRET"` and put the secret in that environment variable.
- `disable_content_logging: true` leaves prompt and response text out of the export, and tool names too. If you turn it off, WildEdge keeps the end of the prompt and the start of the response as the event's input and output summaries.
- `service_name` names the gateway in your traces. Use any name you like.
- Leave `metrics_enabled` off. WildEdge accepts traces only.

## 3. Check that events arrive

Send one request through Bifrost:

```sh
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "openai/gpt-4o-mini", "messages": [{"role": "user", "content": "Hello"}]}'
```

Use your Bifrost address and a provider and model you configured in it.

Open **Events** in WildEdge. Events appear within a few minutes, one inference event per provider attempt.

## What you get

- `gateway` is `bifrost`, and `model_provider` is the provider that served the attempt, for example `openai`.
- Each provider attempt is its own event, including each retry and fallback. `request_id` is Bifrost's request ID, shared by every attempt of one request. A request rescued by a retry or a fallback counts as one successful request.
- `reported_cost_amount` is Bifrost's estimate from its price table, in USD, so `reported_cost_is_estimated` is `true`. Bifrost reports a cost of 0 for models missing from that table, and no cost for failed calls. WildEdge records both as unknown.
- Failed attempts record the provider's HTTP status and error code, for example a `429` when the provider rate limits.
- Time to first token is recorded on streamed calls.
- MCP tool calls, from Agent Mode, `/v1/mcp/tool/execute` or the `/mcp` gateway, appear in the trace as tool spans.

See [Query gateway events](/llm-gateways#query-gateway-events) for the columns and an example query.

## Known limitations

- **Chat and text completions only.** Embeddings, speech, transcription and image calls aren't recorded.
- **Cache hits.** Bifrost's cache answers without calling a provider and exports no model call, so cache hits don't appear.
- **Tool names.** With `disable_content_logging: true`, Bifrost leaves tool names out, so tool calls appear as `unknown`, with their MCP server.

## Retries

Bifrost doesn't retry. It sends each request's trace once, with a 5 second timeout. Set `export_timeout` in the plugin config to change it, up to 60. After 5 failures in a row it stops sending for 30 seconds.

## Troubleshooting

If Bifrost requests succeed but no events appear, look for `failed to emit trace` in Bifrost's logs. See [status codes](/llm-gateways#troubleshooting) for what each HTTP status means.

## Next

- [Investigate events and traces](/investigate), or [connect your AI agent](/connect-agent) to do it for you.
- Also using a WildEdge SDK? Follow [App + gateway](/setup/sdk-and-gateway) so each call is recorded once.
