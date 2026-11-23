---
title: Dashboards
description: Track inference traffic, latency, errors, and model agreement with saved charts.
---

# Dashboards <a class="we-demo-button" href="https://wildedge.dev/demo/wildedge-demolabs/car-classifier/dashboards/operations?hours=168" aria-label="Open Operations in the demo">See Demo</a>

Bring related charts together to see whether changes in traffic, latency, or errors line up. Pick a time range to apply it across the dashboard's time-based panels.

## Create a dashboard

1. In your project, open **Dashboards** and select **New dashboard**.
2. Give it a name and optionally add a description, then create it.
3. In the dashboard, select **Add panel** and choose a saved chart. For a new chart, select **Build new chart**, then configure and run your query in [Analytics](/monitoring/query).
4. From the query result, select **Add to dashboard**, confirm the destination, name the panel if prompted, and select **Add panel**. Repeat for each metric you want to track.
5. Open the dashboard and set a time range. Use the panel arrows to change the order.

A panel references a saved chart. If you reuse a chart across dashboards, editing the chart updates each panel that uses it.

## Monitor inference health

Start with inference volume by model, then add p95 latency and error rate charts. Use separate latency charts when models have very different scales, such as device calls measured in milliseconds and cloud calls measured in seconds. Use the same time buckets to compare spikes across panels.

<figure class="workflow-shot">
  <a href="/images/workflows/dashboard-operations.jpg"><img src="/images/workflows/dashboard-operations.jpg" alt="Five Operations panels showing stacked inference traffic, two on-device latency lines, Gemini latency, error rates by model, and the daily Gemini error rate." width="1280" height="720"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>In this seven-day example, September 25 has the most inference traffic and the highest Gemini p95 latency and error rate.</figcaption>
</figure>

## Compare model labels

When two models classify the same image, use SQL to pair predictions by a shared run or request identifier. Group disagreements by label pair to find recurring patterns, and chart agreement and mismatch counts together so each class has a visible sample size.

<figure class="workflow-shot">
  <a href="/images/workflows/dashboard-agreement.jpg"><img src="/images/workflows/dashboard-agreement.jpg" alt="Two charts rank common label mismatches and show stacked agreement and mismatch counts for five car brands." width="1280" height="720"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Gemini labeled 20 paired scans Mercedes-Benz. The classifier agreed on 12 and labeled five of the remaining eight Skoda.</figcaption>
</figure>

[Explore the comparison data in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/dashboards/classifier-vs-gemini-agreement?hours=168). The public demo shows the fixed comparison as tables. Gemini provides the reference labels for this comparison.
