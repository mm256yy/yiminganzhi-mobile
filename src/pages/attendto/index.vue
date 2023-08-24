<template>
  <!-- 所有的办理 -->
  <Container :title="getTitle()">
    <view class="archives-wrap">
      <Procedures
        v-if="handleType === 1"
        :uid="query.uid"
        :immigrantProceduresList="dataInfo?.immigrantProceduresList || []"
        :itemUid="query.data"
        @submit="submitSuccess"
      />

      <Insure
        v-if="handleType === 2"
        :uid="query.uid"
        :demographicList="dataInfo?.demographicList || []"
        :itemUid="query.data"
        @submit="submitSuccess"
      />

      <FindSelf
        v-if="handleType === 3"
        :uid="query.uid"
        :demographicList="dataInfo?.demographicList || []"
        :itemUid="query.data"
        @submit="submitSuccess"
      />

      <HouseVacate
        v-if="handleType === 4"
        :uid="query.uid"
        :data-info="dataInfo"
        :immigrantHouseEmpty="dataInfo?.immigrantHouseEmpty"
        @submit="submitSuccess"
      />

      <LandVacate
        v-if="handleType === 5"
        :uid="query.uid"
        :data-info="dataInfo"
        :immigrantLandEmpty="dataInfo?.immigrantLandEmpty"
        @submit="submitSuccess"
      />

      <TransitionVacate
        v-if="handleType === 6"
        :uid="query.uid"
        :data-info="dataInfo"
        :immigrantExcess="dataInfo?.immigrantExcess"
        @submit="submitSuccess"
      />

      <!-- 集中供养办理/查看 -->
      <CentralizeSupport
        v-if="handleType === 7"
        :uid="query.uid"
        :item-uid="query.itemUid"
        :status="query.status"
        @submit="submitSuccess"
      />

      <!-- 自谋出路办理 -->
      <SelfFindWay v-if="handleType === 8" :uid="query.uid" @submit="submitSuccess" />
    </view>
  </Container>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import Container from '@/components/Container/index.vue'
import { getImpLandlordItemApi } from '@/service'
import { routerBack } from '@/utils'
import { LandlordType } from '@/types/sync'

import Procedures from './procedures.vue'
import Insure from './insure.vue'
import FindSelf from './findself.vue'

import HouseVacate from './houseVacate.vue'
import LandVacate from './landVacate.vue'
import TransitionVacate from './transitionVacate.vue'

import CentralizeSupport from './centralizedSupport.vue' // 引入集中供养 —— 办理组件
import SelfFindWay from './selfFindWay.vue' // 引入自谋出路 —— 办理组件

/**
 * 1 相关手续办理
 * 2 养老保险办理
 * 3 自谋职业办理
 * 4 房屋腾空办理
 * 5 土地腾空办理
 * 6 过渡安置办理
 * 7 集中供养办理
 * 8 自谋出路办理
 */

type HandleTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface QueryType {
  uid: string // 调查对象 uid
  type: HandleTypes // 办理类型
  itemUid?: string // 列表中当前项 ID
  status?: string // 状态值
  data?: any // 其他参数
}

const query = ref<any>({})
onLoad((option) => {
  if (option) {
    query.value = option as QueryType
    getLandlordDetail()
    getTitle()
  }
})

const getTitle = () => {
  if (query.value?.status && query.value?.status === 'view') {
    return '办理详情'
  } else {
    return '办理'
  }
}

// 详情数据
const dataInfo = ref<LandlordType | null>(null)

// 档案类型
const handleType = computed(() => {
  return query.value.type ? +query.value.type : 1
})

// 获取调查对象详情的档案数据
const getLandlordDetail = async () => {
  if (query.value.uid) {
    const res = await getImpLandlordItemApi(query.value.uid)
    if (res) {
      dataInfo.value = res
    }
  }
}

// 保存成功后
const submitSuccess = () => {
  routerBack()
}
</script>

<style lang="scss" scoped>
.archives-wrap {
  padding: 6rpx;
  background-color: #fff;
}
</style>
