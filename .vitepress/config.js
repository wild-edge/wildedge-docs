import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    head: [
      ['link', { rel: 'icon', type: 'image/png', href: '/wildedge-logo-text.png' }],
    ],

    base: '/',

    srcExclude: ['README.md', 'CONTRIBUTING.md', 'LICENSE'],

    outDir: '.vitepress/dist',

    locales: {
      root: {
        label: 'English',
        lang: 'en-US',
        title: 'Wild Edge Documentation',
        description:
          'Unify your ML metrics, hardware telemetry, and model performance in a single place.',
        themeConfig: {
          logo: '/wildedge-logo-text.svg',
          nav: [
            { text: 'BLOG', link: 'https://blog.wildedge.dev' },
            { text: 'API DOCS', link: 'https://app.wildedge.dev/api/docs' },
            { text: 'GET STARTED', link: 'https://app.wildedge.dev/dashboard/signup' },
          ],
          sidebar: [
            {
              text: 'Documentation',
              items: [
                { text: 'Remote MCP', link: '/mcp' },
                { text: 'What we collect', link: '/what-we-collect' },
                { text: 'Changelog', link: '/changelog' },
              ],
            },
          ],
          outline: [2, 3],
          socialLinks: [{ icon: 'github', link: 'https://github.com/wild-edge' }],
          editLink: {
            pattern: 'https://github.com/wild-edge/wildedge-docs/edit/main/:path',
            text: 'Edit this page on GitHub',
          },
          footer: {
            copyright: `© ${new Date().getFullYear()} Wild Edge`,
          },
          search: {
            provider: 'local',
          },
        },
      },
      pl: {
        label: 'Polski',
        lang: 'pl-PL',
        title: 'Dokumentacja Wild Edge',
        description:
          'Połącz metryki ML, telemetrię sprzętu i wydajność modeli w jednym miejscu.',
        themeConfig: {
          logo: '/wildedge-logo-text.svg',
          nav: [
            { text: 'BLOG', link: 'https://blog.wildedge.dev' },
            { text: 'DOKUMENTACJA API', link: 'https://app.wildedge.dev/api/docs' },
            { text: 'ZACZNIJ', link: 'https://app.wildedge.dev/dashboard/signup' },
          ],
          sidebar: [
            {
              text: 'Dokumentacja',
              items: [
                // Nietłumaczone jeszcze — linki prowadzą do wersji angielskiej.
                { text: 'Zdalny MCP', link: '/mcp' },
                { text: 'Co zbieramy', link: '/what-we-collect' },
                { text: 'Dziennik zmian', link: '/pl/changelog' },
              ],
            },
          ],
          outline: [2, 3],
          socialLinks: [{ icon: 'github', link: 'https://github.com/wild-edge' }],
          editLink: {
            pattern: 'https://github.com/wild-edge/wildedge-docs/edit/main/:path',
            text: 'Edytuj tę stronę na GitHub',
          },
          footer: {
            copyright: `© ${new Date().getFullYear()} Wild Edge`,
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
