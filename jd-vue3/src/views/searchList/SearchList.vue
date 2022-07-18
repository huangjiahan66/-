<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back" @click="handleBackCick">
        <van-icon name="arrow-left" />
      </div>
      <div class="search__content">
        <div class="search__content__icon iconfont icon-search"></div>
        <input
          class="search__content__input"
          placeholder="请输入商品名称"
          v-model="keyword"
          @change="handleSearchInputChange"
        />
      </div>
    </div>
    <router-link
      v-for="item in searchList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item"
    /></router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";
const useBackRouteEffect = () => {
  const router = useRouter();

  const handleBackCick = () => {
    router.back();
  };
  return handleBackCick;
};

const userSearchListEffect = () => {
  const searchList = ref([]);
  const getsearchListList = async (keyword) => {
    const res = await get("/api/shop/search", {
      keyword,
    });
    // console.log(res);
    if (res?.errno === 0 && res?.data?.length) {
      searchList.value = res.data;
    }
  };
  return { searchList, getsearchListList };
};
export default {
  name: "SearchList",
  components: {
    ShopInfo,
  },
  setup(props) {
    const route = useRoute();
    // 搜索关键词逻辑
    const keyword = ref(route.query.keyword || "");
    const handleBackCick = useBackRouteEffect();
    const handleSearchInputChange = () => {
      getsearchListList(keyword.value);
    };
    // 获取搜索列表
    const { searchList, getsearchListList } = userSearchListEffect();
    getsearchListList(keyword.value);

    return { handleBackCick, keyword, searchList, handleSearchInputChange };
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
