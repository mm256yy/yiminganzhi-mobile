<template>
  <!-- 基本信息（评估） -->
  <view v-if="props.type === 'land'" class="base-info-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="icon">基本信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户主：</view>
                <view class="content">
                  {{ props.dataInfo.name }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.showDoorNo) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">身份证号：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.card) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">类别：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.landUserType, 418) }}
                </view>
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
                    (props.dataInfo.villageCodeText ? props.dataInfo.villageCodeText : '') +
                    (props.dataInfo.virutalVillageCodeText
                      ? props.dataInfo.virutalVillageCodeText
                      : '')
                  }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地基本情况评估合计：</view>
                <view class="content">
                  {{ totalPriceObj.landTotalAmount }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地青苗及附着物评估合计：</view>
                <view class="content">{{ totalPriceObj.assetAppendantTotalAmount }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">资产评估合计：</view>
                <view class="content">{{
                  (
                    totalPriceObj.landTotalAmount + totalPriceObj.assetAppendantTotalAmount
                  )?.toFixed(2)
                }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
  </view>
  <view v-else class="base-info-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            基本信息
          </view>
          <view class="right" />
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">名称：</view>
                <view class="content">{{ formatStr(props.dataInfo.name) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">编码：</view>
                <view class="content">{{ formatStr(props.dataInfo.showDoorNo) }}</view>
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
                    (props.dataInfo.villageCodeText ? props.dataInfo.villageCodeText : '') +
                    (props.dataInfo.virutalVillageCodeText
                      ? props.dataInfo.virutalVillageCodeText
                      : '')
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
            <uni-col :span="24">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.areaText) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地基本情况评估合计：</view>
                <view class="content">{{ totalPriceObj.landTotalAmount }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地青苗及附着物评估合计：</view>
                <view class="content">{{ totalPriceObj.assetAppendantTotalAmount }}</view>
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
  type: {
    type: String,
    default: ''
  },
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
    const { assetLandList, assetAppendantList } = props.dataInfo
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
