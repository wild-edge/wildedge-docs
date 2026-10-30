---
title: Get started with WildEdge
description: Collect inference telemetry from your app or LLM gateway, then investigate it in WildEdge or with your AI agent.
---

<div class="docs-intro">
<div class="eyebrow">GET STARTED</div>

# Get started with WildEdge

Collect inference telemetry from your app or LLM gateway, then investigate it in WildEdge or with your AI agent.

</div>

## 1. Choose where to collect telemetry

<div class="setup-grid">
<a class="setup-card" href="/setup/sdk"><span class="card-number">01 / APPLICATION</span><h3>App only</h3><p>Instrument inference calls in your application, including on-device models.</p><span class="card-meta">Python · iOS / macOS · Android</span><strong>Set up app telemetry →</strong></a>
<a class="setup-card" href="/llm-gateways"><span class="card-number">02 / GATEWAY</span><h3>Gateway only</h3><p>Record model calls through your gateway without changing your app.</p><span class="card-meta">LiteLLM · OpenRouter · Beta</span><strong>Set up gateway telemetry →</strong></a>
<a class="setup-card" href="/setup/sdk-and-gateway"><span class="card-number">03 / BOTH</span><h3>App + gateway</h3><p>Record local inference with the SDK and remote calls with the gateway.</p><span class="card-meta">On-device + remote inference</span><strong>Set up both →</strong></a>
</div>

Each setup guide ends with a check that your first inference event has arrived.

## 2. Investigate your data

<div class="next-step">
<div><span class="eyebrow">ALREADY SENDING EVENTS?</span><h3>Connect your AI agent</h3><p>Inspect events, follow traces, and investigate failures with your agent.</p></div>
<a href="/connect-agent">Choose your agent →</a>
</div>

You can also open **Events** in [WildEdge](https://app.wildedge.dev/) to inspect the telemetry yourself. For a first investigation, follow [Investigate events and traces](/investigate).

## Resources

- **Runnable examples:** [Python](https://github.com/wild-edge/wildedge-python/tree/main/examples), [Swift](https://github.com/wild-edge/wildedge-swift/tree/main/Examples), [Android](https://github.com/wild-edge/wildedge-android/tree/main/samples).
- **Demo app:** run on-device and remote models in [one example pipeline](https://github.com/wild-edge/python-demo-app).
- **API reference:** browse the [interactive API docs](https://app.wildedge.dev/api/docs).
