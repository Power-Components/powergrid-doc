import type { HeadConfig } from '@vuepress/core'

export const head: HeadConfig[] = [
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
]
