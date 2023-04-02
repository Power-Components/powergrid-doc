import {defaultTheme, defineUserConfig} from 'vuepress'

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
        repo: 'Power-Components/powergrid-doc',
        docsDir: 'docs',
        docsBranch: 'main',
        locales: {
            '/': {
                navbar: navbarEn,
                sidebar: sidebarEn,
                editLinkText: 'Edit this page on GitHub',
            },
        }
    }),
    plugins: [
    ],
})
