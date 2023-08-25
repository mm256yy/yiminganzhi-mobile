<template>
  <view class="house-info-wrapper">
    <!-- 择址确认 —— 选房择址 -->
    <view class="row">
      <view class="left" />
      <view class="right">
        <view class="btn green">
          <image class="icon" src="@/static/images/icon_print_white.png" mode="scaleToFill" />
          打印表格
        </view>
        <view class="btn blue" @click="onArchives">
          <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
          档案上传
        </view>
        <!-- <view class="btn blue-btn">
          <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
          <text class="txt">问题反馈</text>
        </view> -->
      </view>
    </view>

    <!-- houseAreaType: homestead 宅基地，flat 公寓房 -->
    <view v-if="houseAreaType === 'homestead'">
      <view class="list" v-if="props.dataList && props.dataList.length > 0">
        <view class="list-item" v-for="item in props.dataList" :key="item.id">
          <view class="list-1">
            <view class="left">
              <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
              宅基地
            </view>
            <view class="right" />
          </view>
          <view class="list-2" @click="toLink(item.uid)">
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
                  <view class="label">地块编号：</view>
                  <view class="content">
                    {{ dictOption(landNoList, item.landNo) }}
                  </view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">摇号顺序号：</view>
                  <view class="content">{{ formatStr(item.lotteryOrder) }}</view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <uni-col :span="24">
                <view class="col">
                  <view class="label">择址顺序号：</view>
                  <view class="content">
                    {{ formatStr(item.placeOrder) }}
                  </view>
                </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
      </view>

      <view class="null-wrapper" v-else>
        <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
        <view class="tips">暂无宅基地信息</view>
      </view>
    </view>

    <view v-if="houseAreaType === 'flat'">
      <view class="list" v-if="props.dataList && props.dataList.length > 0">
        <view class="list-item" v-for="item in props.dataList" :key="item.id">
          <view class="list-1">
            <view class="left">
              <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
              公寓房
            </view>
            <view class="right" />
          </view>
          <view class="list-2" @click="toLink(item.uid)">
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
              <uni-col :span="12">
                <view class="col">
                  <view class="label">车位编号：</view>
                  <view class="content">
                    {{ dictOption(carNoList, item.carNo) }}
                  </view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">摇号顺序号：</view>
                  <view class="content">{{ formatStr(item.lotteryOrder) }}</view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <uni-col :span="24">
                <view class="col">
                  <view class="label">择房顺序号：</view>
                  <view class="content">
                    {{ formatStr(item.placeOrder) }}
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
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { formatStr, routerForward, dictOption } from '@/utils'
import { apartmentArea, resettleArea } from '../../common/config'
import { getChooseConfigApi, getHouseConfigApi } from '@/service'

interface PropsType {
  dataList: any[]
  baseInfo: any
}

const props = defineProps<PropsType>()
const landNoList = ref<any[]>([]) // 地块编号选项列表
const storeroomNoList = ref<any[]>([]) // 储藏室编号选项列表
const carNoList = ref<any[]>([]) // 车位号选项列表
const roomNoList = ref<any[]>([]) // 幢号-房号 选项列表
const { houseAreaType } = props.baseInfo as any

/**
 * 获取安置区块
 * @param data
 */
const getSettleAddress = (data: string) => {
  if (data) {
    // 选择了公寓房的安置方式
    if (houseAreaType === 'flat') {
      let str = ''
      apartmentArea.map((item: any) => {
        if (item.id === data) {
          str = item.name
        }
      })
      return str
    } else if (houseAreaType === 'homestead') {
      let str = ''
      resettleArea.map((item: any) => {
        if (item.id === data) {
          str = item.name
        }
      })
      return str
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
        if (item.level === '2') {
          arr.push({
            text: item.code,
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
    uid: props.baseInfo.uid,
    type: houseAreaType
  }
  routerForward('chooseHouseArchives', {
    params: JSON.stringify(params)
  })
}

const toLink = (itemUid?: any) => {
  const { uid, doorNo } = props.baseInfo
  let params = { type: houseAreaType, uid, doorNo, itemUid }
  routerForward('chooseHouseEdit', {
    params: JSON.stringify(params)
  })
}

onMounted(() => {
  getChooseConfig()
  getHouseConfig()
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
}
</style>
