<template>
  <!-- 所有的办理 -->
  <Container title="办理详情">
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

/**
 * 1 相关手续办理
 * 2 养老保险办理
 * 3 自谋职业办理
 * 4 房屋腾空办理
 * 5 土地腾空办理
 * 6 过渡安置办理
 */

type HandleTypes = 1 | 2 | 3 | 4 | 5 | 6

interface QueryType {
  uid: string // 调查对象 uid

  type: HandleTypes // 办理类型
  data?: any // 其他参数
}

const query = ref<any>({})
onLoad((option) => {
  if (option) {
    query.value = option as QueryType
    console.log(option, 'query')
    getLandlordDetail()
  }
})
// 详情数据
const dataInfo = ref<LandlordType>()

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
