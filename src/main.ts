import { createSSRApp } from 'vue'
import VueTouch from 'vue3-touch-events'
import App from './App.vue'
import './static/styles/common.scss'

export function createApp() {
  const app = createSSRApp(App).use(VueTouch, { name: 'v-touch' })
  return {
    app
  }
}
