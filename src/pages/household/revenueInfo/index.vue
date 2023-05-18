<template>
  <view class="revenue-info-wrapper">
    <view class="sub-title">第一产业收入</view>
    <uni-row v-for="(item, index) in firstData" :key="index">
      <uni-col :span="12">
        <view class="col">
          <view class="label">{{ item.name }}：</view>
          <view :class="['input-wrapper', focusIndex === index ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="digit"
              @input="amountChange($event, item)"
              v-model="item.amount"
              @focus="inputFocus(index)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">备注：</view>
          <view :class="['input-wrapper', focusIndex === index ? 'focus' : '']">
            <input
              class="input-txt w-150"
              placeholder="请输入"
              type="text"
              v-model="item.remark"
              @focus="inputFocus(index)"
              @blur="inputBlur"
            />
          </view>
        </view>
      </uni-col>
    </uni-row>
    <uni-row>
      <uni-col class="m-t-10" :span="24">
        <view class="txt-wrapper">
          <view class="label">小计：</view>
          <view class="amount">{{ statistics('1') }}</view>
          <view class="unit">（万元）</view>
        </view>
      </uni-col>
    </uni-row>

    <view class="sub-title">第二、三产业收入</view>
    <uni-row v-for="(item, index) in secondData" :key="index">
      <uni-col :span="12">
        <view class="col">
          <view class="label">{{ item.name }}：</view>
          <view :class="['input-wrapper', focusIndex === index ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入"
              type="digit"
              v-model="item.amount"
              @input="amountChange($event, item)"
              @focus="inputFocus(index)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">备注：</view>
          <view :class="['input-wrapper', focusIndex === index ? 'focus' : '']">
            <input
              class="input-txt w-150"
              placeholder="请输入"
              type="text"
              v-model="item.remark"
              @focus="inputFocus(index)"
              @blur="inputBlur"
            />
          </view>
        </view>
      </uni-col>
    </uni-row>
    <uni-row>
      <uni-col class="m-t-10" :span="24">
        <view class="txt-wrapper">
          <view class="label">小计：</view>
          <view class="amount">{{ statistics('2') }}</view>
          <view class="unit">（万元）</view>
        </view>
      </uni-col>
    </uni-row>

    <view class="sub-title">其他收入</view>
    <uni-row v-for="(item, index) in otherData" :key="index">
      <uni-col class="m-b-10" :span="12">
        <view class="col">
          <view class="label">{{ item.name }}：</view>
          <view :class="['input-wrapper', focusIndex === index ? 'focus' : '']">
            <input
              class="input-txt"
              placeholder="请输入金额"
              type="digit"
              v-model="item.amount"
              @input="amountChange($event, item)"
              @focus="inputFocus(index)"
              @blur="inputBlur"
            />
            <view class="unit">万元</view>
          </view>
        </view>
      </uni-col>
      <uni-col :span="12">
        <view class="col">
          <view class="label">备注：</view>
          <view :class="['input-wrapper', focusIndex === index ? 'focus' : '']">
            <input
              class="input-txt w-150"
              placeholder="请输入"
              type="text"
              v-model="item.remark"
              @focus="inputFocus(index)"
              @blur="inputBlur"
            />
          </view>
        </view>
      </uni-col>
    </uni-row>
    <view class="sub-title">合计</view>
    <uni-row>
      <uni-col :span="24">
        <view class="txt-wrapper">
          <view class="label">合计：</view>
          <view class="amount">{{ total() }}</view>
          <view class="unit">（万元）</view>
        </view>
      </uni-col>
    </uni-row>

    <image
      v-if="stage === MainStage.review"
      class="btn record"
      src="@/static/images/icon_record.png"
      mode="scaleToFill"
      @click="showModifyRecord"
    />

    <image
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />

    <!-- 复核修改记录 -->
    <modify-records v-if="showRecord" :dataList="updateLogList" @close="closeModifyRecords" />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getFamilyIncomeListApi } from '@/service'
import { MainType, MainStage } from '@/types/common'
import { getStorage, StorageKey } from '@/utils'
import modifyRecords from '../../common/modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  updateLogList: {
    type: Array as any,
    default: () => []
  }
})

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)
const focusIndex = ref<number>(-1)

// 公共的参数
const commonParams = {
  doorNo: props.dataInfo.doorNo,
  amount: '',
  remark: ''
}

// 第一产业数据
const firstData = ref<any>([])

// 第二、三产业数据
const secondData = ref<any>([])

// 其他
const otherData = ref<any>([])

// 展示修改记录
const showModifyRecord = () => {
  showRecord.value = true
}

// 关闭修改记录弹窗
const closeModifyRecords = () => {
  showRecord.value = false
}

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

const amountChange = (e: any, item: any) => {
  const val = e.detail.value
  if (val) {
    let value = val
    if (val.indexOf('.') > 0) {
      value = value.slice(0, value.indexOf('.') + 3)
    }
    item.amount = value
  }
}

const emit = defineEmits(['submit'])

/**
 * 初始化 - 生成新的数组
 * @param {Object} arr 数组
 */
const genArr = (arr?: any[]) => {
  if (arr && arr.length > 0) {
    arr.map((item: any) => {
      // fix: 配置表的ID不需要
      const { id, ...realItem } = item
      if (item.configType === MainType.PeasantHousehold) {
        if (item.type === '1') {
          firstData.value.push({
            ...realItem,
            ...commonParams
          })
        } else if (item.type === '2') {
          secondData.value.push({
            ...realItem,
            ...commonParams
          })
        } else {
          otherData.value.push({
            ...realItem,
            ...commonParams
          })
        }
      }
    })
  }
}

/**
 * 回显 -- 生成新的数组
 * @param {Object} arr 数组
 */
const genNewArr = (arr?: any[]) => {
  if (arr && arr.length > 0) {
    arr.map((item: any) => {
      if (item.type === '1') {
        firstData.value.push({
          ...item
        })
      } else if (item.type === '2') {
        secondData.value.push({
          ...item
        })
      } else {
        otherData.value.push({
          ...item
        })
      }
    })
  }
}

// 获取家庭收入信息配置列表
const getRevenueList = async () => {
  const result = await getFamilyIncomeListApi()
  genArr(result)
}

// 第一产业收入 / 第二、三产业 小计
const statistics = (type: string) => {
  let sum = 0
  if (type === '1') {
    sum = firstData.value.reduce(
      (accumulator: number, cur: any) => accumulator + Number(cur.amount),
      0
    )
  } else if (type === '2') {
    sum = secondData.value.reduce(
      (accumulator: number, cur: any) => accumulator + Number(cur.amount),
      0
    )
  } else if (type === '3') {
    sum = otherData.value.reduce(
      (accumulator: number, cur: any) => accumulator + Number(cur.amount),
      0
    )
  }
  return sum
}

// 总计
const total = () => {
  let sum = 0
  sum = statistics('1') + statistics('2') + statistics('3')
  return sum
}

// 表单提交
const submit = () => {
  const params = [...firstData.value, ...secondData.value, ...otherData.value]
  emit('submit', params)
}

onMounted(() => {
  if (props.dataList && props.dataList.length > 0) {
    genNewArr(props.dataList)
  } else {
    getRevenueList()
  }
})
</script>

<style lang="scss" scoped>
.revenue-info-wrapper {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  border: 1px solid #f0f0f0;

  .sub-title {
    width: 100%;
    height: 28rpx;
    padding-left: 9rpx;
    font-size: 9rpx;
    line-height: 28rpx;
    color: #171718;
    background: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    &:first-child {
      border-top: none;
    }
  }

  .col {
    display: flex;
    align-items: center;
    margin-top: 10rpx;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      height: 23rpx;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &.focus {
        border-color: rgb(41, 121, 255);
      }

      .input-txt {
        width: 120rpx;
        height: 23rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #171718;

        &.w-150 {
          width: 150rpx;
        }
      }

      .unit {
        width: 30rpx;
        height: 22rpx;
        font-size: 9rpx;
        line-height: 22rpx;
        color: #171718;
        text-align: center;
        background-color: #f5f7fa;
        border-left: 1px solid #d9d9d9;
        border-top-right-radius: 3rpx;
        border-bottom-right-radius: 3rpx;
      }
    }
  }

  .txtarea-wrapper {
    display: flex;
    align-items: center;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .txt {
      width: 200rpx;
      height: 23rpx;
      font-size: 9rpx;
    }
  }

  .txt-wrapper {
    display: flex;
    align-items: center;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .amount {
      width: 124rpx;
      height: 23rpx;
      padding-left: 9rpx;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
    }

    .unit {
      width: 40rpx;
      height: 23rpx;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
      text-align: center;
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.submit {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
