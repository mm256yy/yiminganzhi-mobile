<template>
  <view class="confirm-room-wrapper">
    <!-- tab 切换 -->
    <tabs @switch-tab="switchTab" />

    <!-- 选房摇号 -->
    <lottery v-if="tabVal === 1" />

    <!-- 房屋列表 -->
    <room-list v-if="tabVal === 2" />

    <!-- 签字 -->
    <sign v-if="tabVal === 3" />

    <!-- 打印表格 -->
    <print v-if="tabVal === 4" />

    <!-- 档案上传 -->
    <uploads v-if="tabVal === 5" @submit="uploadsSubmit" />

    <!-- 无需办理 -->
    <no-need-handle v-if="tabVal === 6" :dataInfo="dataInfo" />
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import tabs from './tabs.vue' // 引入 tab 切换组件
import lottery from './lottery.vue' // 引入选房摇号组件
import roomList from './roomList.vue' // 引入房屋列表组件
import sign from './sign.vue' // 引入签字组件
import print from './print.vue' // 引入打印表格组件
import uploads from './uploads.vue' // 引入档案上传组件
import noNeedHandle from './noNeedHandle.vue' // 引入无需办理组件

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const tabVal = ref<number>(1)

const switchTab = (item: any) => {
  tabVal.value = item.value
}

/**
 * 档案上传表单提交
 * @params{object} data 提交的相关参数
 */
const uploadsSubmit = (data: any) => {
  console.log('data:', data)
}
</script>
