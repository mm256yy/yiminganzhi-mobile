<template>
  <view class="resettle-wrap">
    <div class="imitate-step-tab">
      <div
        class="step-item"
        :class="{ active: stepIndex === item.id }"
        v-for="item in stepArray"
        :key="item.id"
        @click="stepClick(item.id)"
      >
        <div class="number" v-if="!item.done">{{ item.id }}</div>

        <div class="done" v-else>
          <img class="icon" src="@/assets/imgs/done_icon.png" alt="✅" />
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="next" v-if="stepArray.length - 1 >= item.id"></div>
      </div>
    </div>

    <div class="imitate-step-cont">
      <!-- 搬迁安置 step -->
      <div class="step-cont-move" v-if="stepIndex === 1"> </div>
      <!-- 生产安置 step -->
      <div class="step-cont-production" v-else-if="stepIndex === 2">
        <div class="btn-wrap">
          <div class="btn" @click="stepNext"> 确认 </div>
        </div>
      </div>
    </div>

    <view class="tab-pup">
      <view class="tab-item" @click="viewPdf">安置办法</view>
      <view class="tab-item" @click="descClick">安置说明</view>
      <view class="tab-item" @click="areaDetailOpen">安置点详情</view>
    </view>

    <uni-popup ref="descpopup" type="center">
      <resettleDesc @close="descClose" />
    </uni-popup>

    <uni-popup ref="areadetailpopup" type="center">
      <areaDetail @close="areaDetailClose" />
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { StorageKey, setStorage, getStorage } from '@/utils/storage'
import resettleDesc from './resettleDesc.vue'
import areaDetail from './areaDetail.vue'
import { LandlordType } from '@/types/sync'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const demographicList = computed(() => {
  return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList : []
})

const immigrantWill = computed<any>(() => {
  return props.dataInfo && props.dataInfo.immigrantWill ? props.dataInfo.immigrantWill : {}
})

const uid = computed<any>(() => {
  return props.dataInfo.uid
})

const descpopup = ref<any>(null)
const areadetailpopup = ref<any>(null)
const tableData = ref<any[]>([])

// 步骤条
const stepArray = ref([
  {
    id: 1,
    name: '选择搬迁安置方式',
    done: false
  },
  {
    id: 2,
    name: '选择生产安置方式',
    done: false
  }
])
// 步骤条选中
const stepIndex = ref(1)

const descClick = () => {
  descpopup.value?.open()
}

const descClose = () => {
  descpopup.value?.close()
}

const areaDetailOpen = () => {
  areadetailpopup.value?.open()
}

const areaDetailClose = () => {
  areadetailpopup.value?.close()
}

const viewPdf = () => {
  uni.downloadFile({
    url: 'https://oss.zdwp.tech/migrate/files/85f6a5f5-eadd-46ae-9747-48d3ff8fa24b.pdf',
    success: function (res) {
      var filePath = res.tempFilePath
      uni.openDocument({
        filePath: filePath,
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功')
        }
      })
    }
  })
}

/**
 * 生产安置确认
 */

const stepNext = async () => {
  // 校验数据
  const notFillArray = tableData.value.filter((item: any) => !item.settingWay)
  if (notFillArray && notFillArray.length) {
    uni.showToast({ title: '请选择安置方式', icon: 'none' })
    return
  }
  const data = tableData.value.map((item: any) => {
    return {
      demographicId: item.demographicId,
      settingWay: item.settingWay,
      settingRemark: item.settingRemark
    }
  })
  // const res = await saveSimulateDemographicApi(data)
  // console.log('安置方式更新结果', res)
  // if (res) {
  //   ElMessage.success('生产安置保存成功!')
  // }
}

const stepClick = (id: any) => {
  stepIndex.value = id
}
</script>

<style lang="scss" scoped>
.resettle-wrap {
  width: 100%;
  height: 100%;
  padding-bottom: 50rpx;
  overflow-y: scroll;
}
</style>
