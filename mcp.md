---
title: Connect an AI agent with remote MCP
description: Give Claude Code, Codex, or Gemini CLI secure access to your Wild Edge apps and telemetry.
---

# Connect an AI agent with remote MCP

Wild Edge's remote [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server lets a local AI agent work with your Wild Edge account. You can ask the agent to create an app, inspect recent inference events, follow a trace, or investigate a failure without copying data between your browser and terminal.

The remote endpoint is:

```text
https://app.wildedge.dev/mcp
```

You do not need to install or run an MCP server locally.

## 1. Create an MCP token

1. Sign in to [Wild Edge](https://app.wildedge.dev/).
2. Open your profile and find **MCP access tokens**.
3. Select **Create token** and give the token a name that identifies the client, such as `Codex on MacBook`.
4. Choose the least privilege the client needs:
   - **Read** can inspect the companies, apps, events, traces, dashboards, datasets, and integrations available to your account.
   - **Read + Write** can also create apps and project keys, and perform the other write actions exposed by the MCP server.
5. Create the token and copy it immediately. The full token is shown only once.

Store the token in an environment variable for the commands below:

```sh
export WILDEDGE_MCP_TOKEN="we_mcp_..."
```

::: warning Protect the token
An MCP token acts with your Wild Edge account's access. Do not commit it to source control or paste it into prompts. Use a separate token for each client so you can revoke one without interrupting the others. Delete a token from your profile as soon as it is no longer needed.
:::

## 2. Connect your local agent

Choose the client you use. The name `wildedge` in these examples is local to the client and can be changed.

### Codex CLI

```sh
codex mcp add wildedge \
  --url https://app.wildedge.dev/mcp \
  --bearer-token-env-var WILDEDGE_MCP_TOKEN

codex mcp list
```

Codex stores the name of the environment variable, not the token itself. Make sure `WILDEDGE_MCP_TOKEN` is available whenever you start Codex.

### Claude Code

```sh
claude mcp add-json --scope user wildedge \
  '{"type":"http","url":"https://app.wildedge.dev/mcp","headers":{"Authorization":"Bearer ${WILDEDGE_MCP_TOKEN}"}}'

claude mcp get wildedge
```

Claude Code expands `${WILDEDGE_MCP_TOKEN}` from the environment when it connects. Inside Claude Code, run `/mcp` to inspect the connection and authentication status.

### Gemini CLI

```sh
gemini mcp add --scope user --transport http \
  --header "Authorization: Bearer ${WILDEDGE_MCP_TOKEN}" \
  wildedge https://app.wildedge.dev/mcp
```

Restart Gemini CLI, then run `/mcp list` to check the connection.

::: warning Gemini stores the expanded header
The shell expands `WILDEDGE_MCP_TOKEN` before Gemini saves this server, so the bearer token is stored in your user-level Gemini settings. Protect `~/.gemini/settings.json`, never commit it, and delete or rotate the Wild Edge token if that file is exposed.
:::

## 3. Work with Wild Edge from the CLI

Your agent discovers the available Wild Edge tools after it connects. Start by asking it what it can see:

> List the Wild Edge companies and apps available to me. Do not make any changes.

With a read/write token, you can bootstrap a new integration:

> Create a Wild Edge app named “Checkout classifier” in the Acme company. Show me the returned DSN and explain where to put it in my SDK configuration.

The agent may ask you to approve the write tool before creating the app. Review the company, name, and requested action before approving it.

Once an SDK is sending telemetry, use the CLI to investigate problems without leaving your development workflow:

> List the most recent inference events for the Checkout classifier app and highlight failures or unusually long durations.

> Open event `<event-id>`, follow its trace if one is available, and summarize where the failure occurred.

> Show the datasets and training integrations available for this app so I can decide how to investigate the bad examples further.

Be specific about the company, app, time window, and whether changes are allowed. This gives the agent enough context to choose the right tools and keeps investigations bounded.

## Troubleshooting

- **Unauthorized or disconnected:** confirm that `WILDEDGE_MCP_TOKEN` is set in the same shell that starts the agent, and that the token has not expired or been deleted.
- **A write action is unavailable:** edit the token in your Wild Edge profile and grant **Read + Write**, or create a separate write-enabled token.
- **The agent cannot see a company or app:** MCP access follows the permissions of the Wild Edge user who created the token.
- **A token may have leaked:** delete it immediately in **MCP access tokens**, create a replacement, and update only the affected client.
