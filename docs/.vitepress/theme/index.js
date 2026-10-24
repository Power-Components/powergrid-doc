import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-top': () => h('div', { class: 'pg-version-banner' }, [
      'Viewing the 6.x docs. ',
      // target="_self" makes VitePress do a full page load: the latest docs live outside this /6.x/ app.
      h('a', { href: 'https://livewire-powergrid.com/', target: '_self' }, 'Go to 7.x (latest) →'),
    ]),
  }),
}
