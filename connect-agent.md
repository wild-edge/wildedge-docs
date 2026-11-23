---
title: Connect your AI agent
description: Connect Codex, Claude Code, Gemini CLI, ChatGPT, or Claude to WildEdge through the remote MCP server, and point it at these docs.
---
# Connect your AI agent

Connect your agent to WildEdge to inspect events, follow traces, and investigate failures.

## Choose your client {#choose-your-agent}

### Terminal

[Create a personal MCP token](/mcp#create-an-mcp-token), then open the instructions for your client.

<!-- Client marks sourced from https://github.com/lobehub/lobe-icons. -->
<div class="agent-client-links">
  <a href="/mcp.html#codex-cli"><img class="agent-client-monochrome" src="/icons/agents/codex.svg" alt="" width="22" height="22">Codex CLI</a>
  <a href="/mcp.html#claude-code"><img src="/icons/agents/claudecode-color.svg" alt="" width="22" height="22">Claude Code</a>
  <a href="/mcp.html#gemini-cli"><img src="/icons/agents/geminicli-color.svg" alt="" width="22" height="22">Gemini CLI</a>
</div>

### Web

Follow the setup guide for your client and sign in to WildEdge when prompted.

<div class="agent-client-links">
  <a href="/mcp_web.html#connect-chatgpt"><img class="agent-client-monochrome" src="/icons/agents/openai.svg" alt="" width="22" height="22">ChatGPT</a>
  <a href="/mcp_web.html#connect-claude"><img src="/icons/agents/claude-color.svg" alt="" width="22" height="22">Claude on the web</a>
</div>

[Use another OAuth-compatible client](/mcp_web).

## Try your first investigation

After connecting, replace the placeholders with your project, company, and provider, then paste the prompt into your agent.

<div class="agent-prompt-terminal">

```text
For <PROJECT> in company <COMPANY>, use WildEdge to report input and output token totals by model for the last seven days. Identify the model handling most of the traffic, estimate what the same workload would cost on more cost efficient models from <PROVIDER>.
```

</div>

## Give your agent these docs

The docs are published in Markdown for agents:

- [`/llms.txt`](https://docs.wildedge.dev/llms.txt): an index of every page with a one-line summary.
- [`/llms-full.txt`](https://docs.wildedge.dev/llms-full.txt): all pages in one file.
- Any page as Markdown: add `.md` to its URL, for example [`/telemetry.md`](https://docs.wildedge.dev/telemetry.md).

To have your agent instrument your app, ask:

> Read https://docs.wildedge.dev/llms.txt, then add WildEdge to this project. Use the setup that matches how we run models.

::: tip Connecting before instrumentation?
You can connect your agent first. A connection with write access can help create a project and project key. Follow your client's setup guide, then [choose your instrumentation setup](/).
:::

## Next

- [Investigate events and traces](/investigate) with your agent.
- [Where your inference data goes](/#how-wildedge-works) explains the events, runs, charts, and datasets your agent can work with.
