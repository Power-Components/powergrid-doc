import type { SidebarConfig } from '@vuepress/theme-default'
import {table} from "../table";

const VERSION = '3.x'

export const sidebarEn: SidebarConfig = {
    '/3.x/get-started/': [
        {
            text: 'Get Started',
            children: [
                '/' + VERSION + '/get-started/README.md',
                '/' + VERSION + '/get-started/release-notes.md',
                '/' + VERSION + '/get-started/upgrade-guide.md',
                '/' + VERSION + '/get-started/troubleshooting.md',
                '/' + VERSION + '/get-started/support.md',
                '/' + VERSION + '/get-started/demo.md',
                '/' + VERSION + '/get-started/install.md',
                '/' + VERSION + '/get-started/configure.md',
                '/' + VERSION + '/get-started/create-powergrid-table.md',
                '/' + VERSION + '/get-started/use-your-powergrid-table.md',
            ],
        },
    ],
    '/3.x/table/': [
        {
            text: 'PowerGrid Table',
            children: table,
        },
    ],
}
