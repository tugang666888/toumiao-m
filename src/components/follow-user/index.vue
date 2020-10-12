<template>
  <van-button 
    class="follow-btn" 
    round 
    size="small" 
    v-if="isFollowed"
    :loading="loading"
    @click="onFollow"  
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name:'FollowUser',  
  props:{
    isFollowed:{
      type:Boolean,
      required:true
    },
    userId:{
      type:[Number,String,Object],
      required:true
    }
  },
  data() {
    return {
      loading:false
    }
  },
  methods:{
    async onFollow() {
      this.loading = true
      try {
        if(this.isFollowed) {
          // 已关注取消关注
          const { data } = await deleteFollow(this.userId)
          console.log(data)
        } else {
          // 没有关注添加关注
          const { data } = await addFollow(this.userId)
          console.log(data)
        }
        this.$emit('update-is_followed',!this.isFollowed)
      } catch (error) {
        let message = '操作失败，稍后重试'
        if(error.response && error.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style>

</style>