import { defineConfig } from 'vitepress'

export default defineConfig({
  ignoreDeadLinks: true,
  title: "Livewire PowerGrid",
  description: "PowerGrid Docs",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'logomark2x.png' }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "favicon.ico"}],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "site.webmanifest"}],
    ['meta', { name: 'og:title', content: 'Livewire PowerGrid - Version 5'}],
    ['meta', { name: 'og:description', content: 'Livewire PowerGrid is a component for generating dynamic tables with your Laravel Models and Collections.'}],
    ['meta', { name: 'application-name', content: 'Livewire PowerGrid' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Livewire PowerGrid' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'author', content: '@luanfreitasdev and @dansysanalyst' }],
    ['meta', { name: 'keywords', content: 'laravel, livewire, datatable,  data table, grid, php, alpine, tall stack, tailwind, bootstrap, table example, laravel package, sorting tables, table ui, table html' }],
  ],
  markdown: {
    toc: {
        level: [2],
      },
        anchor: { level: [1, 2, 3, 4] },
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
        text: '6.x',
        items: [
          {
            text: '5.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/5x/docs'
          },
          {
            text: '4.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/4x/docs'
          },
          {
            text: '3.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/3x/docs'
          },
          {
            text: '2.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/2x/docs'
          }
        ]
      }
    ],

    sidebar: [
      {
        text: '📄 Release Notes & Upgrade Guide',
        items: [
          { text: 'Release Notes', link: '/release-notes-and-upgrade/release-notes' },
          { text: 'Upgrade Guide', link: '/release-notes-and-upgrade/upgrade-guide' },
        ],
        collapsed: true
      },
      {
        text: '🛟 Community & Support',
        items: [
          { text: 'PowerGrid Community', link: '/community-and-support/community' },
          { text: 'Support', link: '/community-and-support/support' },
          { text: 'Contribute', link: '/community-and-support/contribute' },
        ],
        collapsed: true
      },
      {
        text: '🚀 Get Started',
        items: [
          { text: 'Introduction', link: '/get-started/introduction' },
          { text: '⌨️ Code Examples', link: '/get-started/code-examples' },
          { text: '🧨 Troubleshooting', link: '/get-started/troubleshooting' },
          { text: '1. Install', link: '/get-started/install' },
          { text: '2. PowerGrid Configuration', link: '/get-started/powergrid-configuration' },
          { text: '3. Create a PowerGrid Table', link: '/get-started/create-powergrid-table' },
          { text: '4. Rendering a PowerGrid Table', link: '/get-started/rendering-a-powergrid-table' },
        ],
        collapsed: false
      },
      {
        text: '⚡ Table Component',
        items: [
          { text: 'Data Source', link: '/table-component/data-source' },
          { text: 'Data Source Fields', link: '/table-component/data-source-fields' },
          { text: 'Component Columns', link: '/table-component/component-columns' },
          { text: 'Component Configuration', link: '/table-component/component-configuration' },
        ],
        collapsed: false,
        collapsible: false,
      },
      {
        text: '🧰 Table Features',
        items: [
              { text: 'Header & Footer', link: '/table-features/header-and-footer' },
              { text: 'Columns', link: '/table-features/columns' },
              { text: 'Rows', link: '/table-features/rows' },
              { text: 'Pagination', link: '/table-features/pagination' },
              { text: 'Buttons', link: '/table-features/button-class' },
              { text: 'Bulk Actions', link: '/table-features/bulk-actions' },
              { text: 'Conditional Rules', link: '/table-features/conditional-rules' },
              { text: 'Filters', link: '/table-features/filters' },
              { text: 'Searching Data', link: '/table-features/searching-data' },
              { text: 'Sorting Data', link: '/table-features/sorting-data' },
              { text: 'Updating Data', link: '/table-features/updating-data' },
              { text: 'Exporting Data', link: '/table-features/exporting-data' },
        ],
        collapsed: false,
        collapsible: false,
      },
      {
        text: '🛠️ Expanding PowerGrid',
        items: [
          { text: 'Perfomance Monitoring', link: '/expanding-powergrid/performance-monitoring' },
          { text: 'Publish Views', link: '/expanding-powergrid/publish-views' },
          { text: 'Custom Theme', link: '/expanding-powergrid/custom-theme' },
        ],
        collapsed: false
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Power-Components/livewire-powergrid' },
    ],
    footer: {
      message: 'Created By Luan Freitas and @DanSysAnalyst',
    },
    editLink: {
      pattern: 'https://github.com/power-components/powergrid-doc/edit/5x/docs/:path',
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
