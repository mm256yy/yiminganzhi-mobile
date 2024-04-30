<template>
  <view class="sync-wrap">
    <image class="common-bg" src="@/static/images/common_bg.png" mode="widthFix" />
    <view class="common-header">
      <view class="back-box" @click="onBack">
        <uni-icons type="back" color="#ffffff" size="14rpx" />
      </view>
      <!-- V{{ appVersion }} -->
      <text class="tit">数据同步</text>
      <text />
    </view>

    <view class="body">
      <view class="pull-time">
        <text class="time">最新同步时间：{{ pullTime }}</text>
        <view class="sync-btn" @click="onSyncHandle">
          <image class="icon" src="@/static/images/sync_btn.png" mode="scaleToFill" />
          <text class="btn-txt">数据同步</text>
        </view>
      </view>

      <view class="list-wrap">
        <view class="list-item">
          <image class="bg" src="@/static/images/head_1.png" mode="scaleToFill" />
          <view class="title" @click="jump(MainType.PeasantHousehold)">
            <text class="tit">居民户</text>
            <image
              class="right-arrow"
              src="@/static/images/sync_right_arrow.png"
              mode="scaleToFill"
            />
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">总户数</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'已上报':roleType == RoleCodeType.assessor?'已评估':'-' }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'我的上报':roleType == RoleCodeType.assessor?'我的评估':'-' }}</text>
                </view>
              </view>
            </view>

            <view class="table-tb">
              <view class="tr" v-for="(item, index) in peopleList" :key="index">
                <view class="td">
                  <text class="txt txt-primary">{{ item.villageName }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.totalNum }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.reportNum }}</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">{{ item.submitNum }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="list-item">
          <image class="bg" src="@/static/images/head_2.png" mode="scaleToFill" />
          <view class="title" @click="jump(MainType.IndividualHousehold)">
            <text class="tit">个体工商户1</text>
            <image
              class="right-arrow"
              src="@/static/images/sync_right_arrow.png"
              mode="scaleToFill"
            />
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">总户数</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'已上报':roleType == RoleCodeType.assessor?'已评估':'-' }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'我的上报':roleType == RoleCodeType.assessor?'我的评估':'-' }}</text>
                </view>
              </view>
            </view>

            <view class="table-tb">
              <view class="tr" v-for="(item, index) in individualHouseholdList" :key="index">
                <view class="td">
                  <text class="txt txt-primary">{{ item.villageName }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.totalNum }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.reportNum }}</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">{{ item.submitNum }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="list-item">
          <image class="bg" src="@/static/images/head_3.png" mode="scaleToFill" />
          <view class="title" @click="jump(MainType.Company)">
            <text class="tit">企（事）业单位</text>
            <image
              class="right-arrow"
              src="@/static/images/sync_right_arrow.png"
              mode="scaleToFill"
            />
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">总户数</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'已上报':roleType == RoleCodeType.assessor?'已评估':'-' }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'我的上报':roleType == RoleCodeType.assessor?'我的评估':'-' }}</text>
                </view>
              </view>
            </view>

            <view class="table-tb">
              <view class="tr" v-for="(item, index) in companyList" :key="index">
                <view class="td">
                  <text class="txt txt-primary">{{ item.villageName }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.totalNum }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.reportNum }}</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">{{ item.submitNum }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="list-item">
          <image class="bg" src="@/static/images/head_4.png" mode="scaleToFill" />
          <view class="title" @click="jump(MainType.Village)">
            <text class="tit">村集体资产</text>
            <image
              class="right-arrow"
              src="@/static/images/sync_right_arrow.png"
              mode="scaleToFill"
            />
          </view>
          <view class="inner-box">
            <view class="table-th">
              <view class="tr">
                <view class="td">
                  <text class="txt">行政村</text>
                </view>
                <view class="td">
                  <text class="txt">总户数</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'已上报':roleType == RoleCodeType.assessor?'已评估':'-' }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ roleType == RoleCodeType.investigator?'我的上报':roleType == RoleCodeType.assessor?'我的评估':'-' }}</text>
                </view>
              </view>
            </view>

            <view class="table-tb">
              <view class="tr" v-for="(item, index) in villageList" :key="index">
                <view class="td">
                  <text class="txt txt-primary">{{ item.villageName }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.totalNum }}</text>
                </view>
                <view class="td">
                  <text class="txt">{{ item.reportNum }}</text>
                </view>
                <view class="td">
                  <text class="txt txt-num">{{ item.submitNum }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <SyncCompont ref="syncCmt" :isNeedPageJump="false" from="sync" />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getCollectListApi, getOtherItemApi } from '@/service'
import { routerBack, routerForward, debounce,getStorage,StorageKey } from '@/utils'
import { CollectType, MainType,RoleCodeType } from '@/types/common'
import { OtherDataType } from '@/database'
import dayjs from 'dayjs'
import SyncCompont from '@/components/Sync/Index.vue'

const roleType = ref<RoleCodeType>(getStorage(StorageKey.USERROLE))
const appVersion = ref<string>('')
const peopleList = ref<CollectType[]>([])
const individualHouseholdList = ref<CollectType[]>([])
const companyList = ref<CollectType[]>([])
const villageList = ref<CollectType[]>([])
const pullTime = ref<string>('')
const syncing = ref<boolean>(false)

const syncCmt = ref()

const routerMap: any = {
  [MainType.PeasantHousehold]: 'householdList',
  [MainType.IndividualHousehold]: 'selfPersonList',
  [MainType.Company]: 'enterpriseList',
  [MainType.Village]: 'collectiveList'
}

const onSyncHandle = debounce(() => {
  if (syncing.value) {
    return
  }
  syncing.value = true
  syncCmt.value?.onSync()
})

// 同步结束
const onSyncEnd = () => {
  syncing.value = false
}

const jump = (type: MainType) => {
  routerForward(routerMap[type])
}

const onBack = () => {
  routerBack()
}

const getPullTime = async () => {
  const time: string = await getOtherItemApi(OtherDataType.PullTime)
  pullTime.value = time ? dayjs(Number(time)).format('YYYY-MM-DD HH:mm:ss') : ''
  console.log(pullTime.value)
}

const getData = async () => {
  const res = await getCollectListApi()
  console.log(res, '同步数据查看')
  if (res && res.length) {
    peopleList.value = res.filter((item) => item.type === MainType.PeasantHousehold)
    individualHouseholdList.value = res.filter((item) => item.type === MainType.IndividualHousehold)
    companyList.value = res.filter((item) => item.type === MainType.Company)
    villageList.value = res.filter((item) => item.type === MainType.Village)
  }
}

const pageInit = () => {
  getData()
  getPullTime()
}

onMounted(() => {
  pageInit()
  const systemInfo = uni.getSystemInfoSync()
  appVersion.value = systemInfo.appWgtVersion || '1.0.0'
  uni.$on('SyncEnd', onSyncEnd)
})

onBeforeUnmount(() => {
  uni.$off('SyncEnd', onSyncEnd)
})
</script>

<style lang="scss" scoped>
uni-page-body {
  /* #ifdef H5 */
  height: 100%;
  /* #endif */

  /* #ifdef APP-PLUS */
  flex: 1;
  /* #endif */
}

.sync-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 750rpx;
  height: 100vh;
  padding: var(--status-bar-height) 6rpx 9rpx 6rpx;
  overflow: hidden;

  .common-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 750rpx;
    height: 100%;
  }

  .common-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 42rpx;

    .back-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26rpx;
      height: 26rpx;
    }

    .tit {
      font-size: 15rpx;
      font-weight: 600;
      color: #ffffff;
    }
  }

  .btn-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 67rpx;
    height: 21rpx;
    background: #3e73ec;
    border-radius: 2rpx;
  }

  .btn-txt {
    font-size: 9rpx;
    color: #ffffff;
  }

  .body {
    display: flex;
    padding: 0 12rpx 25rpx;
    overflow-y: scroll;
    background-color: #ffffff;
    border-radius: 5rpx;
    box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    flex: 1;
    flex-direction: column;
  }

  .pull-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 58rpx;

    .time {
      font-size: 9rpx;
      color: #171718;
    }

    .sync-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 23rpx;
      padding: 0 9rpx;
      background-color: #1a60ff;
      border-radius: 12rpx;

      .icon {
        width: 11rpx;
        height: 11rpx;
        margin-right: 4rpx;
      }

      .btn-txt {
        font-size: 9rpx;
        color: #ffffff;
      }
    }
  }

  .list-wrap {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
    overflow-x: scroll;
  }

  ::-webkit-scrollbar {
    width: 0rpx;
    height: 0rpx;
  }

  .list-item {
    position: relative;
    display: flex;
    width: 254rpx;
    padding: 0 6rpx 5rpx;
    margin-right: 6rpx;
    overflow: hidden;
    background-color: #d8e6fe;
    border-radius: 5rpx;
    flex: none;
    flex-direction: column;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 254rpx;
    height: 70rpx;
  }

  .title {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 36rpx;
    padding: 2rpx 6rpx 0 13rpx;

    .tit {
      font-size: 14rpx;
      font-weight: 600;
      color: #0a54ff;
    }

    .right-arrow {
      width: 12rpx;
      height: 12rpx;
    }
  }

  .inner-box {
    position: relative;
    z-index: 2;
    display: flex;
    height: 100%;
    padding: 10rpx 10rpx 5rpx;
    background-color: #fff;
    border: 1rpx solid #ffffff;
    border-radius: 5rpx;
    flex: 1;
    flex-direction: column;
  }

  .table-th {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 28rpx;
  }

  .tr {
    display: flex;
    height: 28rpx;
    flex: 1;
    flex-direction: row;
    align-items: center;
  }

  .td {
    flex:25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // width: 80px;
  }

  .txt {
    font-size: 9rpx;
    font-weight: 500;
    color: #333333;
  }

  .txt-primary {
    color: #3e73ec;
  }

  .txt-num {
    color: #30a952;
  }

  .table-tb {
    height: 205rpx;
    overflow-y: scroll;
  }
}
</style>
