<template>
  <Container title="编辑零星(林)果木" :onBack="livePre">
    <view class="tree-box">
      <view :class="['tree-info-wrapper', formData && formData.length === 0 ? 'p-b-0' : '']">
        <view class="tree-container" v-if="formData && formData.length > 0">
          <view class="row">
            <view class="row-wrapper">
              <view class="col">序号</view>
              <view class="col w-63">品种名称</view>
              <view class="col w-63">用途</view>
              <view class="col w-67">所在位置</view>
              <view class="col w-63">淹没范围</view>
              <view class="col w-64">规格</view>
              <view class="col w-64">单位</view>
              <view class="col w-64">数量</view>
              <view class="col w-67">备注</view>
              <view class="col w-29">操作</view>
            </view>
          </view>
          <view class="row" />
          <view class="row" v-for="(item, index) in formData" :key="item.id">
            <view class="col">{{ index + 1 }}</view>
            <view class="col w-63">
              <input class="remark" v-model="item.name" placeholder="请输入" />
            </view>
            <view class="col w-63">
              <uni-data-select v-model="item.usageType" :localdata="dict[325]" />
            </view>
            <view class="col w-67">
              <uni-data-select
                v-model="item.locationType"
                :localdata="dict[326]"
                @change="
                  (e:any) => {
                    return change(e, index)
                  }
                "
              />
            </view>
            <view class="col w-63">
              <uni-data-select v-model="item.inundationRange" :localdata="dict[346]" />
            </view>

            <view class="col w-64">
              <uni-data-select v-model="item.size" :localdata="dict[269]" />
            </view>
            <view class="col w-64">
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
            <view class="col w-29">
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
          class="btn add"
          src="@/static/images/icon_add.png"
          mode="scaleToFill"
          @click="addTree"
        />

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
      </view>
    </view>

    <uni-popup ref="liveDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="数据未保存是否退出？"
        @confirm="liveDialogConfirm"
        @close="liveDialogClose"
      />
    </uni-popup>
  </Container>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Container from '@/components/Container/index.vue'
import { getStorage, StorageKey, routerBack, deepClone, setlocationType } from '@/utils'
import { updateLandlordTreeApi, deleteLandlordTreeApi, getLandlordItemApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'

// 调查对象详情
const dataInfo = ref<any>({})
const uid = ref<string>('')
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const formData = ref<any>([])
const alertDialog = ref<any>(null)
const liveDialog = ref<any>(null)
const currentItem = ref<any>({})

const defaultRow = {
  doorNo: '',
  name: '',
  usageType: '1', // 默认果树
  inundationRange: '',
  size: '2', // 默认中树
  unit: '1', // 默认株
  number: '',
  remark: '',
  locationType: '',
  isAdd: true
}

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  getLandlordItemApi(uid.value).then((res: any) => {
    dataInfo.value = deepClone(res)
    formData.value = res && res.immigrantTreeList ? res.immigrantTreeList : []
    if (dataInfo.value.immigrantHouseList) {
      let m: any = []
      dataInfo.value.immigrantHouseList.forEach((item: any) => {
        if (item.id) {
          m.push(item.id)
        }
      })
      m.sort()
      console.log(m, dataInfo.value.immigrantHouseList)

      defaultRow.locationType = dataInfo.value.immigrantHouseList.filter(
        (bbq: any) => bbq.id == m[0]
      )[0]?.locationType
    }
  })
}

onLoad((option) => {
  if (option && option.uid) {
    uid.value = option.uid
    getLandlordDetail()
  }
})

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteTree = (data: any, index: number) => {
  if (data && data.uid) {
    currentItem.value = { ...data }
    alertDialog.value?.open()
  } else {
    uni.showToast({
      title: '未保存的数据可删除',
      icon: 'none'
    })
    formData.value.splice(index, 1)
  }
}

const dialogConfirm = () => {
  /**
   * 零星（林）果木信息 - 删除
   * @param(Object) data 被删除的行信息
   */
  deleteLandlordTreeApi(dataInfo.value.uid, currentItem.value.uid)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        getLandlordDetail()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

const dialogClose = () => {
  alertDialog.value.close()
}

// 新增零星（林）果木
const addTree = () => {
  if (formData.value.length) {
    if (formData.value[formData.value.length - 1].name) {
      formData.value.push({ ...defaultRow, doorNo: dataInfo.value.doorNo })
    } else {
      uni.showToast({
        title: '上一条数据未填写完成',
        icon: 'none'
      })
    }
  } else {
    formData.value.push({ ...defaultRow, doorNo: dataInfo.value.doorNo })
  }
}

// 表单提交
const submit = () => {
  const params = [...formData.value]
  let key = false
  formData.value.forEach((item: any) => {
    if (!item.locationType) {
      key = true
    }
  })
  if (key) {
    showToast('所在位置必填')
    return
  }
  updateLandlordTreeApi(dataInfo.value.uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        routerBack()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

const livePre = () => {
  if (JSON.stringify(formData.value) !== JSON.stringify(dataInfo.value.immigrantTreeList)) {
    liveDialog.value?.open()
  } else {
    routerBack()
  }
}

const liveDialogConfirm = () => {
  liveDialog.value?.close()
  routerBack()
}

const liveDialogClose = () => {
  liveDialog.value?.close()
}
let change = (e: any, index: any) => {
  formData.value[index].inundationRange = setlocationType(e)
}
</script>

<style lang="scss" scoped>
.tree-box {
  width: 100%;
  height: 100%;
  padding: 10rpx 45rpx 10rpx 25rpx;
  background-color: #fff;
}

.tree-info-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;

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
        width: 680rpx;
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
        font-size: 9rpx;
        line-height: 28rpx;
        color: #171718;
        text-align: center;
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
          justify-content: center;

          .icon {
            width: 15rpx;
            height: 15rpx;
          }
        }

        ::v-deep.uni-select {
          height: 23rpx;
          font-size: 9rpx;
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
    right: 16rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.add {
      bottom: 58rpx;
    }

    &.submit {
      bottom: 20rpx;
    }
  }
}
</style>
