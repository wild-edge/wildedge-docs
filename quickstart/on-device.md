---
title: "Quickstart: on-device model"
description: Send your first inference event to WildEdge from Python in about 5 minutes. Runs a small local model on CPU, no model API key needed.
---

# Quickstart: on-device model

Run a small language model on your laptop and see the inference event in WildEdge, including the model load and the hardware it ran on.

**Expected time:** 5 minutes. **You need:** Python 3.10+ and [uv](https://docs.astral.sh/uv/). No GPU and no model API key.

Calling OpenAI or another hosted API instead? See the [cloud API quickstart](/quickstart/cloud). Building for iOS, macOS, or Android? See [Set up app telemetry](/setup/sdk).

## 1. Get your DSN

Sign in to [WildEdge](https://app.wildedge.dev/) and create a project. Open **API Keys** and select **Reveal DSN** on the project key. Copy it.

The DSN looks like this:

```text
https://<secret>@ingest.wildedge.dev/<key>
```

## 2. Install

Create a project and add the SDK, Transformers, and the CPU build of PyTorch:

```bash
uv init wildedge-quickstart && cd wildedge-quickstart
uv add wildedge-sdk transformers
uv add torch --index pytorch-cpu=https://download.pytorch.org/whl/cpu
```

The CPU build skips about 2 GB of CUDA libraries that Linux installs by default. The model runs on CPU either way.

## 3. Run a model

Save this as `app.py`:

```python
import wildedge
from transformers import pipeline

# Initialize before creating the model so the integration can track it.
wildedge.init(integrations=["transformers"])

model = pipeline(
    "text-generation",
    model="HuggingFaceTB/SmolLM2-360M-Instruct",
    device=-1,  # CPU
)
result = model(
    "Explain how rain forms in one sentence.",
    max_new_tokens=32,
    do_sample=False,
    return_full_text=False,
)
print(result[0]["generated_text"])

wildedge.flush()  # Send now. Events are otherwise batched every 60 seconds.
```

Set your DSN and run it:

```bash
export WILDEDGE_DSN="https://<secret>@ingest.wildedge.dev/<key>"
uv run python app.py
```

The first run downloads the model (about 700 MB) from Hugging Face.

::: tip Prompts and outputs stay local
The generated text prints in your terminal. It is not uploaded. WildEdge records timing, model metadata, and hardware context. Content capture is opt-in. See [Captured content](/what-we-collect#captured-content).
:::

## 4. See your event

Open **Events** in your WildEdge project. You should see two events: a model load and an inference. Select the inference to see its duration, model, and the device it ran on.

![Events list in WildEdge showing inference events with model and device metadata](/images/quickstart-events.jpg)

*Example from a mobile app. Your list will show the SmolLM2 load and inference.*

No events? Check that `WILDEDGE_DSN` is set in the same shell. Without a DSN the SDK does nothing and raises no error. See [Missing events or fields](/what-we-collect#missing-events-or-fields).

## Next steps

[Explore the product map](/concepts) or [follow an example event through a run](/monitoring/runs#find-the-slow-step-in-a-run).

- **Learn the building blocks.** [How WildEdge works](/concepts) explains projects, events, runs, SQL charts, dashboards, and datasets.
- **Instrument your own app.** Call `wildedge.init(integrations=[...])` before you create models or API clients. Pick keys from the [integration list](https://github.com/wild-edge/wildedge-python#supported-integrations), for example `openai`, `anthropic`, `llama_cpp`, or `mlx`.
- **Skip code changes.** Start an existing app with `wildedge run --integrations llama_cpp -- python app.py`. See the [deployment guide](https://github.com/wild-edge/wildedge-python/blob/main/docs/deployment.md).
- **Trace a workflow.** Group local and remote calls into one run with `wildedge.trace()` and `wildedge.span()`. See [manual tracking](https://github.com/wild-edge/wildedge-python/blob/main/docs/manual-tracking.md#track-spans-for-agentic-workflows).
- **Add a cloud call.** Follow the [cloud API quickstart](/quickstart/cloud), then group local and remote calls into one trace.
- **Ask your agent.** [Connect Claude Code, Codex, or ChatGPT](/connect-agent) and ask it to explain your first event.
- **Go mobile.** [Set up the iOS / macOS or Android SDK](/setup/sdk).
