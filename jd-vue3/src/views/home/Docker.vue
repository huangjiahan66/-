<template>
  <div class="docker">
    <div class="docker__item docker__item--active">
      <div class="iconfont icon-shouye1"></div>
      <div class="docker__title">首页</div>
    </div>

    <div class="docker__item" @click="handleGotoCartList">
      <div class="iconfont icon-gouwuche1"></div>
      <div class="docker__title">购物车</div>
    </div>

    <div class="docker__item">
      <div class="iconfont icon-dingdan"></div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont icon-wode1"></div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const handleGotoCartList = () => {
      console.log("111");
      router.push("/cartlist");
    };
    return {
      handleGotoCartList,
    };
  },
};
</script>

<style lang="scss">
.docker {
  display: flex;

  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;
  // background: palegoldenrod;
  padding: 0 0.18rem;
  box-sizing: border-box;
  border-top: 0.01rem solid #f1f1f1;
  .docker__item {
    flex: 1;
    text-align: center;
    a {
      color: #1fa4fc;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    .docker__title {
      font-size: 0.13rem;
    }
  }
  .docker__item--active {
    color: #1fa4fc;
  }
}
</style>
