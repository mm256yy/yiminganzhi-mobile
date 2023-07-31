<template>
  <view class="house-item">
    <view class="item">
      <view class="label">安置房类型：</view>
      <view class="value-box"> 宅基地 </view>
    </view>

    <view class="item">
      <view class="label">安置人数：</view>
      <view class="value-box" />
    </view>

    <view class="item">
      <view class="label">选择地块：</view>
      <view class="value-box">
        <view class="flex-row">
          <view
            class="area-item"
            :class="{ active: resettleDefault.homesteadResettleRegion === item.id }"
            @click="homesteadPlaceChange(item.id)"
            v-for="item in resettleArea"
            :key="item.id"
          >
            <uni-icons
              class="icon"
              type="map"
              :color="resettleDefault.homesteadResettleRegion === item.id ? '#3E73EC' : '#131313'"
              size="16"
            />
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="item">
      <view class="label">宅基地面积：</view>
      <view class="value-box">
        <view class="flex-row">
          <view
            class="check-item"
            :class="{ active: resettleDefault.homesteadResettleArea === item.id }"
            @click="homesteadAreaChange(item.id)"
            v-for="item in homesteadAreaSize"
            :key="item.id"
          >
            {{ item.name }}{{ item.unit }}
          </view>
        </view>
      </view>
    </view>

    <view class="item">
      <view class="label">建房层数：</view>
      <view class="value-box">
        <input
          type="number"
          class="full-ipt"
          v-model.number="resettleDefault.homesteadResettleLayersCount"
        />
      </view>
    </view>

    <view class="item">
      <view class="label">预估单价：</view>
      <view class="value-box">
        <view class="ipt-wrap middle">
          <input
            type="number"
            class="ipt"
            v-model.number="resettleDefault.homesteadResettlePrice"
          />
          <view class="unit">元/㎡</view>
        </view>
      </view>
    </view>

    <view class="item">
      <view class="label">房屋建安费：</view>
      <view class="value-box">
        <text class="txt red-bold">{{ resettleDefault.homesteadBuildPrice }}</text>
        <text class="txt"> 元</text>
      </view>
    </view>

    <view class="item">
      <view class="label">建房补助费：</view>
      <view class="value-box">
        <text class="txt red-bold">{{ resettleDefault.buildHouseSubsidyPrice }}</text>
        <text class="txt"> 元</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { homesteadAreaSize, resettleArea } from '../config'

const resettleDefault = ref()

// 宅基地面积选择
const homesteadAreaChange = (id: string) => {
  resettleDefault.value.homesteadResettleArea = id
}

// 住宅地块
const homesteadPlaceChange = (id: string) => {
  resettleDefault.value.homesteadResettleRegion = id
}
</script>

<style lang="scss" scoped>
.house-item {
  display: flex;
  width: 100%;
  height: auto;
  padding: 9rpx 12rpx;
  margin-top: 9rpx;
  background: linear-gradient(
    180deg,
    rgba(242, 246, 255, 0.62) 0%,
    rgba(242, 246, 255, 0.62) 16%,
    rgba(242, 246, 255, 0) 100%
  );
  border: 1rpx solid #ebebeb;
  border-radius: 5rpx;
  flex-direction: column;

  .item {
    display: flex;
    height: auto;
    min-height: 23rpx;
    margin-bottom: 12rpx;
    align-items: center;

    .label {
      width: 84rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;

      &.flex-start {
        align-self: flex-start;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.value-box {
  flex: 1;
  font-size: 9rpx;
  color: #171718;

  .red {
    color: #e43030;
  }

  .red-bold {
    font-size: 12rpx;
    font-weight: bold;
    color: #e43030;
  }

  .flex-row {
    display: flex;
    align-items: center;
  }

  .ipt-wrap {
    display: flex;
    align-items: center;
    width: 60rpx;
    height: 23rpx;
    margin-right: 6rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 2rpx;

    .ipt {
      flex: 1;
      height: 23rpx;
      padding: 0 4rpx;
    }

    .unit {
      display: flex;
      height: 100%;
      padding: 0 6rpx;
      font-size: 9rpx;
      color: #171718;
      background: #f5f7fa;
      border-left: 1rpx solid #ebebeb;
      align-items: center;
      justify-content: center;
    }

    &.middle {
      width: 150rpx;
    }
  }

  .area-item {
    display: flex;
    width: 107rpx;
    height: 33rpx;
    margin-right: 14rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
    background: #fff;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    align-items: center;
    justify-content: center;

    .icon {
      margin-right: 6rpx;
    }

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #3e73ec;
      background: #f2f6ff;
      border: 1px solid #3e73ec;
    }
  }

  .check-item {
    display: inline-flex;
    height: 23rpx;
    padding: 0 14rpx;
    margin-right: 14rpx;
    font-size: 9rpx;
    color: #171718;
    background: #ffffff;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    align-items: center;
    justify-content: center;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #3e73ec;
      background: #f2f6ff;
      border: 1rpx solid #3e73ec;
    }
  }

  .full-ipt {
    height: 23rpx;
    padding: 0 4rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 2rpx;
  }

  .desc {
    font-size: 8rpx;
    color: #171718;
  }

  .check-item-box {
    display: flex;
    flex-direction: column;

    .area-check-item {
      display: flex;
      height: 33rpx;
      padding: 0 9rpx;
      margin-bottom: 7rpx;
      border: 1rpx solid #ebebeb;
      border-radius: 2rpx;
      align-items: center;
      justify-content: space-between;

      .item-lt {
        display: flex;
        align-items: center;

        .area-num {
          width: 30rpx;
        }

        .ipt {
          width: 48rpx;
          height: 20rpx;
          padding: 0 4rpx;
          margin: 0 5rpx;
          background: #ffffff;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;
        }
      }

      .item-rt {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 40rpx;
        height: 100%;

        .check-box {
          display: flex;
          width: 12rpx;
          height: 12rpx;
          background: #ffffff;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;
          align-items: center;
          justify-content: center;
        }
      }

      &.active {
        .check-box {
          background: #3e73ec;
          border: 1rpx solid #2f6eff;
        }
      }
    }
  }
}
</style>
