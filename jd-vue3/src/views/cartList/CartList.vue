<template>
  <div class="wrapper">
    <div class="title">我的全部购物车</div>
    <div
      class="cart"
      v-for="(cart, key) in list"
      :key="key"
      @click="handleCartClick(key)"
    >
      <div class="cart__title">{{ cart.shopName }}</div>
      <div
        class="cart__item"
        v-for="(product, innerKey) in cart.productList"
        :key="innerKey"
      >
        <img :src="product.imgUrl" class="cart__item__image" />
        <div class="cart__content">
          <p class="cart__content__title">{{ product.name }}</p>
          <p class="cart__content__price">
            <span class="yen">&yen;</span>
            {{ product.price }} X {{ product.count }}
            <span class="cart__content__total">
              <span class="yen">&yen;</span>
              {{ (product.price * product.count).toFixed(2) }}
            </span>
          </p>
        </div>
      </div>
      <div class="cart__total">共计{{ cart.total }}件</div>
    </div>
    <div v-if="Object.keys(list).length === 0" class="cart__empty">
      暂无购物数据
    </div>
  </div>
  <Docker :currentIndex="1" />
</template>

<script>
import Docker from "../../components/Docker.vue";
import { useRouter } from "vue-router";

export default {
  name: "orderlist",
  components: {
    Docker,
  },
  setup() {
    const router = useRouter();
    const list = JSON.parse(localStorage.cartList || "[]");
    //算购物车总件数的逻辑
    for (const i in list) {
      const cart = list[i];
      const productList = cart.productList;
      let total = 0;
      for (let j in productList) {
        const product = productList[j];
        total += product["count"];
        console.log(productList[j]);
      }
      cart.total = total;
    }
    const handleCartClick = (key) => {
      router.push(`/orderConfirmation/${key}`);
    };
    return { list, handleCartClick };
  },
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
  line-height: 0.44rem;
  background: $bgColor;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
}

.cart {
  margin: 0.16rem;
  background: #ffff;
  padding-bottom: 0.16rem;
  &__title {
    padding: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: #333;
    @include ellisps;
  }
  &__item {
    display: flex;
    margin-bottom: 0.16rem;
    padding: 0 0.16rem 0.16rem 0.16rem;
    &__image {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
  }
  &__content {
    flex: 1;
    &__title {
      margin: 0;
      font-size: 0.14rem;
      color: #333;
      line-height: 0.2rem;
    }
    &__price {
      margin: 0;
      color: #e93b3b;
      padding-top: 0.1rem;
    }
    &__total {
      float: right;
      color: #000;
    }
  }
  &__total {
    line-height: 0.28rem;
    margin: 0 0.16rem;
    color: #999;
    font-size: 0.14rem;
    text-align: center;
    background: #f5f5f5;
  }

  &__empty {
    line-height: 0.5rem;
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.16rem;
  }
}
</style>
