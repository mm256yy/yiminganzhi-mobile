<template>
  <view class="company-item" @click="handleItemCLick">
    <view class="head">
      <view class="head-lt">
        <checkbox style="margin-bottom:5rpx" :value="checkSelectedStr" :checked="checkSelected" />
          <view
            class="status"
            :class="[props.data.reportStatus === 'ReportSucceed' ? 'success' : '']"
            ><text class="circle" />{{
              props.data.reportStatus === "ReportSucceed" ? "已关联" : "未关联"
            }}</view
          >
        <view class="name">{{ props.data.name }}</view>
        <view class="landNo">{{ props.data.landNo }}</view>
      </view>
      <view class="head-rt">
        <view
            class="status"
            :class="[props.data.reportStatus === 'ReportSucceed' ? 'success' : '']"
            ><text class="circle" />{{
              props.data.reportStatus === "ReportSucceed" ? "已评估" : "未评估"
            }}</view
          >
        <view class="btn blue-btn" @click="estimate">
          <text class="txt">评估</text>
        </view>
      </view>
    </view>
    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">权属单位:</view>
        <view class="value">{{ props.data.phone }}</view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">所在区域:</view>
        <view class="value">
          {{ dictOption(yesAndNoEnums, props.data.hasPropertyAccount) }}
        </view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">关联户主:</view>
        <view class="value">{{ getLocationText(props.data.locationType) }}</view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">图幅号</view>
        <view class="value"
          >{{ props.data.areaCodeText }}/{{ props.data.townCodeText }}</view
        >
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">地类:</view>
        <view class="value">{{ props.data.villageCodeText }}</view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">土地性质:</view>
        <view class="value">{{ props.data.virutalVillageCodeText || "" }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dictOption } from "@/utils";
import { getLocationText, yesAndNoEnums } from "@/config/common";
import { LandlordType } from "@/types/sync";

interface PropsType {
  data: LandlordType;
}

const props = defineProps<PropsType>();
const emit = defineEmits(["delete"]);
const checkSelectedStr = ref<string>('0')
const checkSelected = ref<boolean>(false)


const handleItemCLick = () => {
  checkSelected.value=!checkSelected.value
}

const estimate = () => { };

</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 348rpx;
  padding: 2rpx 12rpx 12rpx 12rpx;
  margin: 0 7rpx 7rpx 0;
  background-color: #ffffff;
  border-radius: 7rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);

  &:nth-child(2n) {
    margin-right: 0rpx;
  }

  .bg {
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    width: 30rpx;
    height: 30rpx;
  }

  .head {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-bottom: 6rpx;
    justify-content: space-between;

    .head-lt {
      display: flex;
      align-items: center;
      flex-direction: row;

      .user-icon {
        width: 19rpx;
        height: 19rpx;
        margin-right: 6rpx;
      }

      .name {
        // width: 220rpx;
        margin-right: 6rpx;
        overflow: hidden;
        font-size: 12rpx;
        font-weight: 600;
        color: #171718;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
      }

      .landNo {
        font-size: 10rpx;
        color: #666;
        font-weight: 500;
      }
    }

    .head-rt {
      display: flex;
      align-items: center;
      flex-direction: row;

      .edit-box {
        display: flex;
        width: 16rpx;
        height: 16rpx;
        border: 1rpx solid #ff4242;
        border-radius: 50%;
        align-items: center;
        justify-content: center;

        .remove-icon {
          width: 9rpx;
          height: 9rpx;
        }
      }
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 14rpx;
    padding: 0 6rpx;
    margin-right: 8rpx;
    font-size: 7rpx;
    color: #ff2d2d;
    background: #fff1f1;
    border-radius: 8rpx;

    .circle {
      width: 4rpx;
      height: 4rpx;
      margin-right: 2rpx;
      background-color: #ff6767;
      border-radius: 50%;
    }

    &.success {
      color: #199f38;

      .circle {
        background-color: #30b950;
      }
    }
  }

  .cont {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .cont-item {
      display: flex;
      height: 16rpx;
      width: 50%;
      margin-top: 6rpx;
      align-items: center;
      flex-direction: row;

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 6rpx;
      }

      .label {
        width: 56rpx;
        overflow: hidden;
        font-size: 9rpx;
        color: #171718;
        word-break: keep-all;
      }

      .value {
        font-size: 9rpx;
        color: #171718;
      }
    }
  }
}

.btn {
  display: flex;
  height: 20rpx;
  padding: 0 9rpx;
  margin-left: 6rpx;
  background: #3e73ec;
  border-radius: 10rpx;
  align-items: center;
  justify-content: center;

  &.green-btn {
    background-color: #30a952;
  }

  &.blue-btn {
    background: #3e73ec;
  }

  &.red {
    background-color: #e43030;
  }

  &.yellow {
    background-color: #fec44c;
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
</style>
