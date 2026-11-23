---
title: Models
description: Compare model health, then investigate latency, errors, and prediction confidence for one model.
---

# Models

Use Models to see which models reported telemetry in the selected time range and decide which one to investigate.

## Compare models in a project

Scan **Inference calls**, **p95 call latency**, and **Call error rate** to compare traffic, tail latency, and reliability. **Trend** shows how a monitored signal changed, and **Last seen** tells you how recently the model reported.

<figure class="workflow-shot">
  <a href="/images/workflows/models-inventory.jpg"><img src="/images/workflows/models-inventory.jpg" alt="Three model cards compare inference volume, p95 latency, errors, confidence trends, and last-seen times for one cloud model and two Core ML models." width="1280" height="720"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The Car Classifier project uses two on-device Core ML models and Gemini. Gemini logged 74 inferences and had the highest p95 latency in this seven-day window.</figcaption>
</figure>

[Open Models in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/models?hours=168)

## Investigate one model

Open a model and check the **Model Health** strip to see which signal it tracks and which periods it compares. Scan the latency and error charts for changes. Select the failed-call count to open matching errors in Events.

For classification workloads, **Confidence Trend** shows how the top prediction's confidence changed over time. Use **Confidence Distribution** to compare the current and baseline periods. The detail page also shows LLM metrics such as token usage and time to first token when that telemetry is available.

<figure class="workflow-shot">
  <a href="/images/workflows/models-detail.jpg"><img src="/images/workflows/models-detail.jpg" alt="Gemini model detail with health, inference count, latency metrics, and four charts for latency, errors, confidence trend, and confidence distribution." width="1280" height="965"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Gemini's detail page shows a 16.7-second p95 and links to four failed calls. The confidence charts reflect its use as a classifier in this project.</figcaption>
</figure>

[Open Gemini details in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/models/gemini-3.8-flash?format=api&hours=168) · [Explore Events](/monitoring/events)

## What can appear in model details

The selected time range and the telemetry it contains determine which sections appear. A model can show both classifier and LLM signals, as Gemini does in the example above.

| Section | What it can show | When it appears |
| --- | --- | --- |
| **Model Health and core metrics** | Health and comparison period, inference count, p95 and average latency, call error rate, and a link to failed calls. | Core metrics are shown for a loaded model. The health strip and failed-call link appear when available. |
| **Core trends** | Latency Trend and Call error rate over time. | Chart panels are always shown. Plots need data in the selected range. |
| **Classifier Signals** | Confidence Trend, Confidence Distribution, Prediction Class Balance, and Confidence drift (PSI). | The section appears when top prediction confidence is reported. The distribution, class balance, and drift score each need their own data. |
| **LLM Behavioral Signals** | Call Volume, Time to First Token, Token Usage, and Token Throughput. The summary can also show average time to first token, tokens per second, and average input and output tokens. | The section appears when the trend includes output token counts or time to first token. Individual charts can have no data. |
| **Device Breakdown** | Average and p95 latency and inference counts by device model. | Appears when the response contains more than one device breakdown row. |
