<template>
  <view class="sync-wrap">
    <image class="common-bg" src="@/static/images/common_bg.png" mode="widthFix" />
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
          <view class="title" @click="jump(MainType.IndividualHousehold)">
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
          <view class="title" @click="jump(MainType.Company)">
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
          <view class="title" @click="jump(MainType.Village)">
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
      <view class="popup-box">
        <view v-if="!syncStatus" class="close" @click.stop="closePup">
          <uni-icons type="closeempty" color="#979797" size="12rpx" />
        </view>
        <view class="pup-title" v-if="syncStatus">
          <uni-icons type="checkbox-filled" color="#28AF45" size="19rpx" />
          <text class="tit">数据同步成功</text>
        </view>
        <view class="pup-title" v-else>
          <uni-icons type="info-filled" color="#F75454" size="19rpx" />
          <text class="tit">数据同步失败</text>
        </view>
        <view class="pup-cont">
          <template v-if="syncStatus">
            <view class="pup-item" v-if="pushData">
              <view class="tit">上传成功:&nbsp;</view>
              <view class="txt"
                >本次共下载:&nbsp;居民户 <text class="num">{{ pushData.peasantHouseholdNum }}</text
                >个，个体户<text class="num">{{ pushData.individualNum }}</text
                >个，企业<text class="num">{{ pushData.companyNum }}</text
                >家，村集体<text class="num">{{ pushData.villageNum }}</text
                >个</view
              >
            </view>
            <view class="pup-item" v-if="pullData">
              <view class="tit">下载成功:&nbsp;</view>
              <view class="txt"
                >本次共下载:&nbsp;居民户<text class="num">{{ pullData.peasantHouseholdNum }}</text
                >个，个体户<text class="num">{{ pullData.individualNum }}</text
                >个，企业<text class="num">{{ pullData.companyNum }}</text
                >家，村集体<text class="num">{{ pullData.villageNum }}</text
                >个</view
              >
            </view>
          </template>

          <template v-else>
            <view class="pup-item" v-if="pushData && pushData.data">
              <view class="tit err">上传失败:&nbsp;</view>
              <view class="txt"
                >{{ pushData.data.name }}<text class="err">户号：{{ pushData.data.doorNo }} </text
                >{{ pushData.message }}</view
              >
            </view>
          </template>
        </view>

        <view class="pup-btn">
          <view class="btn" @click="pupConfirm">确定</view>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="networkPup" type="center">
      <view class="popup-box">
        <div class="network">
          <image class="img" src="@/static/images/network_error.png" mode="scaleToFill" />
          <view class="txt">数据同步失败</view>
          <view class="info">网络异常，请到网络状态良好的位置再次上传</view>
        </div>
        <view class="pup-btn">
          <view class="btn" @click="closeNetworkPup">确定</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { getCollectListApi, getOtherItemApi } from '@/service'
import { pullInstance, pushInstance } from '@/sync/index'
import { routerBack, routerForward, networkCheck } from '@/utils'
import { CollectType, MainType } from '@/types/common'
import { OtherDataType } from '@/database'

const peopleList = ref<CollectType[]>([])
const individualHouseholdList = ref<CollectType[]>([])
const companyList = ref<CollectType[]>([])
const villageList = ref<CollectType[]>([])
const pullTime = ref<string>('')

const intervalId = ref<any>(0)
const count = ref(0)
// 拉取次数 一秒检测一次 总共 maxcCount 秒
const maxCount = ref(60)
const popup = ref<any>(null)
const networkPup = ref<any>(null)
// 同步状态
const syncStatus = ref<boolean>(false)
// 同步 拉取统计信息
const pullData = ref<
  Partial<{
    peasantHouseholdNum: number
    companyNum: number
    individualNum: number
    villageNum: number
  }>
>({})
// 同步 推送统计信息
const pushData = ref<any>({})

const routerMap: any = {
  [MainType.PeasantHousehold]: 'household',
  [MainType.IndividualHousehold]: 'selfPerson',
  [MainType.Company]: 'enterprise',
  [MainType.Village]: 'collective'
}

const jump = (type: MainType) => {
  routerForward(routerMap[type])
}

const onBack = () => {
  routerBack()
}

const polling = () => {
  intervalId.value = setInterval(() => {
    console.log('轮询拉取状态')
    if (count.value === maxCount.value) {
      uni.hideLoading()
      clearInterval(intervalId.value)
      syncStatus.value = false
      openPup()
      return
    }
    count.value++
    if (pullInstance.getPullStatus()) {
      uni.hideLoading()
      clearInterval(intervalId.value)
      pageInit()
      const { peasantHouseholdNum, companyNum, individualNum, villageNum } = pullInstance.state
      pullData.value = {
        peasantHouseholdNum,
        companyNum,
        individualNum,
        villageNum
      }
      syncStatus.value = true
      openPup()
    }
  }, 1000)
}

const onSync = async () => {
  const res = await networkCheck()
  if (!res) {
    openNetworkPup()
    return
  }
  uni.showLoading({
    title: '正在同步中...',
    mask: true
  })
  count.value = 0
  pushInstance
    .push()
    .then((res) => {
      if (res) {
        pushData.value = res
        // 推送成功
        console.log('推送成功，开始拉取')
        pullInstance
          .pullAll()
          .then(() => {
            polling()
          })
          .catch(() => {
            uni.hideLoading()
            uni.showToast({
              title: '登录失效',
              icon: 'none'
            })
            nextTick(() => {
              routerForward('login')
            })
          })
      } else {
        uni.hideLoading()
        syncStatus.value = false
        openPup()
      }
    })
    .catch((errData) => {
      uni.hideLoading()
      if (errData) {
        pushData.value = errData
        syncStatus.value = false
        openPup()
        console.log(errData, '推送服务端失败信息')
      } else {
        uni.showToast({
          title: '推送返回为空',
          icon: 'error'
        })
      }
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

const pupConfirm = () => {
  console.log('确认')
  if (syncStatus.value) {
    // 同步成功
    closePup()
    routerForward('home')
  } else {
    closePup()
  }
}

const openNetworkPup = () => {
  networkPup.value?.open()
}

const closeNetworkPup = () => {
  networkPup.value?.close()
}

onMounted(() => {
  pageInit()
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
  position: relative;
  width: 352rpx;
  // height: 203rpx;
  background: #ffffff;
  border-radius: 5rpx;

  .close {
    position: absolute;
    top: 0rpx;
    right: 0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36rpx;
    height: 36rpx;
  }

  .pup-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28rpx 12rpx 16rpx;
    font-size: 14rpx;
    font-weight: 600;
    color: #333333;

    .tit {
      margin-left: 7rpx;
    }
  }

  .pup-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .pup-item {
      display: flex;
      align-items: center;
      width: 328rpx;
      height: 33rpx;
      padding: 0 9rpx;
      margin-bottom: 9rpx;
      background: #f6f7f9;
      border-radius: 2rpx;

      .tit {
        font-size: 9rpx;
        color: #28af45;
      }

      .txt {
        font-size: 9rpx;
        color: #171718;

        .num {
          color: #3e73ec;
        }
      }

      .err {
        color: #f75454;
      }
    }
  }

  .pup-btn {
    height: 32rpx;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 9rpx;
      color: #1059ff;
    }
  }

  .network {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 23rpx 12rpx 26rpx;

    .img {
      width: 176rpx;
      height: 105rpx;
    }

    .txt {
      margin-top: 6rpx;
      font-size: 14rpx;
      font-weight: 600;
      line-height: 19rpx;
      color: #333333;
    }

    .info {
      margin-top: 6rpx;
      font-size: 9rpx;
      line-height: 13rpx;
      color: #333333;
    }
  }
}
</style>
