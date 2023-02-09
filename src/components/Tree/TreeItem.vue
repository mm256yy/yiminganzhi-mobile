<template>
  <view class="tree-item" @click="treeItemClick">
    <view class="tree-item-lt">
      <view class="status">
        <view class="dot" />
      </view>
      <text class="item-tit">{{ props.data.name }}</text>
      <text class="item-txt">{{ props.data.id }}</text>
    </view>

    <view class="tree-item-rt">
      <text class="number primary">2</text>
      <text class="number">9</text>
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
  width: 9rpx;
  height: 9rpx;
  margin-right: 2rpx;
}

.dot {
  width: 4rpx;
  height: 4rpx;
  background-color: #44b95d;
}

.item-tit {
  width: 40rpx;
  overflow: hidden;
  font-size: 9rpx;
  color: #171718;
  word-break: keep-all;
}

.item-txt {
  font-size: 8rpx;
  color: #171718;
}

.tree-item-rt {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 24rpx;
  height: 12rpx;
}

.number {
  width: 12rpx;
  height: 12rpx;
  font-size: 8rpx;
  line-height: 12rpx;
  color: #171718;
  text-align: center;
  background-color: #ededed;
}

.primary {
  color: #ffffff;
  background-color: #28af45;
}
</style>
