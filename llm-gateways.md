---
title: Set up gateway telemetry
description: Send model calls from an LLM gateway to WildEdge over OpenTelemetry, from LiteLLM, OpenRouter or Bifrost.
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

When a gateway includes prompt and response text in its traces, WildEdge keeps it as the event's input and output summaries. Each gateway's setup says how to leave it out.

WildEdge accepts traces only. Don't send OpenTelemetry metrics or logs to it.

See [Troubleshooting guide](/what-we-collect) for guidance on failures, latency, usage, and cost.

## LiteLLM

LiteLLM proxy 1.106.6, configured with environment variables. [Set up LiteLLM](/gateways/litellm)

## OpenRouter

OpenRouter Broadcast, configured in the OpenRouter dashboard. [Set up OpenRouter](/gateways/openrouter)

## Bifrost

Bifrost v2.5.1, configured with its `otel` plugin. [Set up Bifrost](/gateways/bifrost)

## Query gateway events

Gateway events have their own columns, which you can use in SQL on the **Analytics** page or through [MCP](./mcp). They are empty on events from the SDKs.

| Column | What it holds |
| --- | --- |
| `gateway` | The gateway that reported the call, for example `litellm`. |
| `service_name` | The service name you set on the gateway. |
| `model_provider` | The provider that served the call, for example `openai`. |
| `requested_model_id` | The model name your app sent to the gateway. |
| `request_id` | One gateway request, where the gateway reports it. |
| `reported_cost_amount` | The cost the gateway reports, as an exact decimal. |
| `reported_cost_currency` | The currency of that cost, for example `USD`. |
| `reported_cost_is_estimated` | `true` when the gateway priced the call itself. |

What each gateway puts in these columns is on its setup page.

For example, the cost and token use per requested model over the selected time range:

```sql
SELECT
  gateway,
  requested_model_id,
  model_name,
  COUNT(*) AS calls,
  SUM(tokens_in) AS tokens_in,
  SUM(tokens_out) AS tokens_out,
  SUM(reported_cost_amount) AS cost_usd
FROM events
WHERE gateway IS NOT NULL
  AND reported_cost_currency = 'USD'
GROUP BY ALL
ORDER BY cost_usd DESC
```

Calls without a reported cost have no currency, so the filter leaves them out. Count them separately with `reported_cost_amount IS NULL`.

## Troubleshooting

When an export fails, the gateway logs the HTTP status:

| Status | Meaning | What to do |
| --- | --- | --- |
| `401` | The secret is missing or wrong. | Check the `X-Project-Secret` header, and that the project key isn't revoked. |
| `404` | Wrong endpoint. | Check the endpoint against your gateway's setup page. |
| `413` | The export is too large. | Send smaller batches, or leave prompt and response text out. |
| `415` | Unsupported encoding. | Send OTLP over HTTP as protobuf or JSON. |
| `429` | Too many requests for this project key. | Check your gateway's retries. If it persists, contact us. |
| `503` | WildEdge couldn't store the events yet. | Check your gateway's retries. |

When WildEdge answers `429` or `503`, it adds a `Retry-After` of a second or two. Whether the gateway retries, and for how long, is on its setup page. Events in an export the gateway drops are lost.

## Next: investigate

[Connect your AI agent](/connect-agent), or follow [Investigate events and traces](/investigate). If your app also uses an SDK, check the [combined setup guide](/setup/sdk-and-gateway) to avoid recording the same call twice.
