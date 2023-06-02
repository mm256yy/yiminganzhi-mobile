<template>
  <view class="picker-wrapper" @click.stop="open">
    <slot></slot>
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
          <view class="item" v-for="(item, index) in days()" :key="index">{{ item }}</view>
        </picker-view-column>
        <picker-view-column v-if="props.type === 'daterange'">
          <view class="item" v-for="(item, index) in years()" :key="index">{{ item }}</view>
        </picker-view-column>
        <picker-view-column v-if="props.type === 'daterange'">
          <view class="item" v-for="(item, index) in months()" :key="index">{{ item }}</view>
        </picker-view-column>
        <picker-view-column v-if="props.type === 'daterange'">
          <view class="item" v-for="(item, index) in days()" :key="index">{{ item }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { showToast } from '@/config/msg'

interface PropsType {
  type?: string
  value: string | string[]
}

const props = defineProps<PropsType>()

const visible = ref<boolean>(false)
const startYear = ref<number>(dayjs().year())
const startMonth = ref<number>(dayjs().month() + 1)
const startDay = ref<number>(dayjs().date())
const endYear = ref<number>(dayjs().year())
const endMonth = ref<number>(dayjs().month() + 1)
const endDay = ref<number>(dayjs().date())
const indicatorStyle = `height: 50px;`
const currentValues = ref<number[]>([])

const emit = defineEmits(['open', 'confirm'])

watch(
  () => [props.type, props.value],
  (val: any) => {
    if (val && val.length) {
      if (val[0] === 'date') {
        let arr = val[1] && val[1].length ? val[1].split('-') : []
        if (arr && arr.length) {
          startYear.value = Number(arr[0])
          startMonth.value = Number(arr[1]) - 1
          startDay.value = Number(arr[2]) - 1
          currentValues.value = [startYear.value, startMonth.value, startDay.value]
        }
      } else if (val[0] === 'daterange') {
        let arr1 = val[1] && val[1].length ? val[1][0].split('-') : []
        let arr2 = val[1] && val[1].length ? val[1][1].split('-') : []
        if (arr1 && arr1.length) {
          startYear.value = Number(arr1[0])
          startMonth.value = Number(arr1[1]) - 1
          startDay.value = Number(arr1[2]) - 1
        }
        if (arr2 && arr2.length) {
          endYear.value = Number(arr2[0])
          endMonth.value = Number(arr2[1]) - 1
          endDay.value = Number(arr2[2]) - 1
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
          startYear.value = Number(arr[0])
          startMonth.value = Number(arr[1]) - 1
          startDay.value = Number(arr[2]) - 1
          currentValues.value = [startYear.value, startMonth.value, startDay.value]
        }
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const years = () => {
  let arr: any = []
  for (let i = 1990; i <= dayjs().year(); i++) {
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

const days = () => {
  let arr: any = []
  for (let i = 1; i <= 31; i++) {
    arr.push(i)
  }
  return arr
}

const change = (e: any) => {
  const val = e.detail.value
  if (props.type === 'date') {
    startYear.value = years()[val[0]]
    startMonth.value = months()[val[1]]
    startDay.value = days()[val[2]]
  } else if (props.type === 'daterange') {
    startYear.value = years()[val[0]]
    startMonth.value = months()[val[1]]
    startDay.value = days()[val[2]]
    endYear.value = years()[val[3]]
    endMonth.value = months()[val[4]]
    endDay.value = days()[val[5]]
  } else {
    startYear.value = years()[val[0]]
    startMonth.value = months()[val[1]]
    startDay.value = days()[val[2]]
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
  console.log('毫秒数：', dayjs('2023-06-02').valueOf())
  if (props.type === 'date') {
    emit('confirm', `${startYear.value}-${fmtNum(startMonth.value)}-${fmtNum(startDay.value)}`)
  } else if (props.type === 'daterange') {
    let startDate = `${startYear.value}-${fmtNum(startMonth.value)}-${fmtNum(startDay.value)}`
    let endDate = `${endYear.value}-${fmtNum(endMonth.value)}-${fmtNum(endDay.value)}`
    if (dayjs(endDate).valueOf() < dayjs(startDate).valueOf()) {
      showToast('结束日期不能晚于开始日期')
      return
    }
    emit('confirm', [startDate, endDate])
  } else {
    emit('confirm', `${startYear.value}-${fmtNum(startMonth.value)}-${fmtNum(startDay.value)}`)
  }
}
</script>

<style lang="scss">
.picker-wrapper {
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
