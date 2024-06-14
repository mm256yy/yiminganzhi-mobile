<template>
  <view class="tabs-cont">
    <view class="tab-cont-item">
      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text class="txt">A地块基本信息</text>
      </view>

      <view class="base-info">
        <view class="base-column">
          <view class="info-item">
            <view class="label"><text class="txt">小区名称：</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.residential?.trim() }}</text></view
            >
          </view>
          <view class="info-item">
            <view class="label"><text class="txt">结构类型：</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.structure?.trim() }}</text></view
            >
          </view>
          <view class="info-item">
            <view class="label"><text class="txt">用地面积(㎡)：</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.landSpace?.trim() }}</text></view
            >
          </view>
          <view class="info-item">
            <view class="label"><text class="txt">地理位置：</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.address?.trim() }}</text></view
            >
          </view>
          <view class="info-item">
            <view class="label"><text class="txt">安置点类型:</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.type == 1 ? '宅基地' : '公寓房' }}</text></view
            >
          </view>
        </view>

        <view class="base-column">
          <view class="info-item">
            <view class="label"><text class="txt">绿化率：</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.greeningRate?.trim() }}</text></view
            >
          </view>
          <view class="info-item">
            <view class="label"><text class="txt">建筑密度：</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.buildingDensity?.trim() }}</text></view
            >
          </view>
          <view class="info-item">
            <view class="label"><text class="txt">建筑面积（㎡）：</text></view>
            <view class="value"
              ><text class="txt">{{ props.item?.floorSpace?.trim() }}</text></view
            >
          </view>
        </view>
      </view>

      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text class="txt">周边配套</text>
      </view>

      <view class="periphery">
        <view class="periphery-item">
          <view class="label"><text class="txt">交通：</text></view>
          <view class="value"
            ><text class="txt">{{ props.item?.traffic?.trim() }}</text></view
          >
        </view>

        <view class="periphery-item">
          <view class="label"><text class="txt">商业：</text></view>
          <view class="value"
            ><text class="txt">{{ props.item?.business?.trim() }}</text></view
          >
        </view>

        <view class="periphery-item">
          <view class="label"><text class="txt">教育：</text></view>
          <view class="value"
            ><text class="txt">{{ props.item?.education?.trim() }}</text></view
          >
        </view>

        <view class="periphery-item">
          <view class="label"><text class="txt">医院：</text></view>
          <view class="value"
            ><text class="txt">{{ props.item?.hospital?.trim() }}</text></view
          >
        </view>
      </view>

      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text class="txt">地图</text>
      </view>

      <view class="map-cont">
        <map class="map" :longitude="props.item?.longitude" :latitude="props.item?.latitude"></map>
      </view>

      <view class="common-head" v-if="props.item?.type != 1">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text class="txt">户型图</text>
      </view>

      <view class="house-pic" v-if="props.item?.type != 1">
        <view class="house-info">
          <view class="house-info-item">
            <view class="tit"><text class="txt">4室2厅</text></view>
            <view class="txt"><text class="txt">底层(共24层）</text></view>
          </view>

          <view class="house-info-item">
            <view class="tit"><text class="txt">65㎡</text></view>
            <view class="txt"><text class="txt">精装修</text></view>
          </view>

          <view class="house-info-item">
            <view class="tit"><text class="txt">南北朝向</text></view>
            <view class="txt"><text class="txt">2023年竣工</text></view>
          </view>
        </view>

        <view class="pic-img-box">
          <image class="pic-img" src="@/static/images/resettle_house_pic.png" mode="scaleToFill" />
        </view>
      </view>
      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text class="txt">规划图</text>
      </view>
      <view style="display: flex">
        <view v-for="e in props.item?.pic" :key="e.name" style="flex: 1">
          <image :src="e.url" alt="" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { LocationType } from '@/types/datafill'
import { computed } from 'vue'

interface PropsType {
  item: LocationType
}

const props = defineProps<PropsType>()
</script>

<style lang="scss" scoped>
.tabs-cont {
  display: flex;
  flex-direction: column;
}

.base-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .base-column {
    flex: 0.5;
    display: flex;
    flex-direction: column;

    .info-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 13rpx;
      margin-bottom: 6rpx;

      .label {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 75rpx;

        .txt {
          font-size: 9rpx;
          color: rgba(19, 19, 19, 0.4);
        }
      }

      .value {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 175rpx;

        .txt {
          font-size: 9rpx;
          color: #171718;
        }
      }
    }
  }
}

.periphery {
  display: flex;
  flex-direction: column;

  .periphery-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 13rpx;
    margin-bottom: 6rpx;

    .label {
      display: flex;
      flex-direction: row;
      width: 28rpx;

      .txt {
        font-size: 9rpx;
        color: rgba(19, 19, 19, 0.4);
      }
    }

    .value {
      flex: 1;
      display: flex;
      flex-direction: row;

      .txt {
        font-size: 9rpx;
        color: #171718;
      }
    }
  }
}

.map-cont {
  display: flex;
  flex-direction: column;
  width: 492rpx;
  height: 112rpx;

  .map {
    width: 492rpx;
    height: 112rpx;
  }
}

.house-pic {
  display: flex;
  flex-direction: column;

  .house-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .house-info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 145rpx;
      height: 30rpx;
      margin-right: 12rpx;

      .tit {
        font-size: 11rpx;
        font-weight: bold;
        color: #171718;
      }

      .txt {
        margin-top: 2rpx;
        font-size: 9rpx;
        color: rgba(19, 19, 19, 0.4);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .pic-img-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .pic-img {
      width: 206rpx;
      height: 206rpx;
    }
  }
}

.common-head {
  display: flex;
  flex-direction: row;
  height: 28rpx;
  margin-top: 9rpx;
  background: #ffffff;
  border-radius: 5rpx 5rpx 0px 0px;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 10rpx;
    height: 10rpx;
    margin-right: 6rpx;
  }

  .txt {
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
  }
}
</style>
