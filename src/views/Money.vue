<template>
  <Layout class-prefix="layout">
    <Types v-model:value="this.record.type" />
    <FormItem
      :fieldName="'备注'"
      :placeholder="'在这里输入备注'"
      @update:value="onUpdateNote"
    />
    <Tags v-model:data-source="tags" @update:value="onSelectTag" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/FormItem.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import recordsModel from "@/models/recordsModel";

const recordsList: RecordItem[] = recordsModel.fetch();

@Options({
  components: { NumberPad, FormItem, Types, Tags },
  watch: {
    records: {
      handler() {
        recordsModel.save();
      },
    },
  },
})
export default class Money extends Vue {
  tags = window.tagList;
  record: RecordItem = {
    tag: "",
    note: "",
    type: "-",
    amount: 0,
  };
  records: RecordItem[] = recordsList;

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
    recordsModel.create(this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>