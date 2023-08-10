<template>
  <!-- 安置确认 搬迁安置 -->
  <view class="relocate-wrap">
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>搬迁安置信息</text>
    </view>

    <view class="table-wrap">
      <uni-table
        class="table"
        ref="table"
        :loading="loading"
        border
        stripe
        emptyText="暂无更多数据"
      >
        <uni-tr>
          <uni-th width="66rpx">安置区域</uni-th>
          <uni-th width="60rpx">户型</uni-th>
          <uni-th width="90rpx">数量（套数）</uni-th>
          <uni-th width="52rpx">类型</uni-th>
          <uni-th>备注</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in tableData" :key="index">
          <uni-td>{{ item.settleAddressText }}</uni-td>
          <uni-td>{{ item.area }}</uni-td>
          <uni-td>{{ item.num }}</uni-td>
          <uni-td>{{ item.houseTypeText }}</uni-td>
          <uni-td>{{ item.settleRemark }}</uni-td>
        </uni-tr>
      </uni-table>
    </view>

    <view class="edit-wrap">
      <view class="plan-tab">
        <view class="plan-label">安置方式</view>
        <view
          class="plan-tab-item"
          v-for="item in dict[372]"
          :class="{ active: houseType === item.value }"
          @click="houseTypeChange(item)"
          :key="item.value"
        >
          {{ item.text }}
        </view>
      </view>
      <homestead
        v-if="houseType === HouseType.homestead"
        :baseInfo="props.dataInfo"
        :doorNo="props.dataInfo.doorNo"
        :immigrantSettle="{}"
        :fromResettleConfirm="false"
        @submit="immigrantSettleSubmit"
      />
      <apartment
        v-else-if="houseType === HouseType.flat"
        :baseInfo="props.dataInfo"
        :doorNo="props.dataInfo.doorNo"
        :immigrantSettle="{}"
        :fromResettleConfirm="false"
        @submit="immigrantSettleSubmit"
      />
      <centerSupport
        v-else-if="houseType === HouseType.concentrate"
        :data="demographicList"
        :doorNo="props.dataInfo.doorNo"
        :immigrantSettle="{}"
        :fromResettleConfirm="false"
        @submit="immigrantSettleSubmit"
      />
      <findSelf
        v-else-if="houseType === HouseType.oneself"
        :data="demographicList"
        :doorNo="props.dataInfo.doorNo"
        :immigrantSettle="{}"
        :fromResettleConfirm="false"
        @submit="immigrantSettleSubmit"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { LandlordType } from '@/types/sync'
import { HouseType } from '@/types/common'
import { StorageKey, getStorage } from '@/utils/storage'
import {
  resettleArea,
  resettleHouseType,
  apartmentArea,
  apartmentAreaSize,
  homesteadAreaSize
} from '../imitateResettle/config'

import homestead from '../imitateResettle/components/homestead.vue'
import apartment from '../imitateResettle/components/apartment.vue'
import centerSupport from '../imitateResettle/components/centerSupport.vue'
import findSelf from '../imitateResettle/components/findSelf.vue'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const loading = ref<boolean>(false)
const tableData = ref<any[]>([])

const demographicList = computed(() => {
  return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList : []
})

const houseType = ref<HouseType>(HouseType.homestead)
const immigrantSettle = ref<any>(null)
const mockImmigrantSettle = ref<any>(null)
const editDialogVisible = ref<boolean>(false)
const peopleList = ref<any[]>([])
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const form = ref<any>({})

onMounted(() => {
  form.value = props.dataInfo
  // 获取模拟数据
  getMockData()
  // 获取搬迁安置数据
  getRelocationInfo()
})

const rules = ref()
const dialogVisible = ref(false)

/**
 * 根据户主人口性质过滤安置类型
 */
const filterHouseType = () => {
  const population = peopleList.value.find((item) => item.relation === '1')
  // 农村移民
  if (population && population.populationNature !== '1') {
    return resettleHouseType.map((item) => {
      if (item.id === HouseType.homestead) {
        item.disabled = true
      }
      return item
    })
  }
  return resettleHouseType
}

/**
 * 获取搬迁安置方式信息
 */
const getRelocationInfo = async () => {
  // const res = await getRelocationInfoApi(props.doorNo)
  // if (res) {
  //   houseType.value = res.houseType
  //   immigrantSettle.value = res
  // }
}

watch(
  () => immigrantSettle.value,
  (res) => {
    // 整成数组
    if (!res) return
    if (res.houseType === HouseType.homestead || res.houseType === HouseType.flat) {
      const houseTypeText = resettleHouseType.find((item) => item.id === res.houseType)?.name
      if (res.houseType === HouseType.homestead) {
        tableData.value = [
          {
            houseTypeText,
            settleAddressText: resettleArea.find((item) => item.id === res.settleAddress)?.name,
            area: homesteadAreaSize.find((item) => item.id === res.areaType)?.name,
            num: 1,
            resettleRemark: res.resettleRemark
          }
        ]
      } else {
        const array: any = []
        if (res.typeOneNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[0].name,
            num: res.typeOneNum,
            resettleRemark: res.resettleRemark
          })
        }
        if (res.typeTwoNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[1].name,
            num: res.typeTwoNum,
            resettleRemark: res.resettleRemark
          })
        }
        if (res.typeThreeNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[2].name,
            num: res.typeThreeNum,
            resettleRemark: res.resettleRemark
          })
        }
        if (res.typeFourNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[3].name,
            num: res.typeFourNum,
            resettleRemark: res.resettleRemark
          })
        }
        tableData.value = array
      }
    } else {
      tableData.value = []
    }
  },
  {
    deep: true,
    immediate: true
  }
)
// 获取模拟数据
const getMockData = async () => {
  // const res = await getSimulateImmigrantSettleApi(props.dataInfo.doorNo)
  // if (res) {
  //   mockImmigrantSettle.value = res
  // }
}

// 导入
const onImportDataPre = async () => {
  dialogVisible.value = true
}

// 导入数据
const onImportData = async () => {
  // 拿到模拟安置的配置
  immigrantSettle.value = { ...mockImmigrantSettle.value }
  houseType.value = mockImmigrantSettle.value.houseType
  // ElMessage.success('导入成功！')
}

const onClose = () => {
  dialogVisible.value = false
}

const onSubmit = () => {
  dialogVisible.value = false
  onImportData()
}

// 新增 搬迁安置信息
const onEditResettle = () => {
  onEditOpen()
}

const onEditOpen = () => {
  editDialogVisible.value = true
}

const onEditClose = () => {
  editDialogVisible.value = false
}

const houseTypeChange = (item: any) => {
  houseType.value = item.value
}

const immigrantSettleSubmit = async (params: any) => {
  // const res = await saveRelocationInfoApi(params)
  // console.log(res, '保存结果')
  // if (res) {
  //   editDialogVisible.value = false
  //   immigrantSettle.value = res
  //   ElMessage.success('保存成功！')
  // }
}
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

.edit-wrap {
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

.uni-table-th {
  height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  font-weight: normal;
  line-height: 28rpx;
  color: #737374;
  background-color: #f8f8f8;
}

.uni-table-td {
  min-height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  line-height: 28rpx;
  color: #171718;

  &.blue {
    color: #3e73ec;
  }
}

.uni-table-text {
  font-size: 9rpx;
}
</style>
