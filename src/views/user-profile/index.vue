<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <input type="file" hidden ref="file" @change="onFileChange" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo"></van-image>
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    >
    </van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    ></van-cell>

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height:100%;"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height:100%"
    >
      <update-photo v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow = false" @update-photo="user.photo = $event" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user"
import UpdateName from "./components/update-name"
import UpdateGender from "./components/update-gender"
import UpdateBirthday from "./components/updare-birthday"
import UpdatePhoto from "./components/update-photo"

export default {
  name: "UserProfile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null,
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {}
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      console.log(data)
      this.img = data
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ""
    },
  },
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
