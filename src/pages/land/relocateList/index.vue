<template>
  <Container title="只征地不搬迁列表">
    <template #right>
      <view class="title" @click="onToggleVillage">
        <text class="tit">
          {{ title.length ? title.filter((item) => !!item).join('/') : '选择行政区划' }}
        </text>
        <image
          class="icon"
          :style="{ transform: showVillageSelect ? 'rotate(180deg)' : 'rotate(0deg)' }"
          src="@/static/images/respondents_select.png"
          mode="scaleToFill"
        />
      </view>
    </template>

    <view class="respondents-wrap">
      <view class="search-box">
        <uni-icons class="icon" type="search" color="#272636" size="9rpx" />
        <input
          type="text"
          class="ipt"
          placeholder="请输入户号/使用权人"
          :value="keyWords"
          :confirm-type="'search'"
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
            <ListItem v-for="item in list" :data="item" :key="item.uid" />
          </view>
          <view class="load-more">
            <uni-load-more iconType="auto" :status="status" />
          </view>
        </scroll-view>
        <NoData v-else />
      </view>
    </view>

    <template v-if="showVillageSelect">
      <NaturalVillageTreeSelect
        :treeData="treeData"
        :value="villageCode"
        :title="title"
        :select-any="true"
        @on-close="showVillageSelect = false"
        @on-confirm="villageConfirm"
      />
    </template>
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, computed, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import Container from '@/components/Container/index.vue'
import NoData from '@/components/NoData/index.vue'
import ListItem from '@/pages/land/components/relocateListItem/index.vue'
import NaturalVillageTreeSelect from '@/components/NaturalVillageTreeSelect/index.vue'
// import { LandlordType } from '@/types/sync'
import { MainType, RoleCodeType } from '@/types/common'
import { routerForward, getStorage, StorageKey } from '@/utils'
import { getVirutalVillageTreeApi, getLandlordListBySearchApi } from '@/service'

const tabType = ref<MainType>(MainType.PeasantHousehold)
const showVillageSelect = ref<boolean>(false)
const keyWords = ref<string>('')
const villageCode = ref<string[]>([])
const treeData = ref<any>([])
const title = ref<string[]>([])
const tipsList = ref<any>([])
const confirmMsg = ref<string>('')
const list = ref<any[]>([])

const isLoading = ref<boolean>(false)
const isEnd = ref<boolean>(false)

const page = ref<number>(1)
const pageSize = ref<number>(50)
const sourceType = ref<string | null>(null) // 源类型 0已完成  1 预警 2 滞后
const statusCount = ref<number>(0)

// 角色类型，不同角色跳转不同的页面，默认为实物采集页面
// const roleType = ref<RoleCodeType>(getStorage(StorageKey.USERROLE))

onLoad((options: any) => {})

const init = () => {
  page.value = 1
  isEnd.value = false
  isLoading.value = false
  tipsList.value = []
  confirmMsg.value = ''
  getList()
}

const clear = () => {
  keyWords.value = ''
  init()
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
  const res = await getVirutalVillageTreeApi()
  treeData.value = res || []
}

const status = computed(() => {
  return isEnd.value ? 'noMore' : isLoading.value ? 'loading' : 'more'
})

const getList = () => {
  nextTick(async () => {
    isLoading.value = true
    const params: any = {
      page: page.value,
      pageSize: pageSize.value,
      type: MainType.LandNoMove,
      name: keyWords.value
      // villageCode: villageCode.value
    }

    console.log('只征地不搬迁列表Params', params)

    const res: any[] = await getLandlordListBySearchApi(params)
    console.log('只征地不搬迁列表List', res)

    isLoading.value = false
    if (res && res.length) {
      if (page.value === 1) {
        list.value = res || []
      } else {
        list.value = list.value?.concat(res)
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
  getList()
}

onMounted(() => {
  getTreeData()
  init()
})

onShow(() => {
  init()
  // 注册事件监听器
  uni.$on('customRefresh', () => {
    getList()
  })
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

.search-box {
  flex: none;
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 23rpx;
  padding: 0 18rpx;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  border-radius: 7rpx;
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
  margin-top: 8rpx;
}

.status-panel {
  flex: none;
  display: flex;
  height: 33rpx;
  margin-top: 9rpx;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.88) 100%);
  border-radius: 5rpx;
  align-items: center;

  .dot {
    width: 6rpx;
    height: 6rpx;
    margin-left: 20rpx;
    border: 2px solid rgba(228, 48, 48, 0.1);
    border-radius: 50%;

    &.red {
      background: #e43030;
    }

    &.yellow {
      background: #fec44c;
    }

    &.green {
      background: #30a952;
    }
  }

  .status-label {
    margin-left: 15rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
  }

  .check-label {
    padding-left: 10rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: rgba(23, 23, 24, 0.6);

    .number {
      padding: 0 5rpx;
      font-size: 13rpx;
      font-weight: bold;

      &.red {
        color: #e43030;
      }

      &.yellow {
        color: #fec44c;
      }

      &.green {
        color: #30a952;
      }
    }
  }
}

.scroll-view {
  width: 100%;
  height: calc(100vh - var(--status-bar-height) - 33rpx - 18rpx - 6rpx - 10rpx - 42rpx);
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

.tips-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .tips-title {
    width: 344rpx;
    height: 33rpx;
    font-size: 11rpx;
    font-weight: 600;
    line-height: 33rpx;
    color: #000;
    text-align: center;
    background: #ffffff;
    border-radius: 5rpx 5rpx 0 0;
  }

  .tips-content {
    width: 344rpx;
    height: 156rpx;
    padding: 14rpx 40rpx;
    background: #f6f7f9;
    box-sizing: border-box;

    .tips-list {
      width: 264rpx;
      height: 88rpx;
      padding: 16rpx 19rpx;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      .tips-item {
        display: flex;
        font-size: 9rpx;
        line-height: 1.5;
        color: #131313;
        align-items: center;
        flex-direction: column;
      }
    }

    .tips {
      margin-top: 14rpx;
      font-size: 9rpx;
      color: #131313;
    }
  }

  .btn-wrapper {
    display: flex;
    width: 344rpx;
    height: 33rpx;
    padding: 0 9rpx;
    background: #fff;
    border-radius: 0 0 5rpx 5rpx;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-end;

    .btn {
      width: 52rpx;
      height: 21rpx;
      font-size: 9rpx;
      line-height: 21rpx;
      text-align: center;
      border-radius: 3rpx;

      &.cancel {
        color: rgba(0, 0, 0, 0.85);
        background: #fff;
        border: 1rpx solid #d9d9d9;
      }

      &.confirm {
        margin-left: 6rpx;
        color: #fff;
        background: #3e73ec;
      }
    }
  }
}
</style>
