<template>
  <div class="article-list">
      <van-pull-refresh 
        v-model="isreFreshLoading" 
        @refresh="onRefresh" 
        :success-text="refreshSuccessText"
        :success-duration="1500"
        >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        >
        <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
      </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
    props:{
        channel:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            list:[], // 存储列表数据的数组
            loading:false, // 控制加载中loading状态
            finished:false, // 控制数据加载结束状态
            timestamp:null,  // 请求获取下一页数据的时间戳
            error:false,  // 控制列表加载失败的提示状态
            isreFreshLoading:false,
            refreshSuccessText:''
        }
    },
    methods:{
        async onLoad() {
            try {
                // 1.异步更新数据
                const {data} = await getArticles({
                    channel_id:this.channel.id, // 频道ID
                    timestamp:this.timestamp || Date.now(),
                    with_top:1
                })
                // 2. 把请求结果数据放到list数组中
                const {results} = data.data
                this.list.push(...results)
                // 3.本次数据加载结束后要把加载状态设置为结束
                //   this.loading = false;
                this.loading = false
                // 4.判断数据是否全部加载完成
                if(results.length) {
                    this.timestamp = data.data.pre_timestamp
                } else {
                    this.finished = true
                }
            } catch (error) {
                this.error = true
                this.loading = false
            }
        },
        async onRefresh() {
            try {
                // 请求获取数据
                const {data} = await getArticles({
                    channel_id:this.channel.id, // 频道ID
                    timestamp:Date.now(),
                    with_top:1
                })
                // 将数据追加到列表顶部
                const {results} = data.data
                this.list.unshift(...results)
                // 关闭下拉刷新loading状态
                this.isreFreshLoading = false
                // 更新下拉刷新成功提示文本
                this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
            } catch (error) {
                this.isreFreshLoading = false
                this.refreshSuccessText = '刷新失败'
            }  
        }
    }   
}
</script>

<style lang="less" scoped>

</style>