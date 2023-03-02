<template>
  <view class="village-item">
    <!-- <image class="bg" src="@/static/images/respondents_right.png" mode="scaleToFill" /> -->
    <view class="head">
      <view class="head-lt">
        <image class="user-icon" src="@/static/images/respondents_tit.png" mode="scaleToFill" />
        <view class="name">{{ props.data.name }}</view>
      </view>
      <view class="head-rt">
        <view class="edit-box" @click.stop="deleteItem">
          <image class="remove-icon" src="@/static/images/remove.png" mode="scaleToFill" />
        </view>
      </view>
    </view>

    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">行政村:</view>
        <view class="value">{{ props.data.villageCodeText }}</view>
      </view>
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">街道:</view>
        <view class="value">{{ props.data.townCodeText }}</view>
      </view>

      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">区县:</view>
        <view class="value">{{ props.data.areaCodeText }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { VillageType } from '@/types/common'

interface PropsType {
  data: VillageType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['delete'])

const deleteItem = () => {
  emit('delete')
}
</script>

<style lang="scss" scoped>
.village-item {
  flex: none;
  position: relative;
  width: 228rpx;
  padding: 12rpx 15rpx;
  margin: 7rpx 7rpx 0 0;
  background-color: #ffffff;
  border-radius: 7rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);

  &:nth-child(3n) {
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
        font-size: 12rpx;
        font-weight: 600;
        color: #171718;
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
