import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'


createApp(App).use(store).use(router).component('Layout', Layout).mount('#app')
