---
title: Companies & projects
description: Organize applications and environments into WildEdge projects and connect each one to the right telemetry destination.
---

# Companies & projects <a class="we-demo-button" href="https://wildedge.dev/demo/wildedge-demolabs/empty-demo-app?hours=168" aria-label="Open a new project overview in the demo">See Demo</a>

Your **company** holds your team and billing. A **project** holds the telemetry and settings for an application or environment, including events, runs, dashboards, datasets, and training integrations.

[Sign in to WildEdge](https://app.wildedge.dev/)

## Decide when to create a project

Use one project for each application you investigate independently. If staging and production need separate telemetry, dashboards, or ingestion credentials, give them separate projects, such as `support-bot-staging` and `support-bot-prod`. Use distinct [keys](/administration/keys) for integrations within a project if you need to disable them independently.

## Create a project

1. In WildEdge, open **Projects** from the profile menu or select the company name in the breadcrumb.
2. Confirm you’re in the intended company, then select **Create Project**.
3. Enter a project name and select **Create Project**.
4. In **Overview**, select the app platform or gateway you want to connect. Follow the setup steps with an ingestion key from this project.
5. Send an inference and open [Events](/monitoring/events) to confirm it arrived.

<figure class="workflow-shot">
  <a href="/images/workflows/admin-project-overview.png"><img src="/images/workflows/admin-project-overview.png" alt="A new project Overview is waiting for its first event and offers Python, iOS and macOS, Android, LiteLLM, OpenRouter, and Bifrost setup." width="1440" height="480"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Choose what to connect from the new project’s Overview.</figcaption>
</figure>

The demo opens the Overview of an empty project. Sign in to create a project in your own company.
