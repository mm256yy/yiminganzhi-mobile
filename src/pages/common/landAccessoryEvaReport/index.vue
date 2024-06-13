<template>
  <!-- 土地/附着物评估报告（实施） -->
  <view class="base-info-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      土地/附着物评估报告
    </view>
    <view class="land-title"> 镜岭水库青苗评估汇总表 </view>
    <view class="land-txt" v-if="baseInfo.type == 'PeasantHousehold'">
      {{ baseInfo.villageCodeText }}，户主名称{{ baseInfo.name }}，户号{{
        baseInfo.showDoorNo
      }}，属坝址周边村移民，青苗评估共有{{ baseInfo.assetAppendantReportDto.landNum }}个地块，面积{{
        baseInfo.assetAppendantReportDto.landArea
      }}㎡，株数{{ baseInfo.assetAppendantReportDto.znum }}株，金额{{
        baseInfo.assetAppendantReportDto.amount
      }}元。
    </view>
    <view class="land-txt" v-else>
      {{
        baseInfo.type == 'Company'
          ? '企事业单位名称'
          : baseInfo.type == 'IndividualHousehold'
          ? '个体工商户名称'
          : baseInfo.type == 'PeasantHousehold'
          ? '户主姓名'
          : baseInfo.type == 'Village'
          ? '村集体名称'
          : '户主名称'
      }}{{ baseInfo.name }}，
      {{
        baseInfo.type == 'Company'
          ? '企业编号'
          : baseInfo.type == 'IndividualHousehold'
          ? '个体工商户编号'
          : baseInfo.type == 'PeasantHousehold'
          ? '户主姓名'
          : baseInfo.type == 'Village'
          ? '村集体编号'
          : '户主名称'
      }}{{ baseInfo.showDoorNo }}，属坝址周边村移民，青苗评估共有{{
        baseInfo.assetAppendantReportDto.landNum
      }}个地块，面积{{ baseInfo.assetAppendantReportDto.landArea }}㎡，株数{{
        baseInfo.assetAppendantReportDto.znum
      }}株，金额{{ baseInfo.assetAppendantReportDto.amount }}元。
    </view>
    <view class="land-txt">详见地块明细如下：</view>
    <view class="table-wrap">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="28rpx" align="center">序号</uni-th>
          <uni-th width="50rpx" align="center">{{
            baseInfo.type == 'Company'
              ? '个体工商户名称'
              : baseInfo.type == 'IndividualHousehold'
              ? '个体工商户名称'
              : baseInfo.type == 'PeasantHousehold'
              ? '户主名称'
              : baseInfo.type == 'Village'
              ? '村集体名称'
              : '户'
          }}</uni-th>
          <uni-th width="40rpx">图幅号</uni-th>
          <uni-th width="40rpx">编号</uni-th>
          <uni-th width="40rpx">地名</uni-th>
          <uni-th width="50rpx">青苗户主</uni-th>
          <uni-th width="40rpx">品种</uni-th>
          <uni-th width="40rpx">面积（㎡）</uni-th>
          <uni-th width="40rpx">株数</uni-th>
          <uni-th width="40rpx">金额（元）</uni-th>
          <uni-th width="40rpx">备注</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in baseInfo.assetAppendantReportDto.appendList" :key="index">
          <uni-td>{{ index + 1 }}</uni-td>
          <uni-td>{{ item.name }}</uni-td>
          <uni-td>{{ item.sheetNumber }}</uni-td>
          <uni-td>{{ item.landNumber }}</uni-td>
          <uni-td>{{ item.landName }}</uni-td>
          <uni-td>{{ item.householder }}</uni-td>
          <uni-td>{{ item.breed }}</uni-td>
          <uni-td>{{ item.area }}</uni-td>
          <uni-td>{{ item.number }}</uni-td>
          <uni-td>{{ item.valuationAmount }}</uni-td>
          <uni-td>{{ item.remark }}</uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface PropsType {
  dataInfo: any
  baseInfo: any
}

const props = defineProps<PropsType>()
const landEstimatePicStr = ref<string>('[]') // 土地/附着物评估报告照片

watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      const { landEstimatePic } = val
      if (landEstimatePic) {
        landEstimatePicStr.value = landEstimatePic
      }
    }
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

  .land-title {
    text-align: center;
    display: block;
    color: #333;
    font-size: 600;
    font-size: 12rpx;
    line-height: 12rpx;
  }

  .land-txt {
    display: block;
    color: #666;
    font-size: 600;
    font-size: 8rpx;
    line-height: 14rpx;
    height: 14rpx;
  }
}
</style>
