import { reactive } from 'vue';
import clone from "@/lib/clone"
const localStorageKeyName = 'records';
const recordsModel = {
    data: [] as RecordItem[],
    fetch() {
        this.data = reactive(JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]);
        return this.data;
    },
    create(record: RecordItem) {
        const newRecord: RecordItem = clone(record);
        newRecord.createdAt = new Date();
        this.data.push(newRecord);
        this.save();
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
}

export default recordsModel;