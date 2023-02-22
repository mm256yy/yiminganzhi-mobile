<template>
  <view class="sub-tree-item">
    <view class="tree-head" @click="subItemToggleClick">
      <view class="item-lt">
        <image
          v-if="props.expendIds.includes(props.data.id as never)"
          class="icon"
          src="@/static/images/icon_up.png"
          mode="scaleToFill"
        />
        <image v-else class="icon" src="@/static/images/icon_down.png" mode="scaleToFill" />
        <text class="item-title">{{ props.data.name }}</text>
      </view>

      <view class="item-rt"> <text class="num green">0</text> / <text class="num">12</text> </view>
    </view>

    <view v-if="props.expendIds.includes(props.data.id as never)">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'

interface PropsType {
  data: any
  expendIds: number[] | string[]
}

const props = defineProps<PropsType>()
const emit = defineEmits(['subItemClick'])

const subItemToggleClick = () => {
  emit('subItemClick', props.data)
}
</script>

<style lang="scss">
.sub-tree-item {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.tree-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 28rpx;
  justify-content: space-between;
  padding: 0 8rpx 0 4rpx;
  background-color: #fff;
}

.item-lt {
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 9rpx;
    height: 9rpx;
  }

  .item-title {
    margin-left: 4rpx;
    font-size: 9rpx;
    color: #171718;
  }
}

.item-rt {
  display: flex;
  height: 12rpx;
  padding: 0 2rpx;
  font-size: 8rpx;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;

  .num {
    font-size: 8rpx;

    &.green {
      color: #28af45;
    }
  }
}
</style>
