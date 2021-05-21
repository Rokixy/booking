<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="addContent">1</button>
      <button @click="addContent">2</button>
      <button @click="addContent">3</button>
      <button @click="backSpace">删除</button>
      <button @click="addContent">4</button>
      <button @click="addContent">5</button>
      <button @click="addContent">6</button>
      <button @click="clear">清空</button>
      <button @click="addContent">7</button>
      <button @click="addContent">8</button>
      <button @click="addContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="addContent" class="zero">0</button>
      <button @click="addContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class NumberPad extends Vue {
  output = "0";
  addContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;

    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
    } else {
      if (this.output.indexOf(".") >= 0 && input === ".") {
        return;
      }
      this.output += input;
    }
  }

  clear() {
    this.output = "0";
  }

  backSpace() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  ok() {
    this.$emit("update:value", this.output);
    this.$emit("submit", this.output);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 8px 16px;
    text-align: right;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64px * 2;
        float: right;
      }
      &.zero {
        width: 25% * 2;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4% * 2);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4% * 3);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4% * 4);
      }
      &:nth-child(14) {
        background: darken($bg, 4% * 5);
      }
      &:nth-child(12) {
        background: darken($bg, 4% * 6);
      }
    }
  }
}
</style>