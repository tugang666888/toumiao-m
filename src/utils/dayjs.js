import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用relativeTime
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

// 参数1：过滤器名称 残数2：过滤器函数 使用方法：{{表达式 | 过滤器名称}}
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})


// console.log(dayjs().format('YYYY-MM-DD-HH-mm-ss'))