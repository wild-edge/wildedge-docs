---
title: Set up app telemetry
---
# Set up app telemetry

Use a WildEdge SDK to record inference calls in your application, including on-device models. Choose your platform, configure your project credentials, then confirm that events arrive.

If your gateway also sends telemetry to WildEdge, follow [Set up app and gateway telemetry](/setup/sdk-and-gateway) to avoid recording the same call twice.

## 1. Choose your platform

| Platform | Setup guide | Examples |
| --- | --- | --- |
| Python | [Install and configure](https://github.com/wild-edge/wildedge-python#install) | [Python examples](https://github.com/wild-edge/wildedge-python/tree/main/examples) |
| iOS / macOS | [Getting started](https://github.com/wild-edge/wildedge-swift#getting-started) | [Swift examples](https://github.com/wild-edge/wildedge-swift/tree/main/Examples) |
| Android | [Quick start](https://github.com/wild-edge/wildedge-android#quick-start) | [Android samples](https://github.com/wild-edge/wildedge-android/tree/main/samples) |

The platform guides contain the installation commands and supported integrations.

## 2. Configure your project credentials

Sign in to [WildEdge](https://app.wildedge.dev/), open your project, then open **API Keys** and select **Reveal DSN** on a project key. Configure that DSN using your platform guide.

Keep credentials out of source control. Use separate project keys for integrations you may need to revoke independently.

## 3. Choose what to capture

Input and output capture is opt-in. Follow your SDK guide to configure capture or supply attachments through its tracking API. Support varies by integration.

## 4. Check your first event

Run one inference through an integration enabled in your SDK. Open **Events** in your WildEdge project and find the new event. Check the model, timing, and available telemetry. Captured inputs and outputs are available only when capture is enabled and supported by the integration.

## Next: investigate

[Connect your AI agent](/connect-agent), or [investigate events and traces](/investigate) in your project.
