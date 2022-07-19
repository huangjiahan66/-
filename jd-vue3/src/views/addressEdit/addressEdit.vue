<template>
  <div class="wrapper">
    <div class="title">编辑地址</div>
  </div>
</template>

<script>
export default {
  name: "AddressEdit",
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "../../style/valriables.scss";
@import "../../style/minxins.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: #eee;
}
.title {
  position: relative;
  line-height: 0.44rem;
  background: $bgColor;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
  &__create {
    position: absolute;
    right: 0.18rem;
    float: right;
  }
}
</style>
