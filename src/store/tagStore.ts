import tagsModel from '@/models/tagsModel'
export default {
    // tag store
    tagList: tagsModel.fetch(),
    createTag: (name: string) => {
        const result = tagsModel.create(name || "");
        if (result === "duplicated") {
            window.alert("标签名已存在");
        } else if (result === "success") {
            window.alert("添加成功");
        }
    },
    removeTag: (id: string) => {
        return tagsModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagsModel.update(id, name);
    },
    findTag(id: string) {
        return this.tagList.filter((t) => t.id === id)[0];
    },
}