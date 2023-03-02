<template>
  <view class="sync-wrap">
    <image class="common-bg" src="@/static/images/common_bg.png" mode="widthFix" />
    <view :style="{ height: `${statusBarHeight}px` }" />
    <view class="common-header">
      <view class="back-box" @click="onBack">
        <uni-icons type="back" color="#ffffff" size="14rpx" />
      </view>

      <text class="tit">数据同步</text>
      <text />
    </view>

    <view class="body">
      <view class="pull-time">
        <text class="time">最新同步时间：{{ pullTime }}</text>
        <view class="sync-btn" @click="onSync">
          <image class="icon" src="@/static/images/sync_btn.png" mode="scaleToFill" />
          <text class="btn-txt">数据同步</text>
        </view>
      </view>

      <view class="list-wrap">
        <view class="list-item">
          <image class="bg" src="@/static/images/head_1.png" mode="scaleToFill" />
          <view class="title">
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
                  <text class="txt">已上报</text>
                </view>
                <view class="td">
                  <text class="txt">我的上报</text>
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
          <view class="title">
            <text class="tit">个体户</text>
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
                  <text class="txt">已上报</text>
                </view>
                <view class="td">
                  <text class="txt">我的上报</text>
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
          <view class="title">
            <text class="tit">企业</text>
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
                  <text class="txt">已上报</text>
                </view>
                <view class="td">
                  <text class="txt">我的上报</text>
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
          <view class="title">
            <text class="tit">村集体</text>
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
                  <text class="txt">已上报</text>
                </view>
                <view class="td">
                  <text class="txt">我的上报</text>
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

    <uni-popup ref="popup" type="center">
      <view class="popup-box"> ddsafdsafs </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getCollectListApi, getOtherItemApi } from '@/service'
import { pullInstance, pushInstance } from '@/sync/index'
import { routerBack } from '@/utils'
import { CollectType, MainType } from '@/types/common'
import { hideLoading, showLoading } from '@/config'
import { OtherDataType } from '@/database'

const peopleList = ref<CollectType[]>([])
const individualHouseholdList = ref<CollectType[]>([])
const companyList = ref<CollectType[]>([])
const villageList = ref<CollectType[]>([])
const pullTime = ref<string>('')
const intervalId = ref(0)
const count = ref(0)
const maxCount = ref(30)
const popup = ref<any>(null)

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0

const onBack = () => {
  routerBack()
}

const onSync = () => {
  console.log('同步数据')
  showLoading({
    title: '正在同步中...',
    mask: true
  })
  pushInstance
    .push()
    .then((res) => {
      if (res) {
        // 推送成功
        console.log('推送成功，开始拉取')
        pullInstance.pullAll()
        intervalId.value = setInterval(() => {
          console.log('轮询拉取状态')
          if (count.value === maxCount.value) {
            hideLoading()
            uni.showToast({
              title: '同步失败',
              icon: 'error'
            })
            clearInterval(intervalId.value)
            return
          }
          count.value++
          if (pullInstance.getPullStatus()) {
            hideLoading()
            uni.showToast({
              title: '同步成功',
              icon: 'success'
            })
            clearInterval(intervalId.value)
            pageInit()
          }
        }, 1000)
      } else {
        hideLoading()
        uni.showToast({
          title: '获取推送数据失败，请重试',
          mask: true
        })
      }
    })
    .catch((errData) => {
      hideLoading()
      console.log(errData, '推送服务端失败信息')
    })
}

const getPullTime = async () => {
  const time: string = await getOtherItemApi(OtherDataType.PullTime)
  pullTime.value = time
}

const getData = async () => {
  const res = await getCollectListApi()
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

const openPup = () => {
  popup.value?.open()
}

const closePup = () => {
  popup.value?.close()
}

onMounted(() => {
  pageInit()
  openPup()
})

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
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
  height: 100%;
  padding: 0 6rpx 9rpx 6rpx;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 12rpx 25rpx;
    background-color: #ffffff;
    border-radius: 5rpx;
    box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
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
    width: 214rpx;
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
    width: 214rpx;
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
    padding: 10rpx 6rpx 5rpx;
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
    flex: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

.popup-box {
  width: 352rpx;
  height: 203rpx;
  background: #ffffff;
  border-radius: 5rpx;
}
</style>
