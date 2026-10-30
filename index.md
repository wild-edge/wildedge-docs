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

<div class="agent-setup">
<div>

### Use your agent with WildEdge

Connect Codex, Claude Code, Gemini CLI, ChatGPT, or Claude through MCP. Then ask it to find failed calls or explain a slow run.

[Connect your agent →](/connect-agent)

</div>
</div>

### Start with a problem

| Problem | What to inspect |
| --- | --- |
| [OpenAI or Anthropic calls fail](/what-we-collect#failures) | Provider error codes, HTTP status, and time until failure |
| [llama.cpp responses start slowly](/what-we-collect#latency) | Time to first token, model load time, and quantization |
| [Core ML or TensorFlow Lite slows on some phones](/what-we-collect#device-performance) | Device model, thermal state, memory, and actual accelerator |
| [LiteLLM or OpenRouter costs increase](/what-we-collect#usage-and-cost) | Requested and served models, token use, and reported cost |
| [ONNX Runtime or Transformers results change](/what-we-collect#model-behavior) | Model versions, input measurements, predictions, and feedback |

Available signals depend on the integration. The linked guides explain what to check and where data may be missing.

[Follow an event through its run or trace →](/investigate)

## Resources

### Run an example

| What you are building | Examples |
| --- | --- |
| Local LLM on a desktop or server | [llama.cpp](https://github.com/wild-edge/wildedge-python/blob/main/examples/gguf_example.py), [MLX](https://github.com/wild-edge/wildedge-python/blob/main/examples/mlx_example.py), [Transformers](https://github.com/wild-edge/wildedge-python/blob/main/examples/transformers_example.py) |
| On-device inference on iOS / macOS | [Core ML car scanner](https://github.com/wild-edge/wildedge-swift/tree/main/Examples/CarScannerExample), [ONNX Runtime](https://github.com/wild-edge/wildedge-swift/tree/main/Examples/OnnxExample), [ExecuTorch](https://github.com/wild-edge/wildedge-swift/tree/main/Examples/execuTorchExample) |
| On-device inference on Android | [Image classification](https://github.com/wild-edge/wildedge-android/tree/main/samples/image-classification), [local LLM](https://github.com/wild-edge/wildedge-android/tree/main/samples/local-llm) |
| Remote model calls from Python | [OpenAI](https://github.com/wild-edge/wildedge-python/blob/main/examples/openai_example.py), [Anthropic](https://github.com/wild-edge/wildedge-python/blob/main/examples/anthropic_example.py), [other HTTP APIs](https://github.com/wild-edge/wildedge-python/blob/main/examples/llm_api_example.py) |
| Local and remote models in one pipeline | [Python demo app](https://github.com/wild-edge/python-demo-app) |

### Reference

- **[Telemetry reference](/telemetry):** event types, payload fields, units, and optional content.
- **[Integration coverage](/integration-coverage):** automatic tracking, manual instrumentation, and delivery behavior.

### Configure an integration

- **SDK setup:** [Python, iOS / macOS, and Android](/setup/sdk).
- **Gateway export:** [LiteLLM](/llm-gateways#litellm) or [OpenRouter](/llm-gateways#openrouter).
- **Agent access:** [Connect your AI agent](/connect-agent).
- **HTTP endpoints:** [API reference](https://app.wildedge.dev/api/docs).
