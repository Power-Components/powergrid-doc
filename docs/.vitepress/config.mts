import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

export default defineConfig({
  ignoreDeadLinks: true,
  vite: {
    // Publishes /llms.txt, /llms-full.txt and a .md copy of each page for AI tools.
    plugins: [llmstxt({
      domain: 'https://livewire-powergrid.com',
      description: 'Livewire data table for Laravel: columns, sorting, filters, pagination, actions and exports.',
    })],
  },
  title: "Livewire PowerGrid",
  description: "PowerGrid Docs",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'logomark2x.png' }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "favicon.ico"}],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "site.webmanifest"}],
    ['meta', { name: 'og:title', content: 'Livewire PowerGrid - Version 7'}],
    ['meta', { name: 'og:description', content: 'Livewire PowerGrid is a component for generating dynamic tables with your Laravel Models and Collections.'}],
    ['meta', { name: 'application-name', content: 'Livewire PowerGrid' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Livewire PowerGrid' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'author', content: '@luanfreitasdev and @dansysanalyst' }],
    ['meta', { name: 'keywords', content: 'laravel, livewire, datatable,  data table, grid, php, alpine, tall stack, tailwind, daisyui, flux, table example, laravel package, sorting tables, table ui, table html' }],
  ],
  markdown: {
    toc: {
        level: [2],
      },
    anchor: { level: [1, 2, 3, 4] },
    config(md) {
      md.core.ruler.after('inline', 'inline-code-v-pre', (state) => {
        for (const token of state.tokens) {
          if (token.type !== 'inline' || !token.children) continue
          for (const child of token.children) {
            if (child.type === 'code_inline' && child.content.includes('{{')) {
              child.attrSet('v-pre', '')
            }
          }
        }
      })

      const fence = md.renderer.rules.fence
      if (!fence) return

      md.renderer.rules.fence = (...args) => {
        const token = args[0][args[1]]
        const title = token.info.match(/\[([^\]]*)\]/)?.[1]?.trim() ?? ''
        const showFile = Boolean(
          title && ((title.includes('/') && !/\s/.test(title)) || title === 'Prompt'),
        )
        const rendered = fence(...args)
        if (!showFile) return rendered

        const needle = '<span class="lang">'
        const at = rendered.indexOf(needle)
        if (at === -1) return rendered
        const end = rendered.indexOf('</span>', at)
        if (end === -1) return rendered

        const insertAt = end + '</span>'.length
        const safe = md.utils.escapeHtml(title)
        return (
          rendered.slice(0, insertAt) +
          `<span class="vp-code-file">${safe}</span>` +
          rendered.slice(insertAt)
        )
      }
    },
  },
  appearance: 'dark',
  lang: 'en-US',
  themeConfig: {
    outline: [2, 3],
    logo: '/logomark1x.png',
    siteTitle: 'Livewire PowerGrid',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '7.x',
        items: [
          {
            text: '6.x',
            link: '/6.x/',
            target: '_self'
          },
          {
            text: '5.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/5.x/docs'
          },
          {
            text: '4.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/4.x/docs'
          },
          {
            text: '3.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/3.x/docs'
          },
          {
            text: '2.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/2.x/docs'
          }
        ]
      }
    ],

    sidebar: [
      {
        text: '📄 Release Notes',
        collapsed: false,
        items: [
          { text: 'Release Notes', link: '/release-notes-and-upgrade/release-notes' },
          { text: 'Upgrade Guide', link: '/release-notes-and-upgrade/upgrade-guide' },
        ],
      },
      {
        text: '🚀 Get Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/get-started/introduction' },
          { text: '1. Install', link: '/get-started/install' },
          { text: '2. Configure', link: '/get-started/configure-powergrid' },
          { text: '3. Create a Table', link: '/get-started/create-powergrid-table' },
          { text: '4. Render a Table', link: '/get-started/rendering-a-powergrid-table' },
        ],
      },
      {
        text: '🤖 Build with AI',
        collapsed: false,
        items: [
          { text: 'Tools & Skills', link: '/build-with-ai/tools-and-skills' },
        ],
      },
      {
        text: '🧰 Table Structure',
        collapsed: false,
        items: [
          { text: 'DataSource', link: '/table-structure/datasource' },
          { text: 'Columns', link: '/table-structure/columns' },
          { text: 'Rows', link: '/table-structure/rows' },
          { text: 'Detail Row', link: '/table-structure/detail-row' },
          { text: 'Header & Footer', link: '/table-structure/header-and-footer' },
          { text: 'Filters', link: '/table-structure/filters' },
          { text: 'Filter Builder', link: '/table-structure/filter-builder' },
          { text: 'Tabs', link: '/table-structure/tabs' },
          { text: 'Pagination', link: '/table-structure/pagination' },
          { text: 'Conditional Rules', link: '/table-structure/conditional-rules' },
          { text: 'Row Buttons', link: '/table-structure/row-buttons' },
          { text: 'Bulk Actions', link: '/table-structure/bulk-actions' },
        ],
      },
      {
        text: '💾 Data Management',
        collapsed: false,
        items: [
          { text: 'Formatting Data', link: '/data-management/formatting-data' },
          { text: 'Searching Data', link: '/data-management/searching-data' },
          { text: 'Sorting Data', link: '/data-management/sorting-data' },
          { text: 'Editing Data', link: '/data-management/editing-data' },
          { text: 'Validating Data', link: '/data-management/validating-data' },
          { text: 'Summarizing Data', link: '/data-management/summarizing-data' },
          { text: 'Exporting Data', link: '/data-management/exporting-data' },
          { text: 'Empty Data State', link: '/data-management/empty-data-state' },
        ],
      },
      {
        text: '🌩️ PowerGrid Lite',
        collapsed: false,
        items: [
          { text: 'Blade Components', link: '/powergrid-lite/blade-components' },
        ],
      },
      {
        text: '⚡ PowerGrid',
        collapsed: false,
        items: [
          { text: 'Configuration Options', link: '/powergrid/configuration-options' },
          { text: 'Create Tables', link: '/powergrid/create' },
          { text: 'Render Tables', link: '/powergrid/render' },
          { text: 'Lifecycle Hooks', link: '/powergrid/lifecycle-hooks' },
          { text: 'Internationalization', link: '/powergrid/internationalization' },
          { text: 'Artisan Commands', link: '/powergrid/artisan-commands' },
          { text: 'Testing Tables', link: '/powergrid/testing-tables' },
        ],
      },
      {
        text: '⚙️ Performance & Look',
        collapsed: false,
        items: [
          { text: 'Table Reference Name', link: '/performance-and-look/table-reference-name' },
          { text: 'Buttons', link: '/performance-and-look/buttons' },
          { text: 'Query String', link: '/performance-and-look/query-string' },
          { text: 'Persist State', link: '/performance-and-look/persist-state' },
          { text: 'Cache', link: '/performance-and-look/cache' },
          { text: 'Events', link: '/performance-and-look/events' },
          { text: 'UI Theme Override', link: '/performance-and-look/ui-theme-override' },
          { text: 'Responsive Layout', link: '/performance-and-look/responsive-layout' },
          { text: 'Auto-Refresh', link: '/performance-and-look/auto-refresh' },
          { text: 'Defer Loading', link: '/performance-and-look/defer-loading' },
        ],
      },
      {
        text: '🔌 Extending',
        collapsed: false,
        items: [
          { text: 'Partials & Hot Zones', link: '/extending/partials-and-hot-zones' },
          { text: 'Plugin System', link: '/extending/plugin-system' },
          { text: 'Custom Theme', link: '/extending/custom-theme' },
          { text: 'Portable Grid Definitions', link: '/extending/portable-grid-definitions' },
        ],
      },
      {
        text: '🛟 Community & Support',
        collapsed: true,
        items: [
          { text: '🧨 Troubleshooting', link: '/community-and-support/troubleshooting' },
          { text: 'Support', link: '/community-and-support/support' },
          { text: 'Community', link: '/community-and-support/community' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Power-Components/livewire-powergrid' },
    ],
    footer: {
      message: 'Created By Luan Freitas and @DanSysAnalyst',
    },
    editLink: {
      pattern: 'https://github.com/power-components/powergrid-doc/edit/7.x/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '7M4C366U6U',
        apiKey: '0a0022f159f38849b0dbd2199c12f081',
        indexName: 'livewire-powergridLivewire PowerGrid Site',
      }
    }
  },
  sitemap: {
    hostname: 'https://livewire-powergrid.com'
  }
})
