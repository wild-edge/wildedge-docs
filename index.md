---
title: Get started with WildEdge
description: Collect inference telemetry from your app or LLM gateway, with optional capture of model inputs and outputs. Investigate the results in WildEdge or with your AI agent.
---

<div class="docs-intro">

# Get started with WildEdge

Collect inference telemetry from your app or LLM gateway, with optional capture of model inputs and outputs. Investigate the results in WildEdge or with your AI agent.

</div>

- **Try a Python quickstart** to [run a model locally](/quickstart/on-device) or [trace a cloud API call](/quickstart/cloud).
- **Set up telemetry** for [an app](/setup/sdk), [a gateway](/llm-gateways), or [both](/setup/sdk-and-gateway).
- **[Explore the demo](https://wildedge.dev/demo/)** with sample events, traces, and dashboards.

## Where your inference data goes {#how-wildedge-works}

<!--@include: ./parts/product-map.md-->

[Why did this car scan take 16 seconds?](/monitoring/runs#find-the-slow-step-in-a-run)

## Explore your telemetry

[Find an event and follow its trace](/investigate) in WildEdge, or [connect your AI agent](/connect-agent) to investigate through MCP.

| Problem | What to inspect |
| --- | --- |
| [OpenAI or Anthropic calls fail](/what-we-collect#failures) | Provider error codes, HTTP status, and time until failure |
| [llama.cpp responses start slowly](/what-we-collect#latency) | Time to first token, model load time, and quantization |
| [Core ML or TensorFlow Lite slows on some phones](/what-we-collect#device-performance) | Device model, thermal state, memory, and actual accelerator |
| [Gateway costs increase](/what-we-collect#usage-and-cost) | Requested and served models, token use, and reported cost |
| [ONNX Runtime or Transformers results change](/what-we-collect#model-behavior) | Model versions, input measurements, predictions, and feedback |

Available signals depend on the integration. The linked guides explain what to check and where data may be missing.

## Resources

- **[Telemetry reference](/telemetry)** lists event types, payload fields, units, and optional content.
- **[Integration coverage](/integration-coverage)** explains automatic tracking, manual instrumentation, and delivery behavior.
- **[SDK examples](/setup/sdk#run-an-example)** show telemetry in working Python, Swift, and Android apps.
- **[API reference](https://app.wildedge.dev/api/docs)** lists the HTTP endpoints.
