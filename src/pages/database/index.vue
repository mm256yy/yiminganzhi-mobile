<template>
  <view class="databse-wrap">
    <view :style="{ height: `${statusBarHeight}px` }" />
    <uni-section class="box" title="数据库列表" type="line" padding>
      <swiper class="swiper" :indicator-dots="true">
        <swiper-item>
          <uni-grid :square="false" :column="3" :highlight="true" @change="change">
            <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
              <view class="grid-item-box">
                <uni-icons type="list" :size="30" color="#777" />
                <text class="text">{{ item.tbl_name }}</text>
              </view>
            </uni-grid-item>
          </uni-grid>
        </swiper-item>
      </swiper>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pullInstance } from '@/sync'
// import { getBaseDataApi, getConfigDataApi, getCollectApi, getMainTreeApi } from '@/sync/api'
import { routerForward } from '@/utils'

const currentTable = ref<string>('')
const list = ref<any[]>([])

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0

const change = (e: any) => {
  let { index } = e.detail

  currentTable.value = list.value[index].tbl_name
  routerForward('table', {
    table: currentTable.value
  })
}

const getApiData = async () => {
  // const res1 = await getBaseDataApi()
  // const res2 = await getConfigDataApi()
  // const res3 = await getCollectApi()
  // const res4 = await getMainTreeApi()
  // console.log(res3, res4, '接口数据')
}

getApiData()

const getTables = async () => {
  const tables = await pullInstance.getTables()
  list.value = tables || []
}

getTables()
</script>

<style lang="scss">
.box {
  height: 100vh;
}

.image {
  width: 25rpx;
  height: 25rpx;
}

.text {
  margin-top: 5rpx;
  font-size: 14rpx;
}

.grid-dynamic-box {
  margin-bottom: 15rpx;
}

.grid-item-box {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15rpx 0;
}

.grid-dot {
  position: absolute;
  top: 5rpx;
  right: 15rpx;
}

.swiper {
  height: calc(100vh - 64px);
}
</style>
