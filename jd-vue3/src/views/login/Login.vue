<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      alt=""
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>

    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";
/**
 *  登陆函数hook
 */
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });
  const handleLogin = async () => {
    try {
      const res = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      console.log(res);
      if (res?.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
    } catch (error) {
      console.log(error);
      showToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};
/**
 * 注册函数hook
 */
const useRegisterEffect = () => {
  const router = useRouter();
  const handleRegisterClick = () => {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};
export default {
  name: "Login",
  components: {
    Toast,
  },
  setup(props) {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToast);
    const { handleRegisterClick } = useRegisterEffect();
    return {
      username,
      password,
      show,
      toastMessage,
      handleLogin,
      handleRegisterClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__img {
    width: 0.66rem;
    height: 0.66rem;
    display: block;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    box-sizing: border-box;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      &::placeholder {
        font-size: 0.16rem;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  &__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  &__login-link {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0;
    text-align: center;
  }
}
</style>
