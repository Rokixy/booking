<template>
  <nav>
    <router-link :to="{ path: '/labels' }" class="item">
      <Icon name="label" />
      <span>标签</span>
    </router-link>
    <router-link :to="{ path: '/money' }" class="item">
      <Icon name="money" />
      <span>记账</span>
    </router-link>
    <router-link :to="{ path: '/statistics' }" class="item">
      <Icon name="statistic" />
      <span>统计</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: $color-highlight;
  }
}
</style>