<template>
  <Container title="居民户列表">
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
          placeholder="搜索名称/户号"
          :value="keyWords"
          :confirm-type="'search'"
          @confirm="iptChange"
        />
        <uni-icons v-if="keyWords" @click="clear" type="clear" color="#999999" size="14rpx" />
      </view>

      <view class="status-panel">
        <view class="dot" />
        <text class="status-label">滞后： </text>
        <text class="check-label">人口核定：<text class="red-number">2</text> 户</text>
        <text class="check-label">安置确认：<text class="red-number">1</text> 户</text>
      </view>

      <view class="respondents-list">
        <homeListItem v-for="(item, index) in userList" :key="index" :data="item" />
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
import { ref, onMounted, nextTick, unref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import Container from '@/components/Container/index.vue'
import NaturalVillageTreeSelect from '@/components/NaturalVillageTreeSelect/index.vue'
import homeListItem from './homeListItem.vue'

import { LandlordType } from '@/types/sync'
import { getStorage, StorageKey } from '@/utils'
import { RoleCodeType } from '@/types/common'

const showVillageSelect = ref<boolean>(false)
const list = ref<LandlordType[]>([])
const keyWords = ref<string>('')
const villageCode = ref<string[]>([])
const treeData = ref<any>([])
const title = ref<string[]>([])
const currentItem = ref<LandlordType | null>(null)
const alertDialog = ref<any>(null)
const tipsList = ref<any>([])
const confirmMsg = ref<string>('')

const isLoading = ref<boolean>(false)
const isEnd = ref<boolean>(false)

const page = ref<number>(1)
const pageSize = ref<number>(10)

// 角色类型，不同角色跳转不同的页面，默认为实物采集页面
const roleType = ref<RoleCodeType>(getStorage(StorageKey.USERROLE))

const init = () => {
  page.value = 1
  isEnd.value = false
  isLoading.value = false
  tipsList.value = []
  confirmMsg.value = ''
}

interface Household {
  name: string
  no: string
}

const userList = ref<Household[]>([
  {
    name: '贾秋燕',
    no: '1060770'
  },
  {
    name: '张汇锋',
    no: '1010997'
  },
  {
    name: '李雪汀',
    no: '1070610'
  }
])

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

const getList = () => {}

onMounted(() => {
  getList()
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
  display: flex;
  flex-wrap: wrap;
  margin-top: 7rpx;
}

.status-panel {
  display: flex;
  width: 701rpx;
  height: 33rpx;
  margin-top: 9rpx;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.88) 100%);
  border-radius: 5rpx;
  align-items: center;

  .dot {
    width: 6rpx;
    height: 6rpx;
    margin-left: 20rpx;
    background: #e43030;
    border: 2px solid rgba(228, 48, 48, 0.1);
    border-radius: 50%;
  }

  .status-label {
    margin-left: 15rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
  }

  .check-label {
    padding-bottom: 2rpx;
    padding-left: 10rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: rgba(23, 23, 24, 0.6);

    .red-number {
      padding: 0 5rpx;
      padding-top: 4rpx;
      font-size: 16rpx;
      font-weight: bold;
      color: #e43030;
    }
  }
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
