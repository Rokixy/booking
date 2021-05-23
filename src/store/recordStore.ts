import recordsModel from '@/models/recordsModel'
export default {
    // record store
    recordList: recordsModel.fetch(),
    createRecord: (record: RecordItem) => {
        recordsModel.create(record);
    },
}