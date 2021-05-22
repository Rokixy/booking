<template>
  <div>
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <input type="text" v-model="value" :placeholder="placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    fieldName: {
      type: String,
      required: true,
    },
    placeholder: String,
  },
  watch: {
    value: function (value: string) {
      this.$emit("update:value", value);
    },
  },
})
export default class FormItem extends Vue {
  value = "";
}
</script>
<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  background: #f5f5f5;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>