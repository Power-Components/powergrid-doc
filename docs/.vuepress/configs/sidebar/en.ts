import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
    '/get-started/': [
        {
            text: 'Get Started',
            children: [
                '/get-started/README.md',
                '/get-started/release-notes.md',
                '/get-started/upgrade-guide.md',
                '/get-started/troubleshooting.md',
                '/get-started/support.md',
                '/get-started/demo.md',
                '/get-started/install.md',
                '/get-started/configure.md',
                '/get-started/create-powergrid-table.md',
                '/get-started/use-your-powergrid-table.md',
            ],
        },
    ],
    '/table/': [
        {
            text: 'Powergrid Table',
            children: [
                '/table/features-setup.md',
                '/table/datasource.md',
                '/table/add-columns.md',
                '/table/include-columns.md',
                '/table/column-filters.md',
                '/table/column-summary.md',
                '/table/cell-actions-buttons.md',
                '/table/row-actions-buttons.md',
                '/table/bulk-actions.md',
                '/table/action-rules.md',
                '/table/update-data.md',
                '/table/queue-export.md',
                '/table/component-settings.md',
                '/table/detail-row.md',
                '/table/custom-theme.md',
            ],
        },
    ],
}
