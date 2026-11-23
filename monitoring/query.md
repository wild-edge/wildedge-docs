---
title: Query
description: Explore inference traffic with the visual Builder or write SQL for custom analysis.
---

# Query <a class="we-demo-button" href="https://wildedge.dev/demo/wildedge-demolabs/car-classifier/analytics?hours=168" aria-label="Open Builder in the demo">See Demo</a>

Use Query in Analytics to filter, group, and visualize events. Start in Builder for common aggregations, or switch to SQL for custom calculations.

## Build a query visually

Set the time range to **7d**. Choose **Event count**, group by **Time**, split by **Model name**, and add the **Event type → inference** filter. Run the query, then select **Bar** and **Stack**. The height of each bar shows total traffic for that bucket, and the colored segments show the contribution from each model.

<figure class="workflow-shot">
  <a href="/images/workflows/query-builder.jpg"><img src="/images/workflows/query-builder.jpg" alt="Query Builder with an inference filter and seven stacked bars in violet, pink, and teal, one series per model." width="1280" height="720"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>In this demo dataset, inference traffic peaks on September 25 across all three models.</figcaption>
</figure>

## Write or generate SQL

Use **SQL** to choose an explicit bucket size or write custom aggregations. This query returns one row per day and model. For a stacked bar chart, use **day** on the X axis, **inferences** on the Y axis, and **model_name** as the series.

If your company has configured **AI Assistant**, enter “Count inference events by day and model for the selected time range,” then select **Generate**. Review the draft SQL before running it.

<figure class="workflow-shot">
  <a href="/images/workflows/query-sql.jpg"><img src="/images/workflows/query-sql.jpg" alt="SQL editor showing a daily inference count grouped by model, with the matching stacked chart and legend below." width="1280" height="720"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The SQL editor and a prepared result use the same demo dataset as the Builder screenshot.</figcaption>
</figure>

```sql
SELECT DATE_TRUNC('day', event_timestamp) AS day,
       model_name, COUNT(*) AS inferences
FROM events
WHERE event_type = 'inference'
GROUP BY 1, 2
ORDER BY 1, 2;
```

[Open the SQL editor in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/analytics?mode=sql&hours=168). You can edit SQL in the public demo. Run queries and save charts from your workspace.

## Query inference latency

In your workspace, open **Analytics → SQL**, choose a time range, and run the query below. It returns p95 inference duration in milliseconds and the number of calls with a recorded duration for each model. Use the call count to see how much traffic each percentile represents.

```sql
SELECT model_name,
       quantile_cont(duration_ms, 0.95) AS p95_ms,
       count(*) AS calls
FROM events
WHERE event_type = 'inference' AND duration_ms IS NOT NULL
GROUP BY model_name
ORDER BY p95_ms DESC;
```

Select **Table** to compare latency and call count side by side. Save the result as a chart to reuse it in a dashboard.

[Explore Dashboards](/monitoring/dashboards) · [Look up telemetry fields](/telemetry)
