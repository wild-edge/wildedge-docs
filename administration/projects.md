---
title: Companies & projects
description: Organize applications and environments into WildEdge projects and connect each one to the right telemetry destination.
---

# Companies & projects

Your **company** holds your team and billing. A **project** holds the telemetry and settings for an application or environment, including events, runs, dashboards, datasets, and training integrations.

[Explore Projects in the demo](https://wildedge.dev/demo/wildedge-demolabs/projects?hours=168) · [Sign in to WildEdge](https://app.wildedge.dev/)

<figure class="workflow-shot">
  <a href="/images/workflows/admin-projects.jpg"><img src="/images/workflows/admin-projects.jpg" alt="WildEdge DemoLabs Projects view showing four applications, their last event status, and a setup link for the empty project." width="1536" height="570"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>The Projects view shows which apps are sending telemetry and which are waiting for their first event.</figcaption>
</figure>

## Decide when to create a project

Use one project for each application you investigate independently. If staging and production need separate telemetry, dashboards, or ingestion credentials, give them separate projects, such as `support-bot-staging` and `support-bot-prod`. Use distinct [keys](/administration/keys) for integrations within a project if you need to disable them independently.

## Create a project

1. In WildEdge, open **Projects** from the profile menu or select the company name in the breadcrumb.
2. Confirm you’re in the intended company, then select **Create Project**.
3. Enter a project name and select **Create Project**.
4. Connect your [app or gateway](/setup/sdk-and-gateway) with an ingestion key from the new project. Open [Events](/monitoring/events) to confirm its first event arrived.

The demo lets you browse existing projects. Create projects after signing in to your own company.
