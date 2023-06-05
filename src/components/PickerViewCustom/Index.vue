<template>
  <view class="picker-wrapper" @click.stop="open">
    <slot>
      <view v-if="props.type === 'daterange'">
        <view class="range-date" v-if="currentValues && currentValues.length === 6">
          <text class="txt">
            {{
              years()[currentValues[0]] +
              '-' +
              months()[currentValues[1]] +
              '-' +
              days(currentValues[0], currentValues[1])[currentValues[2]]
            }}
          </text>
          <text class="txt">&nbsp;-&nbsp;</text>
          <text class="txt">
            {{
              years()[currentValues[3]] +
              '-' +
              months()[currentValues[4]] +
              '-' +
              days(currentValues[3], currentValues[4])[currentValues[5]]
            }}
          </text>
        </view>
        <view class="range-date" v-else>
          <text class="txt">开始时间</text>
          <text class="txt">&nbsp;-&nbsp;</text>
          <text class="txt">结束时间</text>
        </view>
      </view>
      <view v-else>
        <view class="range-date" v-if="currentValues && currentValues.length === 3">
          <text class="txt">
            {{
              years()[currentValues[0]] +
              '-' +
              months()[currentValues[1]] +
              '-' +
              days(currentValues[0], currentValues[1])[currentValues[2]]
            }}
          </text>
        </view>
        <view class="range-date" v-else>
          <text class="txt">选择日期</text>
        </view>
      </view>
    </slot>
    <view class="picker-content" v-if="visible">
      <view class="title-wrapper">
        <view class="cancel" @click.stop="cancel">取消</view>
        <view class="confirm" @click.stop="confirm">确定</view>
      </view>
      <picker-view
        :indicator-style="indicatorStyle"
        :value="currentValues"
        @change="change"
        class="picker-view"
      >
        <picker-view-column>
          <view class="item" v-for="(item, index) in years()" :key="index">{{ item }}</view>
        </picker-view-column>
        <picker-view-column>
          <view class="item" v-for="(item, index) in months()" :key="index">{{ item }}</view>
        </picker-view-column>
        <picker-view-column>
          <view class="item" v-for="(item, index) in days(startYear, startMonth + 1)" :key="index">
            {{ item }}
          </view>
        </picker-view-column>
        <picker-view-column v-if="props.type === 'daterange'">
          <view class="item" v-for="(item, index) in years()" :key="index">{{ item }}</view>
        </picker-view-column>
        <picker-view-column v-if="props.type === 'daterange'">
          <view class="item" v-for="(item, index) in months()" :key="index">{{ item }}</view>
        </picker-view-column>
        <picker-view-column v-if="props.type === 'daterange'">
          <view class="item" v-for="(item, index) in days(endYear, endMonth + 1)" :key="index">
            {{ item }}
          </view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { showToast } from '@/config/msg'
import { getArrayIndex } from '@/utils'

interface PropsType {
  type?: string
  value: string | string[]
}

const props = defineProps<PropsType>()
const visible = ref<boolean>(false)
const indicatorStyle = `height: 50px;`

const emit = defineEmits(['open', 'confirm'])

const years = () => {
  let arr: any = []
  for (let i = 1790; i <= dayjs().year(); i++) {
    arr.push(i)
  }
  return arr
}

const months = () => {
  let arr: any = []
  for (let i = 1; i <= 12; i++) {
    arr.push(i)
  }
  return arr
}

/**
 * 获取当前年月下有多少天
 * @param{Object} year 年
 * @param{Object} month 月
 */
const getDays = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

/**
 * 获取每个月有多少天
 * @param{Object} year 选择的年
 * @param{Object} month 选择的月
 */
const days = (year: number, month: number) => {
  let arr: any = []
  for (let i = 1; i <= getDays(year, month); i++) {
    arr.push(i)
  }
  return arr
}

const startYear = ref<number>(getArrayIndex(years(), dayjs().year()))
const startMonth = ref<number>(getArrayIndex(months(), dayjs().month()))
const startDay = ref<number>(
  getArrayIndex(days(dayjs().year(), dayjs().month() + 1), dayjs().date())
)
const endYear = ref<number>(getArrayIndex(years(), dayjs().year()))
const endMonth = ref<number>(getArrayIndex(months(), dayjs().month()))
const endDay = ref<number>(getArrayIndex(days(dayjs().year(), dayjs().month() + 1), dayjs().date()))
const currentValues = ref<number[]>([])

// 初始化时，需要将实际的年、月、日转换为对应的年、月、日数组的下标进行回显
watch(
  () => [props.type, props.value],
  (val: any) => {
    if (val && val.length) {
      if (val[0] === 'date') {
        let arr = val[1] && val[1].length ? val[1].split('-') : []
        if (arr && arr.length) {
          startYear.value = getArrayIndex(years(), Number(arr[0]))
          startMonth.value = getArrayIndex(months(), Number(arr[1]))
          startDay.value = getArrayIndex(days(Number(arr[0]), Number(arr[1])), Number(arr[2]))
        }
        currentValues.value = [startYear.value, startMonth.value, startDay.value]
      } else if (val[0] === 'daterange') {
        let arr1 = val[1] && val[1].length ? val[1][0].split('-') : []
        let arr2 = val[1] && val[1].length ? val[1][1].split('-') : []
        if (arr1 && arr1.length) {
          startYear.value = getArrayIndex(years(), Number(arr1[0]))
          startMonth.value = getArrayIndex(months(), Number(arr1[1]))
          startDay.value = getArrayIndex(days(Number(arr1[0]), Number(arr1[1])), Number(arr1[2]))
        }
        if (arr2 && arr2.length) {
          endYear.value = getArrayIndex(years(), Number(arr2[0]))
          endMonth.value = getArrayIndex(months(), Number(arr2[1]))
          endDay.value = getArrayIndex(days(Number(arr2[0]), Number(arr2[1])), Number(arr2[2]))
        }
        currentValues.value = [
          startYear.value,
          startMonth.value,
          startDay.value,
          endYear.value,
          endMonth.value,
          endDay.value
        ]
      } else {
        let arr = val[1] && val[1].length ? val[1].split('-') : []
        if (arr && arr.length) {
          startYear.value = getArrayIndex(years(), Number(arr[0]))
          startMonth.value = getArrayIndex(months(), Number(arr[1]))
          startDay.value = getArrayIndex(days(Number(arr[0]), Number(arr[1])), Number(arr[2]))
        }
        currentValues.value = [startYear.value, startMonth.value, startDay.value]
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const change = (e: any) => {
  const val = e.detail.value
  if (props.type === 'date') {
    startYear.value = Number(val[0])
    startMonth.value = Number(val[1])
    startDay.value = Number(val[2])
  } else if (props.type === 'daterange') {
    startYear.value = Number(val[0])
    startMonth.value = Number(val[1])
    startDay.value = Number(val[2])
    endYear.value = Number(val[3])
    endMonth.value = Number(val[4])
    endDay.value = Number(val[5])
  } else {
    startYear.value = Number(val[0])
    startMonth.value = Number(val[1])
    startDay.value = Number(val[2])
  }
}

const open = () => {
  visible.value = true
  emit('open')
}

const cancel = () => {
  visible.value = false
}

/**
 * 处理天，月
 * @param{object} val 天/月
 * 当天，月小于10的时候在前面加 ‘0’
 */
const fmtNum = (val: number) => {
  if (val) {
    if (val > 9) {
      return val
    } else {
      return `0${val}`
    }
  } else {
    return ''
  }
}

const confirm = () => {
  visible.value = false
  if (props.type === 'date') {
    const startYears = years()[startYear.value]
    const startMonths = months()[startMonth.value]
    const startDays = days(startYears, startMonths)[startDay.value]
    emit('confirm', `${startYears}-${fmtNum(startMonths)}-${fmtNum(startDays)}`)
  } else if (props.type === 'daterange') {
    const startYears = years()[startYear.value]
    const startMonths = months()[startMonth.value]
    const startDays = days(startYears, startMonths)[startDay.value]
    const endYears = years()[endYear.value]
    const endMonths = months()[endMonth.value]
    const endDays = days(endYears, endMonths)[endDay.value]
    let startDate = `${startYears}-${fmtNum(startMonths)}-${fmtNum(startDays)}`
    let endDate = `${endYears}-${fmtNum(endMonths)}-${fmtNum(endDays)}`
    if (dayjs(endDate).valueOf() < dayjs(startDate).valueOf()) {
      showToast('结束日期不能晚于开始日期')
      return
    }
    emit('confirm', [startDate, endDate])
  } else {
    const startYears = years()[startYear.value]
    const startMonths = months()[startMonth.value]
    const startDays = days(startYears, startMonths)[startDay.value]
    emit('confirm', `${startYears}-${fmtNum(startMonths)}-${fmtNum(startDays)}`)
  }
}
</script>

<style lang="scss">
.picker-wrapper {
  .range-date {
    display: flex;
    width: auto;
    height: 21rpx;
    padding: 0 10rpx;
    margin-right: 6rpx;
    font-size: 9rpx;
    color: #171718;
    background-color: #f3f6fa;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;

    .txt {
      font-size: 9rpx;
      color: #171718;
    }
  }

  .picker-content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 750rpx;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);

    .title-wrapper {
      position: fixed;
      bottom: 300rpx;
      left: 0;
      z-index: 1;
      display: flex;
      width: 750rpx;
      height: 50rpx;
      padding: 0 20rpx;
      font-size: 10rpx;
      line-height: 50rpx;
      background-color: #f9f9f9;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;

      .cancel {
        color: #999;
      }

      .confirm {
        color: #333;
      }
    }

    .picker-view {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 750rpx;
      height: 300rpx;
      background-color: #fff;

      .item {
        min-width: 50rpx;
        font-size: 10rpx;
        line-height: 50px;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>
