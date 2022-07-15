import { useStore } from "vuex";
import { computed } from "vue";
export const useCartCommonEffect = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList;
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit("changeCartItemInfo", { shopId, productId, productInfo, num }); //传商铺id  商品ID  和商品内容
  };

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {};
    const notEmptyProductList = {};
    for (let i in productList) {
      const product = productList[i];
      if (product.count > 0) {
        notEmptyProductList[i] = product;
      }
    }
    // console.log(notEmptyProductList);
    return notEmptyProductList;
  });

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || "";
    return shopName;
  });

  // 计算 总价格
  const price = computed(() => {
    const productList = cartList[shopId]?.productList;
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.check) {
          count += product.count * product.price;
        }
      }
    }
    return count.toFixed(2);
  });
  return { changeCartItemInfo, cartList, productList, shopName, price };
};
