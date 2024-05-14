<template>
  <view class="base-info-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      设施设备评估报告
    </view>
    <view class="land-title"> 设施及其他资产评估报告 </view>

    <view class="land-txt"> {{ baseInfo.name }}设施设备出具评估报告结果如下： </view>
    <view class="land-txt">一、设施设备情况</view>
    <view class="table-wrap">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="28rpx" align="center">序号</uni-th>
          <uni-th width="50rpx" align="center">项目</uni-th>
          <uni-th width="40rpx">规格</uni-th>
          <uni-th width="40rpx">单位</uni-th>
          <uni-th width="40rpx">数量</uni-th>
          <uni-th width="50rpx">评估单价(元)</uni-th>
          <uni-th width="40rpx">补偿金额(元)</uni-th>
          <uni-th width="40rpx">备注</uni-th>
        </uni-tr>

        <uni-tr
          v-for="(item, index) in baseInfo.facilitiesAndOtherReportDto.immigrantEquipmentList"
          :key="index"
        >
          <uni-td>{{ index + 1 }}</uni-td>
          <uni-td>{{ item.name }}</uni-td>
          <uni-td>{{ item.size }}</uni-td>
          <uni-td>{{ item.unit }}</uni-td>
          <uni-td>{{ item.number }}</uni-td>
          <uni-td>{{ item.price }}</uni-td>
          <uni-td>{{ item.compensationAmount }}</uni-td>
          <uni-td>{{ item.remark }}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>合计</uni-td>
          <uni-td />
          <uni-td />
          <uni-td />
          <uni-td />
          <uni-td>{{
            submit(baseInfo.facilitiesAndOtherReportDto.immigrantEquipmentList, 'price')
          }}</uni-td>
          <uni-td>{{
            submit(
              baseInfo.facilitiesAndOtherReportDto.immigrantEquipmentList,
              'compensationAmount'
            )
          }}</uni-td>
          <uni-td />
        </uni-tr>
      </uni-table>
    </view>
    <view class="land-txt">二、基础设施情况</view>
    <view class="table-wrap">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="28rpx" align="center">序号</uni-th>
          <uni-th width="50rpx" align="center">项目</uni-th>
          <uni-th width="40rpx">规格</uni-th>
          <uni-th width="40rpx">单位</uni-th>
          <uni-th width="40rpx">数量</uni-th>
          <uni-th width="50rpx">评估单价(元)</uni-th>
          <uni-th width="40rpx">补偿金额(元)</uni-th>
          <uni-th width="40rpx">备注</uni-th>
        </uni-tr>

        <uni-tr
          v-for="(item, index) in baseInfo.facilitiesAndOtherReportDto.infrastructureList"
          :key="index"
        >
          <uni-td>{{ index + 1 }}</uni-td>
          <uni-td>{{ item.name }}</uni-td>
          <uni-td>{{ item.size }}</uni-td>
          <uni-td>{{ item.unit }}</uni-td>
          <uni-td>{{ item.number }}</uni-td>
          <uni-td>{{ item.price }}</uni-td>
          <uni-td>{{ item.compensationAmount }}</uni-td>
          <uni-td>{{ item.remark }}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>合计</uni-td>
          <uni-td />
          <uni-td />
          <uni-td />
          <uni-td />
          <uni-td>{{
            submit(baseInfo.facilitiesAndOtherReportDto.infrastructureList, 'price')
          }}</uni-td>
          <uni-td>{{
            submit(baseInfo.facilitiesAndOtherReportDto.infrastructureList, 'compensationAmount')
          }}</uni-td>
          <uni-td />
        </uni-tr>
      </uni-table>
    </view>
    <view class="land-txt">三、其他资产情况</view>
    <view class="table-wrap">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="28rpx" align="center">序号</uni-th>
          <uni-th width="50rpx" align="center">项目</uni-th>
          <uni-th width="40rpx">规格</uni-th>
          <uni-th width="40rpx">单位</uni-th>
          <uni-th width="40rpx">数量</uni-th>
          <uni-th width="50rpx">评估单价(元)</uni-th>
          <uni-th width="40rpx">补偿金额(元)</uni-th>
          <uni-th width="40rpx">备注</uni-th>
        </uni-tr>

        <uni-tr
          v-for="(item, index) in baseInfo.facilitiesAndOtherReportDto.otherList"
          :key="index"
        >
          <uni-td>{{ index + 1 }}</uni-td>
          <uni-td>{{ item.name }}</uni-td>
          <uni-td>{{ item.size }}</uni-td>
          <uni-td>{{ item.unit }}</uni-td>
          <uni-td>{{ item.number }}</uni-td>
          <uni-td>{{ item.price }}</uni-td>
          <uni-td>{{ item.compensationAmount }}</uni-td>
          <uni-td>{{ item.remark }}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>合计</uni-td>
          <uni-td />
          <uni-td />
          <uni-td />
          <uni-td />
          <uni-td>{{ submit(baseInfo.facilitiesAndOtherReportDto.otherList, 'price') }}</uni-td>
          <uni-td>{{
            submit(baseInfo.facilitiesAndOtherReportDto.otherList, 'compensationAmount')
          }}</uni-td>
          <uni-td />
        </uni-tr>
      </uni-table>
    </view>
    <view>
      <view class="household-txt">二、估价依据</view>
      <view class="household-txt">1、《新昌县镜岭水库工程移民安置办法》</view>
      <view class="household-txt">2、《新吕县镜岭水库工程拆迁房屋重置价补偿标准》</view>
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
let submit = (arr: any, e: any) => {
  return arr.reduce((pre: any, item: any) => {
    return pre + item[e]
  }, 0)
}
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
.household-txt {
  display: block;
  color: #666;
  font-size: 8rpx;
  line-height: 16rpx;
  height: 16rpx;
}
</style>
