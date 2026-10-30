---
title: Telemetry reference
description: Accepted telemetry events, payload fields, types, units, and optional content.
---

# Telemetry reference

This page describes the SDK batch payload accepted by the ingest API. It does not promise that every SDK or integration records every field. See [Integration coverage](/integration-coverage) for collection paths and [Troubleshooting guide](/what-we-collect) to choose signals for a problem.

Field paths here are payload paths. Analytics exposes a flattened representation, so SQL column names can differ. For example, payload `inference.output_meta.tokens_in` is queried as `tokens_in`. See the [API reference](https://app.wildedge.dev/api/docs) for request constraints and [gateway guide](/llm-gateways) for mapped gateway columns.

## Event types

| Event | Payload block | Meaning |
| --- | --- | --- |
| `model_download` | `download` | Model weight transfer |
| `model_load` | `load` | Model initialization |
| `inference` | `inference` | One model invocation |
| `model_unload` | `unload` | Model release |
| `feedback` | `feedback` | Feedback linked to an inference |
| `error` | `error` | A reported error |
| `span` | `span` | A timed application step |

The batch validator requires the corresponding payload block. Every event except `span` requires a `model_id` present in the batch model registry. A span may omit `model_id`.

`memory_warning`, `accelerator_fallback`, and `context_truncation` are not accepted standalone event types in the current batch API. Do not assume SDK APIs or protocol proposals imply server support for those event types.

## Reading the field tables

- **Required** means required by the ingest schema, not automatically collected.
- **Optional** fields can be omitted or null. Treat missing measurements as unknown.
- `int` is an integer, `float` is numeric, and `bool` is true or false. Arrays use `list[...]`.
- Durations ending in `_ms` use milliseconds. Sizes ending in `_bytes` use bytes. CPU frequencies use MHz. Temperatures use Celsius.
- Nested blocks have their own tables below. Their field names are relative to that block.

## Batch envelope

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `protocol_version` | `str` | Required | Protocol version. |
| `device` | `DeviceInfoSchema` | Required | Nested payload. See the corresponding table. |
| `models` | `dict[str, ModelRegistryEntrySchema]` | Required | Nested payload. See the corresponding table. |
| `session_id` | `str` | Required | SDK session identifier. |
| `batch_id` | `str` | Required | Batch id. |
| `created_at` | `str` | Required | ISO 8601 batch creation time. |
| `sent_at` | `str` | Required | ISO 8601 batch send time. |
| `events` | `list[EventSchema]` | Required | Nested payload. See the corresponding table. |

## Event envelope

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `event_id` | `str` | Required | Event id. |
| `event_type` | `str` | Required | Event type. |
| `timestamp` | `str` | Required | ISO 8601 event time. |
| `model_id` | `str` | Optional | Key into the batch model registry. |
| `trace_id` | `str` | Optional | Trace id. |
| `span_id` | `str` | Optional | Span id. |
| `parent_span_id` | `str` | Optional | Parent span id. |
| `run_id` | `str` | Optional | Run id. |
| `agent_id` | `str` | Optional | Agent id. |
| `step_index` | `int` | Optional | Step index. |
| `conversation_id` | `str` | Optional | Conversation id. |
| `attributes` | `object` | Optional | Flat scalar map. Nested objects and arrays are rejected. Event and span attributes share a configured size limit. |
| `gateway` | `str` | Optional | Gateway. |
| `telemetry` | `TelemetryContextSchema` | Optional | Nested payload. See the corresponding table. |
| `service` | `ServiceContextSchema` | Optional | Nested payload. See the corresponding table. |
| `request_id` | `str` | Optional | Request id. |
| `requested_model_id` | `str` | Optional | Requested model id. |
| `span_role` | `string enum` | Optional | gateway_request, provider_attempt, or internal. Role constraints apply. |
| `reported_cost` | `ReportedCostSchema` | Optional | Gateway-reported amount and provenance. Not a universal SDK price calculation. |
| `cache_hit` | `bool` | Optional | Cache hit. |
| `retry_of_span_id` | `str` | Optional | Provider-attempt reference. Requires trace_id and span_id. |
| `fallback_of_span_id` | `str` | Optional | Provider-attempt reference. Requires trace_id and span_id. |
| `download` | `DownloadEventDataSchema` | Optional | Nested payload. See the corresponding table. |
| `load` | `LoadEventDataSchema` | Optional | Nested payload. See the corresponding table. |
| `inference` | `InferenceEventDataSchema` | Optional | Nested payload. See the corresponding table. |
| `unload` | `UnloadEventDataSchema` | Optional | Nested payload. See the corresponding table. |
| `feedback` | `FeedbackEventDataSchema` | Optional | Nested payload. See the corresponding table. |
| `error` | `ErrorEventDataSchema` | Optional | Nested payload. See the corresponding table. |
| `span` | `SpanEventDataSchema` | Optional | Nested payload. See the corresponding table. |
| `attachments` | `list[AttachmentRefSchema]` | Optional | Nested payload. See the corresponding table. |
| `custom` | `object` | Optional | Custom JSON. Review supplied values for sensitive content. |

## Device metadata

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `device_id` | `str` | Required | Identifier supplied by the SDK. Generation and hashing depend on the SDK. |
| `device_type` | `str` | Required | android, ios, linux, windows, macos, or embedded. |
| `device_model` | `str` | Optional | Device model. |
| `os_version` | `str` | Optional | Os version. |
| `app_version` | `str` | Optional | App version. |
| `sdk_version` | `str` | Optional | Sdk version. |
| `locale` | `str` | Optional | Locale. |
| `timezone` | `str` | Optional | Timezone. |
| `cpu_arch` | `str` | Optional | Cpu arch. |
| `cpu_cores` | `int` | Optional | Cpu cores. |
| `ram_total_bytes` | `int` | Optional | Bytes. |
| `disk_total_bytes` | `int` | Optional | Bytes. |
| `accelerators` | `list[str]` | Optional | Accelerators. |
| `gpu_name` | `str` | Optional | Gpu name. |

## Model registry

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `model_name` | `str` | Required | Model name. |
| `model_family` | `str` | Optional | Model family. |
| `model_version` | `str` | Optional | Model version. |
| `model_source` | `str` | Required | huggingface|local|mlkit|coreml|openai|openrouter|anthropic|google|api|custom |
| `model_format` | `str` | Required | onnx|tflite|coreml|gguf|pytorch|safetensors|api |
| `quantization` | `str` | Optional | f32|f16|int8|q4_0|q4_k_m|q8_0|none |
| `provider` | `str` | Optional | Provider. |

## Inference

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `inference_id` | `str` | Required | Identifier for the inference. |
| `duration_ms` | `int` | Required | Elapsed time in milliseconds. |
| `input_modality` | `str` | Optional | image|audio|text|multimodal|structured |
| `output_modality` | `str` | Optional | Output modality. |
| `input_meta` | `InputMetaSchema` | Optional | Nested payload. See the corresponding table. |
| `output_meta` | `OutputMetaSchema` | Optional | Nested payload. See the corresponding table. |
| `generation_config` | `GenerationConfigSchema` | Optional | Nested payload. See the corresponding table. |
| `hardware` | `HardwareContextSchema` | Optional | Nested payload. See the corresponding table. |
| `api_meta` | `ApiMetaSchema` | Optional | Nested payload. See the corresponding table. |
| `success` | `bool` | Required | Outcome reported by the producer. |
| `error_code` | `str` | Optional | Error code. |

## Input measurements

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `width` | `int` | Optional | Width. |
| `height` | `int` | Optional | Height. |
| `channels` | `int` | Optional | Channels. |
| `format` | `str` | Optional | Format. |
| `source` | `str` | Optional | Source. |
| `histogram_summary` | `HistogramSummarySchema` | Optional | Nested payload. See the corresponding table. |
| `duration_ms` | `int` | Optional | Elapsed time in milliseconds. |
| `sample_rate` | `int` | Optional | Audio sample rate in Hz. |
| `bit_depth` | `int` | Optional | Bit depth. |
| `codec` | `str` | Optional | Codec. |
| `is_streaming` | `bool` | Optional | Is streaming. |
| `snr_db` | `float` | Optional | Snr db. |
| `volume_db` | `float` | Optional | Volume db. |
| `speech_ratio` | `float` | Optional | Speech ratio. |
| `clipping_detected` | `bool` | Optional | Clipping detected. |
| `char_count` | `int` | Optional | Char count. |
| `word_count` | `int` | Optional | Word count. |
| `token_count` | `int` | Optional | Token count. |
| `language` | `str` | Optional | Language. |
| `language_confidence` | `float` | Optional | Language confidence. |
| `encoding` | `str` | Optional | Encoding. |
| `contains_code` | `bool` | Optional | Contains code. |
| `prompt_type` | `str` | Optional | Prompt type. |
| `turn_index` | `int` | Optional | Turn index. |

## Image statistics

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `brightness_mean` | `float` | Optional | Brightness mean. |
| `brightness_stddev` | `float` | Optional | Brightness stddev. |
| `brightness_buckets` | `list[int]` | Optional | Brightness buckets. |
| `contrast` | `float` | Optional | Contrast. |
| `saturation_mean` | `float` | Optional | Saturation mean. |
| `blur_score` | `float` | Optional | Blur score. |
| `noise_score` | `float` | Optional | Noise score. |

## Output measurements

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `task` | `str` | Optional | Task. |
| `num_predictions` | `int` | Optional | Num predictions. |
| `top_k` | `list[TopKPredictionSchema]` | Optional | Nested payload. See the corresponding table. |
| `avg_confidence` | `float` | Optional | Avg confidence. |
| `tokens_in` | `int` | Optional | Tokens in. |
| `tokens_out` | `int` | Optional | Tokens out. |
| `cached_input_tokens` | `int` | Optional | Cached input tokens. |
| `cache_write_input_tokens` | `int` | Optional | Nonnegative integer. |
| `reasoning_tokens_out` | `int` | Optional | Reasoning tokens out. |
| `time_to_first_token_ms` | `int` | Optional | Milliseconds. |
| `tokens_per_second` | `float` | Optional | Tokens per second. |
| `stop_reason` | `str` | Optional | Stop reason. |
| `context_used` | `int` | Optional | Context used. |
| `avg_token_entropy` | `float` | Optional | Avg token entropy. |
| `safety_triggered` | `bool` | Optional | Safety triggered. |
| `dimensions` | `int` | Optional | Dimensions. |
| `mask_width` | `int` | Optional | Mask width. |
| `mask_height` | `int` | Optional | Mask height. |
| `num_classes` | `int` | Optional | Num classes. |

## Predictions

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `label` | `str` | Required | Label. |
| `confidence` | `float` | Optional | detection/classification confidence |
| `bbox` | `list[int]` | Optional | [x_min, y_min, x_max, y_max] in input or mask coordinates. |
| `coverage_ratio` | `float` | Optional | Fraction of pixels assigned to the class. |

## Generation settings

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `temperature` | `float` | Optional | Temperature. |
| `top_p` | `float` | Optional | Top p. |
| `top_k` | `int` | Optional | Top k. |
| `max_tokens` | `int` | Optional | Max tokens. |
| `repetition_penalty` | `float` | Optional | Repetition penalty. |
| `frequency_penalty` | `float` | Optional | Frequency penalty. |
| `presence_penalty` | `float` | Optional | Presence penalty. |
| `seed` | `int` | Optional | Seed. |
| `stop_sequences_count` | `int` | Optional | Stop sequences count. |

## Hardware snapshot

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `thermal` | `ThermalContextSchema` | Optional | Nested payload. See the corresponding table. |
| `battery_level` | `float` | Optional | Fraction from 0 to 1. |
| `battery_charging` | `bool` | Optional | Battery charging. |
| `memory_available_bytes` | `int` | Optional | Bytes. |
| `cpu_freq_mhz` | `int` | Optional | MHz. |
| `cpu_freq_max_mhz` | `int` | Optional | MHz. |
| `accelerator_actual` | `str` | Optional | Reported execution target. Not a chipset identifier or proof of a fallback. |

## Thermal snapshot

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `state` | `str` | Optional | nominal|fair|serious|critical |
| `state_raw` | `str` | Optional | platform-native value |
| `cpu_temp_celsius` | `float` | Optional | Degrees Celsius. |

## Provider metadata

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `resolved_model_id` | `str` | Optional | Resolved model id. |
| `system_fingerprint` | `str` | Optional | System fingerprint. |
| `service_tier` | `str` | Optional | Service tier. |
| `requested_model_id` | `str` | Optional | Requested model id. |

## Model download

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `source_url` | `str` | Required | Download source. URLs may contain application-supplied content. |
| `source_type` | `str` | Required | huggingface|s3|gcs|azure|cdn|local_server |
| `file_size_bytes` | `int` | Required | Bytes. |
| `downloaded_bytes` | `int` | Required | Bytes. |
| `duration_ms` | `int` | Required | Elapsed time in milliseconds. |
| `bandwidth_bps` | `int` | Optional | Transfer rate in bits per second. |
| `network_type` | `str` | Required | wifi|cellular|ethernet|unknown |
| `network_generation` | `str` | Optional | Network generation. |
| `resumed` | `bool` | Required | Resumed. |
| `resume_offset_bytes` | `int` | Optional | Bytes. |
| `retry_count` | `int` | Optional | Retry count. |
| `cache_hit` | `bool` | Required | Cache hit. |
| `checksum_verified` | `bool` | Optional | Checksum verified. |
| `checksum_algorithm` | `str` | Optional | Checksum algorithm. |
| `decompression_time_ms` | `int` | Optional | Milliseconds. |
| `storage_type` | `str` | Optional | Storage type. |
| `storage_available_bytes` | `int` | Optional | Bytes. |
| `http_status` | `int` | Optional | Http status. |
| `cdn_edge` | `str` | Optional | Cdn edge. |
| `success` | `bool` | Required | Outcome reported by the producer. |
| `error_code` | `str` | Optional | Error code. |
| `adapter` | `AdapterDownloadSchema` | Optional | Nested payload. See the corresponding table. |

## Download adapter

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `adapter_id` | `str` | Required | Adapter id. |
| `adapter_type` | `str` | Required | lora|qlora|ia3|prefix|full_finetune |
| `for_base_model` | `str` | Required | For base model. |
| `rank` | `int` | Optional | Rank. |

## Model load

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `duration_ms` | `int` | Required | Elapsed time in milliseconds. |
| `memory_bytes` | `int` | Optional | Bytes. |
| `peak_memory_bytes` | `int` | Optional | Bytes. |
| `memory_mapped` | `bool` | Optional | Memory mapped. |
| `accelerator` | `str` | Required | Requested execution target. |
| `gpu_layers` | `int` | Optional | Gpu layers. |
| `threads` | `int` | Optional | Threads. |
| `context_length` | `int` | Optional | Context length. |
| `kv_cache_bytes` | `int` | Optional | Bytes. |
| `kv_cache_quantization` | `str` | Optional | Kv cache quantization. |
| `flash_attention` | `bool` | Optional | Flash attention. |
| `rope_scaling` | `str` | Optional | Rope scaling. |
| `cold_start` | `bool` | Optional | Cold start. |
| `compile_time_ms` | `int` | Optional | Milliseconds. |
| `adapter` | `AdapterLoadSchema` | Optional | Nested payload. See the corresponding table. |
| `success` | `bool` | Required | Outcome reported by the producer. |
| `error_code` | `str` | Optional | Error code. |

## Load adapter

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `adapter_id` | `str` | Required | Adapter id. |
| `adapter_type` | `str` | Required | Adapter type. |
| `adapter_source` | `str` | Optional | Adapter source. |
| `size_bytes` | `int` | Optional | Bytes. |
| `rank` | `int` | Optional | Rank. |
| `alpha` | `int` | Optional | Alpha. |
| `target_modules` | `list[str]` | Optional | Target modules. |
| `load_duration_ms` | `int` | Optional | Milliseconds. |

## Model unload

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `duration_ms` | `int` | Required | Elapsed time in milliseconds. |
| `reason` | `str` | Required | explicit|memory_pressure|app_background|session_end|thermal |
| `memory_freed_bytes` | `int` | Optional | Bytes. |
| `peak_memory_bytes` | `int` | Optional | Bytes. |
| `uptime_ms` | `int` | Optional | how long the model was loaded |

## Feedback

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `related_inference_id` | `str` | Required | Related inference id. |
| `feedback_type` | `str` | Required | accept|reject|undo|edit|thumbs_up|thumbs_down|report |
| `delay_ms` | `int` | Optional | Milliseconds. |
| `edit_distance` | `int` | Optional | Edit distance. |

## Error

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `error_code` | `str` | Required | Error code. |
| `error_message` | `str` | Optional | Optional text. May contain application or provider content. |
| `stack_trace_hash` | `str` | Optional | Stack trace hash. |
| `related_event_id` | `str` | Optional | Related event id. |
| `http_status` | `int` | Optional | Http status. |
| `provider_error_code` | `str` | Optional | e.g. insufficient_quota |
| `duration_ms` | `int` | Optional | Elapsed time in milliseconds. |

## Span

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `kind` | `str` | Required | agent_step|tool|retrieval|memory|router|guardrail|cache|eval|custom |
| `name` | `str` | Required | Name. |
| `duration_ms` | `int` | Required | Elapsed time in milliseconds. |
| `status` | `str` | Required | ok|error |
| `input_summary` | `str` | Optional | Optional content preview. Rejected if it exceeds the configured length limit. |
| `output_summary` | `str` | Optional | Optional content preview. Rejected if it exceeds the configured length limit. |
| `attributes` | `object` | Optional | Flat scalar map. Nested objects and arrays are rejected. Event and span attributes share a configured size limit. |

## Attachment reference

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `attachment_id` | `str` | Required | Attachment id. |
| `role` | `str` | Required | input|output |
| `content_type` | `str` | Required | Content type. |

## Telemetry source

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `source` | `string enum` | Required | Source. |
| `mapping_version` | `str` | Optional | Mapping version. |
| `emitter_version` | `str` | Optional | Emitter version. |

## Service identity

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `name` | `str` | Optional | Name. |
| `namespace` | `str` | Optional | Namespace. |
| `instance_id` | `str` | Optional | Instance id. |
| `deployment_environment` | `str` | Optional | Deployment environment. |
| `cloud_region` | `str` | Optional | Cloud region. |

## Reported cost

| Field | Type | Presence | Meaning or unit |
| --- | --- | --- | --- |
| `amount` | `str` | Required | Nonnegative decimal text. Up to 10 integral and 10 fractional digits. |
| `currency` | `str` | Required | Three uppercase letters, for example USD. |
| `source` | `str` | Required | Source. |
| `scope` | `string enum` | Required | attempt or request. Must match the span role. |
| `is_estimated` | `bool` | Optional | Is estimated. |

## Content and identifiers

Input measurements such as token count, image size, or brightness are metadata. Labels, URLs, errors, attributes, summaries, custom JSON, and attachments can contain content. Do not treat telemetry as inherently free of personal or application data.

Attachments upload separately. Events carry their references, not file bytes. See [Captured content](/what-we-collect#captured-content) for collection controls.

Device identity behavior varies by SDK and version. Do not infer a universal hashing or cross-project isolation guarantee from the `device_id` field definition.

## Source and scope

These tables were checked against the [server ingest schema](https://github.com/wild-edge/wild-edge/blob/main/ingest/schemas.py) on October 30, 2026. They cover accepted payload fields, not an automatic collection matrix or a guarantee of query availability for every field. Server configuration controls size limits. SDK and gateway guides document producer behavior.
