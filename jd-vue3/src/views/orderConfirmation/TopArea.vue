<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe697;
      </div>
      确认订单
    </div>
    <!-- 收货地址 -->
    <div class="top__receiver" @click="handleAddressClick">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">
        {{
          hasAddress
            ? `${data.city}${data.department}${data.houseNumber}`
            : "请选择收货地址"
        }}
      </div>
      <div class="top__receiver__info" v-if="hasAddress">
        <span class="top__receiver__info__name">{{ data.name }}</span>
        <span class="top__receiver__info__name">{{ data.phone }}</span>
      </div>
      <div class="top__receiver__icon iconfont">&#xe697;</div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount, reactive } from "vue";
import { get } from "../../utils/request";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({});
    const addressId = route.query.addressId;
    const handleBackClick = () => {
      router.back();
    };

    const handleAddressClick = () => {
      router.push(`/addressSelect?path=${route.path}`);
    };
    onBeforeMount(async () => {
      if (addressId) {
        const res = await get(`/api/user/address/${addressId}`);
        console.log(res);
        if (res?.errno === 0) {
          const resData = res.data;
          console.log(resData);
          data.city = resData.city;
          data.department = resData.department;
          data.houseNumber = resData.houseNumber;
          data.name = resData.name;
          data.phone = resData.phone;
        }
      }
    });
    return {
      data,
      handleBackClick,
      hasAddress: !!addressId,
      handleAddressClick,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
