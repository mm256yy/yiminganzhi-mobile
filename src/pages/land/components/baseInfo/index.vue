<template>
  <!-- 基本信息（评估） -->
  <view class="base-info-wrapper">
    <view>
      <view class="list">
        <view class="list-item">
          <view class="list-1">
            <view class="icon">基本信息</view>
          </view>
          <view v-if="dataInfo.type === MainType.LandNoMove" class="list-2">
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
          <view v-else class="list-2">
            <uni-row>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">{{ getTypeName() }}名称：</view>
                  <view class="content">{{ formatStr(props.dataInfo.name) }}</view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">{{ getTypeName() }}编码：</view>
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
              <uni-col :span="12">
                <view class="col">
                  <view class="label">所在位置：</view>
                  <view class="content">
                    {{ formatStr(props.dataInfo.areaText) }}
                  </view>
                </view>
              </uni-col>
              <uni-col v-if="dataInfo.type === MainType.Company" :span="12">
                <view class="col">
                  <view class="label">公司地址：</view>
                  <view class="content">
                    {{ formatStr(props.dataInfo.company?.companyAddress) }}
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
            <uni-row>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">资产评估合计：</view>
                  <view class="content">{{ totalPriceObj.totalAmount }}</view>
                </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { formatStr, formatDict } from '@/utils'
import { MainType } from '@/types/common'

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

const getTypeName = () => {
  const map: any = {
    PeasantHousehold: '居民户',
    Company: '企业',
    IndividualHousehold: '个体户',
    Village: '村集体'
  }
  return map[props.dataInfo.type]
}

// 房屋主体评估合计
const totalPriceObj = computed(() => {
  const obj = {
    landTotalAmount: 0,
    assetAppendantTotalAmount: 0,
    totalAmount: 0
  }
  if (props.dataInfo) {
    const { landEstimateDtoList, assetAppendantList } = props.dataInfo
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
    obj.landTotalAmount = +obj.landTotalAmount.toFixed(2)
    obj.assetAppendantTotalAmount = +obj.assetAppendantTotalAmount.toFixed(2)
    obj.totalAmount = +(obj.landTotalAmount + obj.assetAppendantTotalAmount).toFixed(2)
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
          font-size: 8rpx;
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
