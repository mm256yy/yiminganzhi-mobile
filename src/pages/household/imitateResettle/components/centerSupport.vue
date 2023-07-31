<template>
  <view class="homestead-wrap">
    <view class="common-form-group">
      <view class="common-form-item">
        <view class="common-label">户主：</view>
        <view class="common-value">
          {{ resettlePeopleInfo.householder ? resettlePeopleInfo.householder.name : '' }}
        </view>
      </view>

      <view class="common-form-item">
        <view class="common-label">户内人口：</view>
        <view class="common-value"> {{ resettlePeopleInfo.total }} </view>
      </view>

      <view class="common-form-item">
        <view class="common-label">迁出地：</view>
        <view class="common-value"> fdsadsa </view>
      </view>

      <view class="common-form-item">
        <view class="common-label">联系方式：</view>
        <view class="common-value">
          {{ resettlePeopleInfo.householder ? resettlePeopleInfo.householder.phone : '' }}
        </view>
      </view>
    </view>

    <view class="common-form-item">
      <view class="common-label">集中供养：</view>
      <view class="common-value"> 该户选择集中供养 </view>
    </view>

    <view class="btn-wrap">
      <view class="btn" @click="submitResettle">确定，进入下一步</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { HouseType } from '../config'

interface PropsType {
  data: any
  doorNo: string
  immigrantSettle: any
  fromResettleConfirm?: boolean
}

const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()

const resettlePeopleInfo = computed(() => {
  let householder: any = null
  if (props.data && props.data.length) {
    householder = props.data.find((item: any) => item.relation === '1')
  }

  return {
    total: props.data.length,
    householder
  }
})

const submitResettle = async () => {
  const params: any = {
    houseAreaType: HouseType.concentrate,
    doorNo: props.doorNo
  }
  if (props.immigrantSettle && props.immigrantSettle.id) {
    params.id = props.immigrantSettle.id
  }
  emit('submit', params)
}
</script>

<style lang="scss" scoped>
.common-form-group {
  display: flex;
  align-items: center;
}

.common-form-item {
  display: flex;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px dotted #ebebeb;

  .common-label {
    width: 140px;
    font-size: 14px;
    line-height: 32px;
    color: #131313;
    text-align: right;
  }

  .common-value {
    flex: 1;
    font-size: 14px;
    color: #131313;
  }
}

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 26px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    background: #3e73ec;
    border-radius: 4px 4px 4px 4px;
  }
}
</style>
