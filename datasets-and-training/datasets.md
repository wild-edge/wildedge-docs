---
title: Datasets
description: Review inference examples, correct dataset labels, and prepare data for training.
---

# Datasets

A dataset collects inference events you want to review or use for training. Start with a single event or a filtered batch from [Capture](/datasets-and-training/capture#add-captured-events-to-a-dataset).

[Open Car review sample in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/datasets/car-review-sample?hours=168)

<figure class="workflow-shot">
  <a href="/images/workflows/dataset-detail.jpg"><img src="/images/workflows/dataset-detail.jpg" alt="The full Car review sample view shows dataset actions, coverage, charts, and the first four rows." width="1536" height="1005"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Start with coverage and confidence, then review the original events and input images in the table below.</figcaption>
</figure>

## Inspect dataset coverage

- **Built from and Breakdown** show the row count, attachment coverage, and the input modalities, models, and devices represented.
- **Confidence distribution and Top predictions** show where the model was uncertain and which classes it predicted most often. In your project, select a bar to filter the rows.
- **Feedback signals** shows ratings your app recorded, such as thumbs up or thumbs down.

## Review individual rows

Open the event link to see the original inference, or click the input thumbnail to inspect the captured image. The row also shows the predicted label, confidence, and any recorded feedback or output file.

<figure class="workflow-shot">
  <a href="/images/workflows/dataset-rows.jpg"><img src="/images/workflows/dataset-rows.jpg" alt="Dataset rows with links to inference events, confidence scores, image thumbnails, and edit controls." width="1145" height="420" loading="lazy"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Compare each prediction with its captured input before changing a label.</figcaption>
</figure>

### Correct a label

In your project, click the pencil icon on the row, enter the corrected **Forced Label**, and select **Save**. The override becomes the effective label for this row and is used by training export. The original prediction remains visible in the editor. Use **Clear forced label** to remove an override.

<figure class="workflow-shot">
  <a href="/images/workflows/dataset-edit-label.jpg"><img src="/images/workflows/dataset-edit-label.jpg" alt="The Edit event label dialog shows the Volkswagen Golf prediction at 40% confidence and a Forced Label field." width="536" height="462" loading="lazy" style="max-width: 536px"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The label editor shows the original prediction alongside the effective dataset label.</figcaption>
</figure>

## Download or export

Use **Download** to save a ZIP of the dataset, or select **Export to training** on a ready dataset with input files to send examples to Edge Impulse. [Track training exports](/datasets-and-training/training).
