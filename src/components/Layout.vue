<template>
  <div class="wrapper" :class="classPrefix&& `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix&& `${classPrefix}-content`">
      <slot />
    </div>
    <Nav></Nav>
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
export default {
  props: ["classPrefix"],
  name: "Layout",
  components: { Nav },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>