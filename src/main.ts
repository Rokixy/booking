import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import tagsModel from './models/tagsModel'

window.tagList = tagsModel.fetch()
window.createTag = (name: string) => {
    const result = tagsModel.create(name || "");
    if (result === "duplicated") {
        window.alert("标签名已存在");
    } else if (result === "success") {
        window.alert("添加成功");
    }
}

createApp(App).use(store).use(router).component('Layout', Layout).component('Icon', Icon).mount('#app')
