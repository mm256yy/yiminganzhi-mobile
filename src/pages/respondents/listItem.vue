<template>
  <view class="company-item">
    <!-- <image class="bg" src="@/static/images/respondents_right.png" mode="scaleToFill" /> -->
    <view class="head">
      <view class="head-lt">
        <image class="user-icon" src="@/static/images/respondents_tit.png" mode="scaleToFill" />
        <view class="name">{{ props.data.name }}</view>
      </view>
      <view class="head-rt">
        <view class="status" :class="[props.data.reportStatus === 'ReportSucceed' ? 'success' : '']"
          ><text class="circle" />{{
            props.data.reportStatus === 'ReportSucceed' ? '已填报' : '未填报'
          }}</view
        >
        <view class="edit-box" @click.stop="deleteItem">
          <image class="remove-icon" src="@/static/images/remove.png" mode="scaleToFill" />
        </view>
      </view>
    </view>

    <view class="cont">
      <view class="cont-item" v-if="props.data.type !== MainType.PeasantHousehold">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">联系方式:</view>
        <view class="value">{{ props.data.phone }}</view>
      </view>
      <view class="cont-item" v-else>
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">是否财产户:</view>
        <view class="value">
          {{ dictOption(yesAndNoEnums, props.data.hasPropertyAccount) }}
        </view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">所在位置:</view>
        <view class="value">{{ getLocationText(props.data.locationType) }}</view>
      </view>
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
      <view class="cont-item" v-if="props.data.type === MainType.PeasantHousehold">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">自然村名称:</view>
        <view class="value">{{ props.data.virutalVillageCodeText || '' }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { dictOption } from '@/utils'
import { getLocationText, yesAndNoEnums } from '@/config/common'
import { LandlordType } from '@/types/sync'
import { MainType } from '@/types/common'

interface PropsType {
  data: LandlordType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['delete'])

const deleteItem = () => {
  emit('delete')
}
</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 346rpx;
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
        width: 220rpx;
        margin-right: 6rpx;
        overflow: hidden;
        font-size: 12rpx;
        font-weight: 600;
        color: #171718;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
      }
    }

    .head-rt {
      display: flex;
      align-items: center;
      flex-direction: row;

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

.test {
  width: 62rpx;
  height: 50rpx;
  background: linear-gradient(274deg, #a8d5ff 0%, #ffffff 100%);
  opacity: 0.56;
}
</style>
