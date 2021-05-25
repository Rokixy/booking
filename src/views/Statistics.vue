<template>
  <Layout class-prefix="layout">
    <Tabs
      :classPrefix="'type'"
      :dataSource="recordTypeList"
      v-model:value="type"
    />
    <Tabs
      :classPrefix="'interval'"
      :dataSource="intervalList"
      v-model:value="interval"
    />
    <ol class="records">
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ item.tag.name || "无" }}</span>
            <span class="note">{{ item.note }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ item.tag.name || "无" }}</span>
            <span class="note">{{ item.note }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import store from "@/store";

@Options({
  components: { Tabs },
})
export default class Statistics extends Vue {
  created() {
    store.commit("fetchRecords");
  }
  get recordList() {
    return store.state.recordList;
  }
  get result() {
    const { recordList } = this;
    type HashTabelValue = { title: string; items: RecordItem[] };
    const hashTabel: { [key: string]: HashTabelValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTabel[date] = hashTabel[date] || { title: date, items: [] };
      hashTabel[date].items.push(recordList[i]);
    }
    console.log(hashTabel);
    return hashTabel;
  }
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
:deep(.type-tabs-item) {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
:deep(.interval-tabs-item) {
  height: 48px;
}
:deep(.layout-content) {
  display: flex;
  flex-direction: column;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: white;
}
.note {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.records {
  overflow: auto;
}
</style>