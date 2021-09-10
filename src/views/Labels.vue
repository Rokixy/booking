<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">创建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Button from "@/components/Button.vue";
import store from "@/store/index";
import createTagErrors from "@/constants/createTagErrors";

@Options({
  components: { Button },
})
export default class Lables extends Vue {
  created() {
    store.commit("fetchTags");
  }
  get tags() {
    return store.state.tagList;
  }
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      store.commit("createTag", name);
      if (store.state.createTagError) {
        window.alert(
          createTagErrors[store.state.createTagError.message] || "未知错误"
        );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
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
.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>