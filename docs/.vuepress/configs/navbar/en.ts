import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
    {
        text: 'Get Started',
        link: 'https://v4.livewire-powergrid.com/get-started/',
    },
    {
        text: `Version 4.x`,
        children: [
            {
                text: `Version 3.x`,
                link: 'https://v3.livewire-powergrid.com',
            },
            {
                text: `Version 2.x`,
                link: 'https://v2.livewire-powergrid.com',
            },
        ],
    },
]
