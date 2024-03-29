<template>
  <div class="content">
    <!-- 左側 -->
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab,
        }"
        v-for="item in categories"
        :key="item.name"
        @click="handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 右侧 -->
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="changeCartItem(shopId, item._id, item, -1, shopName)"
            >-</span
          >
          <span class="product__number__value">{{
            cartList?.[shopId]?.productList?.[item._id]?.count || 0
          }}</span>
          <span
            class="product__number__plus"
            @click="changeCartItem(shopId, item._id, item, 1, shopName)"
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils/request";
import { ref, reactive, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useCartCommonEffect } from "../../erffects/CartEffect";
const categories = [
  {
    name: "全部商品",
    tab: "all",
  },
  {
    name: "秒杀",
    tab: "seckill",
  },
  {
    name: "新鲜水果",
    tab: "fruit",
  },
];

// tab切换逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab); // //当前选中的tab
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };

  return { currentTab, handleTabClick };
};
// 列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};

const useCartEffect = () => {
  const store = useStore();
  const { changeCartItemInfo, cartList } = useCartCommonEffect();
  const changeShopName = (shopId, shopName) => {
    store.commit("changeShopName", { shopId, shopName });
  };
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num);
    changeShopName(shopId, shopName);
  };
  return { changeCartItem, cartList, changeShopName };
};

export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    const route = useRoute();

    const shopId = route.params.id; //商铺id
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { changeCartItem, cartList } = useCartEffect();
    return {
      list,
      categories,
      shopId,
      cartList,
      currentTab,
      handleTabClick,
      changeCartItem,
      // changeCartItemInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/minxins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  width: 0.76rem;
  height: 100%;
  overflow-y: scroll;
  background-color: #f5f5f5;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;

    &--active {
      background: #fff;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      @include ellisps;
    }
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: #333;
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
</style>
