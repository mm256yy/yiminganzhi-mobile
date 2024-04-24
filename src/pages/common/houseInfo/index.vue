<template>
  <view class="house-info-wrapper">
    <view class="list" v-if="props.dataList && props.dataList.length > 0">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">{{ formatStr(item.houseNo) }}</view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteHouse(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋用途：</view>
                <view class="content">
                  {{ formatDict(item.usageType, 265) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">层高（m）：</view>
                <view class="content">
                  {{ formatNum(item.storeyHeight, '（米）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">层数：</view>
                <view class="content">
                  {{ formatNum(item.storeyNumber, '（层）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋高程（m）：</view>
                <view class="content">
                  {{ formatNum(item.houseHeight, '（米）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">建筑面积：</view>
                <view class="content">
                  {{ formatNum(item.landArea, '（㎡）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">竣工日期：</view>
                <view class="content">
                  {{ item.completedTime ? dayjs(item.completedTime).format('YYYY年MM月') : '-' }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋类别：</view>
                <view class="content">
                  {{ formatDict(item.houseType, 266) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋产别：</view>
                <view class="content">
                  {{ formatDict(item.propertyType, 284) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label" />
                <view class="content" />
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加房屋信息</view>
    </view>

    <image
      v-if="stage === MainStage.review && mainType === MainType.PeasantHousehold"
      class="btn record"
      src="@/static/images/icon_record.png"
      mode="scaleToFill"
      @click="showModifyRecord"
    />

    <image
      class="btn add"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add')"
    />

    <!-- 删除确认框 -->
    <uni-popup
      v-if="stage === MainStage.review && mainType === MainType.PeasantHousehold"
      ref="alertDialog"
      type="dialog"
    >
      <uni-popup-dialog
        type="warn"
        mode="input"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        :value="reason"
        placeholder="请输入删除原因"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>

    <uni-popup v-else ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        content=""
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>

    <!-- 复核修改记录 -->
    <modify-records v-if="showRecord" :dataList="updateLogList" @close="closeModifyRecords" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import {
  formatDict,
  formatStr,
  formatNum,
  routerForward,
  getStorage,
  StorageKey,
  fmtPicUrl
} from '@/utils'
import { MainStage, MainType } from '@/types/common'
import modifyRecords from '../modifyRecords/index.vue' // 引入修改记录组件
import { showToast } from '@/config'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  // 主体类型，如居民户、企业、个体户、村集体
  mainType: {
    type: String,
    default: ''
  },
  // 复核记录
  updateLogList: {
    type: Object as any,
    default: () => {}
  }
})

const emit = defineEmits(['deleteHouse'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})
const reason = ref<string>('') // 删除原因

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

const toLink = (type: string, data?: any) => {
  const { dataInfo, mainType } = props
  const { uid, doorNo, longitude, latitude } = dataInfo
  let commonParams = { type, uid, doorNo, longitude, latitude, mainType }
  if (type === 'edit') {
    let params = {
      ...data,
      completedTime: data.completedTime
        ? dayjs(data.completedTime).format('YYYY-MM')
        : data.completedTime,
      housePic: fmtPicUrl(data.housePic),
      landPic: fmtPicUrl(data.landPic),
      otherPic: fmtPicUrl(data.otherPic),
      homePic: fmtPicUrl(data.homePic)
    }
    routerForward('houseInfoEdit', {
      params: JSON.stringify(params),
      commonParams: JSON.stringify(commonParams)
    })
  } else if (type === 'add') {
    routerForward('houseInfoEdit', {
      commonParams: JSON.stringify(commonParams)
    })
  }
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteHouse = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = (e: any) => {
  if (stage === MainStage.review) {
    if (!e) {
      showToast('请输入删除原因')
      return
    }
    emit('deleteHouse', currentItem.value, e)
  } else {
    emit('deleteHouse', currentItem.value)
  }
}

const dialogClose = () => {
  alertDialog.value.close()
}

// 展示修改记录
const showModifyRecord = () => {
  showRecord.value = true
}

// 关闭修改记录弹窗
const closeModifyRecords = () => {
  showRecord.value = false
}
</script>

<style lang="scss" scoped>
.house-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6rpx 0;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          padding-left: 6rpx;
          font-size: 9rpx;
          color: #171718;
          align-items: center;
          flex: 1;
        }

        .right {
          display: flex;
          flex-direction: row;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 56rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }
        }
      }
    }
  }

  .null-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
    background-color: #fff;

    .icon {
      width: 152rpx;
      height: 92rpx;
    }

    .tips {
      margin-top: 17rpx;
      font-size: 9rpx;
      line-height: 1;
      color: #171718;
    }
  }

  .btn {
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
