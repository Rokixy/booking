type RecordItem = {
    tag: string;
    note: string;
    type: string;
    amount: number;
    createdAt?: string;
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