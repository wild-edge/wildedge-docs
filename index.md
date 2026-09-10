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
    details: On-device and remote models, plus traces for agent pipelines. Wrap an existing command with the CLI, or call the SDK directly.
    link: https://github.com/wild-edge/wildedge-python#install
    linkText: Set up Python
  - icon:
      light: /icons/ios-light.svg
      dark: /icons/ios-dark.svg
    title: iOS / macOS
    badge:
      type: tip
      text: Beta
    details: Zero-code interception for common runtimes, or track model loads and inferences explicitly.
    link: https://github.com/wild-edge/wildedge-swift#getting-started
    linkText: Set up iOS / macOS
  - icon:
      light: /icons/android-light.svg
      dark: /icons/android-dark.svg
    title: Android
    details: Decorate your interpreter, or wire the SDK up from the manifest and let it track for you.
    link: https://github.com/wild-edge/wildedge-android#quick-start
    linkText: Set up Android
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

## Examples

Every SDK ships runnable examples: [Python](https://github.com/wild-edge/wildedge-python/tree/main/examples), [Swift](https://github.com/wild-edge/wildedge-swift/tree/main/Examples), [Android](https://github.com/wild-edge/wildedge-android/tree/main/samples).

The [demo app](https://github.com/wild-edge/python-demo-app) runs on-device and remote models in one pipeline, so you can watch the whole loop before wiring up your own.

## API Reference

Interactive Swagger docs are also available at [app.wildedge.dev/api/docs](https://app.wildedge.dev/api/docs).
