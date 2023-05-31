<template>
  <view :class="['tree-info-wrapper', formData && formData.length === 0 ? 'p-b-0' : '']">
    <view class="tree-container" v-if="formData && formData.length > 0">
      <view class="row">
        <view class="row-wrapper">
          <view class="col">序号</view>
          <view class="col w-63">品种名称</view>
          <view class="col w-64">用途</view>
          <view class="col w-63">淹没范围</view>
          <view class="col w-64">规格</view>
          <view class="col w-64">单位</view>
          <view class="col w-64">数量</view>
          <view class="col w-67">备注</view>
          <view class="col w-29">操作</view>
        </view>
      </view>
      <view class="row"></view>
      <view class="row" v-for="(item, index) in formData" :key="item.id">
        <view class="col">{{ index + 1 }}</view>
        <view class="col w-63 p-lr-2">
          <input class="remark" v-model="item.name" placeholder="请输入" />
        </view>
        <view class="col w-63 p-lr-2">
          <uni-data-select v-model="item.usageType" :localdata="dict[325]" />
        </view>
        <view class="col w-63 p-lr-2">
          <uni-data-select v-model="item.inundationRange" :localdata="dict[346]" />
        </view>
        <view class="col w-64 p-lr-2">
          <uni-data-select v-model="item.size" :localdata="dict[269]" />
        </view>
        <view class="col w-64 p-lr-2">
          <uni-data-select v-model="item.unit" :localdata="dict[264]" />
        </view>
        <view class="col w-64">
          <input class="remark" type="number" v-model="item.number" placeholder="请输入" />
        </view>
        <view class="col w-67">
          <input
            class="remark"
            v-model="item.remark"
            :maxlength="16"
            placeholder="请输入(16字以内)"
          />
        </view>
        <view class="col w-29 p-l-7">
          <label class="icon-wrapper" @click="deleteTree(item, index)">
            <image class="icon" src="@/static/images/icon_delete.png" />
          </label>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加零星（林）果木信息</view>
    </view>

    <image
      v-if="stage === MainStage.review && mainType === MainType.PeasantHousehold"
      class="btn record"
      src="@/static/images/icon_record.png"
      mode="scaleToFill"
      @click="showModifyRecord"
    />

    <image class="btn add" src="@/static/images/icon_add.png" mode="scaleToFill" @click="addTree" />

    <image
      v-show="formData.length > 0"
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
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
    <modify-records v-if="showRecord" :dataList="updateLog" @close="closeModifyRecords" />
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getStorage, StorageKey } from '@/utils'
import { MainStage, MainType } from '@/types/common'
import modifyRecords from '../modifyRecords/index.vue' // 引入修改记录组件

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
  updateLog: {
    type: Object as any,
    default: () => {}
  }
})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const formData = ref<any>([])
const emit = defineEmits(['deleteTree', 'updateFruitTreeInfo'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

const defaultRow = {
  doorNo: props.dataInfo.doorNo,
  name: '',
  usageType: '1', // 默认果树
  inundationRange: '',
  size: '2', // 默认中树
  unit: '1', // 默认株
  number: '',
  remark: '',
  isAdd: true
}

watch(
  () => props.dataList,
  (val) => {
    formData.value = JSON.parse(JSON.stringify(val))
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteTree = (data: any, index: number) => {
  if (data && data.uid) {
    alertDialog.value?.open()
    currentItem.value = { ...data }
  } else {
    uni.showToast({
      title: '未保存的数据可删除',
      icon: 'none'
    })
    formData.value.splice(index, 1)
  }
}

const dialogConfirm = () => {
  emit('deleteTree', currentItem.value)
}

const dialogClose = () => {
  alertDialog.value.close()
}

// 新增零星（林）果木
const addTree = () => {
  if (formData.value.length) {
    if (formData.value[formData.value.length - 1].name) {
      formData.value.push({ ...defaultRow })
    } else {
      uni.showToast({
        title: '上一条数据未填写完成',
        icon: 'none'
      })
    }
  } else {
    formData.value.push({ ...defaultRow })
  }
}

// 表单提交
const submit = () => {
  const params = [...formData.value]
  emit('updateFruitTreeInfo', params)
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
.tree-info-wrapper {
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - 33rpx - 28rpx - 60rpx - var(--status-bar-height));
  padding-bottom: 80rpx;
  overflow-y: scroll;

  &.p-b-0 {
    padding-bottom: 0;
  }

  .tree-container {
    display: table;
    width: 100%;
    border-collapse: collapse;

    .row {
      display: table-row;
      width: 100%;
      height: 28rpx;

      &:nth-child(2n) {
        background-color: #f8f8f8;
      }

      &:first-child {
        position: fixed;
        z-index: 1;
        display: table;
        width: 726rpx;
        font-size: 9rpx;
        color: #737374;
        background-color: #f8f8f8;

        .row-wrapper {
          display: table-row;

          .col {
            display: table-cell;
            width: 35rpx;
            height: 28rpx;
            padding: 0;
            font-size: 9rpx;
            line-height: 28rpx;
            color: #171718;
            text-align: center;
            vertical-align: middle;
            border: none;

            &.w-29 {
              width: 29rpx;
            }

            &.w-63 {
              width: 63rpx;
            }

            &.w-64 {
              width: 64rpx;
            }

            &.w-67 {
              width: 67rpx;
            }
          }
        }
      }

      .col {
        display: table-cell;
        width: 35rpx;
        height: 28rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 28rpx;
        color: #171718;
        vertical-align: middle;
        border: 1rpx solid #f0f0f0;

        &.w-29 {
          width: 29rpx;
        }

        &.w-63 {
          width: 63rpx;
        }

        &.w-64 {
          width: 64rpx;
        }

        &.w-67 {
          width: 67rpx;
        }

        &.p-lr-2 {
          padding: 0 2rpx;
        }

        &.p-l-7 {
          padding-left: 7rpx;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 73rpx;
          margin-left: 3rpx;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;

          .reduce {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-right: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }

          .num {
            width: 30rpx;
            height: 21rpx;
            font-size: 9rpx;
            line-height: 21rpx;
            text-align: center;
          }

          .plus {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-left: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }
        }

        .remark {
          height: 19rpx;
          font-size: 9rpx;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;

          .icon {
            width: 15rpx;
            height: 15rpx;
          }
        }

        ::v-deep.uni-select {
          height: 23rpx;
        }

        ::v-deep.uni-stat__select {
          flex: 0 auto !important;
        }

        ::v-deep.uni-select__input-placeholder {
          font-size: 9rpx;
        }

        ::v-deep.uni-select__selector-item {
          font-size: 9rpx;
        }

        ::v-deep.uniui-clear {
          font-size: 18rpx !important;
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

    &.record {
      bottom: 92rpx;
    }

    &.add {
      bottom: 54rpx;
    }

    &.submit {
      bottom: 16rpx;
    }
  }
}
</style>
