<template>
  <view class="back-wrapper">
    <view class="status" />
    <view class="back">
      <image class="icon-back" src="@/static/images/back.png" mode="scaleToFill" @click="back" />
      <view class="title">{{ props.title }}</view>
      <image
        class="icon-home"
        src="@/static/images/icon_home.png"
        mode="scaleToFill"
        @click="toHome"
      />
    </view>
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="数据未保存是否退出？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { routerForward } from '@/utils'

interface PropsType {
  title: string
  needConfirm?: boolean
}

const alertDialog = ref<any>(null)
const routerType = ref<'back' | 'home'>('back')

const props = defineProps<PropsType>()

const goBack = () => {
    const pages = getCurrentPages(); 
  console.log(pages,'2') 
const currentPage = pages[pages.length - 1]; // 假设最后一个页面是当前页面  
console.log(currentPage.route,'3'); // 输出当前页面的路由
  console.log('goBack','测试跳转')
  uni.navigateBack({
    delta: 1
  })
}

const goHome = () => {
  routerForward('home')
}

const back = () => {
    const pages = getCurrentPages(); 
  console.log(pages,'4') 
const currentPage = pages[pages.length - 1]; // 假设最后一个页面是当前页面  
console.log(currentPage.route,'5'); // 输出当前页面的路由
  console.log('goBack','测试跳转')
  if (props.needConfirm) {
    routerType.value = 'back'
    loginOutPre()
  } else {
    goBack()
  }
}

const toHome = () => {
  if (props.needConfirm) {
    routerType.value = 'home'
    loginOutPre()
  } else {
    goHome()
  }
}

const loginOutPre = () => {
  alertDialog.value?.open()
}

const dialogConfirm = () => {
  if (routerType.value === 'back') {
    goBack()
  } else if (routerType.value === 'home') {
    goHome()
  }
}

const dialogClose = () => {
  alertDialog.value?.close()
}
</script>

<style lang="scss" scoped>
.back-wrapper {
  background: transparent;

  .status {
    height: var(--status-bar-height);
  }

  .back {
    display: flex;
    height: 33rpx;
    padding: 0 9rpx;
    flex-direction: row;
    align-items: center;

    .icon-back {
      width: 14rpx;
      height: 14rpx;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15rpx;
      color: #fff;
      flex: 1 auto;
    }

    .icon-home {
      width: 23rpx;
      height: 23rpx;
    }
  }
}
</style>
