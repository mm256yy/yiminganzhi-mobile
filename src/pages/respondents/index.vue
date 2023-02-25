<template>
  <Container>
    <template #title>
      <view class="title" @click="onSelectVillage">
        <text class="tit">行政村</text>
        <image class="icon" src="@/static/images/respondents_select.png" mode="scaleToFill" />
      </view>
    </template>

    <view class="respondents-wrap">
      <view class="tabs">
        <view class="tab-item one" :class="[tabId === 1 ? 'active' : '']" @click="onTabChange(1)">
          <image class="icon" src="@/static/images/people_icon.png" mode="scaleToFill" />
          <text class="tit">居民户</text>
        </view>
        <view
          class="tab-item two other"
          :class="[tabId === 2 ? 'active' : '']"
          @click="onTabChange(2)"
        >
          <image class="icon" src="@/static/images/respondents_company.png" mode="scaleToFill" />
          <text class="tit">企业</text>
        </view>
        <view
          class="tab-item thr other"
          :class="[tabId === 3 ? 'active' : '']"
          @click="onTabChange(3)"
        >
          <image class="icon" src="@/static/images/respondents_single.png" mode="scaleToFill" />
          <text class="tit">个体户</text>
        </view>
        <view
          class="tab-item for other"
          :class="[tabId === 4 ? 'active' : '']"
          @click="onTabChange(4)"
        >
          <image class="icon" src="@/static/images/respondents_jt.png" mode="scaleToFill" />
          <text class="tit">村集体</text>
        </view>
      </view>

      <view class="search-box">
        <uni-icons class="icon" type="search" color="#272636" size="9rpx" />
        <input type="text" class="ipt" placeholder="搜索名称" />
      </view>

      <view class="respondents-list">
        <CompanyItem />
        <CompanyItem />
        <CompanyItem />
        <VillageItem />
        <VillageItem />
        <VillageItem />
      </view>
    </view>

    <VillageSelect
      v-show="showVillageSelect"
      :show="showVillageSelect"
      @on-close="showVillageSelect = false"
    />
  </Container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Container from '@/components/Container/index.vue'
import CompanyItem from './company.vue'
import VillageItem from './villageItem.vue'
import VillageSelect from './villageSelect.vue'
import { getVillageListApi } from '@/service'

const tabId = ref<number>(1)
const showVillageSelect = ref<boolean>(false)

const onTabChange = (id: number) => {
  tabId.value = id
}

const onSelectVillage = () => {
  showVillageSelect.value = !showVillageSelect.value
}

const getVillageList = () => {
  getVillageListApi()
}
getVillageList()
</script>

<style lang="scss">
.title {
  display: flex;
  align-items: center;
  justify-content: center;

  .tit {
    font-size: 15rpx;
    font-weight: 500;
    color: #ffffff;
  }

  .icon {
    width: 14rpx;
    height: 14rpx;
    margin-left: 5rpx;
  }
}

.respondents-wrap {
  display: flex;
  height: 100%;
  padding: 0 25rpx 10rpx;
  flex-direction: column;
}

.tabs {
  flex: none;
  display: flex;
  align-items: center;

  .tab-item {
    position: relative;
    display: flex;
    width: 105rpx;
    height: 38rpx;
    padding: 5rpx 0;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 105rpx 33rpx;
    align-items: center;
    justify-content: center;

    .icon {
      display: none;
      width: 15rpx;
      height: 15rpx;
      margin-right: 6rpx;
    }

    .tit {
      font-size: 12rpx;
      font-weight: 500;
      color: #ffffff;
    }

    &.one {
      z-index: 4;
      background-image: url('@/static/images/nav_default_first.png');
    }

    &.two {
      z-index: 3;
    }

    &.thr {
      z-index: 2;
    }

    &.for {
      z-index: 1;
    }

    &.other {
      margin-left: -13rpx;
      background-image: url('@/static/images/nav_default.png');
    }

    &.active {
      z-index: 5;
      background-size: 105rpx 38rpx;

      .icon {
        display: block;
      }

      .tit {
        color: #0a54ff;
      }

      &.one {
        background-image: url('@/static/images/nav_active_first.png');
      }

      &.other {
        background-image: url('@/static/images/nav_active.png');
      }
    }
  }
}

.search-box {
  flex: none;
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 23rpx;
  padding: 0 18rpx;
  margin-top: -5rpx;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  border-radius: 0 7rpx 7rpx 7rpx;
  align-items: center;

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

.respondents-list {
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  margin-top: 7rpx;
  overflow-y: scroll;
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
