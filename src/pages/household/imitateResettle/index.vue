<template>
  <view class="resettle-wrap">
    <view class="imitate-step-tab">
      <view
        class="step-item"
        :class="{ active: stepIndex === item.id }"
        v-for="item in stepArray"
        :key="item.id"
        @click="stepClick(item.id)"
      >
        <view class="number" v-if="!item.done">{{ item.id }}</view>

        <view class="done" v-else>
          <image class="icon" src="@/static/images/done_icon.png" alt="✅" />
        </view>
        <view class="name">{{ item.name }}</view>
        <view class="next" v-if="stepArray.length - 1 >= item.id" />
      </view>
    </view>

    <view class="imitate-step-cont">
      <!-- 搬迁安置 step -->
      <view class="step-cont-item" v-if="stepIndex === 1">
        <view class="plan-tab">
          <view class="plan-label">安置方式</view>
          <view
            class="plan-tab-item"
            v-for="item in dict[372]"
            :class="{ active: houseAreaType === item.value }"
            @click="houseAreaTypeChange(item)"
            :key="item.value"
          >
            {{ item.text }}
          </view>
        </view>

        <!-- 宅基地安置 -->
        <homestead
          v-if="houseAreaType === HouseAreaType.homestead"
          :baseInfo="props.dataInfo"
          :doorNo="props.dataInfo.doorNo"
          :immigrantSettle="simulateImmigrantSettle"
          :fromResettleConfirm="false"
          :dataList="dataList"
          @submit="immigrantSettleSubmit"
        />

        <!-- 公寓房安置 -->
        <apartment
          v-else-if="houseAreaType === HouseAreaType.flat"
          :baseInfo="props.dataInfo"
          :doorNo="props.dataInfo.doorNo"
          :immigrantSettle="simulateImmigrantSettle"
          :fromResettleConfirm="false"
          :dataList="dataList"
          @submit="immigrantSettleSubmit"
        />

        <!-- 集中供养安置 -->
        <centerSupport
          v-else-if="houseAreaType === HouseAreaType.concentrate"
          :data="demographicList"
          :doorNo="props.dataInfo.doorNo"
          :immigrantSettle="simulateImmigrantSettle"
          :fromResettleConfirm="false"
          @submit="immigrantSettleSubmit"
        />

        <!-- 自谋职业安置 -->
        <findSelf
          v-else-if="houseAreaType === HouseAreaType.oneself"
          :data="demographicList"
          :doorNo="props.dataInfo.doorNo"
          :immigrantSettle="simulateImmigrantSettle"
          :fromResettleConfirm="false"
          @submit="immigrantSettleSubmit"
        />
      </view>
      <!-- 生产安置 step -->
      <view class="step-cont-item" v-else-if="stepIndex === 2">
        <people
          :is-edit="true"
          :demographicList="(simulateDemographic as any[])"
          :immigrantSettle="simulateImmigrantSettle"
          :dataList="dataList"
          :demographicLists="demographicList"
          @submit="productionResettleSubmit"
        />
      </view>
    </view>

    <view class="tab-pup">
      <view class="tab-item" @click="viewPdf">安置办法</view>
      <view class="tab-item" @click="descClick">安置说明</view>
      <view class="tab-item" @click="areaDetailOpen">安置点详情</view>
    </view>

    <uni-popup ref="descpopup" type="center">
      <resettleDesc @close="descClose" />
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { StorageKey, getStorage } from '@/utils/storage'
import resettleDesc from './resettleDesc.vue'
import people from './components/people.vue'
import homestead from './components/homestead.vue'
import apartment from './components/apartment.vue'
import centerSupport from './components/centerSupport.vue'
import findSelf from './components/findSelf.vue'

import { LandlordType } from '@/types/sync'
import { SimulateDemographicType } from '@/types/impDataFill'
import { HouseAreaType } from '@/types/common'
import { showToast } from '@/config/msg'
import {
  updateImpLandlordSimulateDemographicApi,
  updateImpLandlordSimulateImmigrantSettleApi
} from '@/service'
import { getResettleDetail } from '@/service'
import { OtherDataType } from '@/database';
import type { LocationType } from '@/types/datafill'

const dataList = ref<LocationType[]>([])
const getDataRequest = async () => {
  try {
    const data = await getResettleDetail(OtherDataType.settleAddressList)
    dataList.value = data
  } catch (error) {
    console.log('error', error);
  }
}
interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const areaDetailSubNVue = uni.getSubNVueById('areaDetail')
const emit = defineEmits(['updateData'])

// .filter((item) => item.name !== '增计人口')
// 获取人口列表
const demographicList = computed(() => {
  return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList.filter((item) => item.name !== '增计人口'): []
})

// props.dataInfo &&
// props.dataInfo.simulateDemographic &&
//     props.dataInfo.simulateDemographic.length
//     ? props.dataInfo.simulateDemographic
//     :
// 获取模拟安置 生产安置信息
const simulateDemographic = computed(() => {
  return  props.dataInfo &&
 props.dataInfo.simulateDemographic &&
     props.dataInfo.simulateDemographic.length
    ? props.dataInfo.simulateDemographic
     :demographicList.value.map((item) => {
    const {
      id: demographicId,
      name,
      sex,
      relation,
      card,
      censusType,
      populationNature,
      settingWay,
      settingRemark,
      isDelete
    } = item
    return {
      demographicId,
      name,
      sex,
      relation,
      card,
      censusType,
      populationNature,
      settingWay,
      settingRemark,
      isDelete,
    }
  })
  // return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList : []
})

// 获取模拟安置 搬迁安置信息
const simulateImmigrantSettle = computed(() => {
  console.log(props.dataInfo,'搬迁安置信息')
  return props.dataInfo && props.dataInfo.simulateImmigrantSettle
    ? props.dataInfo.simulateImmigrantSettle
    : {}
})

//获取模拟安置 生产安置信息
const simulateDemographics = computed(() => {
  console.log(props.dataInfo,'生产安置信息')
  return props.dataInfo && props.dataInfo.simulateDemographic
    ? props.dataInfo.simulateDemographic
    : {}
})

const uid = computed<any>(() => {
  return props.dataInfo.uid
})

const descpopup = ref<any>(null)
const houseAreaType = ref<HouseAreaType>(HouseAreaType.homestead)
// 获取数据字典
const dict = getStorage(StorageKey.DICT)

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

const stepClick = (id: any) => {
  stepIndex.value = id
}

const houseAreaTypeChange = (item: any) => {
  houseAreaType.value = item.value
}

/**
 * 生产安置确认
 */
const productionResettleSubmit = async (data: any) => {
  console.log(data,'生产安置确认')
  const res = await updateImpLandlordSimulateDemographicApi(uid.value, data)
  if (res) {
    showToast('生产安置保存成功!')
    emit('updateData')
  }
}

/**
 * 搬迁安置确认
 */
const immigrantSettleSubmit = async (data: any) => {
  console.log(data,'传过来的数据是啥?')
  const res = await updateImpLandlordSimulateImmigrantSettleApi(uid.value, data)
  if (res) {
    showToast('搬迁安置保存成功!')
    stepIndex.value += 1
    emit('updateData')
  }
}

// 打开/关闭子窗口
const areaDetailOpen = () => {
  areaDetailSubNVue.show('zoom-out')
}
const areaDetailClose = () => {
  areaDetailSubNVue.hide('zoom-in')
}

onMounted(() => {
  // 监听关闭子窗口
  uni.$on('areaDetailClose', areaDetailClose)
  getDataRequest()
})

onBeforeUnmount(() => {
  uni.$off('areaDetailClose', areaDetailClose)
})
</script>

<style lang="scss" scoped>
.resettle-wrap {
  width: 100%;
  height: 100%;

  .imitate-step-tab {
    display: flex;
    width: 100%;
    height: 51rpx;
    padding: 9rpx 0;
    background: #fff;
    align-items: center;
    justify-content: center;

    .step-item {
      display: flex;
      align-items: center;
      margin-right: 6rpx;

      .number {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 21rpx;
        height: 21rpx;
        font-size: 9rpx;
        font-weight: 500;
        color: #666666;
        background: #fff;
        border: 1rpx solid #ebebeb;
        border-radius: 50%;
      }

      .done {
        width: 21rpx;
        height: 21rpx;

        .icon {
          width: 21rpx;
          height: 21rpx;
        }
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 9rpx;
        font-size: 9rpx;
        color: #666666;
        word-wrap: none;
        white-space: nowrap;
      }

      .next {
        width: 178rpx;
        height: 1rpx;
        background-color: #ebebeb;
      }

      &.active {
        .number {
          color: #fff;
          background: #3e73ec;
          border: 1rpx solid #3e73ec;
          border-radius: 50%;
        }

        .name {
          color: #171718;
        }
      }
    }
  }

  .imitate-step-cont {
    height: calc(100% - 51rpx);
    background-color: #fff;
  }

  .step-cont-item {
    height: 100%;
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
}

.tab-pup {
  position: fixed;
  right: 176rpx;
  bottom: 23rpx;

  display: flex;
  height: 32rpx;
  padding: 0 14rpx;
  background: #ffffff;
  border-radius: 38rpx;
  box-shadow: 0rpx 5rpx 12rpx 5rpx rgba(0, 0, 0, 0.05);
  align-items: center;

  .tab-item {
    display: flex;
    height: 13rpx;
    padding: 0 7rpx;
    font-size: 9rpx;
    color: #171718;
    border-right: 1rpx solid #ebebeb;
    align-items: center;
    justify-content: center;

    &:last-child {
      border-right: 0 none;
    }
  }
}
</style>
