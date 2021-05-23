import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import tagsModel from './models/tagsModel'
import recordsModel from './models/recordsModel'

// record store
window.recordList = recordsModel.fetch()
window.createRecord = (record: RecordItem) => {
    recordsModel.create(record);
}

// tag store
window.tagList = tagsModel.fetch()
window.createTag = (name: string) => {
    const result = tagsModel.create(name || "");
    if (result === "duplicated") {
        window.alert("标签名已存在");
    } else if (result === "success") {
        window.alert("添加成功");
    }
}
window.removeTag = (id: string) => {
    return tagsModel.remove(id);
}
window.updateTag = (id: string, name: string) => {
    return tagsModel.update(id, name);
}
window.findTag = (id: string) => {
    return window.tagList.filter((t) => t.id === id)[0];
}

createApp(App).use(store).use(router).component('Layout', Layout).component('Icon', Icon).mount('#app')
