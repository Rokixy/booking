<template>
  <Layout class-prefix="layout">
    <Types v-model:value="this.record.type" />
    <Tags v-model:data-source="tags" @update:value="onSelectTag" />
    <FormItem
      :fieldName="'备注'"
      :placeholder="'在这里输入备注'"
      @update:value="onUpdateNote"
    />
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
import tagsModel from "@/models/tagsModel";

const recordsList: RecordItem[] = recordsModel.fetch();
const tagsList = tagsModel.fetch();

@Options({
  components: { NumberPad, FormItem, Types, Tags },
  watch: {
    records: {
      handler(value: RecordItem[]) {
        recordsModel.save(value);
      },
      deep: true,
    },
  },
})
export default class Money extends Vue {
  tags = tagsList;
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
    const newRecord: RecordItem = recordsModel.clone(this.record);
    newRecord.createdAt = new Date();
    this.records.push(newRecord);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>