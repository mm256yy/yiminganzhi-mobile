<template>
  <!-- 安置确认 搬迁安置 -->
  <view class="relocate-wrap">
    <view class="btn-box-wrap">
      <view class="btn-box">
        <view class="btn green-btn">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印报表</text>
        </view>
        <view class="btn blue-btn" @click="onImportDataPre">
          <image class="icon" src="@/static/images/icon_import.png" mode="scaleToFill" />
          <text class="txt">导入模拟安置数据</text>
        </view>

        <view class="btn blue-btn" @click="editRelocate">
          <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
          <text class="txt">修改</text>
        </view>

        <view class="btn blue-btn" @click="archivesUpload">
          <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
          <text class="txt">档案上传</text>
        </view>

        <!-- <view class="btn blue-btn">
          <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
          <text class="txt">问题反馈</text>
        </view> -->
      </view>
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
        emptyText="暂无更多数据"
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
          <uni-td>{{ item.settleRemark }}</uni-td>
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
import { ref, computed, onMounted, watch } from 'vue'
import { LandlordType } from '@/types/sync'
import { HouseType } from '@/types/common'
import { ImmigrantSettleType } from '@/types/impDataFill'
import {
  resettleArea,
  resettleHouseType,
  apartmentArea,
  apartmentAreaSize,
  homesteadAreaSize
} from '../imitateResettle/config'
import { updateImpLandlordRelocateResettleApi } from '@/service'
import { routerBack, routerForward } from '@/utils'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const loading = ref<boolean>(false)
const tableData = ref<any[]>([])

const houseType = ref<HouseType>(HouseType.homestead)
const alertDialog = ref<any>(null)
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
    if (!res) return
    if (res.houseAreaType === HouseType.homestead || res.houseAreaType === HouseType.flat) {
      const houseTypeText = resettleHouseType.find((item) => item.value === res.houseAreaType)?.text
      if (res.houseAreaType === HouseType.homestead) {
        tableData.value = [
          {
            houseTypeText,
            settleAddressText: resettleArea.find((item) => item.id === res.settleAddress)?.name,
            area: homesteadAreaSize.find((item) => item.id === res.areaType)?.name,
            num: 1
          }
        ]
      } else {
        const array: any = []
        if (res.typeOneNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[0].name,
            num: res.typeOneNum
          })
        }
        if (res.typeTwoNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[1].name,
            num: res.typeTwoNum
          })
        }
        if (res.typeThreeNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[2].name,
            num: res.typeThreeNum
          })
        }
        if (res.typeFourNum) {
          array.push({
            houseTypeText,
            settleAddressText: apartmentArea.find((item) => item.id === res.settleAddress)?.name,
            area: apartmentAreaSize[3].name,
            num: res.typeFourNum
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
  houseType.value = houseAreaType as HouseType
  immigrantSettleSubmit(data)
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
  console.log(res, '保存结果')
  if (res) {
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    routerBack()
  }
}
</script>

<style lang="scss" scoped>
.btn-box-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9rpx 0 0;

  .edit-back {
    display: flex;
    height: 23rpx;
    padding: 0 9rpx;
    background-color: #3e73ec;
    border-radius: 23rpx;
    align-items: center;
    justify-content: center;

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

.btn-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;

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
