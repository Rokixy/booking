<template>
  <Layout class-prefix="layout">
    <Tabs :dataSource="recordTypeList" v-model:value="record.type" />
    <FormItem
      :fieldName="'备注'"
      :placeholder="'在这里输入备注'"
      v-model:value="record.note"
    />
    <Tags @update:value="onSelectTag" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import store from "@/store/index";
import recordTypeList from "@/constants/recordTypeList";

@Options({
  components: { NumberPad, FormItem, Tags, Tabs },
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  created() {
    store.commit("fetchRecords");
  }
  record: RecordItem = {
    tag: "",
    note: "",
    type: "-",
    amount: 0,
  };
  get records() {
    return store.state.recordList;
  }

  onSelectTag(value: string) {
    this.record.tag = value;
  }
  onUpdateNote(value: string) {
    this.record.note = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    if (this.record.amount === 0) {
      window.alert("没有东西被计入账本，请填写金额");
      return;
    } else if (!this.record.tag || this.record.tag.length === 0) {
      return window.alert("请选择一个标签");
    }
    store.commit("createRecord", this.record);
    if (store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.note = "";
    }
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>