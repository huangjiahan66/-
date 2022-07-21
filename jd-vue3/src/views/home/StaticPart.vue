<template>
  <!-- 顶部位置区 -->
  <div>
    <div class="position">
      <span class="iconfont icon-dingwei"></span>
      <span class="position-title"> 闽南科技学院5栋</span>
      <span class="iconfont icon-lingdang"></span>
    </div>

    <router-link to="search">
      <div class="search">
        <span class="iconfont icon-search"></span>
        <span class="search__text">山姆会员优惠商品</span>
      </div>
    </router-link>

    <!-- banner -->
    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        alt=""
      />
    </div>

    <!-- icons -->
    <div class="icons">
      <div class="icons__item" v-for="item in iconsList" :key="item.desc">
        <img
          class="icons__item__img"
          :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
        />
        <p class="icons__item__desc">{{ item.desc }}</p>
      </div>
    </div>
    <!-- gap -->
    <div class="gap"></div>
  </div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const iconsList = [
      { imgName: "超市", desc: "超市便利" },
      { imgName: "菜市场", desc: "菜市场" },
      { imgName: "水果店", desc: "水果店" },
      { imgName: "鲜花", desc: "鲜花绿植" },
      { imgName: "医药健康", desc: "医药健康" },
      { imgName: "家居", desc: "家居时尚" },
      { imgName: "蛋糕", desc: "烘培蛋糕" },
      { imgName: "签到", desc: "签到" },
      { imgName: "大牌免运", desc: "大牌免运" },
      { imgName: "红包", desc: "红包套餐" },
    ];
    return { iconsList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/valriables.scss";
@import "../../style/minxins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  color: $content-fontcolor;
  @include ellisps;

  .icon-lingdang {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}

.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  font-size: 0.14rem;
  border-radius: 0.5rem;
  .icon-search {
    padding: 0 0.08rem 0 0.16rem;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}

// icons
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      text-align: center;
      color: $content-fontcolor;
    }
  }
}

// gap
.gap {
  height: 0.1rem;
  background: #f1f1f1;
  margin: 0 -0.16rem;
}
</style>
