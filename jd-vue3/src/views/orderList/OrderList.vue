<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{
            item.isCanceled ? "已取消" : "已下单"
          }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img class="order__content__img" :src="innerItem.product.img" />
            </template>
          </div>
          <div class="order__info">
            <div class="order__info__price">{{ item.totalPrice }}元</div>
            <div class="order__info__count">共{{ item.totalNumber }}件数</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import Docker from "../../components/Docker.vue";

// 处理订单列表 逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getNeatbyList = async () => {
    const res = await get("/api/order");
    if (res?.errno === 0 && res?.data?.length) {
      const orderList = res.data;
      orderList.forEach((order) => {
        const products = order.products || [];
        let totalPrice = 0;
        let totalNumber = 0;
        products.forEach((productItem) => {
          totalNumber += productItem.orderSales || 0;
          totalPrice += productItem?.product?.price * productItem?.orderSales;
        });
        order.totalPrice = totalPrice;
        order.totalNumber = totalNumber;
      });
      console.log(orderList);
      data.list = res.data;
    }
  };
  getNeatbyList();
  const { list } = toRefs(data);
  console.log("list===", list);
  return { list };
};
export default {
  name: "orderlist",
  components: {
    Docker,
  },
  setup() {
    const { list } = useOrderListEffect();
    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/valriables.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: #eee;
}
.title {
  line-height: 0.44rem;
  background: $bgColor;
  font-size: 0.16rem;
  color: $content-fontcolor;
  text-align: center;
}
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background: $bgColor;
  &__title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__status {
    float: right;
    font-size: 0.14rem;
    color: $light-fontColor;
  }
  &__info {
    width: 0.7rem;
    &__price {
      margin-bottom: 0.04rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: 0.14rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
  }
}
</style>
