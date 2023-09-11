import {defaultTheme, defineUserConfig} from 'vuepress'
import {docsearchPlugin} from '@vuepress/plugin-docsearch'

import {
    navbarEn,
    sidebarEn,
    head,
} from './configs'

export default defineUserConfig({
    lang: 'en-US',
    title: 'Livewire PowerGrid',
    description: 'Description',
    head,
    theme: defaultTheme({
        logo: '/_media/logomark@1x.png',
        repo: 'power-components/powergrid-doc',
        docsDir: 'docs',
        docsBranch: '5x',
        locales: {
            '/': {
                navbar: navbarEn,
                sidebar: sidebarEn,
                editLinkText: 'Edit this page on GitHub',
            },
        },
        sidebarDepth: 3
    }),
    plugins: [
        docsearchPlugin({
            appId: '7M4C366U6U',
            apiKey: '0a0022f159f38849b0dbd2199c12f081',
            indexName: 'livewire-powergridPowergrid v5',
        }),
    ],
})
