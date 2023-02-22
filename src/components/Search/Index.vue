<template>
  <view class="search-wrapper">
    <view class="search-box">
      <image class="icon" src="@/static/images/icon_search.png" mode="scaleToFill" />
      <input
        v-model="keywords"
        class="txt"
        placeholder="搜索行政村、自然村、姓名"
        @confirm="confirm"
      />
    </view>
    <label class="icon-wrapper">
      <image class="icon" :src="props.iconSrc" mode="scaleToFill" />
    </label>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface PropsType {
  iconSrc: string
}

const props = defineProps<PropsType>()
const keywords = ref<string>('')
const emit = defineEmits(['confirm'])

const confirm = () => {
  emit('confirm', keywords)
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  width: 100%;
  height: 33rpx;
  padding: 6rpx;
  border-radius: 7rpx 7rpx 0 0;
  box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
  align-items: center;

  .search-box {
    display: flex;
    width: 158rpx;
    height: 23rpx;
    padding: 0 7rpx;
    background: #f6f7f9;
    border: 1px solid #e8e8e8;
    border-radius: 12rpx;
    box-sizing: border-box;
    align-items: center;

    .icon {
      width: 9rpx;
      height: 9rpx;
      margin-right: 7rpx;
    }

    .txt {
      flex: 1;
      margin-right: 4rpx;
      font-size: 9rpx;
      color: #171718;
    }
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42rpx;
    height: 23rpx;

    .icon {
      width: 14rpx;
      height: 14rpx;
    }
  }
}
</style>
