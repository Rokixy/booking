import { reactive } from 'vue'

const localStorageKeyName = 'tags';

type Tag = {
    id: string;
    name: string;
}
type TagsModel = {
    data: Tag[];
    fetch: () => Tag[];
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
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        } else if (name.length === 0) {
            return 'empty';
        }
        this.data.push({ id: name, name: name });
        this.save();
        return 'success';
    }
}

export default tagsModel;