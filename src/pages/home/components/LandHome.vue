<template>
  <view>
  <view class="search-segment">
    <view class="search">
      <view class="search-input">
        <input type="text" placeholder="请输入使用权人、地块编号" v-model.trim="searchName" />
      </view>
      <view class="search-btn" @click="onSearch">
        <image class="search-icon" src="@/static/images/icon_search_white.png" mode="aspectFit" />
        <text class="search-txt">查询</text>
      </view>
    </view>
    <view class="search-btn-radius" @click="onSearchMore">
      <text class="search-txt">更多条件</text>
    </view>
  </view>
    <!-- 具体内容 -->
    <view class="main-enter"> 
      <view class="operate-segment">
        <text class="land-text">土地列表（共 30000条土地数据）</text>
        <view class="right-side">
         <view class="btn blue-btn" @click="associatedBind">
          <text class="txt">关联绑定</text>
        </view>
         <view class="btn blue-btn" @click="syncData">
          <text class="txt">数据同步</text>
        </view>
        </view>
      </view>
      <view class="main-list">
        <scroll-view
          v-if="list && list.length"
          class="scroll-view"
          scroll-y
          :enable-flex="true"
          @scrolltolower="loadMore"
        >
          <view class="scroll">
            <LandListItem
              v-for="(item,index) in list"
              :data="item"
              :key="index"
              @click.stop="editLandlord(item)"
            />
          </view>
          <view class="load-more">
            <uni-load-more iconType="auto" :status="status" />
          </view>
        </scroll-view>
        <NoData v-else />
      </view>
    </view>
     <!-- 关联绑定确认弹框 -->
    <uni-popup ref="associationBindingRef" type="dialog" :is-mask-click="false">
        <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="继续关联"
        title="土地编号：XXXX、XXX已关联，是否继续关联，如选择继续关联，则以最新一次关联为准"
        style="padding:10rpx 10rpx 0 10rpx"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
    </view>
</template>

<script lang="ts" setup>
import { ref, onMounted,nextTick, unref,computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getStorage, StorageKey, routerForward } from '@/utils'
import { getImpHomeCollectDtoApi } from '@/service'
import NoData from '@/components/NoData/index.vue'
import LandListItem from '@/pages/land/landListItem/index.vue'

const emit = defineEmits(['toLink', 'loginIn'])
const list = ref<any[]>([
  {
    name: '使用权人',
    landNo:'地块编号',
    phone:'15869083628'
  },
  {
    name: '使用权人',
    landNo:'地块编号',
    phone:'15869083622'
  }
])
const searchName = ref<string>('')
const isLoading = ref<boolean>(false) //是否正在加载
const isEnd = ref<boolean>(false) // 是否加载到底
const page = ref<number>(1)
const pageSize = ref<number>(10)
const associationBindingRef=ref()

const onSearch = () => {
  if (searchName.value) {
    routerForward('householdList', {
      name: searchName.value
    })
  }
}

const getList = () => {
  nextTick(async () => {
    isLoading.value = true
    // const params: any = {
    //   page: page.value,
    //   pageSize: pageSize.value
    // }
    // const realList = villageCode.value.filter((item) => !!item)
    // if (realList.length) {
    //   if (realList.length === 1) {
    //     params.areaCode = unref(villageCode)[0] || ''
    //   } else if (realList.length === 2) {
    //     params.townCode = unref(villageCode)[1] || ''
    //   } else if (realList.length === 3) {
    //     params.villageCode = unref(villageCode)[2] || ''
    //   }
    // }
    // const res = await getLandlordListBySearchApi(params).catch(() => {
    //   isLoading.value = false
    // })
    isLoading.value = false
    // if (res && res.length) {
    //   if (page.value === 1) {
    //     list.value = res || []
    //   } else {
    //     list.value = list.value.concat(res)
    //   }
    //   if (res.length < pageSize.value) {
    //     isEnd.value = true
    //   } else {
    //     page.value = page.value + 1
    //   }
    // } else {
    //   if (page.value === 1) {
    //     list.value = []
    //   }
    //   isEnd.value = true
    // }
  })
}

const editLandlord = (item:any) => {
  console.log(item);
}


const init = () => {
  page.value = 1
  isEnd.value = false
  isLoading.value = false
  getList()
}

const clear = () => {
  init()
}

const dialogConfirm = () => {
  // if (routerType.value === 'back') {
  //   goBack()
  // } else if (routerType.value === 'home') {
  //   goHome()
  // }
   associationBindingRef.value?.close()
}

const dialogClose = () => {
  associationBindingRef.value?.close()
}

const status = computed(() => {
  return isEnd.value ? 'noMore' : isLoading.value ? 'loading' : 'more'
})

const onSearchMore = () => {
  
}
const toLink = (name: string) => {
  emit('toLink', name)
}

const loginIn = () => {
  emit('loginIn')
}

// 关联绑定
const associatedBind = () => {
    associationBindingRef.value?.open()
}

// 数据同步
const syncData = () => {
  
}

const loadMore = () => {
  if (isEnd.value || isLoading.value) {
    return
  }
  console.log('load more')

  getList()
}

onShow(() => {
  // const user = getStorage(StorageKey.USERINFO)
  // const project = getStorage(StorageKey.PROJECTINFO)
  // userInfo.value = user
  // projectInfo.value = project
})
onMounted(() => {
  // getImpHomeCollectDtoApi().then((res) => {
  //   if (res) {
  //     homeCollect.value = { ...homeCollect.value, ...res }
  //   }
  // })
})
</script>

<style lang="scss" scoped>
  .search-btn-radius {
    display: flex;
    width: 60rpx;
    height: 28rpx;
    overflow: hidden;
    background: linear-gradient(270deg, #ffb11a 0%, #ff9432 100%);
    border-radius: 5rpx;
    justify-content: center;
    align-items: center;
    margin-left: 10rpx;

    .search-txt {
      margin-left: 5rpx;
      font-size: 9rpx;
      font-weight: 400;
      color: #f7f8fa;
    }
  }


.search-segment{
  display: flex;
  align-items: center;
  justify-content: center;
}


.search {
  display: flex;
  width: 375rpx;
  height: 28rpx;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 5rpx;
  justify-content: center;

  .search-input {
    width: 315rpx;
    height: 28rpx;
    padding-left: 12rpx;
    line-height: 28rpx;
    text-align: left;
    border-radius: 5rpx 0 0 5rpx;

    input {
      height: 28rpx;
      font-size: 10rpx;
      line-height: 28rpx;
      color: rgba(19, 19, 19, 0.4);
    }
  }

  .search-btn {
    display: flex;
    width: 60rpx;
    height: 28rpx;
    overflow: hidden;
    background: linear-gradient(270deg, #ffb11a 0%, #ff9432 100%);
    border-radius: 0 5rpx 5rpx 0;
    justify-content: center;
    align-items: center;

    .search-icon {
      width: 14rpx;
      height: 14rpx;
    }

    .search-txt {
      margin-left: 5rpx;
      font-size: 9rpx;
      font-weight: 400;
      color: #f7f8fa;
    }
  }
}


.main-enter{
  display: flex;
  flex-direction: column;
  padding: 20rpx 20rpx 0 20rpx;

  .operate-segment{
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
    justify-content: space-between;

    .land-text{
      font-size: 10rpx;
      font-weight: 400;
      color: #fff;
    }

    .right-side{
      display: flex;
      align-items: center;
    }
  }

  .main-list{
    flex: 1;
   width: 100%;
  margin-top: 7rpx;
  }
}

  .btn {
    display: flex;
    height: 23rpx;
    padding: 0 9rpx;
    margin-left: 6rpx;
    background: #3e73ec;
    border-radius: 23rpx;
    align-items: center;
    justify-content: center;

    &.green-btn {
      background-color: #30a952;
    }

    &.blue-btn {
      background: #3e73ec;
    }

  &.red {
    background-color: #e43030;
  }

  &.yellow {
    background-color: #fec44c;
  }
    .txt {
      font-size: 9rpx;
      line-height: 11rpx;
      color: #ffffff;
    }
  }

.scroll-view {
  width: 100%;
  height: calc(100vh - var(--status-bar-height) - 33rpx - 18rpx - 6rpx - 10rpx - 42rpx);
}

.scroll {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.load-more {
  flex: none;
  width: 100%;
}

</style>
