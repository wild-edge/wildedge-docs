<div class="we-map-fit">
<div class="we-map" role="figure" aria-label="WildEdge data flow: your app SDK or LLM gateway sends events to your project. You use events as runs and traces, SQL charts and dashboards, and datasets you export for training. Your AI agent works across all of it over MCP.">
<div class="we-step"><span>01</span> Collect</div>
<div class="we-row we-row-2">
<a class="we-node" href="/setup/sdk"><strong>App SDK</strong><span>Python, Swift, Kotlin. Cloud / on-device model calls, with device context.</span></a>
<a class="we-node" href="/llm-gateways"><strong>LLM gateway</strong><span>LiteLLM, OpenRouter, Bifrost over OTLP. Cloud calls only, no app changes.</span></a>
</div>
<div></div>
<div class="we-merge" aria-hidden="true"><i></i><i></i></div>
<div class="we-step"><span>02</span> Store</div>
<a class="we-node we-node-core" href="/concepts.html#events"><strong>Events in your project</strong><span class="we-chips"><code>inference</code><code>model_load</code><code>error</code><code>feedback</code><code>span</code></span></a>
<div></div>
<div class="we-fan" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="we-step"><span>03</span> Use</div>
<div class="we-row we-row-3">
<div class="we-lane">
<a class="we-node" href="/concepts.html#runs-traces-and-spans"><strong>Runs and traces</strong><span>One execution's spans and model calls, from SDK tracing.</span></a>
</div>
<div class="we-lane">
<a class="we-node" href="/concepts.html#sql-and-charts"><strong>SQL and charts</strong><span>Sandboxed read-only SQL on the <code>events</code> table. Save results as charts.</span></a>
<div class="we-down" aria-hidden="true"></div>
<a class="we-node" href="/concepts.html#dashboards"><strong>Dashboards</strong><span>Related charts in one time window.</span></a>
</div>
<div class="we-lane">
<a class="we-node" href="/concepts.html#datasets"><strong>Datasets</strong><span>Curated events with their captured inputs and outputs.</span></a>
<div class="we-down" aria-hidden="true"></div>
<a class="we-node we-node-out" href="/concepts.html#training-export"><strong>Training export</strong><span>Training vendor of choice</span></a>
</div>
</div>
<div></div>
<a class="we-agent" href="/connect-agent"><span class="we-agent-tag">MCP</span><span><strong>Your AI agent</strong> works across your project: reads events, follows runs, writes SQL, builds dashboards.</span></a>
</div>
</div>
