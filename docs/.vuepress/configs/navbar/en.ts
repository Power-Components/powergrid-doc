import type { NavbarConfig } from '@vuepress/theme-default'
import {LATEST} from "../version";

export const navbarEn: NavbarConfig = [
    {
        text: 'Get Started',
        link:  '/' + LATEST + '/get-started/',
    },
    {
        text: 'PowerGrid Table',
        link: '/table/',
        children: [
            '/' + LATEST + '/table/features-setup.md',
            '/' + LATEST + '/table/datasource.md',
            '/' + LATEST + '/table/add-columns.md',
            '/' + LATEST + '/table/include-columns.md',
            '/' + LATEST + '/table/column-filters.md',
            '/' + LATEST + '/table/column-summary.md',
            '/' + LATEST + '/table/cell-actions-buttons.md',
            '/' + LATEST + '/table/row-actions-buttons.md',
            '/' + LATEST + '/table/bulk-actions.md',
            '/' + LATEST + '/table/action-rules.md',
            '/' + LATEST + '/table/update-data.md',
            '/' + LATEST + '/table/queue-export.md',
            '/' + LATEST + '/table/component-settings.md',
            '/' + LATEST + '/table/detail-row.md',
        ],
    },
    {
        text: `3.x`,
        children: [
            {
                text: `2.x`,
                link: 'https://v2.livewire-powergrid.com',
            },
        ],
    },
]
