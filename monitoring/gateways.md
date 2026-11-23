---
title: Gateways
description: Track gateway spend, see how requests were routed, and investigate failed provider attempts.
---

# Gateways <a class="we-demo-button" href="https://wildedge.dev/demo/wildedge-demolabs/the-one-with-the-gateway/gateways?hours=168" aria-label="Open Gateways in the demo">See Demo</a>

See what your gateway traffic costs, which model served each route, and whether retries or fallbacks recovered requests. Start with a time range, then open individual provider attempts in Events.

<figure class="workflow-shot">
  <a href="/images/workflows/gateways.jpg"><img src="/images/workflows/gateways.jpg" alt="Seven days of OpenRouter traffic with 128,030 requests, $6,248.71 in spend, and a spike in failures and recoveries on September 24." width="1536" height="1296"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>In this illustrated workload, a spike in failures and recoveries stands out on September 24. The interactive demo uses a different traffic set.</figcaption>
</figure>

## Read the gateway overview

| Section | What it tells you |
| --- | --- |
| **Requests, Failed requests, Spend, p95 Latency** | Compare request volume, failure rate, reported spend, and end-to-end latency across observed attempts. |
| **Request outcomes** | See when requests succeeded on their first observed attempt, recovered after a failed attempt, or had no observed successful attempt. |
| **Failure contributors** | Rank failures by requested model, gateway, and error code. |
| **Routing & recovery** | Compare requested and served models, attempts per request, and latency. |
| **Recent failed requests** | Open **View events** on a row to inspect the provider attempts linked to that request ID. |

## Inspect a failed request

In **Recent failed requests**, select **View events**, open an attempt, and expand **Gateway details**. The example below shows a rate-limited OpenRouter attempt that took 350 ms. The request ID lets you identify the other recorded attempts for the same request when there are any.

<figure class="workflow-shot">
  <a href="/images/workflows/gateways-attempt.jpg"><img src="/images/workflows/gateways-attempt.jpg" alt="Failed OpenRouter provider attempt showing the RATE_LIMITED error, duration, and request ID in Gateway details." width="1536" height="925" loading="lazy"><span class="workflow-shot-open">Open full-size screenshot</span></a>
</figure>

[Open a rate-limited request in the demo](https://wildedge.dev/demo/wildedge-demolabs/the-one-with-the-gateway/events?hours=168&source=gateway&spanRole=provider_attempt&requestId=demo-gateway-request-6) · [Set up gateway monitoring](/llm-gateways)
