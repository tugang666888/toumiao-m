<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error="error"
  error-text="加载失败，点击重试"
  @load="onLoad"
  >
    <comment-item 
      v-for="(item,index) in list" 
      :key="index" 
      :comment="item"
    />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name:'CommentList',
  components:{
    CommentItem
  },
  props:{
    source:{
      type:[Number,String,Object],
      required:true
    }
  },
  data() {
    return {
      list:[],
      loading:false,
      finished:false,
      offset:null,
      limit:10,
      error:false
    }
  },
  created() {
    this.onLoad()
  },
  methods:{
    async onLoad() {
      try {
        const {data} = await getComment({
          type:'a',
          source:this.source,
          offset:this.offset,
          limit:this.limit
        })
        console.log(data)
        const {results} = data.data
        this.list.push(...results)
        // 把文章的总数量传递到外部
        this.$emit('onload-success',data.data)
        this.loading = false
        if(results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>