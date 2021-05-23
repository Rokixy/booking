<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: tag === selectedTag }"
        @click="select(tag)"
      >
        {{ tag.name }}
      </li>
      <li class="new" @click="create">+</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import store from "@/store/index2";

@Options({
  watch: {
    selectedTag: function (value: string) {
      this.$emit("update:value", value);
    },
  },
})
export default class Tags extends Vue {
  tagList = store.tagList;
  selectedTag = "";
  select(tag: string) {
    if (tag === this.selectedTag) {
      return;
    } else {
      this.selectedTag = tag;
    }
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (name) {
      store.createTag(name);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  > .current {
    padding-top: 16px;
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.new {
        font-size: 24px;
      }
      &.selected {
        background: darken($color: $bg, $amount: 30%);
        color: white;
      }
    }
  }
}
</style>