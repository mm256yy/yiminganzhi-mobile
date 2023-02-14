<template>
  <view class="tree-item" @click="treeItemClick">
    <view class="tree-item-lt">
      <view class="status">
        <image class="icon" src="@/static/images/icon_complete.png" mode="scaleToFill" />
      </view>
      <text class="item-tit">{{ props.data.name }}</text>
      <text class="item-txt">{{ props.data.accountNo }}</text>
    </view>

    <view class="tree-item-rt">
      <text class="number left">2</text>
      <text class="number right">9</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
interface PropsType {
  data: any
}

const props = defineProps<PropsType>()
const emit = defineEmits(['treeItemClick'])

const treeItemClick = () => {
  emit('treeItemClick', props.data)
}
</script>

<style lang="scss">
.tree-item {
  display: flex;
  height: 28rpx;
  padding: 0 8rpx 0 4rpx;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.tree-item-lt {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    width: 9rpx;
    height: 9rpx;
    margin-right: 2rpx;
  }
}

.item-tit {
  width: 40rpx;
  overflow: hidden;
  font-size: 9rpx;
  color: #171718;
}

.item-txt {
  font-size: 8rpx;
  color: #171718;
}

.tree-item-rt {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 12rpx;

  .number {
    height: 12rpx;
    padding: 0 4rpx;
    font-size: 8rpx;
    line-height: 12rpx;
    color: #171718;
    box-sizing: border-box;

    &.left {
      color: #3e73ec;
      background-color: #d8e6ff;
      border-radius: 6rpx 0 0 6rpx;
    }

    &.right {
      background-color: #f0f0f0;
      border-radius: 0 6rpx 6rpx 0;
    }
  }
}
</style>
