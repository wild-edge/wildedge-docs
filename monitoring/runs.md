---
title: Runs
description: Find slow or failing runs, follow their spans, and inspect individual calls.
---

# Runs

Use Runs to see where a request spent time or which step failed. A run groups the recorded steps of one execution. Each step appears as a span in the trace.

[Open Runs in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/runs?hours=168)

## Find a run to investigate

Choose a time range and use **Add filter** to narrow the list. The cards summarize volume, errors, p95 duration, and input and output tokens. Check **Duration** and **Errors** to find a run worth opening. **LLM%** shows how much of the run's time was spent in model calls.

<figure class="workflow-shot">
  <a href="/images/workflows/runs-list.jpg"><img src="/images/workflows/runs-list.jpg" alt="Runs list with seven-day totals, latency and error metrics, and per-run durations, calls, and tokens." width="1280" height="688"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>In the Car Classifier demo, run 9 took 16.3 seconds across three model calls.</figcaption>
</figure>

## Find the slow step in a run

Open the run and use **Trace** to compare spans. The offset shows when each span started relative to the run, and the bar shows how long it lasted. Sort by **Start time** to follow the execution or **End time** to see which calls finished first. Use **Summary** for a run-level overview.

In the Car Classifier demo, two on-device model calls took **47 ms** and **26 ms**. The Gemini call took **16.1 s** out of the **16.3 s** run. Select the Gemini span to inspect its duration, token counts, and captured input and output. On wider screens, the details open alongside the waterfall. Use **Formatted** to read the content or **Raw** to inspect the underlying data.

<figure class="workflow-shot">
  <a href="/images/workflows/runs-trace.jpg"><img src="/images/workflows/runs-trace.jpg" alt="Runs waterfall beside the selected Gemini span, showing latency, token counts, the captured prompt, and the response." width="1560" height="763"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Gemini started 261 ms into the run and took 16.1 seconds. The details pane shows the prompt, response, and token counts for that call.</figcaption>
</figure>

[Inspect the Gemini span in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/runs/demo-car-run-9?hours=168&highlighted-span=demo-car-event-33&show-details=true) · [Find individual calls in Events](/monitoring/events)
