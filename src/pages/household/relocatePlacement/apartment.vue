<template>
  <view class="house-info-wrapper">
    <!-- 搬迁安置 —— 公寓房 -->
    <view class="main" v-if="getRelocationResettlement">
      <view class="row">
        <view class="left" />
        <view class="right">
          <!-- <view class="btn green">
            <image class="icon" src="@/static/images/icon_print_white.png" mode="scaleToFill" />
            打印
          </view> -->
          <view class="btn blue" @click="onArchives">
            <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
            进度上报
          </view>
          <!-- <view class="btn blue-btn">
						<image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
						<text class="txt">购房测算</text>
					</view> -->
          <!-- <view class="btn blue-btn">
						<image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
						<text class="txt">问题反馈</text>
					</view> -->
        </view>
      </view>

      <view class="list" v-if="dataList && dataList.length > 0">
        <view class="list-item" v-for="item in dataList" :key="item.id">
          <view class="list-1">
            <view class="left">
              <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
              公寓房
            </view>
            <view class="right" />
          </view>
          <view class="list-2">
            <uni-row>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">摇号顺序号：</view>
                  <view class="content">{{ formatStr(item.lotteryOrder) }}</view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">择房顺序号：</view>
                  <view class="content">
                    {{ formatStr(item.placeOrder) }}
                  </view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">安置区：</view>
                  <view class="content">
                    {{ getSettleAddress(item.settleAddress) }}
                  </view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">户型/套型：</view>
                  <view class="content">{{ formatStr(item.area) }}</view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">幢号-室号：</view>
                  <view class="content">
                    {{ dictOption(roomNoList, item.roomNo) }}
                  </view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">储藏室编号：</view>
                  <view class="content">
                    {{ dictOption(storeroomNoList, item.storeroomNo) }}
                  </view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <uni-col :span="24">
                <view class="col">
                  <view class="label">车位编号：</view>
                  <view class="content">
                    {{ dictOption(carNoList, item.carNo) }}
                  </view>
                </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
      </view>

      <view class="null-wrapper" v-else>
        <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
        <view class="tips">暂无公寓房信息</view>
      </view>

      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        公寓房办理情况
      </view>

      <view class="handle-status">
        <image v-if="isHandled" src="@/static/images/icon_submit.png" class="icon" />
        <image v-else src="@/static/images/icon_warning.png" class="icon" />
        <view class="txt">{{ isHandled ? '交房协议已签订' : '交房协议未办理' }}</view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">该户未选择公寓房</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { formatStr, routerForward, dictOption } from '@/utils'
// import { apartmentArea, resettleArea } from '@/config'
import { getChooseConfigApi, getHouseConfigApi } from '@/service'
import { LandlordType } from '@/types/sync'
import { HouseAreaType } from '@/types/common'
import { getResettleDetail } from '@/service'
import { OtherDataType } from '@/database'

const apartmentArea = ref<any>()  //公寓房
const resettleArea = ref<any>()   //宅基地

const getDataRequest = async () => {
  try {
    const data = await getResettleDetail(OtherDataType.settleAddressList)
    resettleArea.value = data.filter((item: any) => item.type == '1')
    apartmentArea.value = data.filter((item: any) => item.type == '2')
  } catch (error) {
    console.log('error', error)
  }
}
interface PropsType {
  dataList: any[]
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const landNoList = ref<any[]>([]) // 地块编号选项列表
const storeroomNoList = ref<any[]>([]) // 储藏室编号选项列表
const carNoList = ref<any[]>([]) // 车位号选项列表
const roomNoList = ref<any[]>([]) // 幢号-房号 选项列表
const { immigrantSettle } = props.dataInfo as any

// 搬迁安置方式
const getRelocationResettlement = computed(() => {
  const { houseAreaType } = props.dataInfo
  return houseAreaType === HouseAreaType.flat
})

/**
 * 获取安置区块
 * @param data
 */
const getSettleAddress = (data: string) => {
  if (data) {
    // 选择了公寓房的安置方式
    if (immigrantSettle) {
      if (immigrantSettle.houseAreaType === 'flat') {
        let str = ''
        apartmentArea.value.map((item: any) => {
          if (item.id == data) {
            str = item.name
          }
        })
        return str
      } else {
        let str = ''
        resettleArea.value.map((item: any) => {
          if (item.id == data) {
            str = item.name
          }
        })
        return str
      }
    } else {
      return ''
    }
  } else {
    return ''
  }
}

/**
 * 获取选项列表
 * type：1 地块编号，2 宅基地地块，3 储藏室编号，4 车位编号
 */
const getChooseConfig = () => {
  getChooseConfigApi().then((res: any) => {
    let arr1: any = []
    let arr2: any = []
    let arr3: any = []
    if (res && res.length) {
      res.map((item: any) => {
        if (item.type === '1') {
          arr1.push({
            text: item.name,
            value: item.id,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        } else if (item.type === '3') {
          arr2.push({
            text: item.name,
            value: item.id,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        } else if (item.type === '4') {
          arr2.push({
            text: item.name,
            value: item.id,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        }
      })
      landNoList.value = [...arr1]
      storeroomNoList.value = [...arr2]
      carNoList.value = [...arr3]
    }
  })
}

// 获取  幢号-房号 选项列表
const getHouseConfig = () => {
  getHouseConfigApi().then((res: any) => {
    let arr: any = []
    if (res && res.length) {
      res.map((item: any) => {
        if (item.level === '3') {
          arr.push({
            text: item.showName,
            value: item.code,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        }
      })
      roomNoList.value = [...arr]
    }
  })
}

// 档案上传
const onArchives = () => {
  let params = {
    uid: props.dataInfo.uid,
    type: 10
  }
  routerForward('archives', params)
}

// 交房协议是否已签订
const isHandled = computed(() => {
  return props.dataInfo?.immigrantDocumentation?.flatAgreementPic !== '[]'
})

onMounted(() => {
  getChooseConfig()
  getHouseConfig()
  getDataRequest()
})
</script>

<style lang="scss" scoped>
.house-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .row {
    display: flex;
    align-items: center;
    margin: 9rpx 0;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;

      .btn {
        display: flex;
        height: 23rpx;
        padding: 0 9rpx;
        margin-right: 6rpx;
        font-size: 9rpx;
        color: #fff;
        border-radius: 23rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;

        &.green {
          background-color: #30a952;
        }

        &.blue {
          background-color: #3e73ec;
        }

        .icon {
          width: 9rpx;
          height: 9rpx;
          margin-right: 2rpx;
        }
      }
    }
  }

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6rpx 0;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          font-size: 9rpx;
          color: #171718;
          align-items: center;
          flex: 1;

          .icon {
            width: 10rpx;
            height: 10rpx;
            margin-left: 10rpx;
          }
        }

        .right {
          display: flex;
          flex-direction: row;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 86rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }
        }
      }
    }
  }

  .null-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
    background-color: #fff;

    .icon {
      width: 152rpx;
      height: 92rpx;
    }

    .tips {
      margin-top: 17rpx;
      font-size: 9rpx;
      line-height: 1;
      color: #171718;
    }
  }

  .title-wrapper {
    display: flex;
    height: 28rpx;
    margin-bottom: 9rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    border-bottom: 1rpx solid #f0f0f0;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-left: 6rpx;
    }
  }

  .handle-status {
    display: flex;
    height: 118rpx;
    padding: 9rpx 0 28rpx;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      width: 21rpx;
      height: 21rpx;
    }

    .txt {
      margin-top: 5rpx;
      font-size: 9rpx;
      color: #171718;
    }
  }
}
</style>
