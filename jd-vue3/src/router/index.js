import { createRouter, createWebHashHistory } from "vue-router";

import Login from "../views/login/Login.vue";
import Home from "../views/home/home.vue";
import Register from "../views/register/Register.vue";
import Shop from "../views/shop/Shop.vue";
import CartList from "../views/cartList/CartList.vue";
import OrderConfirmation from "../views/orderConfirmation/orderConfirmation.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
