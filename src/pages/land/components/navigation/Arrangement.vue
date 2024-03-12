<!--生产安置确认-->
<template>
  <view class="main-wrapper">
    <view class="row-1">
      <view class="left">
        <view class="row-label-title">
          本户共计征收土地：{{ totalLand || 0 }}亩，参保系数为：{{ insuranceFactor }}，可参保{{
            num || 0
          }}人，请添加参保人员
        </view>
      </view>
      <view class="right">
        <view class="btn green">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印报表</text>
        </view>
        <view class="btn blue" @click="onArchives">
          <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
          档案上传
        </view>
      </view>
    </view>

    <view class="main-list">
      <scroll-view
        v-if="demographicList && demographicList.length"
        class="scroll-view"
        scroll-y
        :enable-flex="true"
      >
        <view class="scroll">
          <ArrangementListItem
            v-for="(item, index) in demographicList"
            :data="item"
            :key="index"
            @to-detail="handleClickDetail"
            @refresh="refresh"
            @delete-item="dialogItem"
          />
        </view>
      </scroll-view>
      <NoData style="margin-top: 60rpx" v-else />
    </view>
    <image
      class="fix-btn add"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add', {})"
    />

    <!-- 删除确认框 -->
    <uni-popup ref="alertDialogRef" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="是否确认删除该条数据？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ArrangementListItem from './ArrangementListItem.vue'
import NoData from '@/components/NoData/index.vue'
import { formatStr, getStorage, StorageKey, routerForward } from '@/utils'
import { deleteLandlordPeopleApi } from '@/service'
import { SUCCESS_MSG, showToast } from '@/config/msg'
import { getVirutalVillageTreeApi, getLandlordListBySearchApi } from '@/service'
import { MainType } from '@/types/common'
import { onShow } from '@dcloudio/uni-app'

// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const emit = defineEmits(['refreshData'])
const totalLand = ref<any>()
const num = ref<any>()
const currentItem = ref<any>()
const demographicList = ref<any[]>()
const alertDialogRef = ref()

const onArchives = () => {}

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const toLink = (type: string, data: any) => {
  const { uid, doorNo } = props.dataInfo
  if (type === 'edit') {
    let params = {
      type,
      uid,
      doorNo,
      itemUid: data.uid,
      formValue: {
        ...data
      }
    }
    routerForward('arrangementEdit', {
      params: JSON.stringify(params)
    })
  } else if (type === 'add') {
    let params = { type, uid, doorNo }
    routerForward('arrangementEdit', {
      params: JSON.stringify(params)
    })
  }
}

const dialogConfirm = () => {
  const { uid } = props.dataInfo
  deleteLandlordPeopleApi(uid, currentItem.value.uid).then((res) => {
    if (res) {
      showToast(SUCCESS_MSG)
      getListApi()
    }
  })
}

const dialogClose = () => {
  alertDialogRef.value.close()
}

const handleClickDetail = (data: any) => {
  toLink('edit', data)
}

const refresh = () => {
  emit('refreshData')
}

const dialogItem = (data: any) => {
  console.log('DELETE', data)
  currentItem.value = data
  alertDialogRef.value?.open()
}

const insuranceFactor = computed(() => {
  return dict[420][0]?.value
})

onMounted(() => {
  getListApi()
  countNum()
})

const countNum = () => {
  const list = props.dataInfo.landEstimateDtoList?.map((item: any) => item.shapeArea)
  if (list && list.length > 0) {
    const total = list.reduce((pre: any, cur: any) => {
      return pre + cur
    })
    totalLand.value = total.toFixed(2)
    num.value = Math.floor(Number(totalLand.value) / Number(dict[420][0]?.text))
  }
}

onShow(() => {
  getListApi()
})

const getListApi = async () => {
  const params: any = {
    type: MainType.LandNoMove,
    doorNo: props.dataInfo.doorNo
  }

  const res: any[] = await getLandlordListBySearchApi(params)
  demographicList.value = res[0]?.demographicList || []
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: calc(100vh - 80rpx - var(--status-bar-height));
  overflow-y: scroll;
  padding: 12rpx;

  .row-1 {
    display: flex;
    align-items: center;
    margin: 9rpx 0;
    justify-content: space-between;

    .left {
      flex-wrap: wrap;
    }

    .right {
      display: flex;
      align-items: center;

      .btn {
        display: flex;
        height: 23rpx;
        padding: 0 9rpx;
        margin-right: 6rpx;
        font-size: 9rpx;
        color: #fff;
        border-radius: 23rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;

        &.green {
          background-color: #30a952;
        }

        &.blue {
          background-color: #3e73ec;
        }

        .icon {
          width: 9rpx;
          height: 9rpx;
          margin-right: 2rpx;
        }
      }
    }
  }

  .row-label-title {
    color: #333;
    font-size: 8rpx;
  }

  .main-list {
    flex: 1;
    width: 100%;
    margin-top: 7rpx;
  }

  .scroll-view {
    width: 100%;
    height: calc(100vh - var(--status-bar-height) - 33rpx - 18rpx - 6rpx - 10rpx - 42rpx);
  }

  .scroll {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .fix-btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.add {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
