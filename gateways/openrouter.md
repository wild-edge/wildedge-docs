---
title: Set up OpenRouter
description: Send model calls from OpenRouter to WildEdge with Broadcast.
---

# Set up OpenRouter <Badge type="tip" text="Beta" />

OpenRouter sends traces with its Broadcast feature. You set it up in the OpenRouter dashboard. Your app doesn't change.

## 1. Find your project secret

<!--@include: ../parts/project-secret.md-->

## 2. Add WildEdge as a Broadcast destination

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

5. Turn on **Privacy Mode**. Without it, each export carries the full prompt and response, which WildEdge keeps as the event's summaries. WildEdge also rejects exports over 2 MB.
6. Select **Test Connection**, then save. The test doesn't create an event.

## 3. Check that events arrive

Send one request through OpenRouter with the API key you use in your app. Open **Events** in WildEdge. Events appear within a few minutes, one inference event per request.

## What you get

- `gateway` and `model_provider` are both `openrouter`, because OpenRouter is the API you call and pay. The provider that served the call, for example `azure`, isn't a column yet.
- `model_name` is OpenRouter's model ID, for example `openai/gpt-4o-mini`.
- `reported_cost_amount` is what OpenRouter charged, in USD, so `reported_cost_is_estimated` is `false`. A stream your app cancels is charged, and its event is marked as failed.
- `request_id` is OpenRouter's generation ID, the one shown in its activity log.
- Time to first token is recorded on every call, streamed or not. It's how long the model took to start answering, measured by OpenRouter.

See [Query gateway events](/llm-gateways#query-gateway-events) for the columns and an example query.

## Known limitations

- **Fallbacks.** Each request is one event, for the model and provider that answered. Attempts that failed before a fallback aren't recorded.
- **Requests OpenRouter rejects before routing,** for example with an unknown model ID. OpenRouter sends no trace for them.

## Retries

OpenRouter retries failed deliveries from a queue. It doesn't document for how long.

## Troubleshooting

OpenRouter saves a destination only after **Test Connection** passes. If it fails, check that the endpoint ends in `/v1/traces` and that the header is valid JSON. See [status codes](/llm-gateways#troubleshooting) for what each HTTP status means.
