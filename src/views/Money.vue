<template>
  <Layout class-prefix="layout">
    <Types v-model:value="this.record.type" />
    <FormItem
      :fieldName="'备注'"
      :placeholder="'在这里输入备注'"
      @update:value="onUpdateNote"
    />
    <Tags @update:value="onSelectTag" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/FormItem.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import store from "@/store/index";

@Options({
  components: { NumberPad, FormItem, Types, Tags },
})
export default class Money extends Vue {
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
    }
    store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>