<template>
  <!-- 居民户信息（评估） -->
  <view class="base-info-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="icon">基本信息</view>
          <view class="name">
            {{ formatStr(props.dataInfo.name) }}
          </view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户主：</view>
                <view class="content">
                  {{ props.dataInfo.showDoorNo  }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.virutalVillageCodeText) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">身份证号：</view>
                <view class="content">
                  {{ dictOption(yesAndNoEnums, props.dataInfo.hasPropertyAccount) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">类别：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.phone) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所属区域：</view>
                <view class="content">
                  {{ dictOption(locationTypes, props.dataInfo.locationType) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地基本情况评估合计：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.address) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地青苗及附着物评估合计：</view>
                <view class="content">{{ 123 }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">资产评估合计：</view>
                <view class="content">{{ 456 }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { formatStr, dictOption } from '@/utils'
import { locationTypes, yesAndNoEnums } from '@/config/common'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

// 房屋主体评估合计
const totalPriceObj = computed(() => {
  const obj = {
    houseTotalAmount: 0,
    fitUpTotalAmount: 0,
    appendantTotalAmount: 0,
    treeTotalAmount: 0,
    landTotalAmount: 0,
    assetAppendantTotalAmount: 0,

    equipmentTotalAmount: 0,
    specialTotalAmount: 0,

    totalAmount: 0
  }
  if (props.dataInfo) {
    const {
      immigrantHouseList,
      assetHouseFitUpList,
      immigrantAppendantList,
      immigrantTreeList,
      assetLandList,
      assetAppendantList
    } = props.dataInfo
    // 房屋主体
    if (immigrantHouseList && immigrantHouseList.length) {
      immigrantHouseList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.houseTotalAmount += +item.compensationAmount
        }
      })
    }
    // 房屋装修
    if (assetHouseFitUpList && assetHouseFitUpList.length) {
      assetHouseFitUpList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.fitUpTotalAmount += +item.compensationAmount
        }
      })
    }
    // 附属物
    if (immigrantAppendantList && immigrantAppendantList.length) {
      immigrantAppendantList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.appendantTotalAmount += +item.compensationAmount
        }
      })
    }
    // 零星果木
    if (immigrantTreeList && immigrantTreeList.length) {
      immigrantTreeList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.treeTotalAmount += +item.compensationAmount
        }
      })
    }
    // 土地
    if (assetLandList && assetLandList.length) {
      assetLandList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.landTotalAmount += +item.compensationAmount
        }
      })
    }
    // 土地青苗
    if (assetAppendantList && assetAppendantList.length) {
      assetAppendantList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.assetAppendantTotalAmount += +item.compensationAmount
        }
      })
    }
    obj.houseTotalAmount = +obj.houseTotalAmount.toFixed(2)
    obj.fitUpTotalAmount = +obj.fitUpTotalAmount.toFixed(2)
    obj.appendantTotalAmount = +obj.appendantTotalAmount.toFixed(2)
    obj.treeTotalAmount = +obj.treeTotalAmount.toFixed(2)
    obj.landTotalAmount = +obj.landTotalAmount.toFixed(2)
    obj.assetAppendantTotalAmount = +obj.assetAppendantTotalAmount.toFixed(2)
    obj.totalAmount = +(
      obj.houseTotalAmount +
      obj.fitUpTotalAmount +
      obj.appendantTotalAmount +
      obj.treeTotalAmount +
      obj.landTotalAmount +
      obj.assetAppendantTotalAmount
    ).toFixed(2)
  }

  return obj
})
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .icon {
          display: flex;
          height: 16rpx;
          font-size: 9rpx;
          color: #fff;
          padding: 2rpx 5rpx;
          background: #faad14;
          border-top-right-radius: 5rpx;
          border-bottom-right-radius: 5rpx;
          align-items: center;
          justify-content: center;
        }

        .name {
          margin-left: 5rpx;
          font-size: 9rpx;
          color: #171718;
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 120rpx;
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
}
</style>
