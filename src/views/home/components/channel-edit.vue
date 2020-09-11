<template>
  <div class="channel-edit">
      <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <van-button 
            class="edit-btn" 
            type="danger" 
            plain 
            round 
            size="mini" 
            @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>
      <van-grid class="my-grid" :gutter="10">
        <van-grid-item 
            class="grid-item" 
            v-for="(channel,index) in myChannels" 
            :key="index"
            @click="onMyChannelClick(channel,index)"
        >
            <van-icon 
                name="clear" 
                slot="icon" 
                v-show="isEdit && !fiexChannels.includes(channel.id)"
            ></van-icon>
            <span 
                slot="text" 
                class="text" 
                :class="{ active: index === active }"
            >{{channel.name}}</span>
        </van-grid-item>
      </van-grid>
      <!-- 频道推荐 -->
      <van-cell :border="false">
        <div slot="title" class="title-text">频道推荐</div>
      </van-cell>
      <van-grid class="recommend-grid" :gutter="10">
        <van-grid-item 
            icon="plus" 
            class="grid-item" 
            v-for="(channel,index) in recommendChannels" 
            :key="index" 
            :text="channel.name" 
            @click="onAddChannel(channel)"
        />
      </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
    data() {
        return {
            allChannels:[],
            isEdit:false,
            fiexChannels:[0]
        }
    },
    props:{
        myChannels:{
            type:Array,
            required:true
        },
        active:{
            type:Number,
            required:true
        }
    },
    computed:{
        recommendChannels() {
            const channels = []
            this.allChannels.forEach(channel => {
                const ret = this.myChannels.find(myChannel => {
                    return myChannel.id === channel.id
                })
                if(!ret) {
                    channels.push(channel)
                }
            })
            return channels

            // return this.allChannels.filter(channel =>  {
                //return !this.myChannels.find(myChannel  => {
                    //return myChannel.id === channel.id
                //})
            //})
        }
    },
    created() {
        this.loadAllChannels()
    },
    methods:{
        async loadAllChannels() {
            try {
                const {data} = await getAllChannels()
                this.allChannels = data.data.channels
                console.log(this.allChannels)
            } catch (error) {
                this.$totast('数据获取失败')
            }
        },
        onAddChannel(channel) {
            this.myChannels.push(channel)
        },
        onMyChannelClick(channel,index) {
            if(this.isEdit) {
                
            } else {
                this.$emit('update-active',index)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/.grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text,
            .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active {
                color: red;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
    /deep/.my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
    }
    /deep/.recommend-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
                
            }
        }
    }
}
</style>