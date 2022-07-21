<template>
  <div class="wrapper">
    <div class="title">
      <div class="back" @click="handleBackCick">
        <van-icon name="arrow-left" />
      </div>
      {{ isEdit ? "编辑" : "新增" }}地址
      <span class="title__save" @click="handleSaveClick">保存</span>
    </div>

    <div class="content">
      <div class="content__item">
        <span class="content__item__label">所在城市：</span>
        <input
          type="text"
          class="content__item__input"
          v-model="city"
          placeholder="请输入所在城市"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">小区/大厦/学校：</span>
        <input
          type="text"
          class="content__item__input"
          placeholder="请输入小区/大厦/学校"
          v-model="department"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">楼号-门牌号：</span>
        <input
          type="text"
          class="content__item__input"
          placeholder="请输入楼号-门牌号"
          v-model="houseNumber"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">收货人：</span>
        <input
          type="text"
          class="content__item__input"
          placeholder="请输入收货人"
          v-model="name"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">联系电话：</span>
        <input
          type="text"
          class="content__item__input"
          placeholder="请输入联系电话"
          v-model="phone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import { post } from "../../utils/request";
export default {
  name: "AddressEdit",
  components: { Toast },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const queryId = route.query.id; //如果有id 就是编辑状态
    const city = ref("");
    const department = ref("");
    const houseNumber = ref("");
    const name = ref("");
    const phone = ref("");

    onBeforeMount(async () => {
      if (queryId) {
        const res = await post(`/api/user/address/${queryId}`);
        if (res?.errno === 0) {
          const data = res.data;
          city.value = data.city;
          department.value = data.department;
          houseNumber.value = data.houseNumber;
          name.value = data.name;
          phone.value = data.phone;
        }
      }
    });
    const handleSaveClick = async () => {
      if (
        !city.value ||
        !department.value ||
        !houseNumber.value ||
        !name.value ||
        !phone.value
      ) {
        // alert("1");
        Toast.fail("所有内容必填");
      } else {
        if (queryId) {
          const res = await post(`/api/user/address/${queryId}`, {
            city: city.value,
            department: department.value,
            houseNumber: houseNumber.value,
            name: name.value,
            phone: phone.value,
          });
          if (res?.errno === 0) {
            router.back();
          }
        }
        const res = await post("/api/user/address", {
          city: city.value,
          department: department.value,
          houseNumber: houseNumber.value,
          name: name.value,
          phone: phone.value,
        });
        if (res?.errno === 0) {
          router.back();
        }
      }
    };

    const handleBackCick = () => {
      router.back();
    };
    return {
      city,
      department,
      houseNumber,
      name,
      phone,
      isEdit: !!queryId,
      handleSaveClick,
      handleBackCick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/valriables.scss";
@import "../../style/minxins.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #eee;
  .title {
    position: relative;
    line-height: 0.44rem;
    background: $bgColor;
    font-size: 0.16rem;
    color: $content-fontcolor;
    text-align: center;
    &__save {
      position: absolute;
      right: 0.18rem;
      float: right;
      a {
        color: #333;
      }
    }
    .back {
      height: 0.32rem;
      width: 0.3rem;
      color: #b6b6b6;
      font-size: 0.2rem;
      position: absolute;
      left: 0;
      top: 0;
      // background: #000;
    }
    &__create {
      position: absolute;
      right: 0.18rem;
      float: right;
    }
  }
  .content {
    margin-top: 0.12rem;
    padding: 0 0.18rem;
    background: #ffffff;
    &__item {
      overflow: hidden;
      height: 0.44rem;
      line-height: 0.44rem;
      // border-bottom: 0.01rem solid #000;
      font-size: 0.14rem;
      // color: #b6b6b6;
      &__label {
        color: #333;
      }
      &__input {
        border: none;
        outline: none;
      }
    }
  }
}
</style>
