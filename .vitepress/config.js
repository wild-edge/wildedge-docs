import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import llmstxt from 'vitepress-plugin-llms'

const onboardingIcons = {
  rocket: '<path d="M8 14 5 13l3-5 4-.5M10 16l1 3 5-3 .5-4M8 14c2-6 6-9 13-11-1 7-4 11-11 13zM7 17c-2 0-3 2-4 4 2-1 4-2 4-4z"/><circle cx="15.5" cy="8.5" r="1.5"/>',
  robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4m-2 0h4M2 13v3m20-3v3M9 13v1m6-1v1"/>',
}

// Use the panel glyphs for product views and outline symbols for onboarding.
function sidebarItem(text, link, icon, items) {
  const outline = onboardingIcons[icon]
  const glyph = outline
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">${outline}</svg>`
    : ''
  return { text: `<span class="panel-nav-icon panel-nav-icon-${icon}" aria-hidden="true">${glyph}</span>${text}`, docFooterText: text, link, items }
}

export default withMermaid(
  defineConfig({
    head: [
      ['link', { rel: 'icon', type: 'image/png', href: '/wildedge-logo-text.png' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap',
        },
      ],
    ],

    base: '/',

    srcExclude: ['README.md', 'CONTRIBUTING.md', 'LICENSE', 'parts/**'],

    outDir: '.vitepress/dist',

    // Search must live in the top-level themeConfig; VitePress ignores it inside a locale.
    themeConfig: {
      search: {
        provider: 'local',
      },
    },

    locales: {
      root: {
        label: 'English',
        lang: 'en-US',
        title: 'WildEdge Docs',
        description:
          'Set up inference telemetry from your app or LLM gateway and investigate it in WildEdge or with your AI agent.',
        themeConfig: {
          logo: '/wildedge-logo-text.svg',
          siteTitle: 'WildEdge Docs',
          nav: [
            { text: '<span class="we-sign-in">Sign In</span>', link: 'https://app.wildedge.dev/', noIcon: true },
          ],
          sidebar: [
            { text: 'Get started', items: [
              sidebarItem('Send your first event', undefined, 'rocket', [
                { text: 'On-device model', link: '/quickstart/on-device' },
                { text: 'Cloud API call', link: '/quickstart/cloud' },
              ]),
              sidebarItem('Instrument your app', '/setup/sdk', 'code'),
              sidebarItem('Connect an LLM gateway', '/llm-gateways', 'link', [
                { text: 'LiteLLM', link: '/gateways/litellm' },
                { text: 'OpenRouter', link: '/gateways/openrouter' },
                { text: 'Bifrost', link: '/gateways/bifrost' },
              ]),
              sidebarItem('Combine app and gateway telemetry', '/setup/sdk-and-gateway', 'share-alt'),
              sidebarItem('Connect your AI agent', '/connect-agent', 'robot'),
            ] },
            { text: 'Monitoring', items: [
              sidebarItem('Events', '/monitoring/events', 'bolt'),
              sidebarItem('Runs', '/monitoring/runs', 'sitemap'),
              sidebarItem('Query', '/monitoring/query', 'chart-line'),
              sidebarItem('Dashboards', '/monitoring/dashboards', 'objects-column'),
              sidebarItem('Hardware', '/monitoring/hardware', 'microchip'),
              sidebarItem('Models', '/monitoring/models', 'server'),
              sidebarItem('Gateways', '/monitoring/gateways', 'arrow-right-arrow-left'),
              sidebarItem('Notifications', '/monitoring/notifications', 'bell'),
            ] },
            { text: 'Datasets & Training', items: [
              sidebarItem('Capture', '/datasets-and-training/capture', 'paperclip'),
              sidebarItem('Datasets', '/datasets-and-training/datasets', 'folder'),
              sidebarItem('Training', '/datasets-and-training/training', 'send'),
            ] },
            { text: 'Administration', items: [
              sidebarItem('Account setup', '/administration/account', 'user'),
              sidebarItem('Companies & projects', '/administration/projects', 'building'),
              sidebarItem('Team & permissions', '/administration/team', 'users'),
              sidebarItem('Keys & tokens', '/administration/keys', 'key'),
              sidebarItem('Company limits', '/administration/limits', 'credit-card'),
            ] },
            { text: 'Learn more', items: [
              sidebarItem('Architecture', '/architecture', 'compass'),
              sidebarItem('Deployment options', '/deployment', 'server'),
            ] },
            { text: 'Reference', items: [
              sidebarItem('Telemetry reference', '/telemetry', 'list'),
              sidebarItem('Integration coverage', '/integration-coverage', 'table'),
              sidebarItem('Gateway fields', '/llm-gateways#query-gateway-events', 'database'),
              sidebarItem('Troubleshooting gateways', '/llm-gateways#troubleshooting', 'wrench'),
              sidebarItem('API reference', 'https://app.wildedge.dev/api/docs', 'book'),
              sidebarItem('Changelog', '/changelog', 'history'),
            ] },
          ],
          socialLinks: [{ icon: 'github', link: 'https://github.com/wild-edge' }],
          editLink: {
            pattern: 'https://github.com/wild-edge/wildedge-docs/edit/main/:path',
            text: 'Edit this page on GitHub',
          },
          footer: {
            copyright: `© ${new Date().getFullYear()} WildEdge`,
          },
        },
      },
    },

    vite: {
      plugins: [
        // Serves /llms.txt, /llms-full.txt, and a Markdown copy of each page (/page.md) for AI agents.
        llmstxt({
          domain: 'https://docs.wildedge.dev',
          title: 'WildEdge',
          description:
            'Inference observability for on-device and cloud AI. Collect telemetry from your app (Python, iOS / macOS, Android SDKs) or LLM gateway (LiteLLM, OpenRouter, Bifrost), then investigate it in WildEdge or with your AI agent over MCP.',
          ignoreFiles: ['parts/**'],
        }),
      ],
    },

    mermaid: {
      theme: 'default'
    }
  })
)
