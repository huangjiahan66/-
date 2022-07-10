<template>
  <div>
    <div class="wrapper">
      <StaticPart />
      <Nearby />
    </div>
    <Docker />
  </div>
</template>

<script>
import StaticPart from "./StaticPart.vue";
import Nearby from "./Nearby.vue";
import Docker from "./Docker.vue";
export default {
  components: {
    StaticPart,
    Nearby,
    Docker,
  },
};
</script>

<style lang="scss">
@import "../../style/valriables.scss";
@import "../../style/minxins.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  // background: pink;
  padding: 0 0.18rem;
}
</style>
