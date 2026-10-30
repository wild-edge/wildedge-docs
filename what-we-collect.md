---
title: Telemetry reference
description: Choose telemetry for investigating failures, latency, cost, device issues, and model changes.
---

# Telemetry reference

Use this page to identify which telemetry can help explain a problem. Open **Events** in your project or [connect your AI agent](/connect-agent) to inspect it.

Field availability depends on the SDK, integration, runtime, and provider. The fields below describe supported signals, not a guarantee that every event contains them. A missing value means unknown, not zero.

## Start with the symptom

| Problem | Inspect |
| --- | --- |
| Calls fail or time out | [Failures](#failures) |
| Responses are slow | [Latency](#latency) |
| Token use or cost increases | [Usage and cost](#usage-and-cost) |
| Only some devices struggle | [Device performance](#device-performance) |
| Results change after a release | [Model behavior](#model-behavior) |
| A multi-step run fails | [Runs and traces](#runs-and-traces) |
| You need the original example | [Captured content](#captured-content) |

## Failures

**Applies to:** OpenAI and Anthropic SDK integrations, LiteLLM, and OpenRouter.

Start with the failed inference or error event. Compare the error code, model, and elapsed time before opening the surrounding run.

| Signal | Use it to check |
| --- | --- |
| `success`, `error_code` | Which calls failed and how failures are classified |
| `http_status`, `provider_error_code` | Whether a remote provider rejected the request |
| `duration_ms` | Whether failure was immediate or followed a long wait |
| `error_message`, `stack_trace_hash` | Error details and repeated failures, when supplied |
| `related_event_id` | The event linked to an SDK error |

SDK integrations can report inference failures and separate error events. Gateways report the failures they export. For example, OpenRouter does not export requests rejected before routing. See [gateway limitations](/llm-gateways).

Error text can contain content from your code or a provider. Review what your integration sends before treating error messages as content-free telemetry.

## Latency

**Applies to:** llama.cpp, MLX, Transformers, remote model APIs, and gateway calls.

Separate total call duration from the delay before output starts. For local models, inspect load time and hardware state as well.

| Signal | Use it to check |
| --- | --- |
| `duration_ms` | Total inference duration |
| `time_to_first_token_ms` | Delay before generation starts |
| `tokens_out`, `tokens_per_second` | Output size and generation throughput |
| `model_load` duration | Model startup overhead |
| Span durations | Time spent in tools, retrieval, or other application work |

SDK integrations supply timing supported by the runtime or provider. Gateways supply exported call timing. OpenRouter reports time to first token for streamed and non-streamed calls.

Compare calls with similar models, input sizes, and output sizes. Longer output can increase total duration without indicating slower generation.

## Usage and cost

**Applies to:** LiteLLM and OpenRouter for reported cost. SDK integrations can supply token usage.

Compare usage by requested model and the model that served the call. Check missing prices before interpreting totals.

| Signal | Use it to check |
| --- | --- |
| `tokens_in`, `tokens_out` | Input and output token use |
| `cached_input_tokens`, `reasoning_tokens_out` | Cached input and reasoning usage, when reported |
| `requested_model_id`, `model_name`, `model_provider` | Gateway routing and model selection |
| `reported_cost_amount`, `reported_cost_currency` | Gateway-reported cost |
| `reported_cost_is_estimated` | Whether that cost is an estimate |
| `request_id` | Related gateway attempts, where supported |

The cost fields above come from gateway exports. LiteLLM reports estimated prices. OpenRouter reports the amount charged. Missing cost does not mean a free call. [Gateway fields and query examples](/llm-gateways#_4-query-gateway-events) cover these differences.

If the gateway exports a cloud call, disable SDK tracking for that call to avoid counting it twice. SDK tracking for on-device models and gateway tracking for cloud models do not overlap. See [app and gateway setup](/setup/sdk-and-gateway).

## Device performance

**Applies to:** Core ML, TensorFlow Lite, ONNX Runtime, and other SDK-tracked local runtimes.

Compare device models first. Accelerator values identify execution targets such as CPU or GPU. They do not necessarily identify a chipset or prove that its NPU was used.

Filter by device, app version, and model version. Compare affected devices with devices running the same model successfully.

| Signal | Use it to check |
| --- | --- |
| Device model, OS version, app version | Whether the issue is limited to a device class or release |
| Thermal state and CPU frequency | Whether heat or throttling coincides with slower calls |
| Available memory and memory warnings | Whether memory pressure coincides with failures |
| `accelerator_actual` | Which accelerator ran the inference |
| Model load and unload events | Startup overhead and model eviction |
| Accelerator fallback events | A reported change from the requested accelerator |

These signals require SDK instrumentation and platform support. Gateway exports do not describe the calling device's hardware. A missing fallback event does not prove the requested accelerator was used.

## Model behavior

**Applies to:** ONNX Runtime, Transformers, Core ML, and other integrations that supply model and prediction metadata.

Compare the same task across model versions, app releases, runtimes, and device classes. Use feedback and captured examples to assess whether a change improved results.

| Signal | Use it to check |
| --- | --- |
| Model name, version, format, quantization | Which model configuration changed |
| `resolved_model_id`, `system_fingerprint`, `service_tier` | Provider metadata returned for an SDK-tracked API call |
| Classification labels, confidence, bounding boxes | Changes in predictions, where supplied |
| Image brightness, audio quality, text length and language | Changes in input measurements, where supplied |
| Generation settings and stop reason | Changes in generation configuration or completion behavior |
| Feedback linked to an inference | User acceptance, rejection, or edits |

SDK support varies by integration. Some values require manual tracking. Gateway exports provide call metadata and usage, not the same prediction, input-quality, or feedback signals as SDK instrumentation.

Confidence and input statistics help locate changes. They do not establish whether a prediction was correct. Inspect feedback or examples before drawing that conclusion.

## Runs and traces

Start with one failed or slow event, then follow its run or trace to inspect preceding steps.

| Signal | Use it to check |
| --- | --- |
| `trace_id`, `span_id`, `parent_span_id` | Parent and child relationships |
| `run_id`, `agent_id` | Events associated with an agent run |
| Span name, kind, duration, status | Which application step failed or took time |
| `conversation_id`, `step_index` | Conversation or execution position, when supplied |

SDK correlation depends on the instrumentation and context passed between steps. SDK and gateway events are not automatically linked into one trace.

[Investigate events and traces](/investigate) provides prompts for a first investigation.

## Captured content

Measurements can identify a problem without showing the original input or output. To inspect an example, check whether content was explicitly supplied or capture was enabled for that integration.

| Content | How it reaches WildEdge |
| --- | --- |
| Input or output files | Attachments uploaded separately and referenced by an inference event |
| Span input and output previews | Optional `input_summary` and `output_summary` |
| Custom context | Values supplied in `attributes` |
| Error details | Error messages supplied by your code or integration |

Input and output capture is opt-in. Follow your SDK guide to configure capture or supply attachments. Support and upload limits depend on the integration and project configuration.

WildEdge does not store prompt or response text from gateway traces. For OpenRouter, enable Privacy Mode to avoid including that content in the export.

Review summaries, attributes, error messages, and attachments for sensitive content. Disabling attachments does not remove content supplied in other fields.

## Missing events or fields

1. Confirm that events are going to the intended project.
2. Check that your SDK integration or gateway exports the signal you need.
3. Run one inference and find its event before expanding the time range.
4. Check exporter or SDK logs if the event does not arrive.

Follow [app setup](/setup/sdk) or [gateway troubleshooting](/llm-gateways#troubleshooting) for connection checks. Use the [API reference](https://app.wildedge.dev/api/docs) for endpoint schemas.
