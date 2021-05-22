<template>
  <div>
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <input
        type="text"
        :value="value"
        @change="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      />
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
    value: {
      default: "",
    },
  },
})
export default class FormItem extends Vue {
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>
<style lang="scss" scoped>
.formItem {
  font-size: 14px;
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