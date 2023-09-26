<template>
  <view class="confirm-reward">
    <Back title="奖励费确认" needConfirm />
    <uni-row class="u-table">
      <uni-table border stripe emptyText="暂无更多数据">
        <!-- 表头行 -->
        <uni-tr>
          <uni-th align="left" width="40rpx" class="u-title">指标名称</uni-th>
          <uni-th align="left" width="60rpx" class="u-title">单位</uni-th>
          <uni-th align="left" width="70rpx" class="u-title">数量</uni-th>
          <uni-th align="left" width="50rpx" class="u-title">补偿单价</uni-th>
          <uni-th align="left" width="140rpx" class="u-title">补偿金额</uni-th>
          <uni-th align="left" width="80rpx" class="u-title">备注</uni-th>
          <uni-th align="left" width="80rpx" class="u-title">操作</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr v-for="(item, index) in dataList" :key="index">
          <uni-td align="left" class="u-td">{{ item.name }}</uni-td>
          <uni-td align="left" class="u-td">{{ formatDict(item.unit, 268) }}</uni-td>
          <uni-td align="left" class="u-td">{{ formatStr(item.number) }}</uni-td>
          <uni-td align="left" class="u-td">
            <input
              v-if="item.isUpdate === '1' && item.isVerify !== '1'"
              class="input-txt"
              v-model="item.price"
              placeholder="请输入"
            />
            <view v-if="item.isUpdate === '1' && item.isVerify === '1'">{{ item.price }}</view>
            <view v-if="item.isUpdate !== '1'"> - </view>
          </uni-td>
          <uni-td align="left" class="u-td">
            <view v-if="item.isUpdate === '0'">{{ item.totalPrice }}</view>
            <view v-else-if="item.isUpdate === '1'">{{ computedTotalPrice(item) }}</view>
            <view v-else-if="item.isUpdate === '2'"> {{ getSummaries(item) }} </view>
          </uni-td>
          <uni-td align="left" class="u-td">
            <input
              v-if="item.isUpdate === '1' && item.isVerify !== '1'"
              class="input-txt"
              v-model="item.remark"
              placeholder="请输入"
            />
            <view v-if="item.isUpdate === '1' && item.isVerify === '1'">{{ item.remark }}</view>
          </uni-td>
          <uni-td align="left" class="u-td">
            <view
              v-if="item.isVerify !== '1' && item.unit"
              class="mini-btn m-r-5"
              type="primary"
              size="mini"
              @click="onSave(item, '0')"
              >保存</view
            >
            <view
              v-if="item.isVerify !== '1' && item.unit"
              type="mini-btn primary"
              size="mini"
              @click="onSave(item, '1')"
              >确认</view
            >
          </uni-td>
        </uni-tr>
      </uni-table>
    </uni-row>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { formatStr, formatDict } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { updateImpLandlordCompensationCardApi, getCompensationCardConfigApi } from '@/service'
import Back from '@/components/Back/Index.vue'

const dataList = ref<any[]>([])
const commonParams = ref<any>({})

onLoad((option) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
  }
  getCompensationCardConfig()
})

// 获取移民建卡奖励费列表
const getCompensationCardConfig = () => {
  getCompensationCardConfigApi().then((res: any) => {
    if (res && res.length) {
      dataList.value = res.filter((item: any) => item.type === '3')
    }
  })
}

/**
 * 计算补偿金额
 * 补偿金额 = 数量 * 单价
 * @param row 当前行数据
 */
const computedTotalPrice = (row: any) => {
  if (row.totalPrice) {
    return Number(row.totalPrice)
  } else {
    if (row.number && row.price) {
      return Number(row.number) * Number(row.price)
    } else {
      return 0
    }
  }
}

/**
 * 获取奖励小计
 * @param row 当前行信息
 */
const getSummaries = (row: any) => {
  let sums = 0
  let sumIndex = 0
  dataList.value.forEach((column, index) => {
    if (column.name === row.name) {
      sumIndex = index
    }
  })
  const arr = dataList.value.filter((item, index) => item && index !== sumIndex)
  sums = arr.reduce((totalPrice, currentItem) => {
    return totalPrice + computedTotalPrice(currentItem)
  }, 0)
  return sums
}

/**
 * 保存/确认
 * @param data 当前行数据
 */
const onSave = (data: any, isVerify: string) => {
  const { doorNo, uid } = commonParams.value
  let params = {
    ...data,
    doorNo,
    isVerify
  }
  updateImpLandlordCompensationCardApi(uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        getCompensationCardConfig()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}
</script>

<style lang="scss" scoped>
.confirm-reward {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .u-table {
    height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
    padding: 9rpx;
    overflow-y: scroll;
    font-size: 9rpx;
    background-color: #fff;
    box-sizing: border-box;

    .u-title {
      font-size: 9rpx;
      font-weight: 400;
      color: #737374;
    }

    .u-td {
      font-size: 9rpx;
      font-weight: 400;
      color: #171718;

      .input-txt {
        height: 19rpx;
        font-size: 9rpx;
        color: 171718;
      }

      .mini-btn {
        display: flex;
        width: 35rpx;
        height: 19rpx;
        font-size: 9rpx;
        color: #fff;
        background-color: #3e73ec;
        border-radius: 2rpx;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
