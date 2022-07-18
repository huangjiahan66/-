<template>
  <div class="shop">
    <img :src="item.imgUrl" alt="" class="shop__img" />
    <div
      :class="{
        'shop__content--bordered': hideBorder ? false : true,
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售：{{ item.sales }}</span>
        <span class="shop__content__tag">起送：{{ item.expressLimit }}</span>
        <span class="shop__content__tag"
          >基础运费：{{ item.expressPrice }}</span
        >
      </div>
      <p class="shop__content__highlight">
        {{ item.slogan }}
      </p>

      <div v-if="item.products" class="shop__products">
        <div
          v-for="product in item.products"
          :key="product.name"
          class="shop__product"
        >
          <img :src="product.imgUrl" class="shop__product__img" />
          <p class="shop__product__title">{{ product.name }}</p>
          <p class="shop__product__price">
            <span class="price__yen">&yen;{{ product.price }}</span>
            <span class="origin">&yen;{{ product.oldPrice }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopInfo",
  props: ["item", "hideBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/valriables.scss";
@import "../style/minxins.scss";
.shop {
  display: flex;
  padding-top: 0.12rem;
  &__img {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgColor;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $hightlight-fontColor;
    }
  }

  &__products {
    overflow: hidden;
    margin: 0.08rem 0.07rem 0 -0.18rem;
  }
  &__product {
    width: 33.33%;
    box-sizing: border-box;
    padding-left: 0.18rem;
    float: left;
    &__img {
      width: 100%;
    }
    &__title {
      margin: 0.04rem 0 0 0;
      font-size: 0.12rem;
      color: #333;
      line-height: 0.17rem;
      @include ellisps;
    }
    &__price {
      margin: 0.02rem 0 0 0;
      line-height: 0.2rem;
      color: #e93b3b;
      font-size: 0.14rem;
      .price__yen {
        font-size: 0.12rem;
      }
      .origin {
        font-size: 0.12rem;
        color: #666;
        padding-left: 0.1rem;
        @include ellisps;
        text-decoration: line-through;
      }
    }
  }
}
</style>
