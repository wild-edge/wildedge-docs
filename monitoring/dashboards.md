---
title: Dashboards
description: Track inference traffic, latency, errors, and model agreement with saved charts.
---

# Dashboards

Bring related charts together to see whether changes in traffic, latency, or errors line up. Pick a time range to apply it across the dashboard's time-based panels.

## Monitor inference health

Start with **Daily inference volume by model** to spot a change in traffic. Check the two on-device p95 latency lines to see whether both models slowed down. Gemini has its own latency chart because its calls take seconds, while the on-device calls take milliseconds. Use the error panels to see which model failed and when.

<figure class="workflow-shot">
  <a href="/images/workflows/dashboard-operations.jpg"><img src="/images/workflows/dashboard-operations.jpg" alt="Five Operations panels showing stacked inference traffic, two on-device latency lines, Gemini latency, error rates by model, and the daily Gemini error rate." width="1280" height="720"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>In this seven-day example, September 25 has the most inference traffic and the highest Gemini p95 latency and error rate.</figcaption>
</figure>

[Open Operations in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/dashboards/operations?hours=168)

## Compare model labels

When two models classify the same image, group their disagreements by label pair to find recurring patterns. Compare agreements and mismatches together to see how many paired scans each brand had.

<figure class="workflow-shot">
  <a href="/images/workflows/dashboard-agreement.jpg"><img src="/images/workflows/dashboard-agreement.jpg" alt="Two charts rank common label mismatches and show stacked agreement and mismatch counts for five car brands." width="1280" height="720"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Gemini labeled 20 paired scans Mercedes-Benz. The classifier agreed on 12 and labeled five of the remaining eight Skoda.</figcaption>
</figure>

[Explore the comparison data in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/dashboards/classifier-vs-gemini-agreement?hours=168). The public demo shows the fixed comparison as tables. Gemini provides the reference labels for this comparison.

## Build your own dashboard

Use [Query](/monitoring/query) to build and save a chart. Add it to a dashboard alongside the metrics you review together.
