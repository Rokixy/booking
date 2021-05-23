import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'

createApp(App).use(store).use(router).component('Layout', Layout).component('Icon', Icon).mount('#app')
