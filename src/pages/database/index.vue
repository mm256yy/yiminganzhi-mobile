<template>
  <uni-section class="box" title="数据库列表" type="line" padding>
    <swiper class="swiper" :indicator-dots="true">
      <swiper-item>
        <uni-grid :square="false" :column="3" :highlight="true" @change="change">
          <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
            <view class="grid-item-box">
              <uni-icons type="list" :size="30" color="#777" />
              <text class="text">{{ item.text }}</text>
              <text class="text">{{ item.name }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </swiper-item>
    </swiper>
  </uni-section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getBaseDataApi, getConfigDataApi, getCollectApi, getMainTreeApi } from '@/sync/api'
import { routerForward } from '@/utils'

const currentTable = ref<string>('')
const list = ref<any[]>([
  {
    text: 'project',
    name: '项目',
    badge: '0'
  },
  {
    text: 'landlord',
    name: '农户',
    badge: '1'
  },
  {
    text: 'collect',
    name: '统计',
    badge: '2'
  },
  {
    text: 'dictionaries',
    name: '字典',
    badge: '3'
  },
  {
    text: 'appendant',
    name: '附属物',
    badge: '4'
  },
  {
    text: 'family_income',
    name: '家庭收入',
    badge: '5'
  },
  {
    text: 'district',
    name: '行政区划',
    badge: '6'
  },
  {
    text: 'village',
    name: '自然村',
    badge: '7'
  },
  {
    text: 'resettlement',
    name: '安置意愿',
    badge: '8'
  },
  {
    text: 'other',
    name: '其他',
    badge: '9'
  }
])

const change = (e: any) => {
  console.log(e.detail, 'e')
  let { index } = e.detail

  currentTable.value = list.value[index].text
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
