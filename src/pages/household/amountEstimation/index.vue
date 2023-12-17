<template>
  <Container title="金额估算">
    <view class="amount-table-wrap">
      <view class="amount-title">{{ tableTitle }}</view>
      <table v-if="tableType === '1'" style=" height: 300rpx;overflow: auto">
        <!-- 第一行 -->
        <tr class="head-tr">
          <td class="column-w1 bold">类别</td>
          <td class="column-w1 bold">项目</td>
          <td class="column-w1 bold">单位</td>
          <td class="column-w1 bold">数量</td>
          <td class="column-w1 bold">单价</td>
          <td class="column-w1 bold">金额</td>
        </tr>

        <tr>
          <td rowspan="3" class="column-w1 bold">补偿费</td>
          <td class="column-w2">房屋补偿补助款</td>
          <td class="column-w2">平方米</td>
          <td class="column-w2"></td>
          <td class="column-w2"></td>
          <td class="column-w2">112756</td>
        </tr>

        <tr>
          <td class="column-w2">地面青苗附着物补助款</td>
          <td class="column-w2">平方米</td>
          <td class="column-w2"></td>
          <td class="column-w2"></td>
          <td class="column-w2">4568.9</td>
        </tr>

        <tr>
          <td class="column-w2">宅基地补偿款（超面积）</td>
          <td class="column-w2">平方米</td>
          <td class="column-w2">42.41</td>
          <td class="column-w2">150</td>
          <td class="column-w2">3316.5</td>
        </tr>

        <tr>
          <td rowspan="3" class="column-w1 bold">补助费</td>
          <td class="column-w2">建房补助费</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">3500</td>
          <td class="column-w2">10500</td>
        </tr>

        <tr>
          <td class="column-w2">搬迁补助费</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">3700</td>
          <td class="column-w2">11100</td>
        </tr>
        <tr>
          <td class="column-w2">过渡期生产生活补助款</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">4800</td>
          <td class="column-w2">14400</td>
        </tr>

        <tr>
          <td rowspan="5" class="column-w1 bold">奖励费</td>
          <td class="column-w2">签订动迁安置协议奖励</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">3500</td>
          <td class="column-w2">10500</td>
        </tr>

        <tr>
          <td class="column-w2">房屋腾空奖励</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">3500</td>
          <td class="column-w2">10500</td>
        </tr>
        <tr>
          <td class="column-w2">启动建房奖励</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">3500</td>
          <td class="column-w2">10500</td>
        </tr>
        <tr>
          <td class="column-w2">完成建房奖励</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">3500</td>
          <td class="column-w2">10500</td>
        </tr>
        <tr>
          <td class="column-w2">搬迁入驻奖励</td>
          <td class="column-w2">人</td>
          <td class="column-w2">3</td>
          <td class="column-w2">3500</td>
          <td class="column-w2">10500</td>
        </tr>
        <tr>
          <td rowspan="3" class="column-w1 bold">合计</td>
          <td class="column-w2"></td>
          <td class="column-w2"></td>
          <td class="column-w2"></td>
          <td class="column-w2"></td>
          <td class="column-w2">2490000</td>
        </tr>
      </table>

      <table v-else>
        <tr class="head-tr">
          <td rowspan="2" class="column-w1 bold">排序</td>
          <td rowspan="2" class="column-w1 bold">户型</td>
          <td rowspan="2" class="column-w1 bold">数量</td>
          <td colspan="3" class="column-w1 bold">综合成本价部分 </td>
          <td colspan="3" class="column-w1 bold">市场优惠价部分</td>
          <td class="column-w1 bold">合计</td>
        </tr>
        <tr>
          <td class="column-w2">面积</td>
          <td class="column-w2">单价</td>
          <td class="column-w2">金额</td>
          <td class="column-w2">面积</td>
          <td class="column-w2">单价</td>
          <td class="column-w2">金额</td>
          <td class="column-w2"></td>
        </tr>
        <tr>
          <td class="column-w2">1</td>
          <td class="column-w2">70</td>
          <td class="column-w2">1</td>
          <td class="column-w2">70</td>
          <td class="column-w2">1580</td>
          <td class="column-w2"></td>
          <td class="column-w2">0</td>
          <td class="column-w2">2893</td>
          <td class="column-w2"></td>
          <td class="column-w2"></td>
        </tr>
        <tr>
          <td class="column-w2">2</td>
          <td class="column-w2">90</td>
          <td class="column-w2">1</td>
          <td class="column-w2">80</td>
          <td class="column-w2">1580</td>
          <td class="column-w2"></td>
          <td class="column-w2">10</td>
          <td class="column-w2">2893</td>
          <td class="column-w2">28930</td>
          <td class="column-w2"></td>
        </tr>
        <tr>
          <td class="column-w2">合计</td>
          <td class="column-w2">160</td>
          <td class="column-w2">2</td>
          <td class="column-w2">160</td>
          <td class="column-w2">1580</td>
          <td class="column-w2"></td>
          <td class="column-w2">10</td>
          <td class="column-w2">2893</td>
          <td class="column-w2">28930</td>
          <td class="column-w2"></td>
        </tr>
      </table>
    </view>
  </Container>
</template>

<script lang="ts" setup>
import Container from '@/components/Container/index.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
// 表格类型
const tableType = ref<string>('1')

const tableTitle = computed(() => {
  return tableType.value === '1' ? '补偿补助金额估算' : '购房金额估算'
})

onLoad((option) => {
  if (option) {
    const { type } = option
    tableType.value = type
  }
})
</script>

<style lang="scss" scoped>
.amount-table-wrap {
  padding: 8rpx;
  overflow-y: auto;
  background: #fff;

  .amount-title {
    padding: 10rpx;
    font-size: 12rpx;
  }

  table {
    width: 100%;
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

  .bold {
    font-weight: 500;
  }

  .blue {
    color: #3e73ec;
  }
}
</style>
