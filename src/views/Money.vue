<template>
  <Layout class-prefix="layout">
    <Types v-model:value="this.record.type" />
    <Tags v-model:data-source="tags" @update:value="onSelectTag" />
    <Notes @update:value="onUpdateNote" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import NumberPad from "@/components/Money/NumberPad.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";

type Record = {
  tag: string;
  note: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
@Options({
  components: { NumberPad, Notes, Types, Tags },
  watch: {
    records: {
      handler(value: Record[]) {
        window.localStorage.setItem("records", JSON.stringify(value));
      },
      deep: true,
    },
  },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tag: "",
    note: "",
    type: "-",
    amount: 0,
  };
  records: Record[] = JSON.parse(
    window.localStorage.getItem("records") || "[]"
  );

  onSelectTag(value: string) {
    this.record.tag = value;
  }
  onUpdateNote(value: string) {
    this.record.note = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord(value: string) {
    const newRecord: Record = JSON.parse(JSON.stringify(this.record));
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