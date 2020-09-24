<template>
  <div class="search-result">
    <van-list 
      v-model="loading" 
      :finished="finished" 
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell 
        v-for="(article,index) in list" 
        :key="index" 
        :title="article.title"
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  props:{
    searchText:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      list:[],
      loading:false,
      finished:false,
      page:1,
      per_page:20,
      error:false
    }
  },
  methods:{
    async onLoad() {
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   this.loading = false 
      //   if(this.list.length >= 40) {
      //     this.finished = true
      //   }
      // },1000)
      try {
        const { data } = await getSearchResult({
          page:this.page,
          per_page:this.per_page,
          q:this.searchText
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if(results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>