<template>
  <view class="produce-wrap">
    <view class="btn-box">
      <view class="btn green-btn">
        <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
        <text class="txt">打印报表</text>
      </view>
      <view class="btn blue-btn" @click="importPre">
        <image class="icon" src="@/static/images/icon_import.png" mode="scaleToFill" />
        <text class="txt">导入模拟安置数据</text>
      </view>

      <view class="btn blue-btn" @click="editProduce">
        <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
        <text class="txt">编辑</text>
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

    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>安置信息</text>
    </view>

    <view class="content">
      <PeopleList :isEdit="false" :demographic-list="demographicList" />
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

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const alertDialog = ref<any>(null)
const emit = defineEmits(['updateData'])

// .filter((item) => item.name !== '增计人口')
const demographicList = computed(() => {
  return props.dataInfo && props.dataInfo.demographicList ? props.dataInfo.demographicList.filter((item) => item.name !== '增计人口'): []
})

const mockDemographicList = computed(() => {
  return props.dataInfo &&
    props.dataInfo.simulateDemographic &&
    props.dataInfo.simulateDemographic.length
    ? props.dataInfo.simulateDemographic
    : []
})

const editProduce = () => {
  routerForward('peopleConfirm', {
    uid: props.dataInfo.uid
  })
}

const produceSubmit = async (data: PopulationType[]) => {
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
  const data = demographicList.value.map((item) => {
    const current = mockDemographicList.value.find((mockItem) => mockItem.demographicId === item.id)
    if (current) {
      item.settingWay = current.settingWay
      item.settingRemark = current.settingRemark
    }
    return item
  })
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
</script>

<style lang="scss" scoped>
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

.content {
  padding-bottom: 20rpx;
}
</style>
