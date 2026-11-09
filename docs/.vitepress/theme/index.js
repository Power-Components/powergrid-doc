import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import TablePreview from './components/TablePreview.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('TablePreview', TablePreview)
  },
}
