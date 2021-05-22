import { reactive } from 'vue'

const localStorageKeyName = 'tags';

type TagsModel = {
    data: string[];
    fetch: () => string[];
    save: () => void;
    create: (name: string) => 'success' | 'duplicated' | 'empty';
}

const tagsModel: TagsModel = {
    data: [],
    fetch() {
        this.data = reactive(JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]'))
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name) {
        console.log('name: ' + name)
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated';
        } else if (name.length === 0) {
            return 'empty';
        }
        this.data.push(name);
        this.save();
        return 'success';
    }
}

export default tagsModel;