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
    console.log(tableName.value, '进入了')
    const res = await db.selectTableData(tableName.value).catch((err) => {
      console.log(err, 'err')
    })
    console.log(res.length, `${tableName.value} 表数据`)
    jsonData.value = res
    // jsonData.value = (res || []).map((item: any) => {
    //   try {
    //     return JSON.parse(item.content)
    //   } catch (e) {
    //     return item
    //   }
    // })
    // console.log(jsonData.value, `页面数据`)
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
