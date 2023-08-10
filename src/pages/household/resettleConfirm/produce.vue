<template>
  <view class="produce-wrap">
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>家庭情况</text>
    </view>

    <PeopleList :demographic-list="demographicList" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PeopleList from '../imitateResettle/components/people.vue'
import { LandlordType } from '@/types/sync'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()

const demographicList = computed(() => {
  return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList : []
})
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
</style>
