---
title: Investigate events and traces
description: Start from recent events, find a suspicious inference, and inspect the context that explains it, in WildEdge or with your AI agent.
---
# Investigate events and traces

Start with a small set of recent events, find a suspicious inference, then inspect the context available to explain it.

New to events, runs, and spans? See [How WildEdge works](/concepts).

Use [Troubleshooting guide](/what-we-collect) to choose fields for the problem you are investigating.

## 1. Find recent events

Open **Events** in your [WildEdge project](https://app.wildedge.dev/), or [connect your AI agent](/connect-agent) and ask:

> For project `PROJECT` in company `COMPANY`, inspect up to 25 events from the last 24 hours. Highlight failures and unusually long durations. Do not make any changes.

Name the project and time window so the investigation stays focused. Your agent reasons over the bounded events it retrieves, not automatically over every event in your account.

## 2. Inspect an inference

> Open event `event-id` from the previous result. Explain the errors, timing, and available telemetry. Describe any captured inputs and outputs that are available.

SDK inputs and outputs require capture to be enabled. Gateway prompt and response text is kept only when the gateway exports it. Missing data should not be treated as evidence that a call succeeded or had no cost.

## 3. Follow the surrounding trace

> If this event belongs to a run, follow the run trace and summarize where the problem started. Identify any gaps in the evidence.

SDK and gateway events are not automatically linked into one trace. See [the combined setup guide](/setup/sdk-and-gateway) for the current limitation.

## Investigate gateway calls

Ask your agent to filter by gateway and inspect provider, model, token use, latency, and reported cost where available. Gateway reporting differs by provider. See [gateway fields](/llm-gateways#query-gateway-events) before interpreting totals.
