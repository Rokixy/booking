import { reactive } from 'vue';
import clone from "@/lib/clone";

const localStorageKeyName = 'records';

const recordStore = {
    // record store
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = reactive(JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]);
        return this.recordList;
    },
    createRecord(record: RecordItem) {
        const newRecord: RecordItem = clone(record);
        newRecord.createdAt = new Date();
        this.recordList?.push(newRecord);
        this.saveRecords();
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    }
}

recordStore.fetchRecords();

export default recordStore;