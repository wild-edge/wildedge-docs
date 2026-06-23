---
title: Changelog
description: What has changed recently
---

# Changelog

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
</content>
