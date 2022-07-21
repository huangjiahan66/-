<template>
  <div class="order">
    <div class="order__price">
      实付金额<b>{{ price }}</b>
    </div>
    <div
      class="order__btn"
      @click="handleSubmitClick(true)"
      v-show="showSubmitBtn"
    >
      提交订单
    </div>
  </div>

  <div class="mask" v-show="showConfirm" @click="handleSubmitClick(false)">
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确定要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则 将取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { post } from "../../utils/request";
import { useCartCommonEffect } from "../../erffects/CartEffect";

// 遮罩层 逻辑
const useMaskShowEffect = () => {
  const showConfirm = ref(false);
  const handleSubmitClick = (status) => {
    showConfirm.value = status;
  };

  return { showConfirm, handleSubmitClick };
};

const useMakeOrderEffect = (shopId, shopName, productList, addressId) => {
  const store = useStore();
  const router = useRouter();
  const handleConfirmOrder = async (isCanceled) => {
    const products = [];
    for (let i in productList.value) {
      const product = productList.value[i];
      products.push({ id: parseInt(product._id), num: product.count });
    }
    try {
      const res = await post("/api/order", {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products,
      });
      if (res?.errno === 0) {
        const cartList = JSON.parse(localStorage.cartList || "{}");
        delete cartList[shopId];
        localStorage.cartList = JSON.stringify(cartList);
        store.commit("clearCartData", shopId);
        router.push({ name: "orderlist" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleConfirmOrder };
};
export default {
  setup() {
    const route = useRoute();
    const shopId = parseInt(route.params.id); //商铺id
    const { price, shopName, productList } = useCartCommonEffect(shopId);

    const { showConfirm, handleSubmitClick } = useMaskShowEffect();
    const { handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList,
      route.query.addressId
    );
    return {
      price,
      handleConfirmOrder,
      showConfirm,
      handleSubmitClick,
      showSubmitBtn: !!route.query.addressId, //如果url有id
    };
  },
};
</script>

<style lang="scss" scoped>
.order {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: #fff;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: #333;
  }
  &__btn {
    width: 0.98rem;
    background: #4fb0f9;
    color: #fff;
    text-align: center;
    font-size: 0.14rem;
  }
}

.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &__content {
    width: 3.01rem;
    height: 1.56rem;
    background: #fff;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      color: #333;
      margin: 0.24rem 0 0 0.24rem;
    }
    &__desc {
      font-size: 0.14rem;
      color: #666666;
      margin: 0.08rem 0 0 0;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border: 0.01rem solid #4fb0f9;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        border: 0.01rem solid #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>
