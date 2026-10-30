---
title: Changelog
description: What has changed recently
---

# Changelog

## October 2026

**Platform**

- Added beta [LLM gateway integrations](/llm-gateways) for LiteLLM and OpenRouter over OpenTelemetry. Inspect model calls, token use, latency, and reported costs without installing an SDK in your app.
- Gateway fields are available in Analytics and through MCP. See the integration guide for reporting differences and beta limitations.
- Added an Events gallery for browsing captured attachments, with more consistent payload details and links to individual run spans.
- Agents can view, build, and edit dashboards through MCP.
- Analytics charts support saved display options and thresholds, with improved bar charts and unit formatting.
- Enabled model error notifications for all projects. Added Monday email summaries, notification preferences, and one-click unsubscribe.
- Dashboard time windows now default to a range based on project activity. Fixed links to run traces outside the selected time range.

**Python SDK [v0.3.0](https://github.com/wild-edge/wildedge-python/releases/tag/v0.3.0)**

- Added local Whisper instrumentation for MLX Whisper and faster-whisper.
- Added OpenAI Responses and embeddings instrumentation, plus Anthropic native streaming helpers.
- Improved stream completion, cancellation, and error reporting across integrations.
- Fixed missing inference events for llama.cpp chat/completion methods and Ultralytics `predict()`.
- Renamed the llama.cpp integration to `llama_cpp`. `gguf` remains an alias.
- Improved model metadata, accelerator detection, and SDK startup behavior.

**iOS / macOS SDK [v1.1.6](https://github.com/wild-edge/wildedge-swift/releases/tag/v1.1.6)**

- Added async tracing with task-local span context, preserved across `await` and inherited by child tasks.
- Run, agent, and trace correlation now extends to model lifecycle events, feedback, errors, and memory warnings.
- Fixed device IDs changing on every launch and made model registration thread-safe.
- Added timed inference tracking, classification output helpers, and model quantization detection from filenames.
- Added `ane`, `mps`, and `vulkan` accelerator values and aligned attachment upload handling with the protocol.
- Expanded the car scanner example with on-device vehicle detection and brand classification, with each scan recorded as one run and trace.
- **Compatibility:** custom `WildEdgeClient` conformers need updated tracing and memory-warning methods. Exhaustive accelerator switches need the new cases. Existing installs receive a new device ID once on upgrade.

## September 2026

**Platform**

- Added [OAuth connections for web agents](/mcp_web), including ChatGPT and Claude.
- Added SQL queries, pagination, and feedback submission through MCP.
- Error rates now include failed model calls, with error-code breakdowns and links to the affected events. Failed API calls retain their duration and provider error details.
- Added model error notification rules by model, version, and error code.
- Improved model health comparisons, bar charts, and bounding-box overlays.
- Event and attachment details are directly linkable, and attachments are available in trace views.
- Refreshed project lists and mobile layouts, improved loading and network-error states, and fixed dataset list and rename issues.

**Python SDK [v0.2.2](https://github.com/wild-edge/wildedge-python/releases/tag/v0.2.2)**

- Failed remote calls record HTTP status, provider error codes, and elapsed time, with distinct timeout and connection errors.
- Fixed Anthropic model format reporting.

**Python SDK [v0.2.1](https://github.com/wild-edge/wildedge-python/releases/tag/v0.2.1)**

- Documented recognized LLM providers and OpenAI-compatible endpoints, with provider documentation included in release documentation assets.

## August 2026

**Platform**

- Added a guided MCP connection flow and clearer personal access token creation.
- Published [coding-agent connection instructions](/mcp).
- Fixed event lookup for manually added dataset items.

## July 2026

**Platform**

- Introduced remote MCP access, including separate read and write permissions and tools for working with your WildEdge account.
- Added dataset creation from the event explorer and dataset label overrides.
- Added an Edge Impulse training integration with export checks.
- Improved trace timelines and inference-call views.
- Added invitation deletion and resending.

**Python SDK [v0.2.0](https://github.com/wild-edge/wildedge-python/releases/tag/v0.2.0)**

- Added provider-agnostic `wildedge.llm_api()` tracking for calls made with any HTTP client, including asynchronous calls and time to first token.
- Expanded provider recognition for OpenAI-compatible endpoints.
- Added module-level tracing APIs and a shared default client for CLI and application instrumentation.
- Added end-to-end connectivity checks with `wildedge doctor --send-test-event` and stricter startup options.
- Releases now include version-specific `llms.txt` and `llms-full.txt` documentation assets.

**Android SDK [v1.1.0](https://github.com/wild-edge/wildedge-android/releases/tag/v1.1.0)**

- Added inference attachments with configurable storage and buffered upload.
- Added typed `GenerationConfig` and `ApiMeta` for generation settings and remote model response metadata.
- Added queue memory and serialized-size diagnostics, plus configurable gzip compression.
- Added a car scanner sample with Gemini and OpenRouter, and an on-device ExecuTorch LLM sample.

## June 2026

**Platform**

- Build your own dashboards from saved charts, with configurable presentation options.
- Analytics and the SQL view are now one page. New query engine, faster charts.
- Added model list and per-model quality pages.
- Cleaner project key management and project list.
- Published a benchmarks blog post.

**Python SDK [v0.1.5](https://github.com/wild-edge/wildedge-python/releases/tag/v0.1.5)** (Jun 23)

- Added inference attachments.
- Added macOS CPU frequency and thermal sampling.
- Fixed `accelerator_actual` wiring.

**iOS / macOS SDK [v1.1.0](https://github.com/wild-edge/wildedge-swift/releases/tag/v1.1.0)** (Jun 9)

- Zero-code ExecuTorch LLM interceptor. No code changes in your app.
- New telemetry types: `GenerationConfig` and `ApiMeta`.
- Gzip compression for event batches.
- Added `SDKDiagnostics` (memory, queue size, serialization time).
- `app_version` is auto-detected from the host bundle.
- New LLaMA.cpp and ExecuTorch example apps.
- Inference duration on ONNX paths now reports ML time, not recording length.

## May 2026

**Platform**

- Datasets: register Iceberg-backed datasets, curate and bulk-manage them, and download a prepared zip.
- Dataset analytics with feedback correlation.
- Filter events by geography (IP-based), modality, quantization, model format, error code, app version, and device model.
- Clickable and multi-bar histogram selection. Infinite scroll on Events and Traces.
- Inference attachments: presigned upload, access API, per-period quotas, and billing.
- Self-managed companies, full project settings, team roles, and a refreshed auth flow with suspicious-login handling.
- Classifier analytics now use top-1 confidence instead of average confidence.

## April 2026

**Platform**

- iOS and Android SDKs in the getting started flow.
- Hardware page with per-device performance, thermals, and accelerator info.
- Component-based traces.
- SQL assistant for querying telemetry with your own model.
- Clearer ingest error messages. Model version is now optional on ingest.

**Android SDK [v1.0.0](https://central.sonatype.com/artifact/dev.wildedge/wildedge-android)** (Apr 30)

- First release on Maven Central. See the [setup guide](https://github.com/wild-edge/wildedge-android).

**iOS / macOS SDK [v1.0.11](https://github.com/wild-edge/wildedge-swift/releases/tag/v1.0.11)** (Apr 29)

- Maintenance release.

**iOS / macOS SDK [v1.0.0](https://cocoapods.org/pods/WildEdge)** (Apr 27)

- First release on CocoaPods. See the [setup guide](https://github.com/wild-edge/wildedge-swift).

**Python SDK [v0.1.4](https://github.com/wild-edge/wildedge-python/releases/tag/v0.1.4)** (Apr 20)

- Anthropic SDK integration, with an example using a Haiku model.
- Moved to the production license.

## March 2026

**Python SDK [v0.1.3](https://github.com/wild-edge/wildedge-python/releases/tag/v0.1.3)** (Mar 31)

- Agentic workflow monitoring.
- TTFT support for remote LLM and GGUF integrations.

**Python SDK [v0.1.2](https://github.com/wild-edge/wildedge-python/releases/tag/v0.1.2)** (Mar 23)

- More Pythonic SDK init.
- A missing DSN now turns the client into a no-op.

**Python SDK [v0.1.0](https://pypi.org/project/wildedge-sdk/)** (Mar 17)

- First release on PyPI. See the [setup guide](https://github.com/wild-edge/wildedge-python).
