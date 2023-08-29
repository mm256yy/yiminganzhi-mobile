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
      <text>土地腾让办理情况</text>
    </view>

    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text>腾让日期：</view>
        <view class="arch-value">
          <uni-datetime-picker type="date" :clear-icon="true" v-model="date" />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text> 移民户主意见：</view>
        <view class="arch-value">
          <view class="ipt-wrap">
            <input class="ipt" type="text" v-model="text" />
          </view>
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
import { ImmigrantLandEmptyType } from '@/types/impDataFill'
import { updateImpLandlordLandEmptyApi } from '@/service'
import dayjs from 'dayjs'
import { LandlordType } from '@/types/sync'

interface PropsType {
  uid: string
  dataInfo: LandlordType
  immigrantLandEmpty: ImmigrantLandEmptyType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const text = ref<string>('本户生产用地已清理，同意交付给工程建设指挥部处理。')
const date = ref<string>('')

watch(
  () => props.immigrantLandEmpty,
  (val) => {
    if (val) {
      // 基本信息
      const { landEmptyOpinion, landEmptyDate } = val

      if (landEmptyOpinion) {
        text.value = landEmptyOpinion
      }
      if (landEmptyDate) {
        date.value = dayjs(landEmptyDate).format('YYYY-MM-DD')
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

  const params: Partial<ImmigrantLandEmptyType> = {
    landEmptyOpinion: text.value,
    landEmptyDate: dayjs(date.value).toString(),
    isLandEmpty: '1'
  }
  console.log(params, '参数')
  const res = await updateImpLandlordLandEmptyApi(props.uid, params)
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
