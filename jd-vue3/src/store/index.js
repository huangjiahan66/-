import Vuex from "vuex";

const setLocalStorage = (state) => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
};

// 数据结构
// 第一层是商铺的id   比如0 沃尔玛 1山姆  这个数据结构
// shopId: {
// shopName:'沃尔玛'，
// productList:{
//   productId: {
//     imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
//     name: "番茄 250g / 份",
//     oldPrice: 39.6,
//     price: 33.6,
//     sales: 10,
//     _id: "1",
//   },
//  }
// },
const getLocalStorage = () => {
  try {
    return JSON.parse(localStorage.cartList || {});
  } catch (error) {
    return {};
  }
};
export default Vuex.createStore({
  state: {
    cartList: getLocalStorage(),
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload; // 进入哪个商铺id 比如沃尔玛或者山姆     商品id    商品信息
      let shopInfo = state.cartList[shopId]; //第一层级
      if (!shopInfo) {
        //如果第一次进来 给个空对象
        shopInfo = {
          shopName: "",
          productList: {},
        };
      }

      let product = shopInfo.productList[productId];
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
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;

      setLocalStorage(state);
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;

      setLocalStorage(state);
    },

    // 清空购物车
    cleanCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};

      setLocalStorage(state);
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        for (let key in products) {
          const product = products[key];
          product.check = true;
        }
      }

      setLocalStorage(state);
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: "",
        product: {},
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
    },
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {};
    },
  },
});
