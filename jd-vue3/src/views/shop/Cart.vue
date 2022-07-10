<template>
  <div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div class="product__header__all">
          <span
            class="product__header__icon iconfont"
            v-html="allChecked ? '&#xe70f;' : '&#xe6e6;'"
            @click="setCartItemsChecked(shopId)"
          ></span>
          <span>全选</span>
        </div>
        <div class="product__header__clear">
          <span
            class="product__header__clear__btn"
            @click="cleanCartProducts(shopId)"
          >
            清空购物车</span
          >
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__check iconfont"
            v-html="item.check ? '&#xe70f;' : '&#xe6e6;'"
            @click="changeCartItemChecked(shopId, item._id)"
          ></div>
          <img class="product__item__img" :src="item.imgUrl" alt="" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>

            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="changeCartItemInfo(shopId, item._id, item, -1)"
              >-</span
            >
            <span class="product__number__value">{{ item.count || 0 }}</span>
            <span
              class="product__number__plus"
              @click="changeCartItemInfo(shopId, item._id, item, 1)"
              >+</span
            >
          </div>
        </div>
      </template>
    </div>

    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen;{{ price }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ name: 'Home' }"> 去结算 </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCartCommonEffect } from "./commonCartEffect";
// 购物车信息逻辑
const useCartEffect = (shopId) => {
  const { changeCartItemInfo } = useCartCommonEffect();
  const store = useStore();
  const cartList = store.state.cartList;
  const total = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });

  const price = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.check) {
          count += product.count * product.price;
        }
      }
    }
    return count.toFixed(2);
  });
  // 是否全选
  const allChecked = computed(() => {
    const productList = cartList[shopId];
    let result = true;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.count > 0 && !product.check) {
          result = false;
        }
      }
    }
    return result;
  });

  const productList = computed(() => {
    const productList = cartList[shopId] || [];
    return productList;
  });

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };

  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit("cleanCartProducts", { shopId });
  };

  const setCartItemsChecked = (shopId) => {
    store.commit("setCartItemsChecked", { shopId });
  };
  return {
    total,
    price,
    productList,
    allChecked,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked,
  };
};

const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };

  return { showCart, handleCartShowChange };
};
export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { showCart, handleCartShowChange } = toggleCartEffect();
    const {
      total,
      price,
      productList,
      allChecked,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
    } = useCartEffect(shopId);

    return {
      total,
      price,
      shopId,
      allChecked,
      productList,
      showCart,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      handleCartShowChange,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/minxins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  overflow-y: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
  // height: 0.5rem;
  .product {
    flex: 1;
    overflow-y: scroll;
    background: #fff;
    &__header {
      display: flex;
      height: 0.5rem;
      line-height: 0.5rem;
      border-bottom: 1px solid #f1f1f1;
      &__all {
        width: 0.64rem;
        height: 0.5rem;
        margin-left: 0.16rem;
      }
      &__icon {
        margin-right: 0.1rem;
      }
      &__clear {
        flex: 1;
        text-align: right;
        font-size: 0.14rem;
        // color: #3333;
        margin-right: 0.16rem;
        &__ {
          display: inline-block;
        }
      }
    }
    &__item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 0.01rem solid #f1f1f1;
      &__check {
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.5rem;
        color: #0091ef;
        margin-right: 0.1rem;
      }
      &__detail {
        overflow: hidden;
      }
      &__img {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.16rem;
      }
      &__title {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #333;
        @include ellisps;
      }

      &__price {
        margin: 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        color: #e93b3b;
      }
      &__yen {
        font-size: 0.12rem;
      }
      &__origin {
        margin-left: 0.06rem;
        line-height: 0.2rem;
        font-size: 0.12rem;
        color: #999;
        text-decoration: line-through;
      }
      .product__number {
        position: absolute;
        right: 0;
        bottom: 0.1rem;
        &__minus,
        &__plus {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;

          border-radius: 50%;
          line-height: 0.2rem;
          text-align: center;
          font-size: 0.2rem;
        }
        &__minus {
          border: 0.01rem solid #666;
        }
        &__value {
          margin: 0 0.1rem;
        }
        &__plus {
          background: #0091ef;
          color: #fff;
        }
      }
    }
  }
  .check {
    display: flex;
    &__icon {
      position: relative;
      width: 0.84rem;
      &__img {
        display: block;
        margin: 0.12rem auto;
        width: 0.28rem;
        height: 0.28rem;
      }
      &__tag {
        position: absolute;
        right: 0.2rem;
        top: 0;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        background: #e93b3b;
        border-radius: 50%;
        text-align: center;
        font-size: 0.12rem;
      }
    }
    &__info {
      flex: 1;
      color: #333;
      font-size: 0.12rem;
      &__price {
        line-height: 0.5rem;
        color: #e93b3b;
        font-size: 0.18rem;
      }
    }
    &__btn {
      width: 0.8rem;
      height: 0.52rem;
      line-height: 0.52rem;

      text-align: center;
      background-color: #4fb0f9;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>
