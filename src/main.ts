import { createSSRApp } from 'vue'
import App from './App.vue'
// import JsonViewer from 'vue-json-viewer-next'

export function createApp() {
  const app = createSSRApp(App)
  // app.use(JsonViewer)
  return {
    app
  }
}
