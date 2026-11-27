---
title: Datasets
description: Collect production inferences with their inputs and outputs, review and label them one at a time or in bulk, and export them for evaluation or training. Works for images, audio, video, documents, text, chat and sensor data.
---

# Datasets <a class="we-demo-button" href="https://wildedge.dev/demo/wildedge-demolabs/car-classifier/datasets/car-review-sample?hours=168" aria-label="Open Car review sample in the demo">See Demo</a>

Monitoring tells you that a model is wrong more often than it should be. A dataset shows you the cases where it was wrong.

A dataset is a list of real inferences from your app. Each item holds the input your app gave the model (a photo, a recording, a document, a prompt), what the model answered, and any feedback the user left. You choose which inferences go in, for example every low-confidence prediction from last week, or every answer a user rated thumbs down.

Use a dataset to:

- **See why a model fails.** Look at the inputs behind low confidence or bad feedback, instead of guessing from a chart.
- **Build an evaluation set.** Correct the wrong answers, then test the next model version on the inputs your users actually send.
- **Collect training data.** Export the labelled items to retrain or fine-tune the model.

Items keep their own copy of the event, so a dataset stays complete after the original events expire.

<figure class="workflow-shot">
  <a href="/images/workflows/dataset-detail.jpg"><img src="/images/workflows/dataset-detail.jpg" alt="A car photo dataset shows its row counts, modality, model and device breakdown, three analysis charts and the item table with image thumbnails." width="1536" height="1067"><span class="workflow-shot-open">Open full-size screenshot</span></a>
</figure>

## What a dataset can hold

A dataset accepts any inference event. Each item shows the files and text your app sent with it:

| Content | How it appears |
| --- | --- |
| **Images** | Thumbnail in the table, full view in the item panel. Detection boxes can be shown over the image. |
| **Audio** | Player in the table and the item panel. |
| **Video** | Player in the table and the item panel. |
| **PDF** | Inline document preview. |
| **Text and JSON files** | Inline preview, for prompts, completions, sensor windows or structured outputs. |
| **Chat** | The last user message in the table and the full conversation in the item panel. |
| **Input and output summaries** | Short text your app sent instead of a file. These work without attachment capture. |

An item can have several input and output files, for example a photo with a question, or a voice command with its transcript. Step through them with the arrows on the preview.

<figure class="workflow-shot">
  <a href="/images/workflows/dataset-modalities.jpg"><img src="/images/workflows/dataset-modalities.jpg" alt="Four dataset items: a car photo with a spoken question and its answer, an invoice PDF with the extracted fields, an accelerometer window and a support chat." width="1536" height="1841" loading="lazy"><span class="workflow-shot-open">Open full-size screenshot</span></a>
</figure>

Files need [attachment capture](/datasets-and-training/capture#capture-content-in-your-app). Without it, items show only the event and its summaries.

## Create a dataset

There are three ways to fill a dataset:

- **From Events.** Filter the Event Explorer and select **Add all to dataset**, or add a single event from its details. See [Capture](/datasets-and-training/capture#add-captured-events-to-a-dataset).
- **From a dataset page.** Select **New dataset** in **Datasets** and add events to it later.
- **Through MCP.** An agent connected over [MCP](/mcp) can list datasets and read their items.

Large batches are added in the background. The dataset shows **Adding** while that runs, and you can keep working in it.

<figure class="workflow-shot">
  <a href="/images/workflows/datasets-list.jpg"><img src="/images/workflows/datasets-list.jpg" alt="The dataset list shows cards with item counts, how many items were reviewed, what each dataset was built from and when it changed." width="1536" height="960" loading="lazy"><span class="workflow-shot-open">Open full-size screenshot</span></a>
</figure>

## Find the items to review

- **Analysis charts.** **Confidence distribution**, **Top predictions** and **Feedback signals** show where the model was unsure, what it predicted and how users rated the results. Select a bar to filter the items.
- **Filters.** Narrow by prediction, feedback, confidence, model, device, input modality, event type or who added the item.
- **Search.** Find items by text, label or event ID.
- **Sort.** Order by newest or oldest event, recently added, or least or most confident. **Least confident** is a good place to start reviewing.

Filters, search and sort are kept in the URL, so you can share a filtered view.

## Review items one at a time

Click a row to open it in the item panel. The panel shows the input and output side by side, the label, user feedback, and the event's details. Use **Open in Event Explorer** to see the original event and the run it belongs to.

<figure class="workflow-shot">
  <a href="/images/workflows/dataset-item-panel.jpg"><img src="/images/workflows/dataset-item-panel.jpg" alt="The item panel shows a Mercedes-Benz photo the model predicted as Nissan at 35%, with numbered label choices above it." width="1536" height="1067" loading="lazy"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Sorted by least confident, the first item is a Mercedes-Benz the model read as a Nissan. Press <kbd>5</kbd> to label it and move to the next item.</figcaption>
</figure>

The panel is built for going through items quickly from the keyboard:

| Key | Action |
| --- | --- |
| <kbd>1</kbd>-<kbd>9</kbd> | Set one of the suggested labels and go to the next item |
| <kbd>L</kbd> | Type a new label |
| <kbd>C</kbd> | Clear the label you set |
| <kbd>X</kbd> or <kbd>Delete</kbd> | Remove the item from the dataset and go to the next one |
| <kbd>J</kbd> / <kbd>K</kbd> or the arrow keys | Next or previous item |
| <kbd>Esc</kbd> | Close the panel |

The suggested labels are the most common predictions in the dataset. A label you set replaces the prediction for this item in the dataset and in exports. The original event is not changed, and the panel still shows the prediction next to your label.

Use **Copy link to this item** to send a teammate straight to an item.

## Change many items at once

Select rows with their checkboxes, or use **Select all matching** to select every item that matches the current filters. Then choose **Set label**, **Clear label** or **Remove**. Each change shows a notice with **Undo**.

<figure class="workflow-shot">
  <a href="/images/workflows/dataset-bulk-actions.jpg"><img src="/images/workflows/dataset-bulk-actions.jpg" alt="25 selected items with Select all 64 matching, Set label, Clear label and Remove above the table." width="1536" height="648" loading="lazy"><span class="workflow-shot-open">Open full-size screenshot</span></a>
</figure>

## Download or export

| Option | What you get |
| --- | --- |
| **Download ZIP** | A metadata file per item plus its input files, prepared in your browser. The dialog shows progress, the file types included and any files that could not be downloaded. Up to 128 MB per ZIP. |
| **API access** | A paginated manifest endpoint that returns every item with presigned file URLs, for scripts and training pipelines. |
| **Export to training** | Sends image inputs and their labels to Edge Impulse. [Track training exports](/datasets-and-training/training). |
