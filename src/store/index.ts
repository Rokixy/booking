import { createStore } from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/idCreator"

interface State {
  recordList: RecordItem[],
  tagList: Tag[],
  createRecordError: Error | null,
  createTagError: Error | null,
  currentTag?: Tag,
}

const store = createStore<State>({
  state: {
    recordList: [],
    tagList: [],
    createRecordError: null,
    createTagError: null,
    currentTag: undefined,
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('records') || '[]');
    },
    createRecord(state, record) {
      const newRecord: RecordItem = clone(record);
      newRecord.createdAt = new Date().toISOString();
      state.recordList.push(newRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('records', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tags') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createTag(state, name) {
      state.createRecordError = null;
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('duplicated');
      } else {
        const id = createId().toString()
        state.tagList.push({ id, name: name });
        store.commit('saveTags');
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