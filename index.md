---
layout: home
title: Docs | WildEdge
titleTemplate: WildEdge Documentation

hero:
  name: WildEdge
  text: Know where your AI struggles in the real world.
  tagline: See where model behavior changes across releases, runtimes, and devices. Inspect captured inputs, outputs, and feedback, then turn selected examples into datasets for evaluation and training.

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

WildEdge instruments your inference calls and records what actually happened in production: latency, confidence, drift, hardware and thermal state, and the feedback your users give on each result. Turn on capture and the raw inputs and outputs land next to the event that produced them.

1. **Compare** model behavior across app releases, model versions, runtimes, and device classes
2. **Inspect** the events that went wrong, with their captured inputs, outputs, and user feedback
3. **Build datasets** from selected examples and export them to your evaluation and training pipelines

Capture is opt-in. Leave it off and the SDK sends telemetry only, never raw inputs or outputs.

## Integration Guides

**Integration guides coming.** SDK-specific setup guides, code examples, and platform walkthroughs are on the way. Until then, browse our repositories and integration examples on [GitHub](https://github.com/wild-edge).

## Remote MCP

Connect an AI agent directly to your Wild Edge account through the remote MCP server.

- [Connect a coding agent with a personal access token](/mcp)
- [Connect a web agent such as ChatGPT or Claude with OAuth](/mcp_web)

## API Reference

Interactive Swagger docs are also available at [app.wildedge.dev/api/docs](https://app.wildedge.dev/api/docs).
