---
title: Set up gateway telemetry
description: Send model calls from an LLM gateway to WildEdge over OpenTelemetry, from LiteLLM or OpenRouter.
---

# Set up gateway telemetry <Badge type="tip" text="Beta" />

If your app reaches LLM providers through a gateway, the gateway can send WildEdge a record of every model call. You don't need to change your app or install an SDK. The gateway exports OpenTelemetry (OTLP) traces, and WildEdge turns each model call into an inference event.

Each event records:

- the provider and the model that served the call
- input, output, cached and reasoning tokens, when the gateway reports them
- latency, and time to first token for streamed calls
- whether the call succeeded, and the error code when it failed
- the gateway and its service name, and the model name your app asked the gateway for
- the cost the gateway reports, when it reports one

WildEdge doesn't store prompt or response text from gateway traces.

See [Telemetry reference](/what-we-collect) for guidance on failures, latency, usage, and cost.

Supported gateways:

| Gateway | Versions | Status |
| --- | --- | --- |
| [LiteLLM proxy](#litellm) | 1.106.6 | Beta |
| [OpenRouter](#openrouter) | Broadcast | Beta |

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

### 4. Query gateway events

Gateway events have their own columns, which you can use in SQL on the **Analytics** page or through [MCP](./mcp). They are empty on events from the SDKs.

| Column | What it holds |
| --- | --- |
| `gateway` | The gateway that reported the call, for example `litellm`. |
| `service_name` | The `OTEL_SERVICE_NAME` you set on the gateway. |
| `model_provider` | The provider that served the call, for example `openai`. |
| `requested_model_id` | The model name your app sent to the gateway. |
| `request_id` | One gateway request. A failed attempt and its fallback share it. |
| `reported_cost_amount` | The cost the gateway reports, as an exact decimal. |
| `reported_cost_currency` | The currency of that cost, for example `USD`. |
| `reported_cost_is_estimated` | `true` when the gateway priced the call itself. |

For example, the cost and token use per requested model over the selected time range:

```sql
SELECT
  requested_model_id,
  model_name,
  COUNT(*) AS calls,
  SUM(tokens_in) AS tokens_in,
  SUM(tokens_out) AS tokens_out,
  SUM(reported_cost_amount) AS cost_usd
FROM events
WHERE gateway = 'litellm'
  AND reported_cost_currency = 'USD'
GROUP BY ALL
ORDER BY cost_usd DESC
```

LiteLLM prices each call from its own price list, so the cost is an estimate. Calls LiteLLM can't price have no cost, so the filter on currency leaves them out. Count them separately with `reported_cost_amount IS NULL`.

### What the beta does not cover yet

- **Duplicate events.** When an export is retried, the same model call can be stored twice. Duplicates are removed by 02:05 UTC the next day, so today's totals can be slightly high until then.
- **Apps that also use the SDK.** If your app records its OpenAI or Anthropic calls with a WildEdge SDK and sends them through the gateway, each call is counted twice. The two events aren't linked into one trace. To use the SDK for on-device models only, enable just those integrations, for example `wildedge run --integrations llama_cpp`. `wildedge run` enables every integration by default, including OpenAI and Anthropic.
- **Costs of unpriced models.** LiteLLM reports no cost for models missing from its price list and for failed calls. These events have no cost, so cost totals leave them out.
- **Cache hits.** LiteLLM doesn't export a model call when it answers from its cache, so cache hits don't appear.
- **Interrupted streams.** A stream the client cancels can look like a successful call.
- **Missing usage.** When a call fails or the provider doesn't report usage, LiteLLM exports zero tokens. WildEdge records these token counts as unknown, not as zero.
- **Traces only.** WildEdge doesn't accept OpenTelemetry metrics or logs.

## OpenRouter

OpenRouter sends traces with its Broadcast feature. You set it up in the OpenRouter dashboard. Your app doesn't change.

### 1. Find your project secret

Use a project secret, found the same way as [for LiteLLM](#_1-find-your-project-secret). Use a separate project key for OpenRouter.

### 2. Add WildEdge as a Broadcast destination

1. In OpenRouter, open **Settings → Observability** and turn on **Enable Broadcast**.
2. Edit the **OpenTelemetry Collector** destination.
3. Set **Endpoint** to the full traces URL:

   ```text
   https://ingest.wildedge.dev/api/otlp/v1/traces
   ```

4. Set **Headers** to:

   ```json
   {"X-Project-Secret": "<secret>"}
   ```

5. Turn on **Privacy Mode**. WildEdge doesn't store prompt or response text, and without it each export carries the full prompt. WildEdge rejects exports over 2 MB.
6. Select **Test Connection**, then save. The test doesn't create an event.

### 3. Check that events arrive

Send one request through OpenRouter with the API key you use in your app. Open **Events** in WildEdge. Events appear within a few minutes, one inference event per request.

### What you get from OpenRouter

- `gateway` and `model_provider` are both `openrouter`, because OpenRouter is the API you call and pay. The provider that served the call, for example `azure`, isn't a column yet.
- `model_name` is OpenRouter's model ID, for example `openai/gpt-4o-mini`.
- `reported_cost_amount` is what OpenRouter charged, in USD, so `reported_cost_is_estimated` is `false`. A stream your app cancels is charged, and its event is marked as failed.
- `request_id` is OpenRouter's generation ID, the one shown in its activity log.
- Time to first token is recorded on every call, streamed or not. It's how long the model took to start answering, measured by OpenRouter.

### What the beta does not cover yet

- **Fallbacks.** Each request is one event, for the model and provider that answered. Attempts that failed before a fallback aren't recorded.
- **Requests OpenRouter rejects before routing,** for example with an unknown model ID. OpenRouter sends no trace for them.
- **Duplicate events.** Same as [for LiteLLM](#what-the-beta-does-not-cover-yet).

## Next: investigate

[Connect your AI agent](/connect-agent), or follow [Investigate events and traces](/investigate). If your app also uses an SDK, check the [combined setup guide](/setup/sdk-and-gateway) to avoid recording the same call twice.

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

OpenRouter saves a destination only after **Test Connection** passes. If it fails, check that the endpoint ends in `/v1/traces` and that the header is valid JSON.

### How retries work

WildEdge confirms an export only after the events are stored. Otherwise it answers `503` and asks the exporter to retry. The OpenTelemetry exporter gives each batch about 10 seconds, retries included. If WildEdge is unreachable for longer, the exporter drops that batch and the events are lost.
