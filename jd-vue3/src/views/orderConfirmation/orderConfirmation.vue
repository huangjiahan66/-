<template>
  <!-- 确认订单页面 -->
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import TopArea from "./TopArea.vue";
import ProductList from "./ProductList.vue";
import Order from "./Order.vue";

export default {
  name: "OrderConfirmation",
  components: {
    TopArea,
    ProductList,
    Order,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "../../style/minxins.scss";
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #eee;
  overflow-y: scroll;
}
</style>
