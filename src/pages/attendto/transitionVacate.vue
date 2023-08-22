<template>
  <view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>家庭情况</text>
    </view>

    <view class="label-value">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户主姓名：</view>
            <view class="content">{{ dataInfo?.name }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户内人口：</view>
            <view class="content"> {{ dataInfo?.demographicList.length }} </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁出地址：</view>
            <view class="content">{{ dataInfo?.address }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content"> {{ dataInfo?.phone }} </view>
          </view>
        </uni-col>
      </uni-row>
    </view>

    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>过渡去向情况</text>
    </view>

    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text> 过渡安置地详址：</view>
        <view class="arch-value">
          <view class="ipt-wrap">
            <input class="ipt" type="text" v-model="text" />
          </view>
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text>过渡开始日期：</view>
        <view class="arch-value">
          <uni-datetime-picker type="date" :clear-icon="true" v-model="date" />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label">过渡结束日期：</view>
        <view class="arch-value">
          <uni-datetime-picker type="date" :clear-icon="true" v-model="date2" />
        </view>
      </view>
    </view>

    <image
      class="submit-btn"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ImmigrantExcessType } from '@/types/impDataFill'
import { updateImpLandlordExcessApi } from '@/service'
import dayjs from 'dayjs'
import { LandlordType } from '@/types/sync'

interface PropsType {
  uid: string
  dataInfo: LandlordType | null
  immigrantExcess: Partial<ImmigrantExcessType> | undefined
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const text = ref<string>('')
const date = ref<string>('')
const date2 = ref<string>('')

watch(
  () => props.immigrantExcess,
  (val) => {
    if (val) {
      // 基本信息
      const { excessAddress, excessStartDate, excessEndDate } = val

      if (excessAddress) {
        text.value = excessAddress
      }
      if (excessStartDate) {
        date.value = dayjs(excessStartDate).format('YYYY-MM-DD')
      }
      if (excessEndDate) {
        date2.value = dayjs(excessEndDate).format('YYYY-MM-DD')
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!text.value) {
    uni.showToast({
      title: '请填写意见',
      icon: 'none'
    })
    return
  }
  if (!date.value) {
    uni.showToast({
      title: '请填写时间',
      icon: 'none'
    })
    return
  }
  if (date2.value && date.value && dayjs(date.value).valueOf > dayjs(date2.value).valueOf) {
    uni.showToast({
      title: '开始日期不得大于结束日期',
      icon: 'none'
    })
    return
  }

  const params: Partial<ImmigrantExcessType> = {
    excessAddress: text.value,
    excessStartDate: dayjs(date.value).toString(),
    excessEndDate: dayjs(date2.value).toString(),
    isExcess: '1'
  }
  console.log(params, '参数')
  const res = await updateImpLandlordExcessApi(props.uid, params)
  if (res) {
    // 更新相关手续
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    emit('submit')
  }
}
</script>

<style lang="scss" scoped>
.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
  border-radius: 5rpx 5rpx 0px 0px;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 10rpx;
    height: 10rpx;
    margin-right: 6rpx;
  }
}

.arch-box {
  .arch-item {
    display: flex;
    padding: 5rpx 12rpx;
    margin-top: 9rpx;

    .arch-label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;

      .red {
        color: red;
      }
    }

    .arch-value {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
}

.ipt-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 23rpx;
  margin-right: 6rpx;
  border: 1rpx solid #ebebeb;
  border-radius: 2rpx;

  .ipt {
    flex: 1;
    height: 23rpx;
    padding: 0 4rpx;
    font-size: 9rpx;
    color: #171718;
  }
}

.label-value {
  padding: 5rpx 12rpx 12rpx 0;
  box-sizing: border-box;

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
    }
  }
}

.submit-btn {
  position: fixed;
  right: 25rpx;
  bottom: 20rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
}
</style>
