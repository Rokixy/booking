import { createStore } from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/idCreator"

interface State {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
}

const store = createStore<State>({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('records') || '[]');
    },
    createRecord(state, record) {
      const newRecord = clone(record);
      newRecord.createdAt = new Date();
      state.recordList.push(newRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('records', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tags') || '[]');
    },
    createTag(state, name) {
      const id = createId().toString()
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名已存在");
        return 'duplicated';
      } else {
        state.tagList.push({ id, name: name });
        store.commit('saveTags');
        window.alert("添加成功");
        return 'success';
      }
    },
    removeTag(state, id) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        return false;
      } else {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        return true;
      }
    },
    updateTag(state, { id, name }) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          return;
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
          return;
        }
      } else {
        return;
      }
    },
    setCurrentTag(state, id) {
      store.commit('fetchTags');
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    saveTags(state) {
      window.localStorage.setItem('tags', JSON.stringify(state.tagList));
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;