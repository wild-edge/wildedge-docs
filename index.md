---
layout: home
title: Docs | WildEdge
titleTemplate: WildEdge Documentation

hero:
  text: Know where your AI struggles in the real world.

features:
  - icon:
      light: /icons/python-light.svg
      dark: /icons/python-dark.svg
    title: Python
    badge:
      type: tip
      text: Beta
    link: https://pypi.org/project/wildedge-sdk/
    linkText: Get on PyPI
  - icon:
      light: /icons/ios-light.svg
      dark: /icons/ios-dark.svg
    title: iOS / macOS
    badge:
      type: tip
      text: Beta
    link: https://cocoapods.org/pods/WildEdge
    linkText: Get on CocoaPods
  - icon:
      light: /icons/android-light.svg
      dark: /icons/android-dark.svg
    title: Android
    link: https://central.sonatype.com/artifact/dev.wildedge/wildedge-android
    linkText: Get on Maven Central
  - icon:
      light: /icons/linux-light.svg
      dark: /icons/linux-dark.svg
    title: Linux / Embedded
    badge:
      type: warning
      text: Coming Soon
---

## What WildEdge does

See where model behavior changes across releases, runtimes, and devices. Inspect captured inputs, outputs, and feedback, then turn selected examples into datasets for evaluation and training.

WildEdge instruments your inference calls and records what actually happened in production: latency, confidence, drift, hardware and thermal state, and the feedback your users give on each result. Turn on capture and the raw inputs and outputs land next to the event that produced them.

1. **Compare** model behavior across app releases, model versions, runtimes, and device classes
2. **Inspect** the events that went wrong, with their captured inputs, outputs, and user feedback
3. **Build datasets** from selected examples and export them to your evaluation and training pipelines

Capture is opt-in. Leave it off and the SDK sends telemetry only, never raw inputs or outputs.

## Investigate with an AI agent

Connect Claude Code, Codex, Gemini CLI, or ChatGPT to your account through the remote [MCP](https://modelcontextprotocol.io/) server. Ask it to inspect recent inference events, follow a trace, or dig into a failure, without copying data between your browser and your terminal.

- [Connect a coding agent](/mcp) with a personal access token
- [Connect a web agent](/mcp_web) such as ChatGPT or Claude with OAuth

## Integration Guides

| SDK | Setup guide | Integrations |
|---|---|---|
| Python | [Get started](https://github.com/wild-edge/wildedge-python#install) | transformers, mlx, timm, gguf, onnx, ultralytics, tensorflow, torch, keras, openai, anthropic |
| iOS / macOS | [Get started](https://github.com/wild-edge/wildedge-swift#getting-started) | ONNX Runtime, ML Kit, TFLite, ExecuTorch |
| Android | [Get started](https://github.com/wild-edge/wildedge-android#quick-start) | TFLite, ONNX Runtime, ML Kit, LiteRT LLM, Play Services TFLite |

Prefer to read code? Every SDK ships runnable examples: [Python](https://github.com/wild-edge/wildedge-python/tree/main/examples), [Swift](https://github.com/wild-edge/wildedge-swift/tree/main/Examples), [Android](https://github.com/wild-edge/wildedge-android/tree/main/samples). The [demo app](https://github.com/wild-edge/python-demo-app) runs on-device and remote models in one pipeline.

## API Reference

Interactive Swagger docs are also available at [app.wildedge.dev/api/docs](https://app.wildedge.dev/api/docs).
