<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag"
        :class="{ selected: tag === selectedTag }"
        @click="select(tag)"
      >
        {{ tag }}
      </li>
      <li class="new" @click="create">+</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  watch: {
    selectedTag: function (value: string) {
      this.$emit("update:value", value);
    },
  },
})
export default class Tags extends Vue {
  @Prop(Array) dataSource: string[] | undefined;
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
    if (name === "") {
      window.alert("标签名不能为空");
    } else if (this.dataSource) {
      if (this.dataSource?.indexOf(name as string) >= 0) {
        window.alert("此标签名已存在");
      } else {
        this.$emit("update:dataSource", [...this.dataSource, name]);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
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