<template>
  <div class="search-suggestion">
    <van-cell 
      icon="search"
      v-for="(text,index) in Suggestions"
      :key="index"
      @click="$emit('search',text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  props:{
    searchText:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      Suggestions:[] // 联想建议数据列表
    }
  },
  watch:{
    searchText:{
      // handler(val) {
      //   this.loadSearchSuggestion(val)
      // },
      handler:debounce(function(val) {
        this.loadSearchSuggestion(val)
      },200),
      immediate:true
    }
  },
  methods:{
    async loadSearchSuggestion(q) {
      try {
        const {data} = await getSearchSuggestion(q)
        console.log(data)
        this.Suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，稍后重试')
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式中间的内容，都会当做匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg , highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/span.active {
    color: #2396fa;
  }
}
</style>