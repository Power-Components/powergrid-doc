import type { NavbarConfig } from '@vuepress/theme-default'

const VERSION = '3.x'

export const navbarEn: NavbarConfig = [
    {
        text: 'Get Started',
        link:  '/' + VERSION + '/get-started/',
    },
    {
        text: 'PowerGrid Table',
        link: '/table/',
        children: [
            '/' + VERSION + '/table/features-setup.md',
            '/' + VERSION + '/table/datasource.md',
            '/' + VERSION + '/table/add-columns.md',
            '/' + VERSION + '/table/include-columns.md',
            '/' + VERSION + '/table/column-filters.md',
            '/' + VERSION + '/table/column-summary.md',
            '/' + VERSION + '/table/cell-actions-buttons.md',
            '/' + VERSION + '/table/row-actions-buttons.md',
            '/' + VERSION + '/table/bulk-actions.md',
            '/' + VERSION + '/table/action-rules.md',
            '/' + VERSION + '/table/update-data.md',
            '/' + VERSION + '/table/queue-export.md',
            '/' + VERSION + '/table/component-settings.md',
            '/' + VERSION + '/table/detail-row.md',
        ],
    },
    {
        text: `Version 3.x`,
        children: [
            {
                text: `Version 2.x`,
                link: 'https://v2.livewire-powergrid.com',
            },
        ],
    },
]
