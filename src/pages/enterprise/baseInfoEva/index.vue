<template>
  <!-- 企业基本信息（评估） -->
  <view class="base-info-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            基本信息
          </view>
          <view class="right" />
        </view>
        <view class="list-2" style="border-bottom: 1rpx dotted #d0cbcb">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业名称：</view>
                <view class="content">{{ formatStr(props.dataInfo.name) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业编码：</view>
                <view class="content">{{ formatStr(props.dataInfo.showDoorNo) || formatStr(props.dataInfo.doorNo) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所属区域：</view>
                <view class="content">
                  {{
                    (props.dataInfo.areaCodeText ? props.dataInfo.areaCodeText : '') +
                    (props.dataInfo.townCodeText ? props.dataInfo.townCodeText : '') +
                    (props.dataInfo.villageCodeText ? props.dataInfo.villageCodeText : '')
                  }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">{{ formatStr(props.dataInfo.phone) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.locationType, 326) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">公司地址：</view>
                <view class="content">
                  {{
                    props.dataInfo.company ? formatStr(props.dataInfo.company.companyAddress) : ''
                  }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋主体评估合计：</view>
                <view class="content">{{ formatStr(totalPriceObj.houseTotalAmount, '元') }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋装修评估合计：</view>
                <view class="content">{{ formatStr(totalPriceObj.fitUpTotalAmount, '元') }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋附属设施评估合计：</view>
                <view class="content">{{
                  formatStr(totalPriceObj.appendantTotalAmount, '元')
                }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">零星(林)果木评估合计：</view>
                <view class="content">{{ formatStr(totalPriceObj.treeTotalAmount, '元') }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地基本情况评估合计：</view>
                <view class="content">{{ formatStr(totalPriceObj.landTotalAmount, '元') }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地青苗及附着物评估合计：</view>
                <view class="content">{{
                  formatStr(totalPriceObj.assetAppendantTotalAmount, '元')
                }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">设施设备评估合计：</view>
                <view class="content">{{
                  formatStr(totalPriceObj.equipmentTotalAmount, '元')
                }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">基础设施评估合计：</view>
                <view class="content">{{
                  formatStr(totalPriceObj.infrastructureAmount, '元')
                }}</view>
              </view>
            </uni-col>
          </uni-row>
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">其他评估合计：</view>
                <view class="content">{{ formatStr(totalPriceObj.otherAmount, '元') }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">资产评估合计：</view>
                <view class="content">{{ formatStr(totalPriceObj.totalAmount, '元') }}</view>
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
import { formatStr, formatDict } from '@/utils'

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
    infrastructureAmount: 0,
    otherAmount: 0,
    totalAmount: 0
  }
  if (props.dataInfo) {
    const {
      immigrantHouseList,
      assetHouseFitUpList,
      immigrantAppendantList,
      immigrantTreeList,
      landEstimateDtoList,
      assetAppendantList,
      immigrantEquipmentList,
      immigrantInfrastructureList,
      immigrantOtherList
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
    if (landEstimateDtoList && landEstimateDtoList.length) {
      landEstimateDtoList.forEach((item: any) => {
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
    // 设施设备
    if (immigrantEquipmentList && immigrantEquipmentList.length) {
      immigrantEquipmentList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.equipmentTotalAmount += +item.compensationAmount
        }
      })
    }
    // 基础设施评估
    if (immigrantInfrastructureList && immigrantInfrastructureList.length) {
      immigrantInfrastructureList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.infrastructureAmount += +item.compensationAmount
        }
      })
    }
    // 其他评估
    if (immigrantOtherList && immigrantOtherList.length) {
      immigrantOtherList.forEach((item: any) => {
        if (item.compensationAmount > 0) {
          obj.otherAmount += +item.compensationAmount
        }
      })
    }

    obj.houseTotalAmount = +obj.houseTotalAmount.toFixed(2)
    obj.fitUpTotalAmount = +obj.fitUpTotalAmount.toFixed(2)
    obj.appendantTotalAmount = +obj.appendantTotalAmount.toFixed(2)
    obj.treeTotalAmount = +obj.treeTotalAmount.toFixed(2)
    obj.landTotalAmount = +obj.landTotalAmount.toFixed(2)
    obj.assetAppendantTotalAmount = +obj.assetAppendantTotalAmount.toFixed(2)
    obj.equipmentTotalAmount = +obj.equipmentTotalAmount.toFixed(2)
    obj.infrastructureAmount = +obj.infrastructureAmount.toFixed(2)
    obj.otherAmount = +obj.otherAmount.toFixed(2)
    obj.totalAmount = +(
      obj.houseTotalAmount +
      obj.fitUpTotalAmount +
      obj.appendantTotalAmount +
      obj.treeTotalAmount +
      obj.landTotalAmount +
      obj.assetAppendantTotalAmount +
      obj.equipmentTotalAmount +
      obj.infrastructureAmount +
      obj.otherAmount
    ).toFixed(2)
  }

  return obj
})
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;
  overflow-y: scroll;

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
          padding-left: 6rpx;
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
