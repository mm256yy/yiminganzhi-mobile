<template>
  <!-- 所有的档案上传 -->
  <Container title="档案上传">
    <view class="archives-wrap">
      <!-- 安置确认 —— 生产安置档案上传 -->
      <ProduceArchives
        v-if="archivesType === 1"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 安置确认 —— 搬迁安置档案上传 -->
      <RelocateArchives
        v-if="archivesType === 2"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 安置确认 —— 坟墓确认档案上传 -->
      <GraveArchives
        v-if="archivesType === 3"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 择址确认 —— 坟墓择址档案上传 -->
      <GraveSiteSelArchives
        v-if="archivesType === 5"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 移民建卡档案上传 -->
      <MigrageCardArchives
        v-if="archivesType === 6"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 腾空过渡 —— 房屋腾空档案上传 -->
      <HouseVacate
        v-if="archivesType === 7"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 腾空过渡 —— 土地腾让档案上传 -->
      <LandVacate
        v-if="archivesType === 8"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 腾空过渡 —— 过渡安置档案上传 -->
      <TransitionVacate
        v-if="archivesType === 9"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 搬迁安置 —— 公寓房档案上传 -->
      <ApartmentArchives
        v-if="archivesType === 10"
        :immigrant-documentation="immigrantDocumentation"
        @submit="submit"
      />

      <!-- 生产安置 —— 农业安置档案上传 -->
      <FarmingArchives
        v-if="archivesType === 11"
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

import ProduceArchives from './produceArchives.vue' // 引入安置确认 —— 生产安置档案上传组件
import RelocateArchives from './relocateArchives.vue' // 引入安置确认 —— 搬迁安置档案上传组件
import GraveArchives from './graveArchives.vue' // 引入安置确认 —— 坟墓确认档案上传组件

import HouseVacate from './houseVacate.vue' // 引入腾空过渡 —— 房屋腾空档案上传组件
import LandVacate from './landVacate.vue' // 引入腾空过渡 —— 土地腾空档案上传组件
import TransitionVacate from './transitionVacate.vue' // 引入腾空过渡 —— 过渡安置档案上传组件

import GraveSiteSelArchives from './graveSiteSelArchives.vue' // 引入择址确认 —— 坟墓择址档案上传组件
import MigrageCardArchives from './migrateCardArchives.vue' // 引入移民建卡档案上传组件

import ApartmentArchives from './apartmentArchives.vue' // 引入搬迁安置 —— 公寓房档案上传组件

import FarmingArchives from './farmingArchives.vue' // 引入生产安置 —— 农业安置档案上传组件

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
 * 10 搬迁安置 公寓房
 * 11 生产安置 农业安置
 */

type ArchivesTypes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface QueryType {
  uid: string
  type: ArchivesTypes
}

const query = ref<any>({})
onLoad((option) => {
  if (option) {
    query.value = option as QueryType
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
  routerBack()
}
</script>

<style lang="scss" scoped>
.archives-wrap {
  width: 100%;
  padding: 6rpx;
  background-color: #e7edfd;
  box-sizing: border-box;
}
</style>
