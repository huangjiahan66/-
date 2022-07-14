<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__list">
      <template v-for="item in productList" :key="item._id">
        <div class="products__item" v-if="item.count > 0">
          <img class="products__item__img" :src="item.imgUrl" alt="" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item.name }}</h4>
            <p class="products__item__price">
              <span>
                <span class="products__item__yen">&yen;</span>
                {{ item.price }}×{{ item.count }}
              </span>
              <span class="products__item__total">
                <span class="product__item__yen">&yen;</span>
                {{ item.price * item.count }}
              </span>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCartCommonEffect } from "../../erffects/CartEffect";
export default {
  name: "ProductList",

  setup() {
    const route = useRoute();
    const shopId = route.params.id; //商铺id
    const { productList, shopName, price } = useCartCommonEffect(shopId);

    return { productList, shopName, price };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/minxins.scss";
.products {
  margin: 0.16rem 0.18rem 0.55rem 0.18rem;
  background: #fff;
  &__title {
    font-size: 0.16rem;
    color: #333;
    padding: 0.16rem 0.16rem 0 0.16rem;
  }
  // &__list {
  // }

  &__item {
    position: relative;
    display: flex;
    padding: 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
    }

    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      @include ellisps;
    }

    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
      display: flex;
    }

    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
