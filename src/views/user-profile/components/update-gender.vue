<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user"

export default {
  name: "UpdateGender",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    }
  },
  methods: {
    async onConfirm() {
      try {
        const localGender = this.localGender
        const { data } = await updateUserProfile({
          gender: localGender,
        })
        this.$emit("input", localGender)
        this.$emit("close")
        this.$toast.success("更新成功")
        console.log(data)
      } catch (error) {}
    },
    onPickerChange(picker, value, index) {
      console.log(picker, value, index)
      this.localGender = index
    },
  },
}
</script>

<style lang="less" scoped></style>
