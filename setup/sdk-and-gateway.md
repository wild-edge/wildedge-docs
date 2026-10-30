---
title: Set up app and gateway telemetry
---
# Set up app and gateway telemetry

Use both when your application runs models itself and also sends remote calls through an LLM gateway. Decide which source records each call before enabling telemetry.

::: tip Avoid duplicate cloud events
If your gateway exports cloud model calls, disable SDK tracking for those calls to avoid counting them twice. Keep SDK tracking enabled for on-device models and calls the gateway does not export.

SDK tracking for on-device models and gateway tracking for cloud models do not overlap.
:::

## 1. Decide which source records each call

For apps with local and remote inference:

| Inference path | Record with |
| --- | --- |
| On-device or local model | WildEdge SDK |
| Remote model through LiteLLM or OpenRouter | Gateway export |

Enable only the SDK integrations that cover calls your gateway does not already record.

For example, in Python, enable only the llama.cpp integration:

```sh
wildedge run --integrations llama_cpp
```

`wildedge run` enables every integration by default, including OpenAI and Anthropic. Do not leave those enabled for calls that your gateway also exports. For other platforms, configure SDK tracking so it does not record calls exported by the gateway.

## 2. Configure both sources

1. Follow [Set up app telemetry](/setup/sdk) for your application's platform.
2. Follow [Set up gateway telemetry](/llm-gateways) for LiteLLM or OpenRouter.
3. Use the same WildEdge project if you want to inspect both sources there, with separate project keys so you can revoke either independently.

SDK capture is opt-in. WildEdge does not store prompt or response text from gateway traces.

## 3. Verify each inference path

Run one local inference and one remote request through the gateway. Open **Events** in your project and confirm that each path produces its expected event. Gateway events populate the `gateway` field. SDK events leave it empty.

Check that each cloud call exported by the gateway produces one event. If the SDK also records it, disable SDK tracking for that call.

## Next: investigate

[Connect your AI agent](/connect-agent) and ask it to inspect local and gateway events separately. Do not expect a single linked trace across both sources.
