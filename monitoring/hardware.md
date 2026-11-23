---
title: Hardware
description: Compare thermal state, accelerator use, and inference latency across devices.
---

# Hardware

Use Hardware to investigate whether slow on-device inference is concentrated on a particular device model or under specific operating conditions.

[Open Hardware in the demo](https://wildedge.dev/demo/wildedge-demolabs/car-classifier/hardware?hours=168)

<figure class="workflow-shot">
  <a href="/images/workflows/hardware-overview.jpg"><img src="/images/workflows/hardware-overview.jpg" alt="Hardware overview showing four summary metrics, charts for thermal state, accelerator usage, latency and charging state, and a three-row device fleet." width="1280" height="1100"><span class="workflow-shot-open">Open full-size screenshot</span></a>
  <figcaption>Seven days of Car Classifier demo telemetry. Most events on the iPhone 16 Pro reported a nominal thermal state, while most on the iPhone18,1 reported fair.</figcaption>
</figure>

## Compare operating conditions

- **Thermal State by Device** shows the share of inferences reported at each thermal level. Use **Latency by Thermal State** to compare median inference duration across those levels.
- **Accelerator Usage** shows which accelerator actually ran inference when the integration reports it. The demo records 92 iOS calls using the NPU.
- **Battery Impact** compares average inference latency while charging and unplugged. To investigate a difference, compare calls on the same device and model in [Events](/monitoring/events).
- **CPU Throttle Ratio Over Time** compares current and maximum CPU frequency. It needs CPU frequency telemetry, which is unavailable in this demo capture.

## Find the affected devices

Use **Device Fleet** to see how many devices and events each model contributed and when those devices first and last appeared. Sort by **Events** to identify the models with the most traffic, then filter Events by **Device model** to inspect individual calls.

[See device-performance fields](/what-we-collect#device-performance)
