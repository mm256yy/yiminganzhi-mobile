<template>
  <view class="farm-wrap">
    <view class="main" v-if="getRelocationResettlement">
      <!-- 搬迁安置 —— 自谋出路 -->
      <view class="row-1">
        <view class="btn green-btn" @click="onHandle">
          <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
          <text class="txt">办理</text>
        </view>
        <view class="btn blue-btn" @click="onArchives">
          <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
          <text class="txt">档案上传</text>
        </view>

        <!-- <view class="btn blue-btn">
					<image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
					<text class="txt">问题反馈</text>
				</view> -->
      </view>

      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>家庭情况</text>
      </view>

      <view class="label-value">
        <uni-row>
          <uni-col :span="12">
            <view class="col">
              <view class="label">户主姓名：</view>
              <view class="content">{{ dataInfo.name }}</view>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="col">
              <view class="label">户内人口：</view>
              <view class="content">
                {{ dataInfo?.demographicList.length || '-' }}
              </view>
            </view>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <view class="col">
              <view class="label">迁出地址：</view>
              <view class="content">{{ formatStr(dataInfo.settleAddress) }}</view>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="col">
              <view class="label">联系方式：</view>
              <view class="content"> {{ formatStr(dataInfo.phone) }} </view>
            </view>
          </uni-col>
        </uni-row>
      </view>

      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>自谋出路情况</text>
      </view>

      <view class="handle-status">
        <image class="icon" src="@/static/images/icon_submit.png" />
        <view class="txt">该户为自谋出路</view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">该户未选择自谋出路</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { LandlordType } from '@/types/sync'
import { routerForward, formatStr } from '@/utils'
import { HouseAreaType } from '@/types/common'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()

// 搬迁安置方式
const getRelocationResettlement = computed(() => {
  const { houseAreaType } = props.dataInfo
  return houseAreaType === HouseAreaType.oneself
})

// 档案上传
const onArchives = () => {
  routerForward('archives', {
    uid: props.dataInfo.uid,
    type: 11
  })
}

// 办理
const onHandle = () => {
  routerForward('attendto', {
    uid: props.dataInfo.uid,
    type: 8
  })
}
</script>

<style lang="scss" scoped>
.farm-wrap {
  .title-wrapper {
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

  .row-1 {
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
