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
            { text: 'CHANGELOG', link: '/changelog' },
            { text: 'SWIFT SDK', link: '/swift-api/' },
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
          'Połącz metryki ML, telemetrię sprzętu i wydajność modeli w jednym miejscu.',
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
