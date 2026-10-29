---
title: LLM gateway integrations
description: Send model calls from an LLM gateway to WildEdge over OpenTelemetry, starting with LiteLLM.
---

# LLM gateway integrations <Badge type="tip" text="Beta" />

If your app reaches LLM providers through a gateway, the gateway can send WildEdge a record of every model call. You don't need to change your app or install an SDK. The gateway exports OpenTelemetry (OTLP) traces, and WildEdge turns each model call into an inference event.

Each event records:

- the provider and the model that served the call
- input, output, cached and reasoning tokens, when the gateway reports them
- latency, and time to first token for streamed calls
- whether the call succeeded, and the error code when it failed

WildEdge doesn't store prompt or response text from gateway traces.

Supported gateways:

| Gateway | Versions | Status |
| --- | --- | --- |
| [LiteLLM proxy](#litellm) | 1.106.6 | Beta |

## LiteLLM

### 1. Find your project secret

1. Sign in to [WildEdge](https://app.wildedge.dev/) and open the project that should receive the events.
2. Open **API Keys** and select **Reveal DSN** on a project key.

The DSN looks like this:

```text
https://<secret>@ingest.wildedge.dev/<key>
```

The part between `https://` and `@` is your project secret. You need only the secret.

::: warning Protect the secret
Anyone with the secret can send events to your project. Keep it in your secret store, not in source control. Use a separate project key for the gateway, so you can revoke it without affecting your apps.
:::

### 2. Configure the LiteLLM proxy

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

You don't need to change the LiteLLM config file.

### 3. Check that events arrive

Send one request through the proxy:

```sh
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer $LITELLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<model name>", "messages": [{"role": "user", "content": "Hello"}]}'
```

Use your proxy's address, one of your LiteLLM keys and a model name from your LiteLLM config.

Open **Events** in WildEdge. Events appear within a few minutes. You should see an inference event for the provider model that served the request. It carries the request's token counts and latency.

### What the beta does not cover yet

- **Duplicate events.** When an export is retried, the same model call can be stored twice. Totals can be slightly too high until duplicates are removed.
- **Apps that also use the SDK.** If your app records its OpenAI or Anthropic calls with a WildEdge SDK and sends them through the gateway, each call is counted twice. The two events aren't linked into one trace. To use the SDK for on-device models only, enable just those integrations, for example `wildedge run --integrations llama_cpp`. `wildedge run` enables every integration by default, including OpenAI and Anthropic.
- **Gateway details.** The service name, the model name your app requested, and the cost LiteLLM reports aren't stored yet. Events show the provider model and token counts.
- **Cache hits.** LiteLLM doesn't export a model call when it answers from its cache, so cache hits don't appear.
- **Interrupted streams.** A stream the client cancels can look like a successful call.
- **Missing usage.** When a call fails or the provider doesn't report usage, LiteLLM exports zero tokens. WildEdge records these token counts as unknown, not as zero.
- **Traces only.** WildEdge doesn't accept OpenTelemetry metrics or logs.

## Troubleshooting

LiteLLM logs export failures, for example `Failed to export spans batch`. The HTTP status tells you why:

| Status | Meaning | What to do |
| --- | --- | --- |
| `401` | The secret is missing or wrong. | Check `OTEL_EXPORTER_OTLP_HEADERS`, and that the project key isn't revoked. |
| `404` | Wrong endpoint. | Check that the endpoint is `https://ingest.wildedge.dev/api/otlp`. |
| `413` | The export batch is too large. | Lower `OTEL_BSP_MAX_EXPORT_BATCH_SIZE`. |
| `415` | Unsupported encoding. | Set `OTEL_EXPORTER` to `http/protobuf` or `http/json`. |
| `429` | Too many requests for this project key. | The exporter retries on its own. If it persists, contact us. |
| `503` | WildEdge couldn't store the events yet. | The exporter retries on its own. Nothing to do. |

If requests succeed but no events appear, check that your LiteLLM version is supported and that `LITELLM_OTEL_V2=true` is set on the proxy process.

### How retries work

WildEdge confirms an export only after the events are stored. Otherwise it answers `503` and asks the exporter to retry. The OpenTelemetry exporter gives each batch about 10 seconds, retries included. If WildEdge is unreachable for longer, the exporter drops that batch and the events are lost.
