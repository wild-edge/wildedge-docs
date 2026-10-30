import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

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

    srcExclude: ['README.md', 'CONTRIBUTING.md', 'LICENSE'],

    outDir: '.vitepress/dist',

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
            { text: 'Guide', link: '/' },
            { text: 'API reference', link: 'https://app.wildedge.dev/api/docs' },
            { text: 'Changelog', link: '/changelog' },
            { text: 'Open WildEdge ↗', link: 'https://app.wildedge.dev/' },
          ],
          sidebar: [
            { text: 'Get started', items: [
              { text: 'Choose your setup', link: '/' },
              { text: 'App only', link: '/setup/sdk' },
              { text: 'Gateway only', link: '/llm-gateways' },
              { text: 'App + gateway', link: '/setup/sdk-and-gateway' },
            ] },
            { text: 'Use WildEdge', items: [
              { text: 'Connect your AI agent', link: '/connect-agent' },
              { text: 'Codex / Claude Code / Gemini CLI', link: '/mcp' },
              { text: 'ChatGPT / Claude', link: '/mcp_web' },
              { text: 'Investigate events and traces', link: '/investigate' },
            ] },
            { text: 'Reference', items: [
              { text: 'Gateway fields and limitations', link: '/llm-gateways#_4-query-gateway-events' },
              { text: 'Troubleshooting gateways', link: '/llm-gateways#troubleshooting' },
              { text: 'API reference ↗', link: 'https://app.wildedge.dev/api/docs' },
              { text: 'Changelog', link: '/changelog' },
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
          search: {
            provider: 'local',
          },
        },
      },
      pl: {
        label: 'Polski',
        lang: 'pl-PL',
        title: 'Dokumentacja WildEdge',
        description:
          'Dowiedz się, gdzie Twoje AI zawodzi w prawdziwym świecie. Zobacz, jak zachowanie modelu zmienia się między wydaniami, środowiskami i urządzeniami, i zamieniaj prawdziwe przykłady w zbiory danych do ewaluacji i trenowania.',
        themeConfig: {
          logo: '/wildedge-logo-text.svg',
          siteTitle: 'Dokumentacja',
          nav: [
            { text: 'BLOG', link: 'https://blog.wildedge.dev' },
            { text: 'DZIENNIK ZMIAN', link: '/pl/changelog' },
            {
              text: 'ZDALNE MCP',
              items: [
                { text: 'Agenci w terminalu', link: '/mcp' },
                { text: 'Agenci webowi (OAuth)', link: '/mcp_web' },
              ],
            },
            { text: 'BRAMY LLM', link: '/llm-gateways' },
            { text: 'DOKUMENTACJA API', link: 'https://app.wildedge.dev/api/docs' },
            { text: 'ZACZNIJ', link: 'https://app.wildedge.dev/dashboard/signup' },
          ],
          socialLinks: [{ icon: 'github', link: 'https://github.com/wild-edge' }],
          editLink: {
            pattern: 'https://github.com/wild-edge/wildedge-docs/edit/main/:path',
            text: 'Edytuj tę stronę na GitHub',
          },
          footer: {
            copyright: `© ${new Date().getFullYear()} WildEdge`,
          },
          search: {
            provider: 'local',
          },
        },
      },
    },

    mermaid: {
      theme: 'default'
    }
  })
)
