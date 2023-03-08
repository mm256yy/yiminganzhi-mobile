<template>
  <view class="table-wrap" :style="{ height: `${pageHeight}px` }">
    <view :style="{ height: `${statusBarHeight}px` }" />
    <view><button type="primary" @click="back">返回列表</button></view>
    <scroll-view scroll-y class="json-view">
      <json-viewer :modelValue="jsonData" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { db } from '@/database'
import { routerBack } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import JsonViewer from './components/jsonView.vue'

const tableName = ref<string>('project')

onLoad((option: any) => {
  console.log(option, 'option')
  if (option && option.table) {
    tableName.value = option.table
    getJsonData()
  }
})

const jsonData = ref<any[]>([
  {
    id: 22,
    name: 'dafdsafdsa'
  },
  {
    id: 333,
    name: '范德萨发大'
  }
])

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0
const screenHeight = sysInfo.screenHeight

const pageHeight = screenHeight - statusBarHeight

const getJsonData = async () => {
  if (db.isOpen()) {
    const res = await db.selectTableData(tableName.value).catch((err) => {
      console.log(err, 'err')
    })
    console.log(res.length, `${tableName.value} 表数据条数`)
    jsonData.value = (res || []).map((item: any) => {
      if (tableName.value !== 'other') {
        return JSON.parse(item.content)
      } else {
        return item
      }
    })
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
.json-view {
  flex: 1;
}
</style>
