<template>
  <!-- 房屋/附属物评估报告（实施） -->
  <view class="base-info-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      房屋/附属物评估报告
    </view>
    <print/>
    <!-- <view class="row" v-if="houseEstimatePicStr && houseEstimatePicStr !== '[]'">
      <uni-row class="m-t-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">评估报告：</view>
            <view class="content">
              <upload-file
                v-model="houseEstimatePicStr"
                :file-list="houseEstimatePicStr"
                :limit="20"
                :is-preview="true"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
    </view> -->
    <HouseholdItem :datalist="baseInfo" />
    <!-- <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">资产评估还未完成，无法查看评估报告</view>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { MainType, PrintType } from '@/types/common'
import HouseholdItem from './household/index.vue'
import print from '@/pages/common/houseAccessoryEvaReport/print.vue'
interface PropsType {
  dataInfo: any
  baseInfo: any
}

const props = defineProps<PropsType>()
const houseEstimatePicStr = ref<string>('[]') // 房屋/附属物评估报告照片

watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      const { houseEstimatePic } = val
      if (houseEstimatePic) {
        houseEstimatePicStr.value = houseEstimatePic
      }
    }
  },
  { immediate: true, deep: true }
)
watch(
  () => props.baseInfo,
  (val) => {
    
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;

  .title {
    display: flex;
    height: 28rpx;
    margin-bottom: 9rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    border-bottom: 1rpx solid #f0f0f0;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-left: 6rpx;
    }
  }

  .row {
    padding: 5rpx 12rpx 12rpx 0;
    box-sizing: border-box;

    .col {
      display: flex;
      flex-direction: row;

      .label {
        width: 90rpx;
        height: 16rpx;
        margin-left: 9rpx;
        font-size: 9rpx;
        line-height: 16rpx;
        color: rgba(23, 23, 24, 0.6);
      }

      .content {
        font-size: 9rpx;
        line-height: 16rpx;
        color: #171718;

        &.blue {
          color: #3e73ec;
        }
      }
    }

    .line {
      width: 100%;
      height: 1rpx;
      margin: 9rpx 0;
      background: #ebebeb;
    }
  }

  .null-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
    background-color: #fff;

    .icon {
      width: 152rpx;
      height: 92rpx;
    }

    .tips {
      margin-top: 17rpx;
      font-size: 9rpx;
      line-height: 1;
      color: #171718;
    }
  }
}
</style>
