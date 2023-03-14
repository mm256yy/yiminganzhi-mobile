<template>
  <Container>
    <template #title>
      <view class="title" @click="onToggleVillage">
        <text class="tit">{{ title.length ? title.join('/') : '选择行政村' }}</text>
        <image
          class="icon"
          :style="{ transform: showVillageSelect ? 'rotate(180deg)' : 'rotate(0deg)' }"
          src="@/static/images/respondents_select.png"
          mode="scaleToFill"
        />
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
        <scroll-view
          v-if="list && list.length"
          class="scroll-view"
          scroll-y
          :enable-flex="true"
          @scrolltolower="loadMore"
        >
          <view class="scroll">
            <CompanyItem
              v-for="item in list"
              :data="item"
              :key="item.uid"
              @click.stop="editLandlord(item)"
              @delete="deleteLandlord(item)"
            />
          </view>
          <view class="load-more">
            <uni-load-more iconType="auto" :status="status" />
          </view>
        </scroll-view>
        <NoData v-else />
      </view>
    </view>

    <view class="add-box" @click="addLandlord">
      <uni-icons type="plusempty" color="#ffffff" size="10rpx" />
    </view>

    <template v-if="showVillageSelect">
      <TreeSelect
        :treeData="treeData"
        :value="villageCode"
        :title="title"
        @on-close="showVillageSelect = false"
        @on-confirm="villageConfirm"
      />
    </template>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        content=""
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, unref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import Container from '@/components/Container/index.vue'
import NoData from '@/components/NoData/index.vue'
import CompanyItem from './company.vue'
import TreeSelect from '@/components/VillageTreeSelect/index.vue'
import {
  getLandlordListBySearchApi,
  getVillageTreeWithoutNullApi,
  deleteLandlordApi
} from '@/service'
import { LandlordType } from '@/types/sync'
import { LandlordSearchType, MainType } from '@/types/common'
import { routerForward } from '@/utils'

const tabType = ref<MainType>(MainType.PeasantHousehold)
const showVillageSelect = ref<boolean>(false)
const list = ref<LandlordType[]>([])
const keyWords = ref<string>('')
const villageCode = ref<string[]>([])
const treeData = ref<any>([])
const title = ref<string[]>([])
const currentItem = ref<LandlordType | null>(null)
const alertDialog = ref<any>(null)

const isLoading = ref<boolean>(false)
const isEnd = ref<boolean>(false)

const page = ref<number>(1)
const pageSize = ref<number>(10)

const init = () => {
  page.value = 1
  isEnd.value = false
  isLoading.value = false
  getList()
}

const clear = () => {
  keyWords.value = ''
  init()
}

const onTabChange = (type: MainType) => {
  tabType.value = type
  init()
  getTreeData()
}

const onToggleVillage = () => {
  showVillageSelect.value = !showVillageSelect.value
}

const iptChange = (e: any) => {
  keyWords.value = e.detail.value
  init()
}

const villageConfirm = (code: string[], tit: string[]) => {
  villageCode.value = code
  title.value = tit
  onToggleVillage()
  init()
}

const getTreeData = async () => {
  const res = await getVillageTreeWithoutNullApi()
  treeData.value = res || []
}

const status = computed(() => {
  // more/loading/noMore
  return isEnd.value ? 'noMore' : isLoading.value ? 'loading' : 'more'
})

const getList = () => {
  nextTick(async () => {
    isLoading.value = true
    const params: LandlordSearchType = {
      name: unref(keyWords),
      type: unref(tabType),
      villageCode: unref(villageCode)[2] || '',
      page: page.value,
      pageSize: pageSize.value
    }
    const res = await getLandlordListBySearchApi(params).catch(() => {
      isLoading.value = false
    })
    isLoading.value = false
    if (res && res.length) {
      if (page.value === 1) {
        list.value = res || []
      } else {
        list.value = list.value.concat(res)
      }
      if (res.length < pageSize.value) {
        isEnd.value = true
      } else {
        page.value = page.value + 1
      }
    } else {
      if (page.value === 1) {
        list.value = []
      }
      isEnd.value = true
    }
  })
}

const loadMore = () => {
  if (isEnd.value || isLoading.value) {
    return
  }
  console.log('load more')

  getList()
}

// 填报
const routerMap: any = {
  [MainType.PeasantHousehold]: 'household',
  [MainType.IndividualHousehold]: 'selfPerson',
  [MainType.Company]: 'enterprise',
  [MainType.Village]: 'collective'
}

// 新增 路由 map
const addRouterMap: any = {
  [MainType.PeasantHousehold]: 'householdInfoEdit',
  [MainType.IndividualHousehold]: 'selfBaseInfoEdit',
  [MainType.Company]: 'baseInfoEdit',
  [MainType.Village]: 'collectiveBaseInfoEdit'
}

const addLandlord = () => {
  const name = addRouterMap[tabType.value]
  routerForward(name, {
    type: 'add'
  })
}

const editLandlord = (item: LandlordType) => {
  const name = routerMap[tabType.value]
  routerForward(name, {
    type: 'edit',
    uid: item.uid,
    expendCodes: [
      item.areaCode,
      item.townCode,
      item.villageCode,
      item.virutalVillageCode,
      item.code
    ]
  })
}

const deleteLandlord = (item: LandlordType) => {
  currentItem.value = item
  alertDialog.value?.open()
}

const dialogConfirm = () => {
  if (currentItem.value?.uid) {
    deleteLandlordApi(currentItem.value.uid).then((res) => {
      if (res) {
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
        init()
      }
    })
  }
}

const dialogClose = () => {
  alertDialog.value.close()
}

onMounted(() => {
  getTreeData()
})

onShow(() => {
  init()
})
</script>

<style lang="scss" scoped>
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
  width: 100%;
  margin-top: 7rpx;
}

.scroll-view {
  width: 100%;
  height: calc(100vh - var(--status-bar-height) - 33rpx - 38rpx - 18rpx - 6rpx - 10rpx);
}

.scroll {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.load-more {
  flex: none;
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
