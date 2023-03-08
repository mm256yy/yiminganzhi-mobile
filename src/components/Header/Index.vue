<template>
  <view class="list-header">
    <view class="list-header-lt" @click="expandToggle">
      <image class="expand-img" src="@/static/images/expand.png" mode="scaleToFill" />
    </view>

    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ props.dataInfo.name }}</view>
        <view class="account-no">{{ props.dataInfo.doorNo }}</view>
      </view>

      <view class="list-header-right">
        <view class="btn-wrapper print" v-if="props.showPrint">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印表格</text>
        </view>

        <view class="btn-wrapper report" @click="reportDataCheck">
          <image class="icon" src="@/static/images/icon_report.png" mode="scaleToFill" />
          <text class="txt">数据上报</text>
        </view>
      </view>
    </view>

    <uni-popup ref="popupDialog" :is-mask-click="false">
      <view class="tips-wrapper">
        <view class="tips-title">数据上报</view>
        <view class="tips-content">
          <view class="tips-list">
            <view class="tips-item" v-for="(item, index) in tipsList" :key="index">
              {{ item }}
            </view>
          </view>
          <view class="tips">
            <uni-icons type="info-filled" color="#FF4242" />
            以上信息还未填写，是否继续上报数据？
          </view>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="close">取消</view>
          <view class="btn confirm" @click="confirm">确认</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reportDataApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { showLoading, hideLoading } from '@/config'
import { MainType } from '@/types/common'

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  },
  showPrint: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['expandToggle', 'updateTree'])
const popupDialog = ref<any>(null)
const tipsList = ref<any>([])

const expandToggle = () => {
  emit('expandToggle')
}

// 数据上报校验
const reportDataCheck = () => {
  let query = {
    uid: props.dataInfo.uid,
    isCheck: true,
    type: props.type as MainType
  }
  reportDataApi(query)
    .then((res: any) => {
      if (res) {
        tipsList.value = [...res]
        popupDialog.value?.open()
      }
    })
    .catch((e) => {
      showToast(ERROR_MSG)
    })
}

const close = () => {
  popupDialog.value?.close()
}

// 确认数据上报
const confirm = () => {
  let query = {
    uid: props.dataInfo.uid,
    isCheck: false,
    type: props.type as MainType
  }
  showLoading()
  reportDataApi(query)
    .then((res: any) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateTree')
      }
      hideLoading()
      close()
    })
    .catch((e) => {
      hideLoading()
      showToast(ERROR_MSG)
      close()
    })
}
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  border-bottom: 1rpx solid #e1e4ea;

  .list-header-lt {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 12rpx;
    height: 33rpx;

    .expand-img {
      width: 12rpx;
      height: 12rpx;
      margin-right: 4rpx;
    }
  }

  .list-header-rt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 33rpx;

    .list-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .name {
        margin: 0 6rpx 0 10rpx;
        font-size: 13rpx;
        color: #171718;
      }

      .account-no {
        font-size: 13rpx;
        color: #1c5df1;
      }
    }

    .list-header-right {
      display: flex;
      flex-direction: row;
      align-items: center;

      .btn-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 68rpx;
        height: 23rpx;
        border-radius: 11rpx;

        &:active {
          opacity: 0.7;
        }

        &.print {
          margin-right: 7rpx;
          background-color: #30a952;
        }

        &.report {
          background-color: #3e73ec;
        }

        .icon {
          width: 7rpx;
          height: 7rpx;
          margin-right: 3rpx;
        }

        .txt {
          font-size: 9rpx;
          color: #fff;
        }
      }
    }
  }
}

.tips-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .tips-title {
    width: 344rpx;
    height: 33rpx;
    font-size: 11rpx;
    font-weight: 600;
    line-height: 33rpx;
    color: #000;
    text-align: center;
    background: #ffffff;
    border-radius: 5rpx 5rpx 0 0;
  }

  .tips-content {
    width: 344rpx;
    height: 156rpx;
    padding: 14rpx 40rpx;
    background: #f6f7f9;
    box-sizing: border-box;

    .tips-list {
      width: 264rpx;
      height: 88rpx;
      padding: 16rpx 19rpx;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      .tips-item {
        display: flex;
        font-size: 9rpx;
        line-height: 1.5;
        color: #131313;
        align-items: center;
        flex-direction: column;
      }
    }

    .tips {
      margin-top: 14rpx;
      font-size: 9rpx;
      color: #131313;
    }
  }

  .btn-wrapper {
    display: flex;
    width: 344rpx;
    height: 33rpx;
    padding: 0 9rpx;
    background: #fff;
    border-radius: 0 0 5rpx 5rpx;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-end;

    .btn {
      width: 52rpx;
      height: 21rpx;
      font-size: 9rpx;
      line-height: 21rpx;
      text-align: center;
      border-radius: 3rpx;

      &.cancel {
        color: rgba(0, 0, 0, 0.85);
        background: #fff;
        border: 1rpx solid #d9d9d9;
      }

      &.confirm {
        margin-left: 6rpx;
        color: #fff;
        background: #3e73ec;
      }
    }
  }
}
</style>
