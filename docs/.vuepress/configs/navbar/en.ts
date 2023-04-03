import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
    {
        text: 'Get Started',
        link: 'https://v4.livewire-powergrid.com/get-started/',
        target: '_self'
    },
    {
        text: `4.x`,
        children: [
            {
                text: `3.x`,
                link: 'https://v3.livewire-powergrid.com',
            },
            {
                text: `2.x`,
                link: 'https://v2.livewire-powergrid.com',
            },
        ],
    },
]
