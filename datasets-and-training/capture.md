---
title: Capture
description: Review captured model inputs and outputs alongside the events that produced them.
---

# Capture

Capture gives you the original input or output attached to an inference event. Open it alongside the model’s prediction to investigate a result or collect an example for a dataset.

[Inspect a captured photo in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/events?hasAttachments=true&show-details=true&highlighted-event=demo-car-event-33&attachment-id=demo-car-attachment-33&hours=168)

<figure class="workflow-shot">
  <a href="/images/workflows/event-attachment.jpg"><img src="/images/workflows/event-attachment.jpg" alt="A captured car photo appears with the reported Honda CR-V prediction." width="1536" height="978"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The Attachments filter surfaces inference events with captured files. The selected event pairs an input photo with a Honda CR-V prediction at 98% confidence.</figcaption>
</figure>

## Find and review a capture

1. In **Events**, select **Add filter → Attachments → Has attachments**. Set the time range for the examples you want to review.
2. Open an event and look under **Attachments**. Use the preview to compare the captured input with the reported prediction and confidence.

## Add captured events to a dataset

You can inspect attachments in the public demo. Use the dataset controls in your own project to save events.

### Add one event

In the event details, click **Add to dataset**. Select an existing dataset, or use **New dataset** in the picker. Click **Add to dataset** below the picker to save the selected event.

<figure class="workflow-shot">
  <a href="/images/workflows/capture-add-event.jpg"><img src="/images/workflows/capture-add-event.jpg" alt="The event detail panel shows the Car review sample dataset selected above the captured photo." width="384" height="585" loading="lazy" style="max-width: 384px"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Save the event while reviewing its attachment.</figcaption>
</figure>

### Add all matching events

Set the time range and filters in **Events**, then click **Add all to dataset** above the event list. The dialog estimates how many events match, including those beyond the visible rows. If the estimate exceeds the row limit, narrow the time range or refine your filters. Select or create a dataset, then click **Add to dataset** to start the batch.

<figure class="workflow-shot">
  <a href="/images/workflows/capture-add-bulk.jpg"><img src="/images/workflows/capture-add-bulk.jpg" alt="The bulk dialog estimates 2,173 matching events and shows Car review sample as the destination." width="696" height="490" loading="lazy"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Check the estimated batch size before adding the matching events.</figcaption>
</figure>

## Capture content in your app

Input and output capture is opt-in. Follow your SDK guide to enable capture or supply attachments. The integration and project configuration determine which files you can upload and the applicable limits. If you only need a short text preview, send an input or output summary.

[See what content WildEdge collects](/what-we-collect#captured-content) · [Work with datasets](/datasets-and-training/datasets)
