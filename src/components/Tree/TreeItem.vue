<template>
  <view class="tree-list-item">
    <!--  有子集 行政区划 -->
    <view v-if="hasChildren && !props.data.landlord" class="tree-item" @click="toggle">
      <view class="tree-item-lt">
        <image v-if="open" class="icon" src="@/static/images/icon_up.png" mode="scaleToFill" />
        <image v-else class="icon" src="@/static/images/icon_down.png" mode="scaleToFill" />
        <text class="item-title">{{ props.data.name }}</text>
      </view>

      <view class="tree-item-rt">
        <text class="num green">{{ props.data.reportNum }}</text> /
        <text class="num">{{ props.data.totalNum }}</text>
      </view>
    </view>
    <!-- 无子集 业主 -->
    <view
      v-else-if="!hasChildren && props.data.landlord"
      class="tree-item"
      :class="[props.data.uid === props.uid ? 'active' : '']"
      @click="treeItemClick(props.data)"
    >
      <view class="tree-item-lt">
        <view class="status">
          <image
            v-if="props.data.reportStatus === 'ReportSucceed'"
            class="icon"
            src="@/static/images/icon_complete.png"
            mode="scaleToFill"
          />
          <image v-else class="icon" src="@/static/images/icon_miss.png" mode="scaleToFill" />
        </view>
        <text class="item-txt">{{ props.data.name }}</text>
      </view>

      <view class="tree-item-rt">
        <text class="num">{{ filterViewDoorNo(props.data) }}</text>
      </view>
    </view>
    <!-- 行政区划 无子集 -->
    <view v-else-if="!props.data.landlord" class="tree-item" @click="toggle">
      <view class="tree-item-lt">
        <image v-if="open" class="icon" src="@/static/images/icon_up.png" mode="scaleToFill" />
        <image v-else class="icon" src="@/static/images/icon_down.png" mode="scaleToFill" />
        <text class="item-title">{{ props.data.name }}</text>
      </view>

      <view class="tree-item-rt">
        <text class="num green">{{ props.data.reportNum }}</text> /
        <text class="num">{{ props.data.totalNum }}</text>
      </view>
    </view>
    <!-- 子集展开 有数据 -->
    <view v-if="hasChildren && open" class="tree-children">
      <TreeItem
        v-for="item in data.children"
        :key="item.id"
        :data="item"
        :expend-codes="props.expendCodes"
        :uid="props.uid"
        @tree-item-click="treeItemClick"
      />
    </view>
    <!-- 子集展开 无数据 -->
    <view v-else-if="!hasChildren && !props.data.landlord && open" class="no-data">暂无数据</view>
  </view>
</template>

<script lang="ts" setup>
import { filterViewDoorNo } from '@/utils'
import { LandlordType } from '@/types/sync'
import { ref, computed, onMounted } from 'vue'

interface PropsType {
  data: LandlordType
  uid?: string
  expendCodes?: string[] // 展开的行
}

const props = defineProps<PropsType>()
const emit = defineEmits(['treeItemClick'])
const open = ref<boolean>(false)

const toggle = () => {
  open.value = !open.value
}

const treeItemClick = (data: any) => {
  emit('treeItemClick', data)
}

const hasChildren = computed(() => {
  return props.data.children && props.data.children.length
})

onMounted(() => {
  if (props.expendCodes && props.expendCodes.length) {
    if (props.expendCodes.includes(props.data.code as string)) {
      open.value = true
    } else {
      open.value = false
    }
  }

  if (props.uid && props.data.landlord && props.data.uid === props.uid) {
    setTimeout(() => {
      emit('treeItemClick', props.data)
    }, 1000)
  }
})
</script>

<style lang="scss">
.tree-list-item {
  margin-bottom: 6rpx;
  background-color: #ffffff;
  border-radius: 5rpx;
  box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);
}

.tree-item {
  display: flex;
  height: 28rpx;
  padding: 0 8rpx 0 4rpx;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &.active {
    background-color: #e1f0ff;
  }
}

.tree-item-lt {
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

.item-name {
  margin-left: 5rpx;
  overflow: hidden;
  font-size: 9rpx;
  color: #171718;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.w-100 {
    width: 100rpx;
  }
}

.item-txt {
  width: 40rpx;
  margin-left: 6rpx;
  overflow: hidden;
  font-size: 8rpx;
  color: #171718;
  text-overflow: ellipsis;
  white-space: nowrap;
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

    &.green {
      color: #28af45;
    }
  }
}

.tree-children {
  padding-left: 6rpx;

  .tree-list-item {
    margin-bottom: 0;
    border-radius: 0;
    box-shadow: none;
  }
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28rpx;
  padding-left: 6rpx;
  font-size: 8rpx;
  color: #171718;
}
</style>
