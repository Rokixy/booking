<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import tagsModel from "@/models/tagsModel";

tagsModel.fetch();
export default class Lables extends Vue {
  tags = tagsModel.data;

  createTag() {
    console.log(this.tags === tagsModel.data);
    const name = window.prompt("请输入标签名");
    const result = tagsModel.create(name || "");
    if (result === "duplicated") {
      window.alert("标签名已存在");
    } else if (result === "empty") {
      window.alert("标签名不能为空");
    } else if (result === "success") {
      window.alert("添加成功");
    }
    console.log(this.tags === tagsModel.data);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>