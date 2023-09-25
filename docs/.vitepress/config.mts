import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "Livewire PowerGrid",
  description: "A PowerGrid Docs",
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/_media/logomark@2x.png`,
      },
    ],
    ['meta', { name: 'og:title', content: 'Livewire Powergrid - Version 4'}],
    ['meta', { name: 'og:description', content: 'Livewire PowerGrid is a component for generating dynamic tables with your Laravel Models and Collections.'}],
    ['meta', { name: 'application-name', content: 'Livewire Powergrid' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Livewire Powergrid' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  appearance: 'dark',
  lang: 'en-US',
  themeConfig: {
    logo: '/_media/logomark@1x.png',
    siteTitle: 'Livewire PowerGrid',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '5.x',
        items: [
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
        text: 'Get Started',
        items: [
          { text: 'Introduction', link: '/get-started/introduction' },
          { text: 'Release Notes', link: '/get-started/release-notes' },
          { text: 'Upgrade Guide', link: '/get-started/upgrade-guide' },
          { text: 'Troubleshooting', link: '/get-started/troubleshooting' },
          { text: 'Support', link: '/get-started/support' },
          { text: 'Install', link: '/get-started/install' },
          { text: 'Configure', link: '/get-started/configure' },
          { text: 'Create a PowerGrid Table', link: '/get-started/create-powergrid-table' },
        ],
        collapsed: true
      },
      {
        text: 'PowerGrid Table',
        items: [
          { text: 'Features Setup', link: '/table/features-setup' },
          { text: 'Datasource', link: '/table/datasource' },
          { text: 'Add Columns', link: '/table/add-columns' },
          { text: 'Include Columns', link: '/table/include-columns' },
          { text: 'Column Summary', link: '/table/column-summary' },
          { text: 'Cell Action Buttons', link: '/table/cell-actions-buttons' },
          { text: 'Row Action buttons', link: '/table/row-actions-buttons' },
          { text: 'Action Rules', link: '/table/action-rules' },
          { text: 'Component Settings', link: '/table/component-settings' },
          { text: 'Custom Theme', link: '/table/custom-theme' },
        ],
        collapsed: true
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Power-Components/powergrid-doc' },
      { icon: 'twitter', link: 'https://twitter.com/luanfreitasdev' },
    ],
    footer: {
      message: 'Created By Luan Freitas and DanSysAnalyst',
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
        indexName: 'livewire-powergridLivewire Powergrid',
      }
    }
  },
  sitemap: {
    hostname: 'https://livewire-powergrid.com'
  }
})
