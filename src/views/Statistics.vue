<template>
  <Layout>
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
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Options({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
:deep(.type-item) {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>