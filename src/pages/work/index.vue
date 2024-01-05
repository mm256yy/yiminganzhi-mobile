<template>
  <Container title="我的工作">
    <view class="work-wrap">
      <view class="work-box">
        <view class="work-head">
          <view class="time-box">
            <view
              :class="['time-item', timeId === 'all' ? 'active' : '']"
              @click="onChooseDays('all')"
            >
              全部
            </view>
            <view
              :class="['time-item', timeId === '-1' ? 'active' : '']"
              @click="onChooseDays('-1')"
            >
              前一天
            </view>
            <view :class="['time-item', timeId === '0' ? 'active' : '']" @click="onChooseDays('0')">
              今天
            </view>
            <view
              :class="['time-item', timeId === '-7' ? 'active' : '']"
              @click="onChooseDays('-7')"
            >
              最近七天
            </view>

            <picker-view-custom
              type="daterange"
              :value="time"
              @open="openTimePicker"
              @confirm="onTimePickerChange"
            >
              <view
                :class="['time-item', 'range', timeId === 'custom' ? 'active' : '']"
                v-if="time && time[0] && time[1]"
              >
                <text class="txt">{{ time[0] }}</text>
                <text class="txt">&nbsp;-&nbsp;</text>
                <text class="txt">{{ time[1] }}</text>
              </view>
              <view class="time-item range" v-else>
                <text class="txt">开始时间</text>
                <text class="txt">&nbsp;-&nbsp;</text>
                <text class="txt">结束时间</text>
              </view>
            </picker-view-custom>
          </view>
          <view class="search-box">
            <input
              type="text"
              confirm-type="search"
              placeholder="请输入居民户姓名、个体户名称、企业名称"
              class="ipt"
              @confirm="onIptChange"
            />
            <uni-icons type="search" color="#171718" size="8rpx" />
          </view>
        </view>

        <view class="tabs-box">
          <view class="tabs">
            <view
              v-for="item in tabs"
              :key="item.type"
              :class="['tab-item', item.type === tabType ? 'active' : '']"
              @click="onTabChange(item)"
            >
              <view class="inner">{{ item.name }}</view>
            </view>
          </view>
          <view class="total">
            <text>{{ getTypeText() }}提交合计：</text>
            <text class="num">{{ tableData.length }}</text>
            <text>户</text>
          </view>
        </view>

        <scroll-view scroll-y class="tab-cont">
          <uni-table
            class="table"
            ref="table"
            :loading="loading"
            border
            stripe
            emptyText="暂无更多数据"
          >
            <uni-tr>
              <uni-th>名称</uni-th>
              <uni-th width="100rpx">户号</uni-th>
              <uni-th width="86rpx">是否财产户</uni-th>
              <uni-th width="92rpx">乡镇/街道</uni-th>
              <uni-th width="94rpx">行政村</uni-th>
              <uni-th width="92rpx">自然村</uni-th>
              <uni-th width="72rpx">所处位置</uni-th>
              <uni-th width="80rpx">提交时间</uni-th>
            </uni-tr>

            <uni-tr v-for="(item, index) in tableData" :key="index">
              <uni-td class="blue" @click="toLink(item)">{{ item.name }}</uni-td>
              <uni-td>{{ filterViewDoorNo(item) }}</uni-td>
              <uni-td>{{ item.hasPropertyAccount ? '是' : '否' }}</uni-td>
              <uni-td>{{ item.townCodeText }}</uni-td>
              <uni-td>{{ item.villageCodeText }}</uni-td>
              <uni-td>{{ item.virutalVillageCodeText }}</uni-td>
              <uni-td>{{ getLocationText(item.locationType) }}</uni-td>
              <uni-td>{{ dayjs(item.reportDate).format('YYYY-MM-DD') }}</uni-td>
            </uni-tr>
          </uni-table>
        </scroll-view>
      </view>
    </view>
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { getStorage, StorageKey, routerForward, filterViewDoorNo } from '@/utils'
import Container from '@/components/Container/index.vue'
import PickerViewCustom from '@/components/PickerViewCustom/Index.vue'
import { getSubmitListApi } from '@/service'
import { MainType } from '@/types/common'
import { LandlordType } from '@/types/sync'
import { locationTypes } from '@/config'

const viewFormat = 'YYYY-MM-DD'
const searchFormat = 'YYYY-MM-DD HH:mm:ss'
const time = ref<string[]>([dayjs().format(viewFormat), dayjs().format(viewFormat)])
const name = ref<string>('')
const loading = ref(false)
const timeId = ref<string>('0')
const allTableData = ref<LandlordType[]>([])
const tableData = ref<LandlordType[]>([])
const tabType = ref<MainType>(MainType.PeasantHousehold)
const tabs = ref([
  {
    name: '居民户',
    type: MainType.PeasantHousehold
  },
  {
    name: '个体户',
    type: MainType.IndividualHousehold
  },
  {
    name: '企业',
    type: MainType.Company
  },
  {
    name: '村集体',
    type: MainType.Village
  }
])

const serach = () => {
  uni.hideToast()
  const userInfo = getStorage(StorageKey.USERINFO)
  if (!userInfo) {
    uni.showToast({
      title: '未登录',
      icon: 'none'
    })
    return
  }
  const userId = userInfo.id

  const timeArray = [
    dayjs(time.value[0]).startOf('day').format(searchFormat),
    dayjs(time.value[1]).endOf('day').format(searchFormat)
  ]
  const params = {
    name: name.value,
    userId,
    timeArray
  }
  getSubmitListApi(params).then((res) => {
    allTableData.value = res
    tableData.value = res.filter((item) => item.type === tabType.value)
  }).catch((err) => {
    console.log(err,'报错啦')
    uni.showToast({
      title: err.message,
      icon: 'none'
    })
  })
}

const getLocationText = (key: string) => {
  return locationTypes.find((item) => item.value === key)?.label
}

const onChooseDays = (type: string) => {
  timeId.value = type
  if (type === 'all') {
    const startDay = `${dayjs().year()}-01-01`
    const endDay = dayjs().format(viewFormat)
    time.value = [startDay, endDay]
  } else if (type === '-1') {
    const day = dayjs().subtract(1, 'day').format(viewFormat)
    time.value = [day, day]
  } else if (type === '0') {
    const day = dayjs().format(viewFormat)
    time.value = [day, day]
  } else if (type === '-7') {
    const startDay = dayjs().subtract(7, 'day').format(viewFormat)
    const endDay = dayjs().format(viewFormat)
    time.value = [startDay, endDay]
  }
  serach()
}

// 打开日期选择框
const openTimePicker = () => {
  timeId.value = 'custom'
}

/**
 * 确定选择的日期
 * @{object} val 当前选择的日期
 */
const onTimePickerChange = (val: any) => {
  time.value = val
  serach()
}

const onTabChange = (data: any) => {
  tabType.value = data.type
  tableData.value = allTableData.value.filter((item) => item.type === data.type)
}

const getTypeText = () => {
  return tabs.value.find((item) => item.type === tabType.value)?.name
}

const onIptChange = (e: any) => {
  name.value = e.detail.value
  serach()
}

// 填报
const routerMap: any = {
  [MainType.PeasantHousehold]: 'household',
  [MainType.IndividualHousehold]: 'selfPerson',
  [MainType.Company]: 'enterprise',
  [MainType.Village]: 'collective'
}

/**
 * 跳转至指定页面
 * @param{object} data 当前项信息
 */
const toLink = (data: any) => {
  const name = routerMap[tabType.value]
  routerForward(name, {
    type: 'edit',
    uid: data.uid
  })
}

onMounted(() => {
  serach()
})
</script>

<style lang="scss">
.uni-easyinput__content-input {
  height: 21rpx;
}

.work-wrap {
  width: 100%;
  height: 100%;
  padding: 0 6rpx 6rpx;

  .work-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 7rpx;
    box-shadow: 0rpx 1rpx 12rpx -2rpx rgba(0, 0, 0, 0.14);
  }

  .work-head {
    display: flex;
    height: 38rpx;
    padding: 0 12rpx;
    border-radius: 7rpx;
    box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.08);
    align-items: center;
    flex-direction: row;

    .search-box {
      display: flex;
      // width: 328rpx;
      height: 21rpx;
      padding: 0 9rpx;
      margin-right: 14rpx;
      background-color: #f3f6fa;
      border-radius: 2rpx;
      flex: 1;
      align-items: center;
      justify-content: space-between;

      .ipt {
        width: 90%;
        height: 13rpx;
        font-size: 9rpx;
        line-height: 13rpx;
        color: #171718;
      }
    }

    .time-box {
      flex: none;
      display: flex;
      align-items: center;

      .time-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 66rpx;
        height: 21rpx;
        margin-right: 6rpx;
        font-size: 9rpx;
        color: #171718;
        background-color: #f3f6fa;
        border-radius: 2rpx;

        .txt {
          font-size: 9rpx;
          color: #171718;
        }

        &.active {
          color: #3e73ec;
          background-color: #e9f0ff;
          border: 1rpx solid #3e73ec;

          .txt {
            color: #3e73ec;
          }
        }

        &.range {
          width: auto;
          padding: 0 10rpx;
        }
      }
    }
  }

  .tabs-box {
    display: flex;
    padding: 0 6rpx 0 1rpx;
    margin-top: 6rpx;
    align-items: center;
    justify-content: space-between;

    .tabs {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 23rpx;

      .tab-item {
        display: flex;
        height: 100%;
        padding: 0 14rpx;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .inner {
          display: flex;
          align-items: center;
          height: 100%;
          font-size: 9rpx;
          font-weight: 500;
          color: #171718;
        }

        &.active {
          .inner {
            color: #3e73ec;
            border-bottom: 1rpx solid #3e73ec;
          }
        }
      }
    }

    .total {
      font-size: 9rpx;
      color: #737374;

      .num {
        font-size: 13rpx;
        font-weight: 600;
        color: #28af45;
      }
    }
  }

  .tab-cont {
    width: 726rpx;
    height: 290rpx;
    padding: 6rpx;
  }

  .table {
    width: 726rpx;
  }
}

.uni-table-th {
  height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  line-height: 28rpx;
  color: #737374;
  background-color: #f8f8f8;
}

.uni-table-td {
  min-height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  line-height: 28rpx;
  color: #171718;

  &.blue {
    color: #3e73ec;
  }
}
</style>
