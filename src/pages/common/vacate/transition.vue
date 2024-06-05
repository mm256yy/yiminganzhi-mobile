<template>
  <view class="house-wrap">
    <view class="btn-box">
      <view>
        <view
          class="btn blue-btn"
          @click="handle"
          v-if="!excessInfo.isExcess || excessInfo.isExcess === '1'"
        >
          <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
          <text class="txt">办理</text>
        </view>
      </view>
      <view style="display: flex">
        <view class="btn green-btn" @click="handleClick">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印</text>
        </view>

        <view class="btn blue-btn" @click="archivesUpload">
          <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
          <text class="txt">进度上报</text>
        </view>
        <view class="btn blue-btn" @click="notHandle" v-if="!excessInfo.isExcess">
          <image class="icon" src="@/static/images/icon_not_handle.png" mode="scaleToFill" />
          <text class="txt">无需办理</text>
        </view>
      </view>

      <!-- <view class="btn blue-btn">
        <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
        <text class="txt">问题反馈</text>
      </view> -->
    </view>

    <view class="common-head">
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
              {{
                props.dataInfo?.demographicList.filter(
                  (item: any) => item.name != '增计人口' && item.isDelete !== '1'
                ).length || 1
              }}</view
            >
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁出地址：</view>
            <view class="content">{{
              (dataInfo.areaCodeText || '') +
              (dataInfo.townCodeText || '') +
              (dataInfo.villageCodeText || '')
            }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content"> {{ dataInfo.phone }} </view>
          </view>
        </uni-col>
      </uni-row>
    </view>

    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>过渡去向情况</text>
    </view>

    <view class="label-value">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">过渡安置地详址：</view>
            <view class="content">{{ excessInfo.excessAddress || '' }}</view>
          </view>
        </uni-col>
        <uni-col :span="12" />
      </uni-row>
    </view>

    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>过渡落实情况</text>
    </view>

    <view class="handle-status" v-if="!excessInfo.isExcess">
      <image src="@/static/images/icon_warning.png" class="icon" />
      <view class="txt">该户过渡安置办理未完成</view>
    </view>
    <view class="handle-status" v-if="excessInfo.isExcess === '0'">
      <image src="@/static/images/icon_null_cont.png" class="null-icon" />
      <view class="txt">该户无过渡安置</view>
    </view>

    <view class="handle-status" v-if="excessInfo.isExcess === '1'">
      <image src="@/static/images/icon_submit.png" class="icon" />
      <view class="txt">
        该户过渡安置办理{{ excessInfo.isComplete == '0' ? '过渡中' : excessInfo.isComplete == '1' ? '过渡完成' : '-' }}
      </view>
      <view class="txt" v-for="(item,index) in excessInfo.immigrantExcessPayList" :key="index">
        第{{item.orderNum}}批过渡时间 :{{
          item.excessStartDate ? dayjs(item.excessStartDate).format('YYYY-MM-DD') : '-'
        }}
        至
        {{ item.excessEndDate ? dayjs(item.excessEndDate).format('YYYY-MM-DD') : '-' }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LandlordType } from '@/types/sync'
import { updateImpLandlordExcessApi } from '@/service'
import { routerForward } from '@/utils'
import dayjs from 'dayjs'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])

const excessInfo = computed(() => {
  return props.dataInfo.immigrantExcess || {}
})

const archivesUpload = () => {
  routerForward('archives', {
    uid: props.dataInfo.uid,
    type: 9
  })
}

const handle = () => {
  routerForward('attendto', {
    uid: props.dataInfo.uid,
    type: 6
  })
}

const notHandle = async () => {
  const res = await updateImpLandlordExcessApi(props.dataInfo.uid, {
    isExcess: '0'
  })
  if (res) {
    uni.showToast({
      title: '操作成功！',
      icon: 'success'
    })
    emit('updateData')
  }
}
const handleClick = () => {
  routerForward('pdfSerch', {
    dataInfo: JSON.stringify(props.dataInfo),
    id: 9
  })
}
</script>

<style lang="scss" scoped>
.house-wrap {
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
    justify-content: space-between;
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

    .null-icon {
      width: 117rpx;
      height: 94rpx;
    }

    .txt {
      margin-top: 5rpx;
      font-size: 9rpx;
      color: #171718;
    }
  }
}
</style>
