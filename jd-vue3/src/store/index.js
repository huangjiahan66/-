import Vuex from "vuex";

export default Vuex.createStore({
  state: {
    cartList: {
      // 第一层是商铺的id   比如0 沃尔玛 1山姆  这个数据结构
      // shopId: {
      //   // 第二层是商品内容以及购物数量
      //   productId: {
      //     imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
      //     name: "番茄 250g / 份",
      //     oldPrice: 39.6,
      //     price: 33.6,
      //     sales: 10,
      //     _id: "1",
      //   },
      // },
    },
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload; // 进入哪个商铺id 比如沃尔玛或者山姆     商品id    商品信息
      let shopInfo = state.cartList[shopId]; //第一层级
      if (!shopInfo) {
        //如果第一次进来 给个空对象
        shopInfo = {};
      }

      let product = shopInfo[productId];
      if (!product) {
        product = productInfo;
        product.count = 0;
      }
      product.count = product.count + num;
      if (payload.num > 0) {
        product.check = true; //只要往购物车 加商品 check就变成true
      }
      if (product.count < 0) {
        product.count = 0;
      }
      shopInfo[productId] = product;
      state.cartList[shopId] = shopInfo;
      console.log(shopId, productId, productInfo);
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId][productId];
      product.check = !product.check;
    },

    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId] = {};
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId];
      if (products) {
        for (let key in products) {
          const product = products[key];
          product.check = true;
        }
      }
    },
  },
});
