---
title: Training
description: Track dataset exports to Edge Impulse from your project.
---

# Training

Send a reviewed image dataset to Edge Impulse, then use Training to check which images arrived and which labels the export used.

[Open Training in the demo](https://wildedge.dev/demo/wildedge-demolabs/news-reader/training?hours=168)

<figure class="workflow-shot">
  <a href="/images/workflows/training-export.jpg"><img src="/images/workflows/training-export.jpg" alt="The export history shows completed Edge Impulse jobs and their exported image counts." width="1536" height="552"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The News Reader project shows two completed exports. High-confidence stories sent 8 images with the label Relevant. News review sample sent 15 images using its dataset labels.</figcaption>
</figure>

## Export a dataset

1. In **Training**, select **New training project** and enter the API key for your Edge Impulse project. Check that the integration shows **OK**.
2. Open a ready [dataset with input images](/datasets-and-training/datasets), select **Export to training**, and choose the destination.
3. Leave **Forced label** blank to use the dataset’s labels, including any row-level overrides. Enter a label to apply it to every image in this export.

## Verify the export

Return to **Training** and select **Show jobs** on the destination project.

| Column | What to check |
| --- | --- |
| **Status** | Look for **Done** to confirm the job finished. |
| **Images** | Compare the number of images sent with the job total. |
| **Forced label** | Check whether the job applied one label to all images. A dash indicates the export used dataset labels. |
| **Message** | Read any error or other detail reported by the job. |
