<template>
  <view class="print-wrapper">
    <view class="title">选房确认单</view>
    <view class="row"> <input type="text" class="txt" /> 人民政府： </view>
    <view class="row text-indent-18"> 我户已选择公寓房的安置方式，现对如下选房信息予以确认： </view>
    <view class="row text-indent-18">
      择房号：<input type="text" class="txt" /> 户主(择房人)：<input type="text" class="txt" />
    </view>
    <view class="row text-indent-18"> 户号：<input type="text" class="txt w-300" /> </view>
    <view class="row text-indent-18"> 迁出地址：<input type="text" class="txt w-300" /> </view>

    <uni-table class="table" border stripe emptyText="暂无更多数据">
      <!-- 表头行 -->
      <uni-tr>
        <uni-th align="left" width="40rpx" class="uTitle">序号</uni-th>
        <uni-th align="left" width="100rpx" class="uTitle">区块</uni-th>
        <uni-th align="left" width="70rpx" class="uTitle">房型</uni-th>
        <uni-th align="left" width="50rpx" class="uTitle">幢号</uni-th>
        <uni-th align="left" width="100rpx" class="uTitle">室号</uni-th>
        <uni-th align="left" width="80rpx" class="uTitle">储装宅编号</uni-th>
        <uni-th align="left" width="80rpx" class="uTitle">车库编号</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="item in dataList" :key="item.index">
        <uni-td align="left" class="uTd">{{ item.index }}</uni-td>
        <uni-td align="left" class="uTd">{{ item.block }}</uni-td>
        <uni-td align="left" class="uTd">{{ item.houseType }}</uni-td>
        <uni-td align="left" class="uTd">{{ item.buildNo }}</uni-td>
        <uni-td align="left" class="uTd">{{ item.roomNo }}</uni-td>
        <uni-td align="left" class="uTd">{{ item.storageNum }}</uni-td>
        <uni-td align="left" class="uTd">{{ item.carNum }}</uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const dataList = ref([
  {
    index: 1,
    block: '曙光安置区',
    houseType: '120㎡',
    buildNo: 1,
    roomNo: 10,
    storageNum: 'CZZ1122',
    carNum: '浙A.A12122'
  },
  {
    index: 2,
    block: '曙光安置区',
    houseType: '120㎡',
    buildNo: 2,
    roomNo: 11,
    storageNum: 'CZZ1122',
    carNum: '浙A.A12132'
  },
  {
    index: 3,
    block: '曙光安置区',
    houseType: '120㎡',
    buildNo: 3,
    roomNo: 12,
    storageNum: 'CZZ1122',
    carNum: '浙A.A12142'
  }
])
</script>
<style lang="scss" scoped>
.print-wrapper {
  border: 1px solid #ebebeb;

  .title {
    display: flex;
    height: 33rpx;
    font-size: 11rpx;
    color: #171718;
    background: #fafafa;
    border: 1rpx solid #ebebeb;
    align-items: center;
    justify-content: center;
  }

  .row {
    display: flex;
    padding: 6rpx;
    margin-bottom: 12rpx;
    font-size: 9rpx;
    color: #171718;
    text-align: justify;
    word-break: break-all;
    align-items: center;
    flex-wrap: wrap;

    &.text-indent-18 {
      text-indent: 18rpx;
    }

    .txt {
      border-bottom: 1rpx solid #333;

      &.w-300 {
        width: 300rpx;
      }
    }
  }

  .table {
    font-size: 10rpx;

    .uTitle {
      font-size: 9rpx;
      font-weight: 400;
      color: #737374;
    }

    .uTd {
      font-size: 9rpx;
      font-weight: 400;
      color: #171718;
    }
  }
}
</style>
