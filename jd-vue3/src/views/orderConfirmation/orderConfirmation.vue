<template>
  <!-- 确认订单页面 -->
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back" @click="handleBackClick">
          &#xe697;
        </div>
        确认订单
      </div>
      <!-- 收货地址 -->
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">闽南科技学院5栋203</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">黄嘉涵先生</span>
          <span class="top__receiver__info__name">15060398950</span>
        </div>
        <div class="top__receiver__icon iconfont">&#xe697;</div>
      </div>
    </div>

    <div class="products">
      <div class="products__title">{{ shopName }}</div>
      <div class="products__list">
        <div class="products__item" v-for="item in productList" :key="item._id">
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
      </div>
    </div>

    <div class="order">
      <div class="order__price">
        实付金额<b>{{ price }}</b>
      </div>
      <div class="order__btn">提交订单</div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useCartCommonEffect } from "../../erffects/CartEffect";
export default {
  name: "OrderConfirmation",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const shopId = route.params.id; //商铺id
    const { productList, shopName, price } = useCartCommonEffect(shopId);

    const handleBackClick = () => {
      router.back();
    };
    return { productList, shopName, price, handleBackClick };
  },
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
}
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;

  &__header {
    position: relative;
    padding-top: 0.26rem;
    line-height: 0.24rem;
    color: #fff;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      font-size: 0.22rem;
      left: 0.18rem;
    }
  }

  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__address {
      line-height: 0.22rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        margin-right: 0.6rem;
        font-size: 0.12rem;
        line-height: 0.18rem;
        color: 666;
      }
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: #666;
      font-size: 0.16rem;
    }
  }
}

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

.order {
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
</style>
