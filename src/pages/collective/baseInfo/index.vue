<template>
  <view class="base-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">村集体基本信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">村集体名称：</view>
                <view class="content">{{ formatStr(props.dataInfo.name) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">村集体编码：</view>
                <view class="content">{{ formatStr(props.dataInfo.doorNo) }}</view>
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
                <view class="label">联系方式：</view>
                <view class="content">{{ formatStr(props.dataInfo.phone) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
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
          </uni-row>
          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">中心经纬度:</view>
                <view class="content">
                  {{
                    props.dataInfo.longitude && props.dataInfo.latitude
                      ? `${props.dataInfo.longitude},${props.dataInfo.latitude}`
                      : '-'
                  }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <image
      class="edit-btn"
      src="@/static/images/icon_edit.png"
      mode="scaleToFill"
      @click="toLink('edit')"
    />
  </view>
</template>

<script lang="ts" setup>
import { formatStr, formatDict, routerForward } from '@/utils'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const toLink = (type: string) => {
  const params = {
    id: props.dataInfo.id,
    uid: props.dataInfo.uid,
    doorNo: props.dataInfo.doorNo,
    name: props.dataInfo.name,
    // suffixNo: splitStr(props.dataInfo.doorNo, 13, 17),
    locationType: props.dataInfo.locationType ? props.dataInfo.locationType : null,
    phone: props.dataInfo.phone,
    areaCode: props.dataInfo.areaCode, // 区/县
    townCode: props.dataInfo.townCode, // 镇/街道
    villageCode: props.dataInfo.villageCode, // 行政村
    longitude: props.dataInfo.longitude,
    latitude: props.dataInfo.latitude
  }

  routerForward('collectiveBaseInfoEdit', {
    params: JSON.stringify(params),
    type
  })
}
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      border-radius: 5rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .icon {
          width: 10rpx;
          height: 10rpx;
          margin-left: 10rpx;
        }

        .title {
          margin-left: 5rpx;
          font-size: 9rpx;
          font-weight: 600;
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
            width: 90rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);

            &.w-100 {
              width: 100rpx;
            }
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }

          .list-img {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .edit-btn {
    position: fixed;
    right: 25rpx;
    bottom: 16rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;
  }
}
</style>
