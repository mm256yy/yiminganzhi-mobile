<template>
  <Container title="自然村清单">
    <template #right>
      <view class="icon-box">
        <image class="home-icon" src="@/static/images/icon_home.png" mode="scaleToFill" />
      </view>
    </template>

    <view class="village-box">
      <view class="search-box">
        <uni-icons class="icon" type="search" color="#272636" size="9rpx" />
        <input type="text" class="ipt" placeholder="搜索名称" />
      </view>
      <view class="village-list">
        <template v-for="item in villageList" :key="item.id">
          <VillageItem :data="item" />
        </template>
      </view>
    </view>

    <view class="add-box">
      <uni-icons type="plusempty" color="#ffffff" size="10rpx" />
    </view>
  </Container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VillageItem from './villageItem.vue'
import Container from '@/components/Container/index.vue'
import { VillageType } from '@/types/common'

const villageList = ref<VillageType[]>([])
</script>

<style lang="scss">
.icon-box {
  display: flex;
  align-items: center;
}

.home-icon {
  width: 23rpx;
  height: 23rpx;
  margin-top: 4rpx;
}

.village-box {
  padding: 0 25rpx 25rpx;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 23rpx;
  padding: 0 18rpx;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  border-radius: 16rpx;

  .icon {
    flex: none;
  }

  .ipt {
    height: 14rpx;
    margin-left: 7rpx;
    font-size: 9rpx;
    color: #171718;
    flex: 1;
  }
}

.village-list {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.add-box {
  position: absolute;
  right: 25rpx;
  bottom: 25rpx;
  display: flex;
  width: 33rpx;
  height: 33rpx;
  background-color: #3e73ec;
  border-radius: 16rpx;
  box-shadow: 0rpx 5rpx 16rpx 5rpx rgba(0, 0, 0, 0.05), 0rpx 4rpx 9rpx 0rpx rgba(0, 0, 0, 0.08),
    0rpx 2rpx 4rpx -2rpx rgba(0, 0, 0, 0.12);
  align-items: center;
  justify-content: center;
}
</style>
