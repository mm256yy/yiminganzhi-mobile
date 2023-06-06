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
          <view
            class="item"
            v-for="(item, index) in days(years()[startYearIndex], months()[startMonthIndex])"
            :key="index"
          >
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
          <view
            class="item"
            v-for="(item, index) in days(years()[endYearIndex], months()[endMonthIndex])"
            :key="index"
          >
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

// 生成年份数组
const years = () => {
  let arr: any = []
  for (let i = 1790; i <= dayjs().year(); i++) {
    arr.push(i)
  }
  return arr
}

// 生成月份数组
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

const startYearIndex = ref<number>(getArrayIndex(years(), dayjs().year()))
const startMonthIndex = ref<number>(getArrayIndex(months(), dayjs().month() + 1))
const startDayIndex = ref<number>(
  getArrayIndex(days(dayjs().year(), dayjs().month()), dayjs().date())
)
const endYearIndex = ref<number>(getArrayIndex(years(), dayjs().year()))
const endMonthIndex = ref<number>(getArrayIndex(months(), dayjs().month() + 1))
const endDayIndex = ref<number>(
  getArrayIndex(days(dayjs().year(), dayjs().month()), dayjs().date())
)
const currentValues = ref<number[]>([])

// 初始化时，需要将实际的年、月、日转换为对应的年、月、日数组的下标进行回显
watch(
  () => [props.type, props.value],
  (val: any) => {
    if (val && val.length) {
      if (val[0] === 'date') {
        let arr = val[1] && val[1].length ? val[1].split('-') : []
        if (arr && arr.length) {
          startYearIndex.value = getArrayIndex(years(), Number(arr[0]))
          startMonthIndex.value = getArrayIndex(months(), Number(arr[1]))
          startDayIndex.value = getArrayIndex(days(Number(arr[0]), Number(arr[1])), Number(arr[2]))
        }
        currentValues.value = [startYearIndex.value, startMonthIndex.value, startDayIndex.value]
      } else if (val[0] === 'daterange') {
        let arr1 = val[1] && val[1].length ? val[1][0].split('-') : []
        let arr2 = val[1] && val[1].length ? val[1][1].split('-') : []
        if (arr1 && arr1.length) {
          startYearIndex.value = getArrayIndex(years(), Number(arr1[0]))
          startMonthIndex.value = getArrayIndex(months(), Number(arr1[1]))
          startDayIndex.value = getArrayIndex(
            days(Number(arr1[0]), Number(arr1[1])),
            Number(arr1[2])
          )
        }
        if (arr2 && arr2.length) {
          endYearIndex.value = getArrayIndex(years(), Number(arr2[0]))
          endMonthIndex.value = getArrayIndex(months(), Number(arr2[1]))
          endDayIndex.value = getArrayIndex(days(Number(arr2[0]), Number(arr2[1])), Number(arr2[2]))
        }
        currentValues.value = [
          startYearIndex.value,
          startMonthIndex.value,
          startDayIndex.value,
          endYearIndex.value,
          endMonthIndex.value,
          endDayIndex.value
        ]
      } else {
        let arr = val[1] && val[1].length ? val[1].split('-') : []
        if (arr && arr.length) {
          startYearIndex.value = getArrayIndex(years(), Number(arr[0]))
          startMonthIndex.value = getArrayIndex(months(), Number(arr[1]))
          startDayIndex.value = getArrayIndex(days(Number(arr[0]), Number(arr[1])), Number(arr[2]))
        }
        currentValues.value = [startYearIndex.value, startMonthIndex.value, startDayIndex.value]
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 日期选择发生变化时的事件
 * @param{Object} e
 */
const change = (e: any) => {
  const val = e.detail.value
  if (props.type === 'date') {
    startYearIndex.value = Number(val[0])
    startMonthIndex.value = Number(val[1])
    startDayIndex.value = Number(val[2])
  } else if (props.type === 'daterange') {
    startYearIndex.value = Number(val[0])
    startMonthIndex.value = Number(val[1])
    startDayIndex.value = Number(val[2])
    endYearIndex.value = Number(val[3])
    endMonthIndex.value = Number(val[4])
    endDayIndex.value = Number(val[5])
  } else {
    startYearIndex.value = Number(val[0])
    startMonthIndex.value = Number(val[1])
    startDayIndex.value = Number(val[2])
  }
}

// 初始化打开日期选择组件
const open = () => {
  visible.value = true
  emit('open')
}

// 关闭日期选择组件
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

// 确认选择，将选中的时间下标通过数组转换为对应的实际日期
const confirm = () => {
  visible.value = false
  if (props.type === 'date') {
    const startYears = years()[startYearIndex.value]
    const startMonths = months()[startMonthIndex.value]
    const startDays = days(startYears, startMonths)[startDayIndex.value]
    emit('confirm', `${startYears}-${fmtNum(startMonths)}-${fmtNum(startDays)}`)
  } else if (props.type === 'daterange') {
    const startYears = years()[startYearIndex.value]
    const startMonths = months()[startMonthIndex.value]
    const startDays = days(startYears, startMonths)[startDayIndex.value]
    const endYears = years()[endYearIndex.value]
    const endMonths = months()[endMonthIndex.value]
    const endDays = days(endYears, endMonths)[endDayIndex.value]
    let startDate = `${startYears}-${fmtNum(startMonths)}-${fmtNum(startDays)}`
    let endDate = `${endYears}-${fmtNum(endMonths)}-${fmtNum(endDays)}`
    if (dayjs(endDate).valueOf() < dayjs(startDate).valueOf()) {
      showToast('结束日期不能晚于开始日期')
      return
    }
    emit('confirm', [startDate, endDate])
  } else {
    const startYears = years()[startYearIndex.value]
    const startMonths = months()[startMonthIndex.value]
    const startDays = days(startYears, startMonths)[startDayIndex.value]
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
