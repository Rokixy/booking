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
import tagsModel from "@/models/tagsModel";
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue";

@Options({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagsModel.fetch();
    const tags = tagsModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      tagsModel.update(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      tagsModel.remove(this.tag.id);
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