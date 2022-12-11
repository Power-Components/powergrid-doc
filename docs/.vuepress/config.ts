import {defaultTheme, defineUserConfig} from 'vuepress'
import {docsearchPlugin} from '@vuepress/plugin-docsearch'

import {
    navbarEn,
    sidebarEn,
    head,
} from './configs'

export default defineUserConfig({
    lang: 'en-US',
    title: 'Livewire Powergrid',
    description: 'Description',
    head,
    theme: defaultTheme({
        logo: '/_media/logomark@1x.png',
        repo: 'power-components/powergrid-doc',
        docsDir: 'main',
        locales: {
            '/': {
                navbar: navbarEn,
                sidebar: sidebarEn,
                editLinkText: 'Edit this page on GitHub',
            },
        }
    }),
    plugins: [
        docsearchPlugin({
            appId: '7M4C366U6U',
            apiKey: 'cd810107dfeb4a3dc190959e3855db56',
            indexName: 'livewire-powergridLivewire Powergrid',
        }),

    ],
})
