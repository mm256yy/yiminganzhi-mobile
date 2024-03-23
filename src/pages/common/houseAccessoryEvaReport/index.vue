<template>
  <!-- 房屋/附属物评估报告（实施） -->
  <view class="base-info-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      房屋/附属物评估报告
    </view>

    <view class="report-segment">
      <HouseholdItem />
      <view />
    </view>
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

    <!-- <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">资产评估还未完成，无法查看评估报告</view>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// import SwitchTabs from '@/components/SwitchTabs/Index.vue'
import HouseholdItem from './household/index.vue'
// import UploadFile from '@/components/UploadFile/index.vue'

interface PropsType {
  dataInfo: any
}

const props = defineProps<PropsType>()
// const tabList = ['房屋', '附属物']
// const currentIndex = ref<number>(0)
// tab切换
// const handleSelectTabs = (tabItem: any) => {
//   const { index } = tabItem
//   currentIndex.value = index
// }

// watch(
//   () => props.dataInfo,
//   (val) => {
//     if (val) {
//       const { houseEstimatePic } = val
//       if (houseEstimatePic) {
//         houseEstimatePicStr.value = houseEstimatePic
//       }
//     }
//   },
//   { immediate: true, deep: true }
// )

onMounted(() => {
  console.log('HAER::: ', props.dataInfo)
})
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;

  .title {
    display: flex;
    height: 28rpx;
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

  .report-segment {
    padding: 10rpx 10rpx 10rpx 20rpx;
  }
}
</style>
