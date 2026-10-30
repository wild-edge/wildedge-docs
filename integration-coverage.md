---
title: Integration coverage
description: Automatic telemetry, manual tracking, captured content, and delivery behavior by collection path.
---

# Integration coverage

The [telemetry reference](/telemetry) lists accepted fields. An integration sends only the fields it can observe. Runtime, provider, SDK version, and configuration determine which values arrive.

## Choose a collection path

| Source | Automatic collection | Additional instrumentation | Limits |
| --- | --- | --- | --- |
| Python SDK | Enabled library integrations record supported model calls and metadata | Manual tracking for unsupported calls, feedback, spans, and attachments | Each adapter covers specific library entry points |
| iOS / macOS SDK | Supported interceptors include ONNX Runtime, ML Kit, and ExecuTorch LLM | Handle APIs for other runtimes and application events | Platform and interceptor support vary |
| Android SDK | Decorated runtime calls record supported inference telemetry | Wrap supported runtimes or use model handles and tracking APIs | Installing the dependency does not instrument every call |
| LiteLLM export | Exported provider calls become inference events | SDK tracking for local calls or application context | Cache hits are not exported. Reported cost is estimated |
| OpenRouter Broadcast | Exported requests become inference events | SDK tracking for local calls or application context | Rejections before routing and failed fallback attempts are not exported |

Gateway exports do not supply the calling device's hardware state or application feedback. SDK and gateway events are not automatically linked into one trace. Disable SDK tracking for cloud calls exported by the gateway if you want one event per call.

## Python library examples

| Integration | Verified behavior | Details |
| --- | --- | --- |
| OpenAI | Chat calls, Responses, and embeddings have dedicated instrumentation. Streaming metadata depends on the API and response | [Streaming](https://github.com/wild-edge/wildedge-python/blob/main/docs/streaming.md) |
| Anthropic | Message calls and native streaming helpers are instrumented | [Streaming](https://github.com/wild-edge/wildedge-python/blob/main/docs/streaming.md) |
| llama.cpp | Completion and chat entry points record inference telemetry. Prompts and replies are not attached automatically | [Examples](https://github.com/wild-edge/wildedge-python/blob/main/examples/gguf_example.py) |
| ONNX Runtime | Supported session calls record inference timing. Input measurements and prediction extraction depend on input and output shape | [Example](https://github.com/wild-edge/wildedge-python/blob/main/examples/onnx_example.py) |
| MLX Whisper and faster-whisper | Model loads and transcriptions are tracked. Audio and transcript attachments require manual tracking | [Whisper guide](https://github.com/wild-edge/wildedge-python/blob/main/docs/whisper.md) |
| Other HTTP clients | `wildedge.llm_api()` records a wrapped call. Supply usage and response metadata through its API | [HTTP tracking](https://github.com/wild-edge/wildedge-python/blob/main/docs/llm_api.md) |

These examples cover Python SDK v0.3.0. They are not a complete list of integrations. Check the [SDK compatibility guide](https://github.com/wild-edge/wildedge-python/blob/main/docs/compatibility.md) before enabling an adapter.

## Mobile runtime support

Use the platform guide for supported entry points and metadata. A runtime name alone does not guarantee hardware, prediction, or content capture support.

- [iOS / macOS SDK](https://github.com/wild-edge/wildedge-swift): interceptor setup, manual model handles, tracing, and examples.
- [Android SDK](https://github.com/wild-edge/wildedge-android): runtime decorators, manual tracking, and examples.

Compare reported device models and accelerators. Do not infer a specific chipset or NPU execution from a generic accelerator value.

## Content capture

Python automatic integrations do not attach raw inputs or outputs. Enabling `attachments_enabled` permits uploads explicitly supplied to `track_inference(attachments=[...])`. Project attachment support must also be enabled.

Other SDKs have their own attachment APIs and settings. Follow the platform guide. Do not assume Python configuration applies to mobile SDKs.

Summaries, attributes, errors, URLs, and custom fields can contain content independently of attachments. See [content and identifiers](/telemetry#content-and-identifiers).

Gateway prompt and response text is not stored by WildEdge. Enable OpenRouter Privacy Mode to avoid sending that content in exports.

## Buffering and delivery

SDK buffering and gateway exporter retries are separate mechanisms.

| Collection path | Behavior |
| --- | --- |
| Python SDK | Configurable batches, flush interval, memory queue, and event age. Offline persistence is enabled by default. Dead-letter persistence is optional |
| Mobile SDKs | Use the platform guide for queue, persistence, and shutdown behavior. Python defaults do not apply |
| Gateway export | WildEdge acknowledges after storage. Exporter retry windows are finite, so an extended outage can lose batches |
| Attachments | File upload is separate from event delivery. A recorded inference does not prove its attachment uploaded |

For Python settings and defaults, see [Configuration](https://github.com/wild-edge/wildedge-python/blob/main/docs/configuration.md). Retryable transmitter failures include HTTP 429, server errors, and network errors. Queue and age limits mean persistence is not an unlimited delivery guarantee.

For gateway retries, duplicate handling, and provider-specific gaps, see [LLM gateways](/llm-gateways#how-retries-work).

## Verify your setup

1. Run one call through each enabled integration.
2. Find the event in the intended project.
3. Check the fields needed for your investigation.
4. If a field is absent, check adapter support before treating it as a model or device issue.

Coverage was checked against the server schema, Python SDK implementation and configuration, Swift v1.1.6 release notes, Android v1.1.0 release changes, and the gateway setup guides. No complete per-field mobile coverage matrix is claimed here.
