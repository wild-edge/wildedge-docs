---
title: Events
description: Filter inference traffic and inspect the timing, tokens, and captured content for a single event.
---

# Events <a class="we-demo-button" href="https://wildedge.dev/demo/wildedge-demolabs/car-classifier/events?hours=168&amp;modelName=gemini-3.8-flash&amp;hasAttachments=true" aria-label="Open Events in the demo">See Demo</a>

Use Events to find a slow inference, investigate a failure, or check what a model returned. Start with the traffic histogram, narrow the list, then open a matching event.

## Find an event

1. Pick a time range. Use the histogram to spot a busy period, then select and drag across that period to zoom in.
2. Combine filters to narrow the list. Here, **Event type**, **Model**, and **Attachments** isolate Gemini inference calls with captured images. When investigating failures, filter by error code.
3. Compare the matching rows by timestamp, model, duration, or token counts. Select a row to keep the list in view while you inspect the event.

<figure class="workflow-shot">
  <a href="/images/workflows/events-filtered.jpg"><img src="/images/workflows/events-filtered.jpg" alt="Events with a seven-day histogram, time controls, and active filters for inference, Gemini, and attachments" width="1190" height="620"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Seven days of synthetic traffic in the Events view. The histogram and list reflect the same filters.</figcaption>
</figure>

## Inspect the selected event

<figure class="workflow-shot">
  <a href="/images/workflows/events-details.jpg"><img src="/images/workflows/events-details.jpg" alt="Filtered Events list beside the selected inference, showing duration, token counts, prompt, model response, and session and trace actions" width="1190" height="842"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The selected inference took 16.1 seconds, used 1,498 input tokens, and returned 646 output tokens. The example prompt and response appear alongside those metrics.</figcaption>
</figure>

- **Input and Output** show captured content when available. Use **Raw** to inspect the underlying value, or expand **Attachments** for a captured image.
- **Only this session** narrows Events to calls that share the selected event’s session ID.
- **View run trace** opens the associated run so you can compare this call with the other steps.

[Open the selected event in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/events?hours=168&modelName=gemini-3.8-flash&hasAttachments=true&show-details=true&highlighted-event=demo-car-event-33) · [Explore Runs](/monitoring/runs) · [See how Capture works](/datasets-and-training/capture)
