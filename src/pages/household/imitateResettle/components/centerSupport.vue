<template>
  <view class="house-wrap">
    <view class="house-box">
      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>家庭情况</text>
      </view>

      <view class="base-info">
        <view class="base-column">
          <view class="info-item">
            <view class="label">户主：</view>
            <view class="value">
              {{ resettlePeopleInfo().householder ? resettlePeopleInfo().householder.name : '' }}</view
            >
          </view>
          <view class="info-item">
            <view class="label">迁出地址：</view>
            <view class="value">
              {{
                resettlePeopleInfo().householder ? resettlePeopleInfo().householder.censusRegister : ''
              }}
            </view>
          </view>
        </view>

        <view class="base-column">
          <view class="info-item">
            <view class="label">户内人口：</view>
            <view class="value">{{ resettlePeopleInfo().total }}</view>
          </view>
          <view class="info-item">
            <view class="label">联系方式：</view>
            <view class="value">
              {{ resettlePeopleInfo().householder ? resettlePeopleInfo().householder.phone : '' }}</view
            >
          </view>
        </view>
      </view>

      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>集中供养</text>
      </view>

      <view class="info-text"> 该户选择集中供养 </view>
      <uni-col :span="12">
        <uni-forms-item label="养老院:" label-align="right" name="beadhouselist.nursingHome">
          <uni-data-select v-model="beadhouselist.nursingHome" :localdata="dict[416]" />
        </uni-forms-item>
      </uni-col>
      <view class="btn-wrap">
        <view class="btn" @click="submitResettle">{{
          fromResettleConfirm ? '确定' : '确定，进入下一步'
        }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref,onMounted } from 'vue'
import { HouseAreaType } from '@/types/common'
import { getStorage, StorageKey } from '@/utils'
interface PropsType {
  data: any
  doorNo: string
  immigrantSettle: any
  fromResettleConfirm?: boolean
}
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()
const beadhouselist = ref<any>({
  nursingHome: ''
})
const resettlePeopleInfo = () => {
  let householder: any = null
  console.log(props.immigrantSettle, '模拟集中供养数据')
  beadhouselist.value.nursingHome = props.immigrantSettle.nursingHome.toString()
  console.log(beadhouselist.value.nursingHome, '赋值的数据')
  if (props.data && props.data.length) {
    householder = props.data.find((item: any) => item.relation === '1')
  }
  console.log(householder, '模拟集中供养')

  return {
    total: props.data.filter((item: any) => item.name != '增计人口' && item.isDelete != '1').length,
    householder
  }
}

const submitResettle = async () => {
  const params: any = {
    houseAreaType: HouseAreaType.concentrate,
    doorNo: props.doorNo,
    nursingHome: beadhouselist.value.nursingHome
  }
  if (props.immigrantSettle && props.immigrantSettle.uid) {
    params.uid = props.immigrantSettle.uid
  }
  console.log(params, '模拟集中供养传输数据')
  emit('submit', params)
}

onMounted(() => {
  resettlePeopleInfo()
})
</script>

<style lang="scss" scoped>
.base-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12rpx;
  margin-top: 9rpx;

  .base-column {
    flex: 50%;

    .info-item {
      display: flex;
      align-items: center;
      height: 13rpx;
      margin: 6rpx 6rpx 0 0;

      .label {
        flex: none;
        width: 75rpx;
        font-size: 9rpx;
        color: rgba(19, 19, 19, 0.4);
      }

      .value {
        flex: 1;
        font-size: 9rpx;
        color: #171718;
      }
    }
  }
}

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

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15rpx 0 65rpx;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26rpx;
    min-width: 70rpx;
    padding: 0 11px;
    font-size: 11px;
    font-weight: 500;
    color: #ffffff;
    background: #3e73ec;
    border-radius: 2rpx;
  }
}

.info-text {
  padding: 5rpx 12rpx;
  margin-top: 6rpx;
  font-size: 9rpx;
  color: #171718;
}
</style>
