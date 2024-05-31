<template>
  <view class="produce-wrap">
    <view class="btn-box">
      <view style="display: flex">
        <view class="btn blue-btn" @click="importPre">
          <image class="icon" src="@/static/images/icon_import.png" mode="scaleToFill" />
          <text class="txt">导入模拟安置数据</text>
        </view>

        <view class="btn blue-btn" @click="editProduce">
          <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
          <text class="txt">编辑</text>
        </view>
      </view>
      <view style="display: flex">
        <view class="btn green-btn" @click="handleClick">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印</text>
        </view>

        <view class="btn blue-btn" @click="archivesUpload">
          <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
          <text class="txt">进度上报</text>
        </view>
      </view>
      <!-- <view class="btn blue-btn">
          <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
          <text class="txt">问题反馈</text>
        </view> -->
    </view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>土地信息</text>
    </view>
        <view class="table-wrap">
           <scroll-view scroll-x="true" style="width: 100%; white-space: nowrap;">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="28rpx" align="center">序号</uni-th>
          <uni-th width="50rpx" align="center">所在区域</uni-th>
          <uni-th width="40rpx">淹没范围</uni-th>
          <uni-th width="40rpx">图幅号</uni-th>
          <uni-th width="40rpx">地块编号</uni-th>
          <uni-th width="50rpx">地名</uni-th>
          <uni-th width="40rpx">使用权人</uni-th>
          <uni-th width="40rpx">土地性质</uni-th>
          <uni-th width="40rpx">地类</uni-th>
          <uni-th width="40rpx">面积(亩)</uni-th>
          <uni-th width="40rpx">周长(米)</uni-th>
          <uni-th width="40rpx">备注</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in landEstimateDtoList" :key="index">
          <uni-td>{{ index + 1 }}</uni-td>
          <uni-td>{{ item.areaText }}</uni-td> 
          <uni-td>{{ item.inundationRangeText}}</uni-td>
          <uni-td>{{ item.sheetNumber }}</uni-td>
          <uni-td>{{ item.landNumber }}</uni-td>
          <uni-td>{{ item.landName }}</uni-td>
          <uni-td>{{ item.rightHolder }}</uni-td>
          <uni-td>{{ item.landNatureText }}</uni-td>
          <uni-td>{{ item.landTypeText }}</uni-td>
          <uni-td>{{ item.shapeArea }}</uni-td>
          <uni-td>{{ item.shapeLeng }}</uni-td>
          <uni-td>{{ item.remark }}</uni-td>
        </uni-tr>
      </uni-table>
       </scroll-view> 
    </view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>安置信息</text>
    </view>
    <view class="content">
      <PeopleList
        :isEdit="false"
        :demographic-list="demographicList"
        :demographiclists="demographicList"
        :flag="false"
      />
    </view>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="请确认是否导入？"
        content="导入模拟数据后，列表中的安置方式将被覆盖"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PeopleList from '../imitateResettle/components/people.vue'
import { LandlordType } from '@/types/sync'
import { PopulationType } from '@/types/datafill'
import { updateImpLandlordPeopleBatchApi } from '@/service'
import { routerForward } from '@/utils'
import {getStorage, StorageKey} from '@/utils'
// import { formatEmptyText } from '@/utils/format'

interface PropsType {
  dataInfo: LandlordType
}
// 相关土地表
const landEstimateDtoList = computed(() => {
  console.log(props.dataInfo.landEstimateDtoList,'土地数据')
  return props.dataInfo.landEstimateDtoList || []
})
const props = defineProps<PropsType>()
const alertDialog = ref<any>(null)
const emit = defineEmits(['updateData'])
// const dict = getStorage(StorageKey.DICT)
// .filter((item) => item.name !== '增计人口')
const demographicList = computed(() => {
  // return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList.filter((item) => item.name !== '增计人口') : []
  return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList : []
})

const mockDemographicList = computed(() => {
  return props.dataInfo &&
    props.dataInfo.simulateDemographic &&
    props.dataInfo.simulateDemographic.length
    ? props.dataInfo.simulateDemographic
    : []
})

// 模拟安置导入的安置方式等数据
const mockImmigrantSettle = computed(() => {
  return props.dataInfo && props.dataInfo.simulateImmigrantSettle
    ? props.dataInfo.simulateImmigrantSettle
    : {}
})
// 搬迁安置
const immigarntSettle = computed(() => {
  return props.dataInfo && props.dataInfo.immigrantSettle ? props.dataInfo.immigrantSettle : {}
})

// watch(
//   () => immigrantSettle.value,
//   (res) => {
//     // 整成数组
//     console.log(res, 'res是什么')
//     if (!res) return
//     // getDataRequest(res)
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// )
const editProduce = () => {
  console.log(props.dataInfo.immigrantSettle, '测试编辑')
  routerForward('peopleConfirm', {
    uid: props.dataInfo.uid,
    immigrantSettle: JSON.stringify(props.dataInfo.simulateImmigrantSettle)
  })
}

const produceSubmit = async (data: PopulationType[]) => {
  console.log(data, '保存的是啥？')
  const res = await updateImpLandlordPeopleBatchApi(props.dataInfo.uid, data)
  if (res) {
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    emit('updateData')
  }
}

const importPre = () => {
  alertDialog.value?.open()
}

// 导入模拟安置
const dialogConfirm = () => {
  console.log(mockDemographicList.value, '模拟数据1')
  console.log(mockImmigrantSettle.value, '测试模拟')
  const data = demographicList.value.map((item) => {
    const current = mockDemographicList.value.find((mockItem) => mockItem.uid === item.uid)
    if (current) {
      item.settingWay = current.settingWay
      item.settingRemark = current.settingRemark
      item.isProduction = current.isProduction
    }
    return item
  })
  console.log(data, '最终传输的数据')
  produceSubmit(data)
}

const dialogClose = () => {
  alertDialog.value?.close()
}

const archivesUpload = () => {
  routerForward('archives', {
    type: 1,
    uid: props.dataInfo.uid
  })
}
const handleClick = () => {
  routerForward('pdfSerch', {
    data: JSON.stringify(demographicList.value),
    dataInfo: JSON.stringify(props.dataInfo),
    id: 1
  })
}
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

.content {
  padding-bottom: 20rpx;
}
</style>
