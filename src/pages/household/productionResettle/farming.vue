<template>
  <view class="farm-wrap">
    <view class="btn-box">
      <!-- <view class="btn green-btn">
        <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
        <text class="txt">打印</text>
      </view> -->
      <view class="btn blue-btn" v-if="hasFarmingResettle" @click="archivesUpload">
        <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
        <text class="txt">进度上报</text>
      </view>

      <!-- <view class="btn blue-btn">
        <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
        <text class="txt">问题反馈</text>
      </view> -->
    </view>

    <view class="common-head" v-if="hasFarmingResettle">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>生产用地</text>
    </view>

    <view class="label-value" v-if="hasFarmingResettle">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">区块：</view>
            <view class="content">{{ getSettleAddressText(immigrantSettle.settleAddress) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">地块编号：</view>
            <view class="content"> {{ landInfo.landNo }} </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">面积：</view>
            <view class="content">{{ landInfo.landArea }}</view>
          </view>
        </uni-col>
        <uni-col :span="12" />
      </uni-row>
    </view>

    <view class="common-head" v-if="hasFarmingResettle">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>农业安置办理</text>
    </view>

    <view class="handle-status" v-if="!hasFarmingResettle">
      <image class="icon-null" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="txt">该户无农业安置</view>
    </view>

    <view class="handle-status" v-if="hasFarmingResettle && !farmingResettleStatus">
      <image src="@/static/images/icon_warning.png" class="icon" />
      <view class="txt">该户农业安置办理未完成</view>
    </view>

    <view class="handle-status" v-if="hasFarmingResettle && farmingResettleStatus">
      <image src="@/static/images/icon_submit.png" class="icon" />
      <view class="txt">该户农业安置办理已完成</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { LandlordType } from '@/types/sync'
import { routerForward } from '@/utils'
import { apartmentArea, resettleArea } from '@/config'
import { getChooseConfigApi, getResettleDetail } from '@/service'
import { OtherDataType } from '@/database'
interface PropsType {
  dataInfo: LandlordType
}
const props = defineProps<PropsType>()
let LandNoList: any = ref([])
const dataLists = ref<any>([])
const { immigrantSettle } = props.dataInfo as any
const getDataRequest = async () => {
  try {
    const datas = await getResettleDetail(OtherDataType.settleAddressList)
    dataLists.value = datas
    // resettleArea.value=dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
  } catch (error) {
    console.log('error', error)
  }
}
// 安置状态
const farmingResettleStatus = computed(() => {
  // 安置状态
  const arch = props.dataInfo.immigrantDocumentation || {}
  const { agriculturePic } = arch
  return agriculturePic && agriculturePic !== '[]'
})

// 是否有农业安置
const hasFarmingResettle = computed(() => {
  const list =
    props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList : []
  const len = list.filter((item) => item.settingWay === '1').length
  return len > 0
})

// 生产用地信息
const landInfo = computed(() => {
  let land: any = props.dataInfo && props.dataInfo.immigrantLand ? props.dataInfo.immigrantLand : {}
  land.landNoText = LandNoList.value.filter((item: any) => {
    return item.id == land.landNo
  })[0].name
  console.log(land, '测试数据2')
  return land
})

const archivesUpload = () => {
  routerForward('archives', {
    uid: props.dataInfo.uid,
    type: 11
  })
}

const getSettleAddressText = (settleAddress?: string) => {
  if (!settleAddress) return '-'
  const str = dataLists.value.filter((item: any) => item.id == settleAddress)
  console.log(str, '测试数据')
  return str[0]?.name
}
const getLandNoList = async () => {
  let res = await getChooseConfigApi()
  LandNoList.value = res
}
onMounted(() => {
  getLandNoList()
  getDataRequest()
})
</script>

<style lang="scss" scoped>
.farm-wrap {
  .common-head {
    display: flex;
    width: 100%;
    height: 28rpx;
    margin-top: 9rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
    background: #ffffff;
    border-bottom: 1rpx solid #f0f0f0;
    border-radius: 5rpx 5rpx 0px 0px;
    flex-direction: row;
    align-items: center;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-right: 6rpx;
    }
  }

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 9rpx 0;

    .btn {
      display: flex;
      height: 23rpx;
      padding: 0 9rpx;
      margin-left: 6rpx;
      background: #3e73ec;
      border-radius: 23rpx;
      align-items: center;
      justify-content: center;

      &.green-btn {
        background-color: #30a952;
      }

      &.blue-btn {
        background: #3e73ec;
      }

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 3rpx;
      }

      .txt {
        font-size: 9rpx;
        line-height: 11rpx;
        color: #ffffff;
      }
    }
  }

  .label-value {
    padding: 5rpx 12rpx 12rpx 0;
    box-sizing: border-box;

    .col {
      display: flex;
      flex-direction: row;

      .label {
        width: 90rpx;
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

  .handle-status {
    display: flex;
    width: 100%;
    padding: 9rpx 0 28rpx;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      width: 21rpx;
      height: 21rpx;
    }

    .icon-null {
      width: 152rpx;
      height: 92rpx;
    }

    .txt {
      margin-top: 5rpx;
      font-size: 9rpx;
      color: #171718;
    }
  }
}
</style>
