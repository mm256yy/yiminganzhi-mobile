<template>
  <view class="table-wrap" :style="{ height: `${pageHeight}px` }">
    <view :style="{ height: `${statusBarHeight}px` }" />
    <view class="back-btn" @click="back">返回列表</view>
    <scroll-view scroll-y class="json-view">
      <json-viewer :modelValue="jsonData" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { db } from '@/database'
import { routerBack } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import JsonViewer from './components/jsonView.vue'

const tableName = ref<string>('project')

onLoad((option: any) => {
  console.log(option, 'option')
  if (option && option.table) {
    tableName.value = option.table
    console.log(option.table);
    
    getJsonData()
  }
})

const jsonData = ref<any[]>([
  {
    id: 1,
    name: '默认数据'
  }
])

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight

const pageHeight = screenHeight - statusBarHeight

const getJsonData = async () => {
  console.log(db.isOpen());
  if (db.isOpen()) {
    const res = await db.selectTableData(tableName.value).catch((err) => {
      console.log(err, 'err')
    })
    console.log(res.length, `${tableName.value} 表数据条数`)
    if (
      tableName.value === 'landlord' ||
      tableName.value === 'other' ||
      tableName.value === 'image' ||
      tableName.value==='landEstimateDtoList'
    ) {
      if (tableName.value === 'other') {
        jsonData.value = (res || []).map((item: any) => {
          item.content = JSON.parse(item.content)
          return item
        })
      } else {
        jsonData.value = res
      }
    } else {
      jsonData.value = (res || []).map((item: any) => {
        return JSON.parse(item.content)
      })
    }
  } else {
    uni.showToast({
      title: '数据库未打开',
      icon: 'error'
    })
  }
}

const back = () => {
  routerBack()
}
</script>

<style lang="scss">
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

.json-view {
  flex: 1;
}
</style>
