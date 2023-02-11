<template>
  <view class="sub-tree-item">
    <view class="tree-head" @click="subItemToggleClick">
      <view class="item-lt">
        <uni-icons
          v-if="props.expendIds.includes(props.data.id as never)"
          type="bottom"
          color="#999999"
          size="9rpx"
        />
        <uni-icons v-else type="forward" color="#999999" size="9rpx" />
        <text class="item-tit">{{ props.data.name }}</text>
      </view>

      <view class="item-rt">
        <text class="number primary">{{ props.data.id }}</text>
        <text class="number"> / </text>
        <text class="number">224444</text>
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
  cursor: pointer;
  background-color: #fff;
}

.tree-head {
  display: flex;
  height: 28rpx;
  padding: 0 8rpx 0 4rpx;
  background-color: #fff;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.item-lt {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.item-tit {
  margin-left: 4rpx;
  font-size: 9rpx;
  color: #171718;
}

.item-rt {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 12rpx;
  padding: 0 2rpx;
  background-color: #ededed;
}

.number {
  font-size: 8rpx;
  color: #171718;
}

.primary {
  color: #3e73ec;
}
</style>
