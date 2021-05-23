type RecordItem = {
    tag: string;
    note: string;
    type: string;
    amount: number;
    createdAt?: Date;
}

type Tag = {
    id: string;
    name: string;
}
type TagsModel = {
    data: Tag[];
    fetch: () => Tag[];
    save: () => void;
    create: (name: string) => 'success' | 'duplicated';
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
    remove: (id: string) => boolean
}
interface Window {
    tagList: Tag[];
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: TagsModel['update'];
    findTag: (id: string) => Tag | undefined;
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
}