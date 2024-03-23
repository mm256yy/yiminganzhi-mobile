<template>
  <view class="household-wrapper">
    <view class="household-title"> 附属物报告 </view>
    <view class="household-txt">吕发林户房屋出具评估报告结果如下</view>
    <view class="household-txt">一、房屋情况</view>
    <view class="table-wrap">
      <table>
        <!-- 第一行 -->
        <tr class="head-tr">
          <td class="column-w1 bold" v-for="(item, index) in headList" :key="index">
            <text>{{ item }} </text>
          </td>
        </tr>

        <!-- <tr>
          <td rowspan="4" class="column-w1 bold">套数</td>
          <td class="column-w2">70</td>
          <td class="column-w3" v-for="item in tableData" :key="item.id">
            {{ item.typeOneNum }}
          </td>
        </tr> -->
      </table>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const headList = [
  '户主',
  '房屋坐落',
  '房屋结构',
  '建筑面积(㎡)',
  '占地面积(㎡)',
  '房屋重置价值(元)',
  '装修价值(元)',
  '附属物价值(元)',
  '总价值(元)',
  '备注'
]
</script>

<style lang="scss" scoped>
.household-wrapper {
  padding: 12rpx;
  display: flex;
  flex-direction: column;

  .household-title {
    // text-align: center;
    display: block;
    color: #333;
    font-size: 600;
    font-size: 14rpx;
    line-height: 12rpx;
  }

  .household-txt {
    display: block;
    color: #666;
    font-size: 600;
    font-size: 8rpx;
    line-height: 10rpx;
  }

  .table-wrap {
    display: block;
    table {
      /* 用于表格属性, 表示表格的两边框合并为一条 */
      border-collapse: collapse;
      border-right: 1rpx solid #ebebeb;
      border-bottom: 1rpx solid #ebebeb;
      /* 设置边缘间距0 */
      border-spacing: 0;
    }

    tr td {
      height: 28rpx;
      font-size: 8rpx;
      color: #171718;
      text-align: center;
      border-top: 1rpx solid #ebebeb;
      border-right: 1rpx solid #ebebeb;
      border-left: 1rpx solid #ebebeb;
    }

    .column-w1 {
      width: 59rpx;
      background: #f6f6f6;
    }

    .column-w2 {
      width: 69rpx;
    }

    .column-w3 {
      width: 88rpx;
    }
  }
}
</style>
