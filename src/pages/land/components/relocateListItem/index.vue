<template>
  <view class="company-item" @click="toDetail">
    <view class="head">
      <view class="head-lt">
        <image class="user-icon" src="@/static/images/people_icon.png" mode="scaleToFill" />
        <view class="name">{{ props.data?.name }}</view>
        <view class="landNo">{{ props.data?.showDoorNo }}</view>
      </view>
      <view class="head-rt">
        <view class="status"
          ><text class="circle">{{ fillNumber }}/{{ totalStage }} </text></view
        >
      </view>
    </view>
    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">所属区域:</view>
        <view class="value">
          {{
            (props.data.areaCodeText ? props.data.areaCodeText : '') +
            (props.data.townCodeText ? props.data.townCodeText : '') +
            (props.data.villageCodeText ? props.data.villageCodeText : '') +
            (props.data.virutalVillageCodeText ? props.data.virutalVillageCodeText : '')
          }}
        </view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">类别:</view>
        <view class="value">
          {{ formatDict(props.data.landUserType, 418) }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { LandlordType } from '@/types/sync'
import { formatDict, routerForward } from '@/utils'
import { MainType } from '@/types/common'

interface PropsType {
  data: LandlordType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['delete'])

// 跳转详细页面
const toDetail = () => {
  const routeName = 'landNavigation'

  routerForward(routeName, {
    data: JSON.stringify(props.data)
  })
}

const totalStage = computed(() => {
  // 类别为农户时7个阶段，其他4个阶段
  return props.data.landUserType === 'PeasantHousehold' ? 7 : 4
})

const fillNumber = computed(() => {
  const { immigrantFilling, landUserType, landEstimateDtoList } = props.data || {}

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
.company-item {
  position: relative;
  width: 345rpx;
  padding: 12rpx;
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
    height: 12rpx;
    padding: 0 6rpx;
    margin-right: 8rpx;
    font-size: 7rpx;
    color: #199f38;
    background: #fff1f1;
    border-radius: 8rpx;

    .circle {
      height: 12rpx;
      margin-right: 2rpx;
      border-radius: 50%;
      line-height: 12rpx;
    }
  }

  .cont {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .cont-item {
      display: flex;
      height: 16rpx;
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
</style>
