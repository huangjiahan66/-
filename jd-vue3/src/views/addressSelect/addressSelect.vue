<template>
  <div class="wrapper">
    <div class="title">地址选择<span class="title__create"></span></div>
    <div class="address">
      <div
        class="address__item"
        v-for="address in addressList"
        :key="address._id"
        @click="handleAddressClick(address._id)"
      >
        <p class="address__item__basic">
          {{ address.name
          }}<span class="address__item__phone"> {{ address.phone }}</span>
        </p>
        <p class="address__item__address">
          {{ address.city }} {{ address.department }} {{ address.houseNumber }}
        </p>
      </div>

      <div v-if="addressList.length === 0" class="empty">暂无地址信息</div>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils/request";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const useAddressListEffect = () => {
  const addressList = ref([]);
  const getAddressList = async () => {
    const res = await get("/api/user/address");
    if (res?.errno === 0 && res?.data?.length) {
      addressList.value = res.data;
    }
  };
  return { addressList, getAddressList };
};

export default {
  name: "Address",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const { addressList, getAddressList } = useAddressListEffect();
    getAddressList();
    const handleAddressClick = (id) => {
      const path = route.query.path;
      router.push(`${path}?addressId=${id}`);
      // console.log(id);
    };
    return { addressList, handleAddressClick };
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
  bottom: 0rem;
  right: 0;
  background: #eee;
}
.title {
  position: relative;
  line-height: 0.44rem;
  background: $bgColor;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
}
.address {
  margin: 0.16rem 0.18rem 0 0.18rem;

  &__item {
    position: relative;
    box-sizing: border-box;
    padding: 0.18rem 0.63rem 0.18rem 0.16rem;
    margin-bottom: 0.16rem;
    background: #fff;
    border-radius: 0.04rem;
    &__basic {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #999;
      margin: 0;
    }
    &__phone {
      margin-left: 0.66rem;
    }
    &__address {
      line-height: 0.2rem;
      font-size: 0.14rem;

      margin: 0.08rem 0 0 0;
    }
  }
  .iconfont {
    position: absolute;
    right: 0.1rem;
    top: 0.44rem;
    transform: rotate(180deg);
  }
  &__empty {
    line-height: 0.5rem;
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.16rem;
  }
}
</style>
