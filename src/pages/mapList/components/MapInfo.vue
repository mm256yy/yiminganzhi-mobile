<template>
  <view class="map-info-wrap">
    <view class="title-box">
      <text class="title">
        {{ props.dataInfo.type === MainType.Village ? props.dataInfo.name : '居民户简介' }}
      </text>
      <uni-icons type="closeempty" :size="20" @click="close" />
    </view>

    <view class="info-box" v-if="props.dataInfo.type === MainType.Village">
      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">区县：</text>
        <text class="text">{{ props.dataInfo.areaCodeText }}</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">街道：</text>
        <text class="text">{{ props.dataInfo.townCodeText }}</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">行政村：</text>
        <text class="text">{{ props.dataInfo.villageCodeText }}</text>
      </view>
    </view>

    <view class="info-box" v-if="props.dataInfo.type === MainType.PeasantHousehold">
      <view class="info-item">
        <image class="user-icon" src="@/static/images/icon_header.png" mode="scaleToFill" />
        <text class="name user-name">{{ props.dataInfo.name }}</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">户号：</text>
        <text class="text primary">{{ props.dataInfo.doorNo }}</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">身份证号：</text>
        <text class="text">{{ props.dataInfo.card }}</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">户籍所在地：</text>
        <text class="text w-146">{{ props.dataInfo.address }}</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">家庭总人数：</text>
        <text class="text primary">{{ props.dataInfo.demographicNum }}</text>
        <text class="text"> 人</text>
      </view>

      <view class="info-item">
        <view class="icon-dot">
          <view class="dot" />
        </view>
        <text class="name">房屋总数：</text>
        <text class="text primary">{{ props.dataInfo.houseNum }}</text>
        <text class="text"> 幢</text>
      </view>
    </view>

    <view class="fill-box">
      <view class="btn-box" @click="toLink">
        <text class="btn">
          {{ props.dataInfo.type === MainType.Village ? '编辑自然村' : '数据填报' }}
        </text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { MainType } from '@/types/common'
import { routerForward } from '@/utils'

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const toLink = () => {
  close()
  if (props.dataInfo.type === MainType.Village) {
    routerForward('villageEdit', {
      type: 'edit',
      uid: props.dataInfo.uid
    })
  } else if (props.dataInfo.type === MainType.PeasantHousehold) {
    routerForward('household', {
      uid: props.dataInfo.uid
    })
  }
}
</script>

<style lang="scss">
.map-info-wrap {
  position: absolute;
  top: 100rpx;
  left: 300rpx;
  z-index: 1;
  width: 245rpx;
  background-color: rgba(255, 255, 255, 0.83);
  border: 1rpx solid #eeeeee;
  border-radius: 2rpx;
  box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(45, 71, 103, 0.1);
}

.title-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 26rpx;
  padding: 0 6rpx 0 12rpx;
}

.title {
  font-size: 11rpx;
  font-weight: 500;
  color: #171718;
}

.info-box {
  padding: 3rpx 12rpx;
  border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  line-height: 21rpx;
}

.user-icon {
  width: 16rpx;
  height: 16rpx;
  margin-right: 6rpx;
}

.name {
  font-size: 9rpx;
  color: #333333;
}

.user-name {
  width: 190rpx;
  margin-right: 7rpx;
}

.text {
  font-size: 9rpx;
  color: #171718;
}

.w-146 {
  width: 146rpx;
}

.icon-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rpx;
  height: 16rpx;
  margin-right: 6rpx;
}

.dot {
  width: 5rpx;
  height: 5rpx;
  background-color: #ff862f;
  border-radius: 50%;
}

.primary {
  font-weight: 500;
  color: #1c5df1;
}

.fill-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4rpx 7rpx 7rpx 0;
}

.btn-box {
  display: flex;
  width: 56rpx;
  height: 21rpx;
  background-color: #3e6cd7;
  border-radius: 2rpx;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.btn {
  font-size: 9rpx;
  color: #ffffff;
}
</style>
