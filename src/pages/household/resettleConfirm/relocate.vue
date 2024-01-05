<template>
  <!-- 安置确认 搬迁安置 -->
  <view class="relocate-wrap">
    <view class="btn-box">
     <view style="display: flex;">
      <view class="btn blue-btn" @click="onImportDataPre">
        <image class="icon" src="@/static/images/icon_import.png" mode="scaleToFill" />
        <text class="txt">导入模拟安置数据</text>
      </view>

      <view class="btn blue-btn" @click="editRelocate">
        <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
        <text class="txt">编辑</text>
      </view>
     </view>
     <view style="display: flex;">
      <view class="btn green-btn">
        <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
        <text class="txt">打印报表</text>
      </view>
      <view class="btn blue-btn" @click="archivesUpload">
        <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
        <text class="txt">档案上传</text>
      </view>
     </view>

      <!-- <view class="btn blue-btn">
          <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
          <text class="txt">问题反馈</text>
        </view> -->
    </view>

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
        :emptyText="emptyText || '暂无更多数据'"
      >
        <uni-tr>
          <uni-th>安置区域</uni-th>
          <uni-th>户型</uni-th>
          <uni-th>数量（套数）</uni-th>
          <uni-th>类型</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in tableData" :key="index">
          <uni-td>{{ item.settleAddressText }}</uni-td>
          <uni-td>{{ item.area }}</uni-td>
          <uni-td>{{ item.num }}</uni-td>
          <uni-td>{{ item.houseTypeText }}</uni-td>
        </uni-tr>
      </uni-table>
    </view>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="请确认是否导入？"
        content="导入模拟数据后，列表中的安置方式将被覆盖"
        @confirm="onConfirm"
        @close="onClose"
      />
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch,onMounted } from 'vue'
import { LandlordType } from '@/types/sync'
import { HouseAreaType } from '@/types/common'
import { ImmigrantSettleType } from '@/types/impDataFill'
import {
  resettleHouseType,
  apartmentAreaSize,
  homesteadAreaSize
} from '@/config'
import { updateImpLandlordRelocateResettleApi } from '@/service'
import { routerBack, routerForward } from '@/utils'
import { getResettleDetail } from '@/service'
import { OtherDataType } from '@/database';
// import type { LocationType } from '@/types/datafill'

const resettleArea = ref<any>([])
const apartmentArea = ref<any>([])

const getDataRequest = async () => {
  try {
    const data1 = await getResettleDetail(OtherDataType.settleAddressList)
    const data2= await getResettleDetail(OtherDataType.settleAddressList)
     resettleArea.value=data1.filter((item) => item.type === '1')
     apartmentArea.value=data2.filter((item) => item.type === '2')
     console.log(resettleArea.value,'接口数据')
  } catch (error) {
    console.log('error', error);
  }
}
interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const loading = ref<boolean>(false)
const tableData = ref<any[]>([])
const emptyText = ref<string>('')

const houseType = ref<HouseAreaType>(HouseAreaType.homestead)
const alertDialog = ref<any>(null)
const emit = defineEmits(['updateData'])



// 搬迁安置
const immigrantSettle = computed(() => {
  return props.dataInfo && props.dataInfo.immigrantSettle ? props.dataInfo.immigrantSettle : {}
})
// 模拟数据
const mockImmigrantSettle = computed(() => {
  return props.dataInfo && props.dataInfo.simulateImmigrantSettle
    ? props.dataInfo.simulateImmigrantSettle
    : {}
})

watch(
  () => immigrantSettle.value,
  (res) => {
    // 整成数组
    console.log(res,'res是什么')
    if (!res) return
    console.log(resettleArea.value,res.settleAddress,'测试数据')
    if (res.houseAreaType === HouseAreaType.homestead || res.houseAreaType === HouseAreaType.flat) {
      const houseTypeText = resettleHouseType.find((item) => item.value === res.houseAreaType)?.text
      if (res.houseAreaType === HouseAreaType.homestead) {
        tableData.value = [
          {
            houseTypeText,
            settleAddressText: resettleArea.value.find((item) => item.id === res.settleAddress)?.name,
            area: homesteadAreaSize.find((item) => item.id === res.areaType)?.name,
            num: 1
          }
        ]
      } else {
        const array: any = []
        if (res.typeOneNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.value.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[0].name,
            num: res.typeOneNum
          })
        }
        if (res.typeTwoNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.value.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[1].name,
            num: res.typeTwoNum
          })
        }
        if (res.typeThreeNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.value.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[2].name,
            num: res.typeThreeNum
          })
        }
        if (res.typeFourNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.value.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[3].name,
            num: res.typeFourNum
          })
        }
        tableData.value = array
      }
    } else {
      if (res.houseAreaType === HouseAreaType.concentrate) {
        emptyText.value = '该户选择集中供养'
      }
      if (res.houseAreaType === HouseAreaType.oneself) {
        emptyText.value = '该户选择自谋职业'
      }
      tableData.value = []
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const archivesUpload = () => {
  routerForward('archives', {
    type: 2,
    uid: props.dataInfo.uid
  })
}

// 导入
const onImportDataPre = async () => {
  alertDialog.value?.open()
}

// 导入数据
const onImportData = () => {
  // 拿到模拟安置的配置
  const {
    houseAreaType,
    typeOneNum,
    typeTwoNum,
    typeThreeNum,
    typeFourNum,
    settleAddress,
    doorNo,
    areaType
  } = mockImmigrantSettle.value
  if (houseAreaType) {
    const data = {
      houseAreaType,
      typeOneNum,
      typeTwoNum,
      typeThreeNum,
      typeFourNum,
      settleAddress,
      doorNo,
      areaType
    }
    houseType.value = houseAreaType as HouseAreaType
    immigrantSettleSubmit(data as Partial<ImmigrantSettleType>)
  }
}

const onClose = () => {
  alertDialog.value?.close()
}

const onConfirm = () => {
  alertDialog.value?.close()
  onImportData()
}

const editRelocate = () => {
  routerForward('relocateConfirm', {
    uid: props.dataInfo.uid
  })
}

const immigrantSettleSubmit = async (data: Partial<ImmigrantSettleType>) => {
  const res = await updateImpLandlordRelocateResettleApi(props.dataInfo.uid, data)
  if (res) {
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    emit('updateData')
  }
}

onMounted(() => {
  getDataRequest()
})
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn {
    display: flex;
    height: 23rpx;
    padding: 0 9rpx;
    margin-left: 6rpx;
    background: #3e73ec;
    border-radius: 23rpx;
    align-items: center;
    justify-content: center;

    &.green-btn {
      background-color: #30a952;
    }

    &.blue-btn {
      background: #3e73ec;
    }

    .icon {
      width: 9rpx;
      height: 9rpx;
      margin-right: 3rpx;
    }

    .txt {
      font-size: 9rpx;
      line-height: 11rpx;
      color: #ffffff;
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
