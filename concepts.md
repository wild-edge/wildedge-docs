---
title: How WildEdge works
description: The building blocks of WildEdge, from projects, keys, events, runs, and attachments to SQL charts, dashboards, datasets, and training export.
---

# How WildEdge works

Your app or LLM gateway sends **events** to a **project**. You investigate them as events and runs, query them with **SQL**, chart them on **dashboards**, and turn the useful ones into **datasets** you can export for training.

See [Where your inference data goes](/#how-wildedge-works) for the interactive map.

## Companies and projects

A **company** holds your team and billing. A **project** holds telemetry and settings for an application or environment. See [Companies & projects](/administration/projects) for setup.

## Keys and tokens

A project key sends telemetry, an MCP token or OAuth sign-in gives an agent access through your account, and a training provider API key lets WildEdge export datasets to a training service. See [Keys & tokens](/administration/keys) or [Training](/datasets-and-training/training) for setup.

## Events

An **event** is one thing that happened, recorded with its time, model, device, and measurements.

| Event | Records |
| --- | --- |
| `inference` | One model call: timing, tokens, input and output measurements, predictions |
| `model_load`, `model_download`, `model_unload` | A model's lifecycle on the device |
| `error` | A failure, with its code and message |
| `feedback` | A user's reaction to an inference, such as thumbs up or an edit |
| `span` | A timed step in your application, such as a retrieval or a tool call |

Events come from two sources. The **SDK** runs in your app and records local and cloud model calls, with device and hardware context. A **gateway** such as LiteLLM, OpenRouter, or Bifrost exports the cloud calls that pass through it, with no change to your app. See [Choose your setup](/).

The [telemetry reference](/telemetry) lists every field.

**[Find and verify an event →](/monitoring/events#find-an-event)**

## Runs, traces, and spans

A **run** is one execution of a workflow or agent, for example one car scan or one support conversation turn. Its events and spans share a `run_id`.

A **span** is a timed step inside a run, such as an agent step, a tool call, or a retrieval. Spans nest, and with the run's model calls they form the **trace** you see on the run's page:

[![A run's trace in WildEdge: a scan step with detect, classify, and recognize spans, two on-device models, a model load, and a Gemini call](/images/concepts-run-waterfall.png)](/images/concepts-run-waterfall.png)

If you know OpenTelemetry: a run is a trace, a span is a span, and an inference event is a leaf span that carries model data.

Runs and spans come from `wildedge.trace()` and `wildedge.span()` in the SDK, or the Swift and Kotlin equivalents.

**[Find the slow step in a run →](/monitoring/runs#find-the-slow-step-in-a-run)**

## Attachments

By default WildEdge records measurements, not content. An **attachment** is an input or output file, such as an image, an audio clip, or text, that you choose to upload with an inference event. Each attachment has a role: `input` or `output`.

Attachment capture is off until you enable it in **Project Settings** and in your SDK. Upload size, count, and retention depend on your plan. See [Captured content](/what-we-collect#captured-content).

**[Inspect a captured input →](/datasets-and-training/capture#find-and-review-a-capture)**

## SQL and charts

Every project has one queryable table, `events`. Open **SQL** to run read-only SQL against it, limited to the project and the selected time window.

```sql
SELECT model_name, quantile_cont(duration_ms, 0.95) AS p95_ms, count(*) AS calls
FROM events
WHERE event_type = 'inference'
GROUP BY model_name
ORDER BY p95_ms DESC
```

- **Write SQL or build without it.** **Analytics** has a builder with filters and axes. **SQL** takes raw queries.
- **Ask in plain language.** Describe what you want, for example "average latency by device model last 7 days", and WildEdge generates the SQL. This uses an AI provider key you add in **Settings**.
- **Save as a chart.** A saved query becomes a **chart**: a table, a stat, a line, or a bar. You can download results as CSV.

Your agent can do the same through MCP: `sql_schema` lists columns and `sql_query` runs a query.

**[Query inference latency →](/monitoring/query#query-inference-latency)**

## Dashboards

A **dashboard** is a page of **panels**. Each panel shows one saved chart, and the whole dashboard follows one time window. The same chart can appear on several dashboards. Editing the chart updates it everywhere.

Build dashboards in **Dashboards**, or ask your agent: `create_chart` saves a SQL chart and `add_dashboard_panel` places it.

**[Compare model results in a dashboard →](/monitoring/dashboards#compare-model-labels)**

## Datasets

A **dataset** is a curated set of events with their inputs and outputs, for evaluation or fine-tuning. It works for any model output: image, audio, video, PDF, text, chat and sensor data. You can fill one in two ways:

- **Add filtered events** from the **Events** list with **Add all to dataset**.
- **Add events by hand**, one at a time from an event's details.

Each item carries the event's predicted label. You can set a different label inside the dataset, one item at a time from the keyboard or in bulk, without changing the original event. Each item keeps a saved copy of its event, so the dataset outlives the project's retention.

Files need attachment capture. Input and output summaries work without it. See [Build evaluation datasets](/what-we-collect#model-behavior).

**[Review examples in a dataset →](/datasets-and-training/datasets#review-items-one-at-a-time)**

## Training export

A **training integration** connects a project to an external training service. **Edge Impulse** is supported today.

1. In **Training**, add an integration with your Edge Impulse API key. WildEdge verifies it.
2. Start an **export job** for a dataset. WildEdge uploads the dataset's image attachments with their labels to your Edge Impulse project. You can force one label for every image.
3. Follow the job's progress and result in **Training**.

Training integrations may need to be enabled for your project. Contact us if **Training** is not available.

**[Verify a training export →](/datasets-and-training/training#verify-the-export)**

## Glossary

| Term | Meaning | Similar to |
| --- | --- | --- |
| Company | Your organization, team, and billing | Organization, workspace |
| Project | Telemetry for one app or environment | Project |
| DSN | Write-only key that sends events to a project | Sentry DSN, ingestion key |
| Event | One recorded occurrence: inference, load, error, feedback, span | Log record, span |
| Run | One workflow or agent execution, grouped by `run_id` | Trace, session |
| Span | A timed step inside a run | Span |
| Attachment | An opt-in input or output file on an inference | Payload, blob |
| Chart | A saved query with a visualization | Saved query, insight |
| Dashboard | A page of chart panels over one time window | Dashboard, board |
| Dataset | Curated events with attachments and labels | Dataset |
| Export job | One upload of a dataset to a training service | Sync |

## Next

- Send your first event: [on-device quickstart](/quickstart/on-device) or [cloud API quickstart](/quickstart/cloud).
- [Investigate events and traces](/investigate).
- [Connect your AI agent](/connect-agent) to query, chart, and build dashboards for you.
