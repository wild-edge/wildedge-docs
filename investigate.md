---
title: Investigate events and traces
---
# Investigate events and traces

Start with a small set of recent events, find a suspicious inference, then inspect the context available to explain it.

Use [Telemetry reference](/what-we-collect) to choose fields for the problem you are investigating.

## 1. Find recent events

Open **Events** in your [WildEdge project](https://app.wildedge.dev/), or [connect your AI agent](/connect-agent) and ask:

> For project `PROJECT` in company `COMPANY`, inspect up to 25 events from the last 24 hours. Highlight failures and unusually long durations. Do not make any changes.

Name the project and time window so the investigation stays focused. Your agent reasons over the bounded events it retrieves, not automatically over every event in your account.

## 2. Inspect an inference

> Open event `event-id` from the previous result. Explain the errors, timing, and available telemetry. Describe any captured inputs and outputs that are available.

SDK inputs and outputs require capture to be enabled. WildEdge does not store prompt or response text from gateway traces. Missing data should not be treated as evidence that a call succeeded or had no cost.

## 3. Follow the surrounding trace

> If this event belongs to a run, follow the run trace and summarize where the problem started. Identify any gaps in the evidence.

SDK and gateway events are not automatically linked into one trace. See [the combined setup guide](/setup/sdk-and-gateway) for the current limitation.

## Investigate gateway calls

Ask your agent to filter by gateway and inspect provider, model, token use, latency, and reported cost where available. Gateway reporting differs by provider. See [gateway fields and limitations](/llm-gateways#_4-query-gateway-events) before interpreting totals.
