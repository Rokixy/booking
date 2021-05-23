<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        :fieldName="'标签名'"
        :placeholder="'在这里输入标签名'"
        @update:value="update"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue";
import store from "@/store/index";

@Options({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  get tag() {
    return store.state.currentTag;
  }
  created() {
    store.commit("setCurrentTag", this.$route.params.id as string);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      store.commit("updateTag", { id: this.tag.id, name });
    }
  }
  remove() {
    if (this.tag) {
      store.commit("removeTag", this.tag.id);
      if (store.state.currentTag) {
        this.$router.back();
      }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .leftIcon,
  .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  margin-top: 8px;
  background: white;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>