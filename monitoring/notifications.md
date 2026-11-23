---
title: Notifications
description: Review groups of failed model calls, inspect the events behind them, and resolve notifications after triage.
---

# Notifications <a class="we-demo-button" href="https://wildedge.dev/demo/wildedge-demolabs/car-classifier/notifications?hours=168" aria-label="Open Notifications in the demo">See Demo</a>

Use Notifications to triage failed model calls in a project. Each failure group shows the model, error code, number of failed calls, and when the first and last failures occurred.

<figure class="workflow-shot">
  <a href="/images/workflows/notifications.jpg"><img src="/images/workflows/notifications.jpg" alt="The Car Classifier project has three unresolved groups, including a network timeout, three HTTP 503 failures, and an IllegalStateException." width="1536" height="580"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The unresolved queue groups failures so you can see which errors occurred more than once and how long they persisted.</figcaption>
</figure>

## Triage a failure group

1. **Review Unresolved.** In the Car Classifier queue, `gemini-flash-latest` returned three `HTTP_503` failures over about 71 minutes. The first and last timestamps give you a window to compare against deployments or provider incidents.
2. **Select View affected events.** In your workspace, this opens [Events](/monitoring/events) scoped to the failure window, failed calls, and the group's model and error code. Open an event to inspect the recorded error and any app, device, or gateway context. Some notifications also have **View latest event** for a direct jump to the last occurrence.
3. **Resolve after review.** Select **Resolve** in your workspace to move the group out of **Unresolved**. Use **Resolved** to revisit previous notifications or **All** to see both statuses.

The public demo shows the queue. Its **View affected events** link opens the general Events view, and **Resolve** is disabled.
