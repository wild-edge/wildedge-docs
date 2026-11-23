---
title: Architecture
description: Follow telemetry through WildEdge ingestion, storage, and analytics.
---

# Architecture

WildEdge receives inference telemetry from the [SDK in your app](/setup/sdk) or an [LLM gateway](/llm-gateways). Each source sends events into a project. The same project is the scope for investigation, queries, and dashboards.

1. **Ingest.** WildEdge validates SDK batches, applies project limits, and appends accepted events to a durable log.
2. **Store.** A background writer drains the log into columnar files in an open table format on object storage. Optional captured inputs and outputs are stored as [attachments](/datasets-and-training/capture).
3. **Analyze.** Use [Events](/monitoring/events) for individual records, [Runs](/monitoring/runs) for workflow traces, and [Query](/monitoring/query) for aggregated analysis.

[![WildEdge architecture showing SDK telemetry, ingestion, the durable event log, object storage, and analytics.](/images/wildedge-architecture.svg)](/images/wildedge-architecture.svg)

See [deployment options](/deployment) if you need to choose where WildEdge runs.
