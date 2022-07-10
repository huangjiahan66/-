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
        placeholder="请输入用户名"
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
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="确认密码"
        v-model="ensurment"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>

    <div class="wrapper__login-link" @click="handleLoginClick">
      已有账号去登录
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";
//注册相关
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "", ensurment: "" });
  const handleRegister = async () => {
    try {
      const res = await post("/api/user/register", {
        username: data.username,
        password: data.password,
      });
      console.log(res);
      if (res?.errno === 0) {
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
    } catch (error) {
      showToast("请求失败");
    }
  };
  // const {} = useRegisterEffect();
  // const { show, toastMessage, showToast } = useToastEffect();
  const { username, password, ensurment } = toRefs(data);

  return { username, password, ensurment, handleRegister };
};

// 注册相关逻辑
const useLoginEffect = () => {
  // 已有账号去登录
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};
export default {
  name: "Register",
  components: {
    Toast,
  },
  setup(props) {
    const router = useRouter();
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, ensurment, handleRegister } =
      useRegisterEffect();
    const { handleLoginClick } = useLoginEffect();
    return {
      username,
      password,
      ensurment,
      handleLoginClick,
      handleRegister,
      show,
      toastMessage,
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
  &__register-button {
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
