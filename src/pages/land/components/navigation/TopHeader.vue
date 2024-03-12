<template>
  <view class="list-header">
    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ props.dataInfo?.name }}</view>
        <view class="account-no">{{ props.dataInfo?.showDoorNo }}</view>
        <view class="fill-number">
          填报表单：&nbsp;
          <text class="green">{{ fillNumber }}</text>
          /{{ totalStage }}
        </view>
      </view>
      <!-- <view class="list-header-right">
        <view class="btn blue-btn" @click="infoFeedback">
          <image class="icon" src="@/static/images/icon_dqxy_sel.png" mode="scaleToFill" />
          <text class="txt">信息反馈</text>
        </view>
      </view> -->
    </view>
  </view>
</template>

<script lang="ts" setup>
import { LandlordType } from '@/types/sync'
import { computed } from 'vue'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()

const totalStage = computed(() => {
  // 类别为农户时6个阶段，其他4个阶段
  return props.dataInfo.landUserType === 'PeasantHousehold' ? 6 : 4
})

const fillNumber = computed(() => {
  const { immigrantFilling, landUserType, landEstimateDtoList } = props.dataInfo || {}

  let fillCount = 0
  if (!immigrantFilling) {
    return 0
  }

  const {
    productionArrangementStatus, // 生产安置
    cardStatus, //补偿卡
    agreementStatus, // 动迁协议
    landSoarStatus, // 土地腾让
    selfEmploymentStatus, // 自谋职业
    retirementStatus // 养老保险
  } = immigrantFilling || {}

  if (landUserType === 'PeasantHousehold') {
    // 农户
    //生产安置确认
    if (productionArrangementStatus === '1') {
      fillCount++
    }
    // 自谋职业
    if (selfEmploymentStatus === '1') {
      fillCount++
    }
    // 养老保险
    if (retirementStatus === '1') {
      fillCount++
    }
  }

  // 补偿卡
  if (cardStatus === '1') {
    fillCount++
  }
  // 征地协议
  if (agreementStatus === '1') {
    fillCount++
  }
  // 土地腾让
  if (landSoarStatus === '1') {
    fillCount++
  }

  // 资产评估
  if (landEstimateDtoList && landEstimateDtoList.length > 0) {
    fillCount++
  }

  return fillCount
})
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;

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
        margin: 0 6rpx 0 0;
        font-size: 13rpx;
        color: #171718;
      }

      .account-no {
        font-size: 13rpx;
        color: #1c5df1;
      }

      .fill-number {
        display: flex;
        height: 24rpx;
        padding: 0 18rpx;
        margin-left: 14rpx;
        font-size: 11rpx;
        font-weight: 500;
        color: #171718;
        background-color: #e1f0ff;
        border-radius: 28rpx;
        align-items: center;
        justify-content: center;

        .green {
          color: #30a952;
        }
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
          background-color: #30a952;
        }

        &.report {
          margin-left: 7rpx;
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
</style>
