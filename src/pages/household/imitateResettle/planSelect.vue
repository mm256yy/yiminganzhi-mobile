<template>
  <view class="plan-wrap">
    <view class="desc-header">
      <view class="title">方案比选</view>
      <image
        class="close"
        @click="close"
        src="@/static/images/resettle_close.png"
        mode="scaleToFill"
      />
    </view>

    <view class="content">
      <div class="table">
        <table>
          <!-- 第一行 -->
          <tr>
            <!-- rowspan行高： 2  colspan列高： 2 -->
            <td rowspan="2" colspan="2">项目</td>

            <td colspan="2">{{ '2021' }}</td>
            <td colspan="2">{{ '2022' }}</td>
            <td colspan="2">{{ '2023' }}</td>
          </tr>

          <!-- 第二行 -->
          <tr>
            <td>指标值</td>
            <td>同比</td>
            <td>指标值</td>
            <td>同比</td>
            <td>指标值</td>
            <td>同比</td>
          </tr>

          <!-- 第三行 -->
          <tr>
            <td rowspan="5">公司历年情况</td>
            <td>营业金额（万元）</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
          </tr>

          <!-- 第四行 -->
          <tr>
            <td>营业税额（万元）</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
          </tr>
          <!-- 第五行 -->
          <tr>
            <td>营业数量（张）</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
          </tr>
          <!-- 第六行 -->
          <tr>
            <td>供应商数量（个）</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
          </tr>
          <!-- 第七行 -->
          <tr>
            <td>供应商稳定性（%）</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
            <td>{{ 'Num' }}</td>
            <td>{{ 'Yoy' }}</td>
          </tr>
        </table>
      </div>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.plan-wrap {
  width: 527rpx;
  height: 320rpx;
  padding-bottom: 20rpx;
  overflow-y: scroll;
  background-color: #fff;
  border-radius: 7rpx;

  .desc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32rpx;
    padding: 0 12rpx;
    border-bottom: 1rpx solid #f0f0f0;

    .title {
      font-size: 12rpx;
      font-weight: bold;
      color: #171718;
    }

    .close {
      width: 14rpx;
      height: 14rpx;
    }
  }

  .table-wrap {
    width: 527rpx;
  }
}
</style>

<style scoped>
.content {
  display: flex;

  flex-direction: column;
}

.table {

  width: calc(100vw - 20rpx);
  margin: 0px 10rpx;

  text-align: center;

  background-color: white;
}

.table table {

  /* 用于表格属性, 表示表格的两边框合并为一条 */

  border-collapse: collapse;
  border-right: 1rpx solid #000;

  border-bottom: 1rpx solid #000;

  /* 设置边缘间距0 */

  border-spacing: 0;
}

.table table td {

  font-size: 12rpx;

  font-weight: bold;

  text-align: center;

  border-top: 1rpx solid #000;

  border-right: 1rpx solid #000;
  border-left: 1rpx solid #000;
}

.table table tr td {
  width: 50rpx;
}

.cloumn-table {
  display: flex;
  flex-direction: row;
}

.cloumn-tr {
  display: flex;
  flex-direction: column;
}
</style>
