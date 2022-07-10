import { useStore } from "vuex";
export const useCartCommonEffect = () => {
  const store = useStore();
  const cartList = store.state.cartList;
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit("changeCartItemInfo", { shopId, productId, productInfo, num }); //传商铺id  商品ID  和商品内容
  };
  return { changeCartItemInfo, cartList };
};
