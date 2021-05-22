<template>
  <Layout>
    <div>
      <Icon name="left" />
      <span>编辑标签</span>
    </div>
    <FormItem :fieldName="'标签名'" :placeholder="'在这里输入标签名'" />
    <Button>删除标签</Button>
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
  created() {
    const id = this.$route.params.id;
    tagsModel.fetch();
    const tags = tagsModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>