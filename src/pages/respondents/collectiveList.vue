<template>
  <Container title="村集体列表">
    <template #right>
      <view class="title" @click="onToggleVillage">
        <text class="tit">{{
          title.length ? title.filter((item) => !!item).join('/') : '选择行政区划'
        }}</text>
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
          placeholder="搜索名称/村集体编码"
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
            <ListItem
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

    <!-- roleType: 角色类型，assessor 资产评估用户，资产评估时不能添加新的村集体信息 -->
    <view v-if="roleType !== RoleCodeType.assessor" class="add-box" @click="addLandlord">
      <uni-icons type="plusempty" color="#ffffff" size="10rpx" />
    </view>

    <template v-if="showVillageSelect">
      <TreeSelect
        :treeData="treeData"
        :value="villageCode"
        :title="title"
        :select-any="true"
        @on-close="showVillageSelect = false"
        @on-confirm="villageConfirm"
      />
    </template>

    <uni-popup ref="alertDialog" type="dialog" :is-mask-click="false">
      <view class="tips-wrapper">
        <view class="tips-title">删除提示</view>
        <view class="tips-content">
          <view class="tips-list">
            <view class="tips-item" v-for="(item, index) in tipsList" :key="index">
              {{ item }}
            </view>
          </view>
          <view class="tips">
            <uni-icons type="info-filled" color="#FF4242" />
            {{ confirmMsg }}
          </view>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="dialogClose">取消</view>
          <view class="btn confirm" @click="dialogConfirm">确认</view>
        </view>
      </view>
    </uni-popup>
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, unref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import Container from '@/components/Container/index.vue'
import NoData from '@/components/NoData/index.vue'
import ListItem from './listItem.vue'
import TreeSelect from '@/components/VillageTreeSelect/index.vue'
import {
  getLandlordListBySearchApi,
  getVillageTreeApi,
  deleteLandlordApi,
  getLandlordItemApi
} from '@/service'
import { LandlordType } from '@/types/sync'
import { LandlordSearchType, MainType, RoleCodeType } from '@/types/common'
import { routerForward, getStorage, StorageKey } from '@/utils'

const tabType = ref<MainType>(MainType.Village)
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
  const res = await getVillageTreeApi()
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
      page: page.value,
      pageSize: pageSize.value
    }
    const realList = villageCode.value.filter((item) => !!item)
    if (realList.length) {
      if (realList.length === 1) {
        params.areaCode = unref(villageCode)[0] || ''
      } else if (realList.length === 2) {
        params.townCode = unref(villageCode)[1] || ''
      } else if (realList.length === 3) {
        params.villageCode = unref(villageCode)[2] || ''
      }
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

/**
 * 获取页面跳转的路由 name
 * @params {Object} roleType 角色类型
 */
const getRouterName = (roleType: string) => {
  if (roleType === RoleCodeType.investigator) {
    return 'collective'
  } else if (roleType === RoleCodeType.assessor) {
    return 'collectiveEva'
  } else if (roleType === RoleCodeType.implementation) {
    return 'collectiveImp'
  } else {
    return 'collective'
  }
}

// 填报
const routerMap: any = {
  [MainType.Village]: getRouterName(roleType.value)
  // [MainType.PeasantHousehold]: 'household',
  // [MainType.IndividualHousehold]: 'selfPerson',
  // [MainType.Company]: 'enterprise',
}

// 新增 路由 map
const addRouterMap: any = {
  [MainType.Village]: 'collectiveBaseInfoEdit'
  // [MainType.PeasantHousehold]: 'householdInfoEdit',
  // [MainType.IndividualHousehold]: 'selfBaseInfoEdit',
  // [MainType.Company]: 'baseInfoEdit',
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
    uid: item.uid
  })
}

const deleteLandlord = (item: LandlordType) => {
  currentItem.value = item
  getLandlordDetail(currentItem.value.uid, currentItem.value.type)
  alertDialog.value?.open()
}

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = (uid: string, type: string) => {
  getLandlordItemApi(uid).then((res: any) => {
    const appendantLength = res.immigrantAppendantList.filter((item: any) => item.number > 0).length
    if (type === MainType.PeasantHousehold) {
      tipsList.value = [
        `人口信息：${res.demographicList.length} 条人口信息`,
        `房屋信息: ${res.immigrantHouseList.length} 条房屋信息`,
        `附属物信息: ${appendantLength} 条附属物信息`,
        `零星(林)果木信息: ${res.immigrantTreeList.length} 条零星（林）果木信息`,
        `坟墓信息: ${res.immigrantGraveList.length} 条坟墓信息`
      ]
      confirmMsg.value = '是否删除该居民户信息？'
    } else if (type === MainType.Company) {
      tipsList.value = [
        `房屋信息: ${res.immigrantHouseList.length} 条房屋信息`,
        `附属物信息: ${appendantLength} 条附属物信息`,
        `零星(林)果木信息: ${res.immigrantTreeList.length} 条零星（林）果木信息`
      ]
      confirmMsg.value = '是否删除该企业信息？'
    } else if (type === MainType.IndividualHousehold) {
      tipsList.value = [
        `房屋信息: ${res.immigrantHouseList.length} 条房屋信息`,
        `附属物信息: ${appendantLength} 条附属物信息`,
        `零星(林)果木信息: ${res.immigrantTreeList.length} 条零星（林）果木信息`
      ]
      confirmMsg.value = '是否删除该个体工商户信息 ？'
    } else if (type === MainType.Village) {
      tipsList.value = [
        `房屋信息: ${res.immigrantHouseList.length} 条房屋信息`,
        `附属物信息: ${appendantLength} 条附属物信息`,
        `零星(林)果木信息: ${res.immigrantTreeList.length} 条零星（林）果木信息`,
        `坟墓信息: ${res.immigrantGraveList.length} 条坟墓信息`
      ]
      confirmMsg.value = '是否删除该村集体信息 ？'
    }
  })
}

const dialogConfirm = () => {
  if (currentItem.value?.uid) {
    deleteLandlordApi(currentItem.value.uid).then((res) => {
      if (res) {
        dialogClose()
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
  tipsList.value = []
  confirmMsg.value = ''
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
  margin-top: 7rpx;
}

.scroll-view {
  width: 100%;
  height: calc(100vh - var(--status-bar-height) - 33rpx - 18rpx - 6rpx - 10rpx);
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
