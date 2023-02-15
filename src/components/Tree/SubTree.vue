<template>
  <view class="sub-tree-item">
    <view class="tree-head" @click="subItemToggleClick">
      <view class="item-lt">
        <image
          v-if="props.expendIds.includes(props.data.id as never)"
          class="icon"
          src="@/static/images/icon_expand_down.png"
          mode="scaleToFill"
        />
        <image v-else class="icon" src="@/static/images/icon_expand.png" mode="scaleToFill" />
        <text class="item-title">{{ props.data.name }}</text>
      </view>

      <view class="item-rt">
        <view class="item left">
          <image class="icon" src="@/static/images/icon_finish.png" mode="scaleToFill" />
          <text class="number green">{{ props.data.id }}</text>
        </view>
        <view class="item">
          <image class="icon" src="@/static/images/icon_total.png" mode="scaleToFill" />
          <text class="number blue">22444</text>
        </view>
      </view>
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
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
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
  flex-direction: row;
  align-items: center;
  height: 12rpx;
  padding: 0 2rpx;

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.left {
      margin-right: 6rpx;
    }

    .icon {
      width: 9rpx;
      height: 9rpx;
      margin-right: 2rpx;
    }

    .number {
      font-size: 8rpx;

      &.green {
        color: #28af45;
      }

      &.blue {
        color: #3e73ec;
      }
    }
  }
}
</style>
