<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user"
import dayjs from "dayjs"

export default {
  name: "UpdateBirthday",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 0, 31),
      currentDate: new Date(this.value),
    }
  },
  methods: {
    async onConfirm() {
      try {
        const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD")
        const { data } = await updateUserProfile({
          birthday: currentDate,
        })
        this.$emit("input", currentDate)
        this.$emit("close")
        this.$toast.success("更新成功")
        console.log(data)
      } catch (error) {}
    },
  },
}
</script>

<style lang="less" scoped></style>
