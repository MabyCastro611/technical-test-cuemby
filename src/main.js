import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import './input.css'
import '@ocrv/vue-tailwind-pagination/styles'




createApp(App).use(router).mount('#app')
