<template>
  <view class="databse-wrap">
    <view :style="{ height: `${statusBarHeight}px` }" />
    <view class="back-btn" @click="back">返回列表</view>
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
    <view style="height: 100px" id="pdf" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pullInstance } from '@/sync'
// import { getBaseDataApi, getConfigDataApi, getCollectApi, getMainTreeApi } from '@/sync/api'
import { routerForward, routerBack } from '@/utils'
import {
  getLandEstimateDtoListApi,
  getLandPeasantHouseholdDtoListApi,
  updateLandlord,
  getLandlordListBySearchApi,
  getDictObjsApi
} from '@/service'
import { MainType } from '@/types/common'
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
  let m = await getLandlordListBySearchApi({ type: MainType.LandNoMove, name: '赵六' })
  console.log(m, '只征地不搬迁人数据')
  getLandEstimateDtoListApi().then((res: any) => {
    console.log(res, '土地列表')
  })
  // updateLandlord({uid:'33b30180-b5e8-47db-8222-3c0de067ffc7',id:232794,type:'1'}).then((res:any) => {
  //   console.log(res, '更新数据');
  //   getLandlordListBySearchApi({type:MainType.LandNoMove,name: '赵六'}).then((err:any) => {
  //     console.log(err,'更新数据');
  //   })
  // })
}

getTables()

const back = () => {
  routerBack()
}
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

.back-btn {
  width: 80rpx;
  height: 30rpx;
  margin: 0 auto;
  font-size: 9rpx;
  line-height: 30rpx;
  color: #fff;
  text-align: center;
  background-color: #007aff;
  border-radius: 5rpx;

  &:active {
    opacity: 0.5;
  }
}
</style>
