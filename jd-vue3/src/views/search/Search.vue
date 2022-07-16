<template>
  <div class="wrapper">
    <div class="search">
      <div class="iconfont icon-search"></div>
      <input
        type="text"
        class="search__area"
        @change="handleSearchChange"
        placeholder="山姆会员优惠商品"
      />
      <div type="search__cancel" @click="handleCancelSearchClick">取消</div>
    </div>

    <div class="area" v-if="history.length">
      <h4 class="area__title">
        搜索历史
        <span class="area__title__clear" @click="handleClaerHistoryClick"
          >清除搜索历史</span
        >
      </h4>
      <ul class="area__list">
        <li
          class="area__list__item"
          v-for="item in history"
          :key="item"
          @click="gotoSearchList(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="area">
      <h4 class="area__title">热门搜索</h4>
      <ul class="area__list">
        <li
          class="area__list__item"
          v-for="item in HotWordList"
          :key="item"
          @click="gotoSearchList(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { get } from "../../utils/request";

// 热刺相关逻辑
const userHotWordListEffect = () => {
  const HotWordList = ref([]);
  const getHotWordList = async () => {
    const res = await get("/api/shop/search/hot-words");
    if (res?.errno === 0 && res?.data?.length) {
      HotWordList.value = res.data;
    }
    console.log(res);
  };
  return { HotWordList, getHotWordList };
};

export default {
  name: "search",
  setup() {
    const router = useRouter();
    const history = ref(JSON.parse(localStorage.history || "[]")); //初始化存到本地存储的数组
    const handleSearchChange = (e) => {
      const searchValue = e.target.value;
      if (!searchValue) return;
      const hasValue = history.value.find((item) => item === searchValue);
      if (!hasValue) {
        history.value.push(searchValue);
        localStorage.history = JSON.stringify(history.value);
      }
      router.push(`/searchList?keyword=${searchValue}`);
    };

    // 清除历史记录
    const handleClaerHistoryClick = () => {
      history.value = [];
      localStorage.history = JSON.stringify([]);
    };

    // 点了取消
    const handleCancelSearchClick = () => {
      router.back();
    };

    const { HotWordList, getHotWordList } = userHotWordListEffect();
    getHotWordList();

    // 页面跳转
    const gotoSearchList = (keyWord) => {
      router.push(`/searchList?keyword=${keyWord}`);
    };
    return {
      handleSearchChange,
      history,
      handleClaerHistoryClick,
      handleCancelSearchClick,
      HotWordList,
      getHotWordList,
      gotoSearchList,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 0.18rem;
  .search {
    position: relative;
    display: flex;
    line-height: 0.32rem;
    margin-top: 0.16rem;
    color: #333;
    .iconfont {
      position: absolute;
      left: 0.16rem;
    }
    &__area {
      flex: 1;
      padding: 0 0.12rem 0 0.44rem;
      border-radius: 0.16rem;
      background: #f5f5f5;
      border: none;
      outline: none;
      font-size: 0.14rem;
      margin-right: 0.1rem;
    }
    &__cancel {
      margin-left: 0.12rem;
      width: 0.32rem;

      font-size: 0.16rem;
    }
  }

  .area {
    margin-top: 0.24rem;
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: #333;
      font-weight: normal;
      margin: 0;
      &__clear {
        float: right;
      }
    }
    &__list {
      margin: 0 0 0 -0.1rem;
      padding: 0;
      list-style-type: none;
      &__item {
        display: inline-block;
        line-height: 0.32rem;
        font-size: 0.14rem;
        background: #f5f5f5;
        border-radius: 0.02rem;
        color: #666;
        padding: 0 0.1rem;
        margin: 0.12rem 0 0 0.1rem;
      }
    }
  }
}
</style>
