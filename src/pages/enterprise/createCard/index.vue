<template>
  <view class="migrate-card-wrapper">
    <!-- 居民户实施 —— 企业建卡（移民实施阶段） -->
    <view class="main">
      <view class="row-1">
        <view class="left" />
        <view class="right">
          <view class="btn green">
            <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
            <text class="txt">打印报表</text>
          </view>
          <view class="btn blue" @click="onArchives">
            <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
            档案上传
          </view>
          <!-- <view class="btn blue-btn">
			      <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
			      <text class="txt">问题反馈</text>
			    </view> -->
        </view>
      </view>

      <view class="title-wrap m-t-5">
        <view class="left">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          企业账户信息
        </view>
        <view class="right" @click="toEdit">编辑</view>
      </view>

      <uni-row class="m-b-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁前厂址：</view>
            <view class="content">
              {{ formatStr(dataInfo.name) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">安置厂址：</view>
            <view class="content">
              {{ formatStr(dataInfo.demographicList.length) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">企业总人口数：</view>
            <view class="content">
              {{ formatStr(dataInfo.phone) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">开户名：</view>
            <view class="content">
              {{ formatStr(dataInfo.address) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">开户行：</view>
            <view class="content">
              {{ getSettleAddressText(dataInfo.immigrantSettle?.settleAddress) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">银行账号：</view>
            <view class="content">
              {{ formatStr(dataInfo.bankAccount) }}
            </view>
          </view>
        </uni-col>
      </uni-row>
      <view class="title-wrap m-t-5">
        <view class="left">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          工商、税务登记信息
        </view>
      </view>
      <uni-row class="m-b-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">营业执照编号：</view>
            <view class="content">
              {{ formatStr(dataInfo.name) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">税务登记编号：</view>
            <view class="content">
              {{ formatStr(dataInfo.demographicList.length) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">注册资金（万元）：</view>
            <view class="content">
              {{ formatStr(dataInfo.phone) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">登记注册类型：</view>
            <view class="content">
              {{ formatStr(dataInfo.address) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">成立日期：</view>
            <view class="content">
              {{ getSettleAddressText(dataInfo.immigrantSettle?.settleAddress) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">经营范围：</view>
            <view class="content">
              {{ formatStr(dataInfo.bankAccount) }}
            </view>
          </view>
        </uni-col>
      </uni-row>
      <view class="title-wrap m-t-5">
        <view class="left">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          费用补偿情况
        </view>
        <view class="right confirm" @click="toConfirmReward">奖励费确认</view>
      </view>

      <view class="row-3">
        <view class="th">
          <view class="td td-1">类型</view>
          <view class="td td-2">指标名称</view>
          <view class="td td-3">单位</view>
          <view class="td td-3">数量</view>
          <view class="td td-3">补偿单价</view>
          <view class="td td-3">补偿金额</view>
          <view class="td td-4">备注</view>
        </view>
        <!--补偿费-->
        <view class="tb-content" v-for="(item, index) in tableData" :key="index">
          <view class="td td-1">{{ getTypeStr(item.type) }}</view>
          <view class="td td-2">{{ formatStr(item.name) }}</view>
          <view class="td td-3">{{ formatDict(item.unit, 268) }}</view>
          <view class="td td-3">{{ formatStr(item.number) }}</view>
          <view class="td td-3">{{ formatStr(item.price) }}</view>
          <view class="td td-3">
            <view v-if="item.isUpdate === '0'">{{ formatStr(item.totalPrice) }}</view>
            <view v-else-if="item.isUpdate === '1'">{{ computedTotalPrice(item) }}</view>
            <view v-else-if="item.isUpdate === '2'">{{ getSummaries(item) }}</view>
          </view>
          <view class="td td-4">{{ formatStr(item.remark) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { formatDict, formatStr, routerForward } from '@/utils'
import { getCompensationCardConfigApi } from '@/service'
import { apartmentArea, resettleArea } from '@/config'
import { getLandlordItemApi } from '@/service'
interface PropsType {
  dataInfo: any
  dataList: any[]
}

const props = defineProps<PropsType>()
const tableData = ref<any[]>([])

// 获取移民建卡奖励费列表
const getCompensationCardConfig = async () => {
  let res = await getCompensationCardConfigApi()
  if (res) {
    console.log('获取移民建卡奖励费列表', res)

    // tableData.value = res
    let data: any = await getLandlordItemApi(props.dataInfo.uid)

    data.immigrantCompensationCardList.forEach((item: any) => {
      let index = res.findIndex((e: any) => e.id == item.id)
      if (index > -1) {
        res[index] = item
      } else {
        res.push(item)
      }
    })
    tableData.value = res
    console.log('合并', tableData.value, res, data.immigrantCompensationCardList)
  }
}

onShow(() => {
  getCompensationCardConfig()
})

const getSettleAddressText = (settleAddress?: string) => {
  console.log(settleAddress, 'settleAddress')
  if (!settleAddress) return '-'
  return (
    resettleArea.find((item) => item.id === settleAddress)?.name ||
    apartmentArea.find((item) => item.id === settleAddress)?.name
  )
}
/**
 * 获取金额类型
 * @param type 类型 1 补偿, 2 补助, 3 奖励, 4 其他
 */
const getTypeStr = (type: string) => {
  switch (type) {
    case '1':
      return '补偿费'
      break
    case '2':
      return '补助费'
      break
    case '3':
      return '奖励费'
      break
    case '4':
      return '其他费用'
      break
    default:
      return ''
  }
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
  tableData.value.forEach((column, index) => {
    if (column.name === row.name) {
      sumIndex = index
    }
  })
  const arr = tableData.value.filter((item, index) => item && index !== sumIndex)
  sums = arr.reduce((totalPrice, currentItem) => {
    return totalPrice + computedTotalPrice(currentItem)
  }, 0)
  return sums
}

// 档案上传
const onArchives = () => {
  routerForward('archives', {
    type: 6,
    uid: props.dataInfo.uid
  })
}

// 编辑
const toEdit = () => {
  routerForward('migrateCardEdit', {
    uid: props.dataInfo.uid
  })
}

// 奖励资费确认
const toConfirmReward = () => {
  const { uid, doorNo } = props.dataInfo
  let params = { uid, doorNo }
  routerForward('confirmReward', {
    params: JSON.stringify(params)
  })
}
</script>

<style lang="scss" scoped>
.migrate-card-wrapper {
  width: 100%;
  height: calc(100vh - 80rpx - var(--status-bar-height));
  overflow-y: scroll;

  .row-1 {
    display: flex;
    align-items: center;
    margin: 9rpx 0;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;

      .btn {
        display: flex;
        height: 23rpx;
        padding: 0 9rpx;
        margin-right: 6rpx;
        font-size: 9rpx;
        color: #fff;
        border-radius: 23rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;

        &.green {
          background-color: #30a952;
        }

        &.blue {
          background-color: #3e73ec;
        }

        .icon {
          width: 9rpx;
          height: 9rpx;
          margin-right: 2rpx;
        }
      }
    }
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      width: 100%;
      padding: 6rpx 0;
      font-size: 9rpx;
      color: #171718;
      box-sizing: border-box;
      align-items: center;

      .icon {
        width: 10rpx;
        height: 10rpx;
        margin-right: 10rpx;
      }
    }

    .right {
      display: flex;
      width: 30rpx;
      height: 18rpx;
      font-size: 9rpx;
      line-height: 1;
      color: #3e73ec;
      border: 1rpx solid rgba(62, 115, 236, 0.5);
      border-radius: 3rpx;
      align-items: center;
      justify-content: center;

      &.confirm {
        width: 60rpx;
      }
    }
  }

  .col {
    display: flex;
    flex-direction: row;

    .label {
      width: 90rpx;
      height: 16rpx;
      margin-left: 9rpx;
      font-size: 9rpx;
      line-height: 16rpx;
      color: rgba(23, 23, 24, 0.6);
    }

    .content {
      font-size: 9rpx;
      line-height: 16rpx;
      color: #171718;

      &.blue {
        color: #3e73ec;
      }
    }
  }

  .row-2 {
    font-size: 10rpx;

    .uTable {
      font-size: 9rpx;
    }

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

  .row-3 {
    border: 0.5rpx solid #ebebeb;

    .th {
      display: flex;
      height: 28rpx;
      font-size: 10rpx;
      font-weight: 400;
      line-height: 28rpx;
      color: #737374;
      background: #ebebeb;

      .td {
        padding-left: 10rpx;
        font-size: 9rpx;
        text-align: left;
        border: 0.5rpx solid #ebebeb;

        &.td-1 {
          width: 53rpx;
        }

        &.td-2 {
          width: 100rpx;
        }

        &.td-3 {
          width: 56rpx;
        }

        &.td-4 {
          width: 143rpx;
        }
      }
    }

    .tb-content {
      display: table;

      .td {
        display: table-cell;
        height: 28rpx;
        padding-left: 10rpx;
        font-size: 9rpx;
        color: #171718;
        vertical-align: middle;
        border: 0.5rpx solid #ebebeb;

        &.td-1 {
          width: 53rpx;
        }

        &.td-2 {
          width: 100rpx;
        }

        &.td-3 {
          width: 56rpx;
        }

        &.td-4 {
          width: 143rpx;
        }
      }
    }
  }
}
</style>
