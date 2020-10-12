<template>
  <van-button 
    :icon="value ? 'star' : 'star-o'" 
    :class="{
      collected:value
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import {addCollect,deleteCollect} from '@/api/article'

export default {
  name:'CollectArticle',
  props:{
    value:{
      type:Boolean,
      required:true
    },
    articleId:{
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
    async onCollect() {
      this.loading = true
      try {
        if(this.value) {
          // 已收藏取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 为收藏添加收藏
          await addCollect(this.articleId)
        }
        this.$emit('input',!this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('操作失败，稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  border: none;
  padding: 0;
}
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>