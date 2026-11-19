1. Sign in to [WildEdge](https://app.wildedge.dev/) and open the project that should receive the events.
2. Open **API Keys** and select **Reveal DSN** on a project key.

The DSN looks like this:

```text
https://<secret>@ingest.wildedge.dev/<key>
```

The part between `https://` and `@` is your project secret. You need only the secret.

::: warning Protect the secret
Anyone with the secret can send events to your project. Keep it in your secret store, not in source control. Use a separate project key for the gateway, so you can revoke it without affecting your apps.
:::
