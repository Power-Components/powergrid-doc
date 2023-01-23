import type { SidebarConfig } from '@vuepress/theme-default'
import {table} from "../table";
import {LATEST} from "../version";

export const sidebarEn: SidebarConfig = {
    '/3.x/get-started/': [
        {
            text: 'Get Started',
            children: [
                '/' + LATEST + '/get-started/README.md',
                '/' + LATEST + '/get-started/release-notes.md',
                '/' + LATEST + '/get-started/upgrade-guide.md',
                '/' + LATEST + '/get-started/troubleshooting.md',
                '/' + LATEST + '/get-started/support.md',
                '/' + LATEST + '/get-started/demo.md',
                '/' + LATEST + '/get-started/install.md',
                '/' + LATEST + '/get-started/configure.md',
                '/' + LATEST + '/get-started/create-powergrid-table.md',
                '/' + LATEST + '/get-started/use-your-powergrid-table.md',
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
