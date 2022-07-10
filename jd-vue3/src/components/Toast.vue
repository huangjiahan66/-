<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  props: ["message"],
};
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: "",
  });

  const showToast = (msg) => {
    toastData.show = true;
    toastData.toastMessage = msg;
    setTimeout(() => {
      toastData.show = false;
      toastData.toastMessage = " ";
    }, 1500);
  };

  const { show, toastMessage } = toRefs(toastData);
  return { show, toastMessage, showToast };
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  // top: 50%;
  border-radius: 0.5rem;
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  transform: translate(-50%, -50%);
  color: #fff;
}
</style>
