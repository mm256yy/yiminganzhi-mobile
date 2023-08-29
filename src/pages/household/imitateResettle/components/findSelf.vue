<template>
  <view class="house-wrap">
    <view class="house-box">
      <view class="table-wrap">
        <table>
          <!-- 第一行 -->
          <tr class="head-tr">
            <td class="column-w1">类别</td>
            <td class="column-w2">项目</td>
            <td class="column-w3">单位</td>
            <td class="column-w4">数量</td>
            <td class="column-w5">单价</td>
            <td class="column-w6">金额</td>
          </tr>

          <tr class="body-tr" v-for="item in contrastPlans" :key="item.id">
            <td class="column-w1" v-if="item.rowspan" :rowspan="item.rowspan">{{ item.title }}</td>
            <td class="column-w2">{{ item.subProject }}</td>
            <td class="column-w3">{{ item.unit }}</td>
            <td class="column-w4">{{ item.number }}</td>
            <td class="column-w5">{{ item.costPrice }}</td>
            <td class="column-w6">{{ item.totalPrice }}</td>
          </tr>
        </table>
      </view>

      <view class="btn-wrap">
        <view class="btn" @click="submitResettle">
          {{ fromResettleConfirm ? '确定' : '确定，进入下一步' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { selfResettleData } from '../config'
import { HouseAreaType } from '@/types/common'

interface PropsType {
  data?: any
  doorNo?: string
  viewType?: 'pup' | 'default'
  immigrantSettle?: any
  fromResettleConfirm?: boolean
}

const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()

// 方案数据
const contrastPlans = ref<any>(selfResettleData)

const submitResettle = async () => {
  const params: any = {
    houseAreaType: HouseAreaType.oneself,
    doorNo: props.doorNo
  }
  if (props.immigrantSettle && props.immigrantSettle.uid) {
    params.uid = props.immigrantSettle.uid
  }
  emit('submit', params)
}

const getRowSpan = (item: any, index: number) => {
  if (index !== 0 && item.type === contrastPlans.value[index + 1].type) {
    return 0
  }
  let rowspan = 1
  let dex = index + 1
  while (dex < contrastPlans.value.length) {
    if (item.type === contrastPlans.value[dex].type) {
      rowspan++
      dex++
    } else {
      break
    }
  }
  return rowspan
}
</script>

<style lang="scss" scoped>
.house-wrap {
  margin-top: 9rpx;
}

.house-box {
  display: flex;
  padding: 9rpx 12rpx;
  background: linear-gradient(
    180deg,
    rgba(242, 246, 255, 0.62) 0%,
    rgba(242, 246, 255, 0.62) 16%,
    rgba(242, 246, 255, 0) 100%
  );
  border: 1rpx solid #ebebeb;
  border-radius: 5rpx;
  flex-direction: column;
}

.table-wrap {
  background-color: #fff;

  table {
    /* 用于表格属性, 表示表格的两边框合并为一条 */
    margin: 9rpx auto;
    border-collapse: collapse;
    border-right: 1rpx solid #ebebeb;
    border-bottom: 1rpx solid #ebebeb;
    /* 设置边缘间距0 */
    border-spacing: 0;
  }

  td {
    height: 28rpx;
    font-size: 8rpx;
    color: #171718;
    text-align: center;
    border-top: 1rpx solid #ebebeb;
    border-right: 1rpx solid #ebebeb;
    border-left: 1rpx solid #ebebeb;

    &.column-w1 {
      width: 90rpx;
    }

    &.column-w2 {
      width: 115rpx;
    }

    &.column-w3 {
      width: 35rpx;
    }

    &.column-w4 {
      width: 60rpx;
    }

    &.column-w5 {
      width: 90rpx;
    }

    &.column-w6 {
      width: 90rpx;
    }
  }

  .head-tr {
    background: #f6f6f6;

    td {
      font-weight: 500;
    }
  }
}

.select-btn {
  display: flex;
  width: 70rpx;
  height: 20rpx;
  margin: 0 auto;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  border: 1rpx solid #ebebeb;
  border-radius: 2rpx;
  align-items: center;
  justify-content: center;

  &.active {
    color: #3e73ec;
    border: 1rpx solid #3e73ec;
  }
}

.text-left {
  padding: 0 25rpx;
  text-align: left !important;
}

.flex-center {
  display: flex;
  width: 84rpx;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.bold {
  font-weight: 500;
}

.red {
  color: #e43030 !important;
}

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15rpx 0 65rpx;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26rpx;
    min-width: 70rpx;
    padding: 0 11px;
    font-size: 11px;
    font-weight: 500;
    color: #ffffff;
    background: #3e73ec;
    border-radius: 2rpx;
  }
}
</style>
