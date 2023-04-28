<template>
  <view class="demographic-wrapper">
    <!-- 个人信息 -->
    <view class="list" v-if="props.dataList && props.dataList.length > 0">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <view class="icon">{{ formatDict(item.relation, 307) }}</view>
            <view class="name">{{ formatStr(item.name) }}</view>
          </view>
          <view class="right" v-if="item.relation !== '1'">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteDemographic(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">性别：</view>
                <view class="content">
                  {{ formatDict(item.sex, 292) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">民族：</view>
                <view class="content">
                  {{ formatDict(item.nation, 278) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">出生年月：</view>
                <view class="content">
                  {{ item.birthday ? dayjs(item.birthday).format('YYYY年MM月') : '-' }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">身份证：</view>
                <view class="content">{{ formatStr(item.card) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">婚姻状况：</view>
                <view class="content">
                  {{ formatDict(item.marital, 260) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">人口类型：</view>
                <view class="content">
                  {{ formatDict(item.populationType, 244) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">职业：</view>
                <view class="content">
                  {{ fmtOccupationStr(props.occupationOptions, item.occupation, 2) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">{{ formatStr(item.censusRegister) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加人口信息</view>
    </view>

    <image
      v-if="stage === MainStage.review"
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

    <!-- 删除确认弹框 -->
    <uni-popup v-if="stage === MainStage.review" ref="alertDialog" type="dialog">
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
  fmtOccupationStr,
  routerForward,
  fmtPicUrl,
  getStorage,
  StorageKey
} from '@/utils'
import { showToast } from '@/config'
import { MainStage } from '@/types/common'
import modifyRecords from '../../common/modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => {}
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  occupationOptions: {
    type: Array as any,
    default: () => []
  },
  updateLogList: {
    type: Array as any,
    default: () => []
  }
})

const emit = defineEmits(['deleteDemographic'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})
const reason = ref<string>('') // 删除原因

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

const toLink = (type: string, data?: any) => {
  const { uid } = props.dataInfo
  if (type === 'add') {
    routerForward('demographicInfoEdit', {
      type,
      uid,
      occupationOptions: JSON.stringify(props.occupationOptions)
    })
  } else if (type === 'edit') {
    let params = {
      ...data,
      cardPic: fmtPicUrl(data.cardPic),
      householdPic: fmtPicUrl(data.householdPic),
      otherPic: fmtPicUrl(data.otherPic),
      birthday: data.birthday ? dayjs(data.birthday).format('YYYY-MM-DD') : ''
    }
    routerForward('demographicInfoEdit', {
      params: JSON.stringify(params),
      occupationOptions: JSON.stringify(props.occupationOptions),
      type,
      uid
    })
  }
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteDemographic = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = () => {
  if (stage === MainStage.review) {
    if (!reason.value) {
      showToast('请输入删除原因')
      return
    }
    emit('deleteDemographic', currentItem.value, reason.value)
  } else {
    emit('deleteDemographic', currentItem.value, reason.value)
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
.demographic-wrapper {
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
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          align-items: center;

          .icon {
            display: flex;
            width: auto;
            height: 16rpx;
            padding: 0 5rpx;
            font-size: 9rpx;
            color: #fff;
            background: #faad14;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
          }

          .name {
            margin-left: 5rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;

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
