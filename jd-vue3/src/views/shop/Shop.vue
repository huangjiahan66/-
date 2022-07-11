<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back" @click="handleBackCick">
        <van-icon name="arrow-left" />
      </div>
      <div class="search__content">
        <div class="search__content__icon iconfont icon-search"></div>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";
import Content from "./Content.vue";
import Cart from "./Cart.vue";
// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute();
  // 定义数据
  const data = reactive({
    item: {},
  });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };

  const { item } = toRefs(data);
  return { item, getItemData };
};

// 点击回退的逻辑
const useBackRouteEffect = () => {
  const router = useRouter();
  const handleBackCick = () => {
    router.back();
  };
  return handleBackCick;
};
export default {
  components: {
    ShopInfo,
    Content,
    Cart,
  },
  setup() {
    const { item, getItemData } = useShopInfoEffect();
    getItemData();
    const handleBackCick = useBackRouteEffect();
    return { item, handleBackCick };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 0.18rem;
}
.search {
  height: 0.32rem;
  line-height: 0.32rem;
  display: flex;
  margin: 0.2rem 0 0.1rem 0;
  &__back {
    height: 0.32rem;
    width: 0.3rem;
    color: #b6b6b6;
    font-size: 0.2rem;
    // background: #000;
  }
  &__content {
    display: flex;
    flex: 1;
    line-height: 0.32rem;
    background: #f5f5f5;
    border-radius: 0.16rem;
    &__icon {
      display: block;
      width: 0.44rem;
      height: 0.32rem;
      text-align: center;
    }
    &__input {
      border: none;
      outline: none;
      background: none;
      padding-right: 0.2rem;
      height: 0.32rem;
      width: 100%;
    }
  }
}
</style>
