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
      <text class="num gray">0</text> / <text class="num">12</text>
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
  background-color: #fff;
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
  font-size: 8rpx;

  .num {
    font-size: 8rpx;
    color: rgba(0, 0, 0, 0.85);

    &.gray {
      color: #999;
    }
  }
}
</style>
