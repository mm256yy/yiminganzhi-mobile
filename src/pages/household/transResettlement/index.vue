<template>
  <view class="trans-wrapper">
    <view class="row-1">
      <view class="left" />
      <view class="right">
        <view class="btn green">
          <image class="icon" src="@/static/images/icon_print_white.png" mode="scaleToFill" />
          打印表格
        </view>
        <view class="btn blue">
          <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
          签字
        </view>
        <view class="btn blue">
          <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
          档案上传
        </view>
        <view class="btn blue">
          <image class="icon" src="@/static/images/icon_no_handle_white.png" mode="scaleToFill" />
          无需办理
        </view>
      </view>
    </view>
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      过渡家庭情况
    </view>
    <view class="row-2">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户主姓名：</view>
            <view class="content">{{ formatStr(dataInfo.name) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户内人口：</view>
            <view class="content">
              {{ formatStr(dataInfo.demographicList.length) }}
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁出地址：</view>
            <view class="content">新昌县镜岭镇下潘村</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content">13812300000</view>
          </view>
        </uni-col>
      </uni-row>
    </view>
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      过渡家庭情况
    </view>
    <view class="row-2">
      <uni-row>
        <uni-col :span="24">
          <view class="col">
            <view class="label">过渡安置地详址：</view>
            <view class="content">新昌县镜岭镇下潘村</view>
          </view>
        </uni-col>
      </uni-row>
    </view>
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      过渡落实情况
    </view>
    <view class="row-2">
      <uni-row>
        <uni-col :span="24">
          <view class="col">
            <view class="label">移民户主意见：</view>
            <view class="content">
              本户房屋已腾空完毕、生产用地已清理，同意交付给新昌县镜岭水库工程建设指挥部处理.
            </view>
          </view>
        </uni-col>
        <uni-col :span="24">
          <view class="col">
            <view class="label">移民户签字：</view>
            <view class="content">{{ formatStr(dataInfo.name) }}</view>
          </view>
        </uni-col>
        <uni-col :span="24">
          <view class="col">
            <view class="label">移民工作组验收意见：</view>
            <view class="content">已达验收要求。</view>
          </view>
        </uni-col>
        <uni-col :span="24">
          <view class="col">
            <view class="label">验收人：</view>
            <view class="content">张德三，李流</view>
          </view>
        </uni-col>
        <uni-col :span="24">
          <view class="col">
            <view class="label">验收时间：</view>
            <view class="content">2023年3月5日</view>
          </view>
        </uni-col>
        <uni-col :span="24">
          <view class="line" />
        </uni-col>
        <uni-col :span="24">
          <view class="col">
            <view class="label">乡镇街道审核意见：</view>
            <view class="content">同意审核通过</view>
          </view>
        </uni-col>
        <uni-col :span="24">
          <view class="col">
            <view class="label">审核人：</view>
            <view class="content">王五</view>
          </view>
        </uni-col>
        <uni-col :span="24">
          <view class="col">
            <view class="label">审核时间：</view>
            <view class="content">2023年3月5日</view>
          </view>
        </uni-col>
      </uni-row>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { formatStr } from '@/utils'
import { LandlordType } from '@/types/sync'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.trans-wrapper {
  .row-1 {
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

  .title {
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

  .row-2 {
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

    .line {
      width: 100%;
      height: 1rpx;
      margin: 9rpx 0;
      background: #ebebeb;
    }
  }
}
</style>
