<template>
  <view class="form-wrapper">
    <Back title="消息通知详情" needConfirm />
    <view class="main">
       <rich-text :nodes="query.content"/>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'

const query = ref<any>()
const list = ref<any>()

onLoad((option) => {
  if (option) {
    query.value = option as any
  }
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .main {
    height: calc(100vh - 33rpx);
    padding: 6rpx;
    background-color: #e7edfd;
    border-radius: 2rpx;
    box-sizing: border-box;
  }
}
</style>
