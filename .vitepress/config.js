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
          'Know where your AI struggles in the real world. See where model behavior changes across releases, runtimes, and devices, then turn real examples into datasets for evaluation and training.',
        themeConfig: {
          logo: '/wildedge-logo-text.svg',
          nav: [
            { text: 'BLOG', link: 'https://blog.wildedge.dev' },
            { text: 'CHANGELOG', link: '/changelog' },
            {
              text: 'REMOTE MCP',
              items: [
                { text: 'Coding agents', link: '/mcp' },
                { text: 'Web agents (OAuth)', link: '/mcp_web' },
              ],
            },
            { text: 'API DOCS', link: 'https://app.wildedge.dev/api/docs' },
            { text: 'GET STARTED', link: 'https://app.wildedge.dev/dashboard/signup' },
          ],
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
          'Dowiedz się, gdzie Twoje AI zawodzi w prawdziwym świecie. Zobacz, jak zachowanie modelu zmienia się między wydaniami, środowiskami i urządzeniami, i zamieniaj prawdziwe przykłady w zbiory danych do ewaluacji i trenowania.',
        themeConfig: {
          logo: '/wildedge-logo-text.svg',
          nav: [
            { text: 'BLOG', link: 'https://blog.wildedge.dev' },
            { text: 'DZIENNIK ZMIAN', link: '/pl/changelog' },
            { text: 'DOKUMENTACJA API', link: 'https://app.wildedge.dev/api/docs' },
            { text: 'ZACZNIJ', link: 'https://app.wildedge.dev/dashboard/signup' },
          ],
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
