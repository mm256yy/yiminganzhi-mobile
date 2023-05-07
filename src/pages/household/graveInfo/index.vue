<template>
  <view class="grave-info-wrapper">
    <!-- 坟墓信息 -->
    <view class="list" v-if="props.dataList && props.dataList.length > 0">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left"> 与登记人关系：{{ formatDict(item.relation, 307) }} </view>
          <view class="right" v-if="item.relation !== '1'">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteGraveInfo(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">立墓年份：</view>
                <view class="content">{{ formatStr(item.graveYear) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">穴位：</view>
                <view class="content">
                  {{ formatDict(item.graveType, 345) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">数量：</view>
                <view class="content">
                  {{ formatStr(item.number, '（座）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">材料：</view>
                <view class="content">
                  {{ formatDict(item.materials, 295) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ formatDict(item.gravePosition, 288) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">所属村集体：</view>
                <view class="content">
                  {{ dictOption(collectiveList, item.householdId) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">{{ formatStr(item.remark) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">暂无信息</view>
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
    <uni-popup ref="alertDialog" type="dialog">
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
import { onLoad } from '@dcloudio/uni-app'
import { formatStr, formatDict, dictOption, getStorage, StorageKey, routerForward } from '@/utils'
import { MainStage, MainType } from '@/types/common'
import { getLandlordListBySearchApi } from '@/service'
import modifyRecords from '../../common/modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  dataList: {
    type: Array as any,
    default: () => []
  },
  updateLogList: {
    type: Array as any,
    default: () => []
  }
})

const emit = defineEmits(['deleteGraveInfo'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})
const collectiveList = ref<any>([])

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

/**
 * 获取村集体列表
 * @param data
 */
const getCollectiveList = (data: any) => {
  const params = {
    name: '',
    type: MainType.Village,
    pageSize: 99999
  }
  getLandlordListBySearchApi(params).then((res: any) => {
    collectiveList.value = initCollectiveData(res)
  })
}

/**
 * 初始化处理村集体数据
 * @param {Array} data 传入的数组
 * @returns {Array} newArr 返回的数组
 */
const initCollectiveData = (data: any) => {
  let newArr: any = []
  if (data && data.length) {
    data.map((item: any) => {
      newArr.push({
        text: item.name,
        value: item.id,
        doorNo: item.doorNo
      })
    })
    return newArr
  }
  return newArr
}

onLoad(() => {
  getCollectiveList(props.dataInfo)
})

// 展示修改记录
const showModifyRecord = () => {
  showRecord.value = true
}

// 关闭修改记录弹窗
const closeModifyRecords = () => {
  showRecord.value = false
}

/**
 * 页面跳转
 * @param type 类型，edit 编辑，add 新增
 * @param data type 为 edit 时，当前行数据
 */
const toLink = (type: string, data?: any) => {
  const { uid, householdId, doorNo } = props.dataInfo
  let commonParams = { type, uid, collectiveList: collectiveList.value }
  if (type === 'edit') {
    routerForward('householdGraveInfoEdit', {
      params: JSON.stringify(data),
      commonParams: JSON.stringify(commonParams)
    })
  } else {
    const params = {
      registrantId: householdId, // 居民户 ID
      registrantDoorNo: doorNo, // 居民户户号
      villageId: '', // 村集体 ID
      villageDoorNo: '', // 村集体户号
      graveType: '',
      number: null,
      materials: '',
      graveYear: '',
      gravePosition: '',
      householdId: '', // 村集体ID
      remark: ''
    }
    routerForward('householdGraveInfoEdit', {
      params: JSON.stringify(params),
      commonParams: JSON.stringify(commonParams)
    })
  }
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteGraveInfo = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = () => {
  emit('deleteGraveInfo', currentItem.value)
}

const dialogClose = () => {
  alertDialog.value.close()
}
</script>

<style lang="scss" scoped>
.grave-info-wrapper {
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
          font-size: 9rpx;
          color: #171718;
        }

        .right {
          display: flex;
          align-items: center;

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
            width: 65rpx;
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
            text-align: justify;
            word-break: break-all;
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
