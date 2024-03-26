<template>
  <!-- 安置确认 搬迁安置 -->
  <Container title="搬迁安置确认" class="relocate-wrap">
    <view class="common-wrap">
      <view class="edit-wrap">
        <view class="plan-tab">
          <view class="plan-label">安置方式</view>
          <view
            class="plan-tab-item"
            v-for="item in filterHouseType"
            :class="{ active: houseType === item.value }"
            @click="houseTypeChange(item)"
            :key="item.value"
          >
            {{ item.text }}
          </view>
        </view>
        <homestead
          v-if="houseType === HouseAreaType.homestead"
          :baseInfo="(dataInfo as LandlordType)"
          :doorNo="doorNo"
          :immigrantSettle="immigrantSettle"
          :fromResettleConfirm="true"
          :dataList="dataList"
          :data="demographicList"
          :flag='false'
          @submit="immigrantSettleSubmit"
        />
        <apartment
          v-else-if="houseType === HouseAreaType.flat"
          :baseInfo="(dataInfo as LandlordType)"
          :doorNo="doorNo"
          :immigrantSettle="immigrantSettle"
          :fromResettleConfirm="true"
          :dataList="dataList"
          :data="demographicList"
          @submit="immigrantSettleSubmit"
        />
        <centerSupport
          v-else-if="houseType === HouseAreaType.concentrate"
          :data="demographicList"
          :doorNo="doorNo"
          :immigrantSettle="immigrantSettle"
          :fromResettleConfirm="true"
          @submit="immigrantSettleSubmit"
        />
        <findSelf
          v-else-if="houseType === HouseAreaType.oneself"
          :data="demographicList"
          :doorNo="doorNo"
          :immigrantSettle="immigrantSettle"
          :fromResettleConfirm="true"
          @submit="immigrantSettleSubmit"
        />
      </view>
    </view>
  </Container>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Container from '@/components/Container/index.vue'
import { computed, ref,onMounted } from 'vue'
import { HouseAreaType } from '@/types/common'
import { PopulationType } from '@/types/datafill'
import { ImmigrantSettleType } from '@/types/impDataFill'
import { StorageKey, getStorage } from '@/utils/storage'
import { resettleHouseType } from '@/config'
import { getImpLandlordItemApi, updateImpLandlordRelocateResettleApi } from '@/service'
import { routerBack } from '@/utils'

import homestead from '../imitateResettle/components/homestead.vue'
import apartment from '../imitateResettle/components/apartment.vue'
import centerSupport from '../imitateResettle/components/centerSupport.vue'
import findSelf from '../imitateResettle/components/findSelf.vue'
import { LandlordType } from '@/types/sync'
import { getResettleDetail } from '@/service'
import { OtherDataType } from '@/database';
import type { LocationType } from '@/types/datafill'

const dataList = ref<LocationType[]>([])
const getDataRequest = async () => {
  try {
    const data = await getResettleDetail(OtherDataType.settleAddressList)
    dataList.value=data
  } catch (error) {
    console.log('error', error);
  }
}
const uid = ref<string>('')
const doorNo = ref<string>('')
const demographicList = ref<PopulationType[]>([])
const houseType = ref<HouseAreaType>(HouseAreaType.homestead)
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const immigrantSettle = ref<Partial<ImmigrantSettleType>>()
const dataInfo = ref<LandlordType>()

onLoad((option) => {
  if (option && option.uid) {
    uid.value = option.uid
    getLandlordDetail()
  }
})

/**
 * 根据户主人口性质过滤安置类型
 */
const filterHouseType = computed(() => {
  const population = demographicList.value
    ? demographicList.value.find((item) => item.relation === '1')
    : null
  // 农村移民
  if (population && population.populationNature !== '1') {
    console.log(dict[372], 372)
    return dict[372].map((item: any) => {
      if (item.value === HouseAreaType.homestead) {
        item.disabled = true
      }
      return item
    })
  }
  return resettleHouseType
})

// 获取调查对象详情的档案数据
const getLandlordDetail = async () => {
  if (uid.value) {
    const res = await getImpLandlordItemApi(uid.value)
    if (res) {
      dataInfo.value = res
      demographicList.value = res.demographicList
      console.log(res.demographicList,'demographicList')
      doorNo.value = res.doorNo
      console.log(res.immigrantSettle, 'immigrantSettle')
      immigrantSettle.value = res.immigrantSettle || {}
      if (res.immigrantSettle.houseAreaType) {
        houseType.value = res.immigrantSettle.houseAreaType
      }
    }
  }
}

const houseTypeChange = (item: any) => {
  houseType.value = item.value
}

const immigrantSettleSubmit = async (data: Partial<ImmigrantSettleType>) => {
  const res = await updateImpLandlordRelocateResettleApi(uid.value, data)
  console.log(res, '保存结果')
  if (res) {
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    routerBack()
  }
}
onMounted(() => {
  getDataRequest()
})
</script>

<style lang="scss" scoped>
.common-wrap {
  height: 100%;
  padding: 6rpx;
  overflow-y: scroll;
  background-color: #fff;
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

.edit-wrap {
  overflow-y: scroll;

  .plan-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33rpx;
    padding-top: 9rpx;
    margin: 9rpx 0;

    .plan-label {
      font-size: 9rpx;
      font-weight: 500;
      color: #171718;
    }

    .plan-tab-item {
      display: flex;
      height: 23rpx;
      padding: 0 21rpx;
      margin-left: 9rpx;
      font-size: 9rpx;
      font-weight: 500;
      color: #171718;
      background-color: #fff;
      border: 1rpx solid #ebebeb;
      border-radius: 5rpx;
      align-items: center;
      justify-content: center;

      &.active {
        color: #3e73ec;
        background-color: #f2f6ff;
        border: 1rpx solid #3e73ec;
      }
    }
  }
}
</style>
