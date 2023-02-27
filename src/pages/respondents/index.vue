<template>
  <Container>
    <template #title>
      <view class="title" @click="onToggleVillage">
        <text class="tit">行政村</text>
        <image class="icon" src="@/static/images/respondents_select.png" mode="scaleToFill" />
      </view>
    </template>

    <view class="respondents-wrap">
      <view class="tabs">
        <view
          class="tab-item one"
          :class="[tabType === MainType.PeasantHousehold ? 'active' : '']"
          @click="onTabChange(MainType.PeasantHousehold)"
        >
          <image class="icon" src="@/static/images/people_icon.png" mode="scaleToFill" />
          <text class="tit">居民户</text>
        </view>
        <view
          class="tab-item two other"
          :class="[tabType === MainType.Company ? 'active' : '']"
          @click="onTabChange(MainType.Company)"
        >
          <image class="icon" src="@/static/images/respondents_company.png" mode="scaleToFill" />
          <text class="tit">企业</text>
        </view>
        <view
          class="tab-item thr other"
          :class="[tabType === MainType.IndividualHousehold ? 'active' : '']"
          @click="onTabChange(MainType.IndividualHousehold)"
        >
          <image class="icon" src="@/static/images/respondents_single.png" mode="scaleToFill" />
          <text class="tit">个体户</text>
        </view>
        <view
          class="tab-item for other"
          :class="[tabType === MainType.Village ? 'active' : '']"
          @click="onTabChange(MainType.Village)"
        >
          <image class="icon" src="@/static/images/respondents_jt.png" mode="scaleToFill" />
          <text class="tit">村集体</text>
        </view>
      </view>

      <view class="search-box">
        <uni-icons class="icon" type="search" color="#272636" size="9rpx" />
        <input
          type="text"
          class="ipt"
          placeholder="搜索名称"
          :value="keyWords"
          @confirm="iptChange"
        />
        <uni-icons v-if="keyWords" @click="clear" type="clear" color="#999999" size="14rpx" />
      </view>

      <view class="respondents-list">
        <CompanyItem v-for="item in list" :data="item" :key="item.uid" />
      </view>
    </view>

    <VillageSelect
      v-show="showVillageSelect"
      :show="showVillageSelect"
      :treeData="treeData"
      @on-close="showVillageSelect = false"
      @on-confirm="villageConfirm"
    />
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, unref } from 'vue'
import Container from '@/components/Container/index.vue'
import CompanyItem from './company.vue'
import VillageSelect from './villageSelect.vue'
import { getLandlordListBySearchApi, getOtherItemApi } from '@/service'
import { LandlordType } from '@/types/sync'
import { LandlordSearchType, MainType } from '@/types/common'
import { OtherDataType } from '@/database'

const tabType = ref<MainType>(MainType.Company)
const showVillageSelect = ref<boolean>(false)
const list = ref<LandlordType[]>([])
const keyWords = ref<string>('')
const villageCode = ref<string[]>([])
const treeData = ref<any>([])

const clear = () => {
  keyWords.value = ''
  getList()
}

const onTabChange = (type: MainType) => {
  tabType.value = type
  getList()
}

const onToggleVillage = () => {
  showVillageSelect.value = !showVillageSelect.value
}

const iptChange = (e: any) => {
  keyWords.value = e.detail.value
  getList()
}

const villageConfirm = (code: string[]) => {
  villageCode.value = code
  onToggleVillage()
  getList()
}

const getTreeData = async () => {
  const res = await getOtherItemApi(OtherDataType.DistrictTree)
  treeData.value = res || []
}

const getList = () => {
  nextTick(async () => {
    const params: LandlordSearchType = {
      name: unref(keyWords),
      type: unref(tabType),
      villageCode: unref(villageCode)[2] || ''
    }
    const res = await getLandlordListBySearchApi(params)
    list.value = res || []
  })
}

onMounted(() => {
  getTreeData()
  getList()
})
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
