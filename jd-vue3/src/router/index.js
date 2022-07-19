import { createRouter, createWebHashHistory } from "vue-router";

import Login from "../views/login/Login.vue";
// import Home from "../views/home/home.vue";
import Register from "../views/register/Register.vue";
import Shop from "../views/shop/Shop.vue";
import CartList from "../views/cartList/CartList.vue";
import OrderConfirmation from "../views/orderConfirmation/orderConfirmation.vue";
import OrderList from "../views/orderList/OrderList.vue";
import Search from "../views/search/Search.vue";
import SearchList from "../views/searchList/SearchList.vue";
import Address from "../views/address/Address.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/home.vue"),
  },
  {
    path: "/shop/:id",
    name: "Shop",
    component: Shop,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter(to, from, next) {
      //如果已经登陆 就不要跳到登录页
      const isLogin = localStorage.isLogin;
      isLogin ? next({ name: "Home" }) : next();
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      //如果已经登陆 就不要跳到登录页
      const isLogin = localStorage.isLogin;
      isLogin ? next({ name: "Home" }) : next();
    },
  },
  {
    path: "/cartlist",
    name: "CartList",
    component: CartList,
  },
  {
    path: "/orderConfirmation/:id",
    name: "OrderConfirmation",
    component: OrderConfirmation,
  },
  {
    path: "/orderlist",
    name: "orderlist",
    component: OrderList,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/searchList",
    name: "searchList",
    component: SearchList,
  },
  {
    path: "/address",
    name: "Address",
    component: Address,
  },
  {
    path: "/addressEdit",
    name: "addressEdit",
    component: () => import("../views/addressEdit/addressEdit.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// to跳哪里 from 从哪里跳过来
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin;
  if (!isLogin && to.name !== "Login" && to.name !== "Register") {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
