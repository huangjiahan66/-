<template>
  <!-- nearby -->
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item"
    /></router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";
const userNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNeatbyList = async () => {
    const res = await get("/api/shop/hot-list");
    if (res?.errno === 0 && res?.data?.length) {
      nearbyList.value = res.data;
    }
  };
  return { nearbyList, getNeatbyList };
};
export default {
  components: {
    ShopInfo,
  },
  setup() {
    const { nearbyList, getNeatbyList } = userNearbyListEffect();
    getNeatbyList();

    return { nearbyList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/valriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}

// nearby
</style>
