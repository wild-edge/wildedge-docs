---
title: Connect your AI agent
description: Connect Codex, Claude Code, Gemini CLI, ChatGPT, or Claude to WildEdge through the remote MCP server, and point it at these docs.
---
# Connect your AI agent

Connect your agent to WildEdge through the remote MCP server to inspect events, follow traces, and investigate failures. Choose the client you use.

## Choose your agent

| Agent | Connection | Setup |
| --- | --- | --- |
| Codex CLI, Claude Code, Gemini CLI | Personal MCP token | [Connect with a token](/mcp) |
| ChatGPT, Claude, or another OAuth-capable web agent | Browser sign-in with OAuth | [Connect with OAuth](/mcp_web) |

Both use the remote endpoint below. No local MCP server is required.

```text
https://app.wildedge.dev/mcp
```

Start with **Read** access for investigation. Use **Read + Write** when you want your agent to create projects or perform other write actions.

## Try your first investigation

After connecting, ask:

> List the WildEdge companies and projects available to me. Do not make any changes.

Then use the returned company and project names:

> For project `PROJECT` in company `COMPANY`, inspect up to 25 events from the last 24 hours. Summarize failures, slow calls, and the telemetry available to explain them. Do not make any changes.

[Continue to investigate events and traces →](/investigate)

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
