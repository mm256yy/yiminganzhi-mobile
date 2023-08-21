<template>
  <view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>办理信息</text>
    </view>

    <view class="arch-box">
      <view class="arch-item">
        <view class="arch-label"><text class="red">*</text> 相关凭证：</view>
        <view class="arch-value">
          <uploadFiles
            :limit="20"
            show-type="grid"
            :file-list="pic1"
            :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
            v-model="pic1"
          />
        </view>
      </view>

      <view class="arch-item">
        <view class="arch-label">完成时间：</view>
        <view class="arch-value">
          <uni-datetime-picker type="date" :clear-icon="true" v-model="date" />
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
import uploadFiles from '@/components/UploadFile/index.vue'
import { ImmigrantProceduresType } from '@/types/impDataFill'
import { updateImpLandlordProceduresApi } from '@/service'
import dayjs from 'dayjs'

interface PropsType {
  uid: string
  itemUid: string
  immigrantProceduresList: ImmigrantProceduresType[]
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const pic1 = ref<string>('[]')
const date = ref<string>('')

watch(
  () => props.immigrantProceduresList,
  (val) => {
    if (val) {
      const procedures = val.find((item) => item.uid === props.itemUid)
      if (procedures) {
        const { completePic, completeDate } = procedures

        if (completePic) {
          pic1.value = completePic
        }
        if (completeDate) {
          date.value = dayjs(completeDate).format('YYYY-MM-DD')
        }
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = async () => {
  if (!pic1.value || pic1.value === '[]') {
    uni.showToast({
      title: '请上传凭证',
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

  const params = {
    completePic: pic1.value,
    completeDate: dayjs(date.value).toString(),
    needHandle: '1', // 是否需要办理01
    isComplete: '1'
  }
  console.log(params, '参数')
  const res = await updateImpLandlordProceduresApi(props.uid, props.itemUid, params)
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

.submit-btn {
  position: fixed;
  right: 25rpx;
  bottom: 20rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
}
</style>
