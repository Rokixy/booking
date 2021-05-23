<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from "@/store/index2";
export default {
  data() {
    return {
      store: store,
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  line-height: 1.5;
  font-size: 16px;
  background: #f5f5f5;
}
</style>
