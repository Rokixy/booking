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
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3>
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
import dayjs from "dayjs";
import clone from "@/lib/clone";

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
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }

    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    const result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 0; i < newList.length; i++) {
      const current = dayjs(newList[i].createdAt);
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(current, "day")) {
        last.items.push(newList[i]);
      } else {
        result.push({
          title: current.format("YYYY-MM-DD"),
          items: [newList[i]],
        });
      }
    }

    return result;
  }
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  beautify(str: string) {
    const now = dayjs();
    const createdAt = dayjs(str);
    if (createdAt.isSame(now, "day")) {
      return "今天";
    } else if (createdAt.isSame(now.add(-1, "day"), "day")) {
      return "昨天";
    } else if (createdAt.isSame(now.add(-2, "day"), "day")) {
      return "前天";
    } else {
      if (createdAt.isSame(now, "year")) {
        return createdAt.format("M月D日");
      } else {
        return createdAt.format("YYYY年M月D日");
      }
    }
  }
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