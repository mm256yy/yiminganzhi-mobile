<template>
  <!-- 所有的档案上传 -->
  <Container title="档案上传">
    <view class="archives-wrap">
      <HouseVacate
        v-if="archivesType === 7"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />
      <LandVacate
        v-if="archivesType === 8"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />
      <TransitionVacate
        v-if="archivesType === 9"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />
      <ProduceArchives
        v-if="archivesType === 1"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <RelocateArchives
        v-if="archivesType === 2"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <GraveArchives
        v-if="archivesType === 3"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <FarmingArchives
        v-if="archivesType === 10"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />
    </view>
  </Container>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import Container from '@/components/Container/index.vue'
import { updateImpLandlordDocumentationApi, getImpLandlordItemApi } from '@/service'
import { ImmigrantDocumentationType } from '@/types/impDataFill'
import { routerBack } from '@/utils'

import HouseVacate from './houseVacate.vue'
import LandVacate from './landVacate.vue'
import TransitionVacate from './transitionVacate.vue'
import ProduceArchives from './produceArchives.vue'
import RelocateArchives from './relocateArchives.vue'
import GraveArchives from './graveArchives.vue'

import FarmingArchives from './farmingArchives.vue'

/**
 * 1 安置确认 生产安置档案
 * 2 安置确认 搬迁安置档案
 * 3 安置确认 坟墓档案
 * 4 择房择址 择址档案
 * 5 择房择址 坟墓档案
 * 6 移民建卡 档案
 * 7 腾空过渡 房屋腾空
 * 8 腾空过渡 土地腾空
 * 9 腾空过渡 过渡安置
 * 10 生产安置 农业安置
 */

type ArchivesTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface QueryType {
  uid: string
  type: ArchivesTypes
}

const query = ref<any>({})
onLoad((option) => {
  if (option) {
    query.value = option as QueryType
    console.log(option, 'query')
    getLandlordDetail()
  }
})
// 档案详情数据
const immigrantDocumentation = ref<Partial<ImmigrantDocumentationType>>({})

// 档案类型
const archivesType = computed(() => {
  return query.value.type ? +query.value.type : 1
})

// 获取调查对象详情的档案数据
const getLandlordDetail = async () => {
  if (query.value.uid) {
    const res = await getImpLandlordItemApi(query.value.uid)
    if (res) {
      immigrantDocumentation.value = res.immigrantDocumentation
    }
  }
}

// 更新档案数据
const submit = async (data: Partial<ImmigrantDocumentationType>) => {
  if (!data) {
    return
  }
  const res = await updateImpLandlordDocumentationApi(query.value.uid, data)
  if (res) {
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    submitSuccess()
  }
}

// 保存成功后
const submitSuccess = () => {
  console.log('提交成功逻辑')
  routerBack()
}
</script>

<style lang="scss" scoped>
.archives-wrap {
  padding: 6rpx;
  background-color: #fff;
}
</style>
