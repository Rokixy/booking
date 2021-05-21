<template>
  <Layout class-prefix="layout">
    <Types v-model:value="this.record.type" />
    <Tags v-model:data-source="tags" @update:value="onSelectTag" />
    <Notes @update:value="onUpdateNote" />
    <NumberPad @update:value="onUpdateAmount" />
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
};
@Options({
  components: { NumberPad, Notes, Types, Tags },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tag: "",
    note: "",
    type: "-",
    amount: 0,
  };
  onSelectTag(value: string) {
    this.record.tag = value;
  }
  onUpdateNote(value: string) {
    this.record.note = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>