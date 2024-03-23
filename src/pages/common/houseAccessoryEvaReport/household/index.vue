<template>
  <view class="household-wrapper">
    <view class="household-title"> 房屋估价报告 </view>
    <view class="household-txt">吕发林户房屋出具评估报告结果如下</view>
    <view class="household-txt">一、房屋情况</view>
    <view class="table-wrap">
      <table>
        <tr class="head-tr">
          <td class="column-w1 bold" v-for="(item, index) in headList" :key="index">
            <text>{{ item }} </text>
          </td>
        </tr>
        <tr>
          <td rowspan="3">吕发林</td>
          <td rowspan="3">里镜屏村</td>
          <td>泥木</td>
          <td>78.17</td>
          <td>39.08</td>
          <td>36800</td>
          <td rowspan="3">9519</td>
          <td rowspan="3">2938</td>
          <td rowspan="3">76727</td>
          <td></td>
        </tr>
        <tr>
          <td>砖混</td>
          <td>78.17</td>
          <td>39.08</td>
          <td>36800</td>
          <td></td>
        </tr>
        <tr>
          <td>砖木</td>
          <td>78.17</td>
          <td>39.08</td>
          <td>36800</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="3">合计</td>
          <td>118.99</td>
          <td>72.76</td>
          <td>60700</td>
          <td>9519</td>
          <td>2938</td>
          <td>76727</td>
          <td></td>
        </tr>
      </table>
    </view>
    <view>
      <view class="household-txt">二、估价依据</view>
      <view class="household-txt">1、《新昌县镜岭水库工程移民安置办法》</view>
      <view class="household-txt">2、《新吕县镜岭水库工程拆迁房屋重置价补偿标准》</view>
      <view class="household-txt"
        >3、浙江镜岭水库有限公司提供的有关资料《包括委估标的的产权、用途及面积》</view
      >
      <view class="household-txt">4、估价人员调查、收集的资料</view>
    </view>
    <view>
      <view class="household-txt">三、估价目的:</view>
      <view class="household-txt">为确定搬迁房屋补偿金额而评估其房产重置价格</view>
    </view>
    <view>
      <view class="household-txt">四、估价结果:</view>
      <view class="household-txt"
        >在分析现有资料的基础上，经过实地查勘，对房产价值影响因素的综合分析，确定房屋重置补偿:总金额为人民币：
        73157 (元)</view
      >
      <view class="household-txt">大写人民币： 柒万叁仟壹佰伍拾柒元整</view>
      <view class="household-txt"
        >其中：房屋价9519 (元) 装修价值：9519 (元) 附属物价值2938 (元)</view
      >
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

const tableList = [
  {
    name: '吕发林',
    villageName: '里镜屏村'
  },
  {
    name: '张三',
    villageName: '下潘村'
  }
]
</script>

<style lang="scss" scoped>
.household-wrapper {
  padding: 12rpx;
  display: flex;
  flex-direction: column;

  .household-title {
    text-align: center;
    display: block;
    color: #333;
    font-size: 12rpx;
    font-weight: 600;
    line-height: 18rpx;
  }

  .household-txt {
    display: block;
    color: #666;
    font-size: 8rpx;
    line-height: 16rpx;
    height: 16rpx;
  }

  .table-wrap {
    overflow: auto;
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
      width: 60rpx;
      background: #f6f6f6;
    }

    .column-w2 {
      width: 60rpx;
    }

    .column-w3 {
      width: 88rpx;
    }
  }
}
</style>
