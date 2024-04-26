<template>
  <view class="migrate-card-wrapper">
    <!-- 居民户实施 —— 移民建卡 -->
    <view class="main">
      <view class="row-1">
        <view class="right">
          <view class="btn blue" @click="toConfirmReward">
            <!-- <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" /> -->
            <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
            <text class="txt">奖励费确认</text>
          </view>
        </view>
        <view class="right">
          <view class="btn green" @click="handleClick">
            <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
            <text class="txt">打印报表</text>
          </view>
          <view class="btn blue" @click="onArchives">
            <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
            进度汇报
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
          家庭基本情况
        </view>
        <view class="right" @click="toEdit">编辑</view>
      </view>

      <uni-row class="m-b-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">户主姓名：</view>
            <view class="content">
              {{ formatStr(dataInfo.name) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">家庭总人口：</view>
            <view class="content">
              {{
                formatStr(
                  dataInfo.demographicList.filter(
                    (item: any) => item.name != '增计人口' && item.isDelete != '1'
                  ).length
                )
              }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content">
              {{ formatStr(dataInfo.phone) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁前地址：</view>
            <view class="content">
              {{
                (dataInfo.areaCodeText || '') +
                (dataInfo.townCodeText || '') +
                (dataInfo.villageCodeText || '')
              }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">安置住址：</view>
            <view class="content">
              {{ getSettleAddressText(dataInfo.immigrantSettle?.settleAddress) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">开户名：</view>
            <view class="content">
              {{ formatStr(dataInfo.accountName) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">开户行：</view>
            <view class="content">
              {{ formatStr(dataInfo.bankName) }}
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

      <view class="row-2">
        <uni-table border stripe emptyText="暂无更多数据">
          <!-- 表头行 -->
          <uni-tr>
            <uni-th align="left" width="40rpx" class="uTitle">序号</uni-th>
            <uni-th align="left" width="60rpx" class="uTitle">姓名</uni-th>
            <uni-th align="left" width="70rpx" class="uTitle">与户主关系</uni-th>
            <uni-th align="left" width="50rpx" class="uTitle">性别</uni-th>
            <uni-th align="left" width="140rpx" class="uTitle">身份证号</uni-th>
            <uni-th align="left" width="80rpx" class="uTitle">人口性质</uni-th>
            <uni-th align="left" width="80rpx" class="uTitle">户籍册类别</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr v-for="(item, index) in dataList" :key="index">
            <uni-td align="left" class="uTd">{{ index + 1 }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatStr(item.name) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.relation, 307) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.sex, 292) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatStr(item.card) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.populationNature, 263) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.censusType, 249) }}</uni-td>
          </uni-tr>
        </uni-table>
      </view>

      <view class="title-wrap m-t-5">
        <view class="left">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          费用补偿情况
        </view>
        <!-- <view class="right confirm" @click="toConfirmReward">奖励费确认</view> -->
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
          <!-- formatDict(item.unit, 268) -->
          <view class="td td-3">{{ item.unit ? item.unit : '-' }}</view>
          <view class="td td-3">{{
            item.name.includes('小计') ? '-' : formatStr(item.number)
          }}</view>
          <view class="td td-3">{{ formatStr(item.price) }}</view>
          <view class="td td-3">
            <view v-if="item.isUpdate === '0'">{{ formatStr(item.totalPrice) }}</view>
            <view v-else-if="item.isUpdate === '1' && item.isSum === '0'">{{
              computedTotalPrice(item)
            }}</view>
            <view v-else-if="item.isSum === '1'"> {{ getSummaries(item) }} </view>
          </view>
          <view class="td td-4">{{ formatStr(item.remark) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { formatDict, formatStr, routerForward } from '@/utils'
import { getCompensationCardConfigApi } from '@/service'
import { apartmentArea, resettleArea } from '@/config'
import { getLandlordItemApi, getResettleDetail } from '@/service'
import { OtherDataType } from '@/database'

interface PropsType {
  dataInfo: any
  dataList: any[]
}
let dataLists: any = ref([])
const getDataRequest = async () => {
  try {
    const datas = await getResettleDetail(OtherDataType.settleAddressList)
    dataLists.value = datas
    // resettleArea.value=dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
  } catch (error) {
    console.log('error', error)
  }
}
const props = defineProps<PropsType>()
const tableData = ref<any[]>([])
const dataList = computed(() => {
  return props.dataList.filter((item) => item.isDelete !== '1')
})
// 获取移民建卡奖励费列表
const getCompensationCardConfig = async () => {
  let res = await getCompensationCardConfigApi()
  if (res) {
    console.log(res, 'res是什么？')
    let datas = []
    datas = res.filter(
      (item: any) => item.phType == 'Company' && (item.type == '3' || item.type == '1')
    )
    console.log('获取移民建卡奖励费列表', datas)
    let data: any = await getLandlordItemApi(props.dataInfo.uid)
    console.log(data, '测试dada数据')
    tableData.value = data.immigrantCompensationCardList
    tableData.value.forEach((item: any) => {
      // && !item.hasOwnProperty('isVerify') 暂时去掉，需要的时候再使用
      if (item.unit == '人' && item.type == '3' && item.isVerify != '1') {
        console.log('是否走了这个条件')
        item.number = data.demographicList.length
      } else if (item.unit == '项' && item.type == '3' && item.isVerify != '1') {
        item.number = 1
      }
    })
    console.log('合并', tableData.value, res, data.immigrantCompensationCardList)
  }
}

onShow(() => {
  getCompensationCardConfig()
  getDataRequest()
})

const getSettleAddressText = (settleAddress?: string) => {
  console.log(settleAddress, 'settleAddress', dataLists.value)
  if (!settleAddress) return '-'
  return (
    dataLists.value.find((item: any) => item.id == settleAddress)?.name ||
    dataLists.value.find((item: any) => item.id == settleAddress)?.name
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
  // if (row.totalPrice) {
  //   return Number(row.totalPrice)
  // } else {
  if (row.number && row.price) {
    return Number(row.number) * Number(row.price)
  } else {
    return 0
  }
  // }
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
  const arr = tableData.value.filter(
    (item, index) => item && index !== sumIndex && item.type == row.type
  )
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
const handleClick = () => {
  routerForward('pdf', {
    type: 6,
    dataInfo: props.dataInfo.uid
  })
}
// 编辑
const toEdit = () => {
  routerForward('migrateCardEdit', {
    uid: props.dataInfo.uid
  })
  console.log(props.dataInfo, props.dataList, '移民建卡传入数据')
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
