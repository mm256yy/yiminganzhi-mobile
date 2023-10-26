<template>
  <view class="company-item">
    <view class="head">
      <view class="head-lt">
        <image class="user-icon" src="@/static/images/respondents_tit.png" mode="scaleToFill" />
        <view class="name">{{ props.data.name }}</view>
        <view class="number">{{ props.data.showDoorNo }}</view>
      </view>
      <view class="head-rt" v-if="props.showStatus">
        {{ filterCurrentProgress(props.data.currentProgress) }}
        {{ filterWarnStatus(props.data.warnStatus) }}
      </view>

      <template v-else>
        <view class="head-rt"> {{ getProgressText(props.data) }} </view>
      </template>
    </view>

    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">联系方式:</view>
        <view class="value">{{ props.data.phone }}</view>
      </view>

      <template v-if="props.data.type !== MainType.PeasantHousehold">
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">所属区域:</view>
          <view class="value">{{ props.data.areaCodeText }}/{{ props.data.townCodeText }}</view>
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">行政村名称:</view>
          <view class="value">{{ props.data.villageCodeText }}</view>
        </view>
      </template>
      <template v-else>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">是否财产户:</view>
          <view class="value">
            {{ dictOption(yesAndNoEnums, props.data.hasPropertyAccount) }}
          </view>
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">户籍地址:</view>
          <view class="value">{{ props.data.address }}</view>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { dictOption } from '@/utils'
import { LandlordType } from '@/types/sync'
import { yesAndNoEnums } from '@/config/common'
import { MainType } from '@/types/common'

interface PropsType {
  data: LandlordType
  showStatus: boolean // 是否展示状态
}

const props = defineProps<PropsType>()

const progressMaps = [
  {
    label: '资格认定',
    value: '1'
  },
  {
    label: '资产评估',
    value: '2'
  },
  {
    label: '安置确认',
    value: '3'
  },
  {
    label: '择址确认',
    value: '4'
  },
  {
    label: '腾空过渡',
    value: '5'
  },
  {
    label: '动迁协议',
    value: '6'
  },
  {
    label: '搬迁安置',
    value: '7'
  },
  {
    label: '生产安置',
    value: '8'
  },
  {
    label: '已完成',
    value: '9'
  }
]

const filterCurrentProgress = (type: string) => {
  // 当前进度 1资格认定 2资产评估 3安置确认 4择址确认 5腾空过度 6动迁协议 7搬迁安置 8生产安置 9已完
  const item = progressMaps.find((item) => item.value === type)
  return item?.label || ''
}

const filterWarnStatus = (type: string) => {
  // 预警状态 0正常 1预警 2滞后
  return type === '0' ? '正常' : type === '1' ? '预警' : '滞后'
}

const getProgressText = (data: LandlordType) => {
  if (!data) return ''
  const { type, immigrantFilling = {} } = data
  let count = 0
  let total = 0
  if (type === MainType.PeasantHousehold) {
    // 居民户信息
    if (immigrantFilling.householdPicStatus === '1') {
      count++
    }
    // 资格认定
    if (immigrantFilling.qualificationStatus === '1') {
      count++
    }
    // 资产评估
    if (immigrantFilling.estimateeStatus === '1') {
      count++
    }
    // 安置确认
    if (immigrantFilling.arrangementStatus === '1') {
      count++
    }
    // 择址确认
    if (immigrantFilling.chooseStatus === '1') {
      count++
    }
    // 协议
    if (immigrantFilling.agreementStatus === '1') {
      count++
    }
    // 移民剪卡
    if (immigrantFilling.cardStatus === '1') {
      count++
    }
    // 腾空
    if (immigrantFilling.excessSoarStatus === '1') {
      count++
    }
    // 搬迁安置
    if (immigrantFilling.relocateArrangementAllStatus === '1') {
      count++
    }
    // 生产安置
    if (immigrantFilling.productionArrangementAllStatus === '1') {
      count++
    }
    // 相关手续
    if (immigrantFilling.proceduresStatus === '1') {
      count++
    }
    total = 11
  } else if (type === MainType.Company) {
    // 资产评估
    if (immigrantFilling.estimateeStatus === '1') {
      count++
    }
    // 协议
    if (immigrantFilling.agreementStatus === '1') {
      count++
    }
    // 移民剪卡
    if (immigrantFilling.cardStatus === '1') {
      count++
    }
    // 腾空
    if (immigrantFilling.excessSoarStatus === '1') {
      count++
    }
    // 相关手续
    if (immigrantFilling.proceduresStatus === '1') {
      count++
    }
    total = 5
  } else if (type === MainType.IndividualHousehold) {
    // 资产评估
    if (immigrantFilling.estimateeStatus === '1') {
      count++
    }
    // 协议
    if (immigrantFilling.agreementStatus === '1') {
      count++
    }
    // 移民剪卡
    if (immigrantFilling.cardStatus === '1') {
      count++
    }
    // 腾空
    if (immigrantFilling.excessSoarStatus === '1') {
      count++
    }
    // 相关手续
    if (immigrantFilling.proceduresStatus === '1') {
      count++
    }
    total = 5
  } else if (type === MainType.Village) {
    // 资产评估
    if (immigrantFilling.estimateeStatus === '1') {
      count++
    }
    // 协议
    if (immigrantFilling.agreementStatus === '1') {
      count++
    }
    // 移民剪卡
    if (immigrantFilling.cardStatus === '1') {
      count++
    }
    // 集体资产
    if (immigrantFilling.disposalMeasuresStatus === '1') {
      count++
    }
    total = 4
  }
  return `${count} / ${total}`
}
</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 346rpx;
  height: 110rpx;
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
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-bottom: 6rpx;

    .head-lt {
      display: flex;
      align-items: center;

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

      .number {
        font-size: 10rpx;
        font-weight: 500;
        color: #0a54ff;
      }
    }

    .head-rt {
      width: 54rpx;
      height: 14rpx;
      font-size: 7rpx;
      font-weight: 400;
      line-height: 14rpx;
      color: #ff2d2d;
      text-align: center;
      background: #fff1f1;
      border-radius: 14rpx;
    }
  }

  .cont {
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
