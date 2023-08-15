<template>
  <!-- 居民户信息（评估） -->
  <view class="base-info-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="icon">户主</view>
          <view class="name">
            {{ formatStr(props.dataInfo.name) }}
          </view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">
                  {{ filterViewDoorNo(props.dataInfo) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">自然村/村民小组：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.virutalVillageCodeText) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">是否财产户：</view>
                <view class="content">
                  {{ dictOption(yesAndNoEnums, props.dataInfo.hasPropertyAccount) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.phone) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ dictOption(locationTypes, props.dataInfo.locationType) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.address) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋主体评估合计：</view>
                <view class="content">0</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋装修评估合计：</view>
                <view class="content">0</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房屋附属设施评估合计：</view>
                <view class="content">0</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">零星(林)果木评估合计：</view>
                <view class="content">0</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地基本情况评估合计：</view>
                <view class="content">0</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">土地青苗及附着物评估合计：</view>
                <view class="content">0</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">坟墓评估合计：</view>
                <view class="content" />
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">资产评估合计：</view>
                <view class="content" />
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { formatStr, dictOption, filterViewDoorNo } from '@/utils'
import { locationTypes, yesAndNoEnums } from '@/config/common'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
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
          width: 32rpx;
          height: 16rpx;
          font-size: 9rpx;
          color: #fff;
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
