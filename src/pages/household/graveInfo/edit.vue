<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="与登记人关系"
              :label-width="150"
              label-align="right"
              name="formData.relation"
            >
              <uni-data-select v-model="formData.relation" :localdata="dict[307]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="穴位"
              :label-width="150"
              label-align="right"
              name="formData.graveType"
            >
              <uni-data-select v-model="formData.graveType" :localdata="dict[345]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="数量"
              :label-width="150"
              label-align="right"
              name="formData.number"
            >
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.number"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">座</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="材料"
              :label-width="150"
              label-align="right"
              name="formData.materials"
            >
              <uni-data-select v-model="formData.materials" :localdata="dict[295]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="立墓年份"
              :label-width="150"
              label-align="right"
              name="formData.graveYear"
            >
              <uni-easyinput v-model="formData.graveYear" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="所在位置"
              :label-width="150"
              label-align="right"
              name="formData.gravePosition"
            >
              <uni-data-select
                v-model="formData.gravePosition"
                :localdata="dict[326]"
                @change="change"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <!-- <uni-col :span="12">
            <uni-forms-item
              label="所属村集体"
              :label-width="150"
              label-align="right"
              name="formData.villageId"
            >
              <uni-data-select v-model="formData.villageId" :localdata="collectiveList" />
            </uni-forms-item>
          </uni-col> -->
          <uni-col :span="12">
            <uni-forms-item
              required
              label="淹没范围"
              :label-width="150"
              label-align="right"
              name="formData.inundationRange"
            >
              <uni-data-select v-model="formData.inundationRange" :localdata="dict[346]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput v-model="formData.remark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="坟墓编号"
              :label-width="150"
              label-align="right"
              name="formData.graveAutoNo"
            >
              <view
                v-if="commonParams?.type == 'add'"
                :class="['input-wrappers', isFocus ? 'focus' : '']"
              >
                <view class="pre-txt">
                  {{ leftDoor }}
                </view>
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  :maxlength="4"
                  v-model="formData.graveAutoNo"
                  @focus="inputFocuss"
                  @blur="inputBlurs"
                />
              </view>
              <view v-else class="input-wrappers">
                <input class="input-txt disabled" :value="formData.graveAutoNo" disabled />
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>
      </uni-forms>

      <image
        class="submit-btn"
        src="@/static/images/icon_submit.png"
        mode="scaleToFill"
        @click="submit"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, getStorage, StorageKey, setlocationType } from '@/utils'
import { addLandlordGraveApi, updateLandlordGraveApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config'
import Back from '@/components/Back/Index.vue'
import { getLandlordListBySearchApi } from '@/service'
import { MainType } from '@/types/common'

// 表单数据
const formData = ref<any>({})

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)
const title = ref<string>('')
const commonParams = ref<any>({})
const collectiveList = ref<any>([])

// 获取数据字典
const dict = getStorage(StorageKey.DICT)
let leftDoor = ref('')
// 获取上个页面传递的参数，给表单赋值
onLoad(async (option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.commonParams)
    let params = JSON.parse(option.params)
    formData.value = { ...params }
    collectiveList.value = commonParams.value.collectiveList
    console.log(collectiveList.value, '纯集体数据')

    if (commonParams.value.type === 'edit') {
      title.value = '坟墓信息编辑'
    } else if (commonParams.value.type === 'add') {
      title.value = '添加坟墓'
      let dataList = await getLandlordListBySearchApi({
        code: commonParams.value.villageCode,
        type: MainType.Village
      })
      dataList = dataList.filter((item: any) => {
        return item.villageType == 'grave'
      })
      if (dataList.length > 0) {
        leftDoor.value = 'FM' + dataList[0].doorNo
      } else {
        uni.showToast({
          title: '该户所在行政村没有坟墓村集体，请联系信息管理员新增移民村村集体',
          icon: 'none'
        })
      }
      console.log(dataList, 'bbq')
    }
  }
})

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}
let isFocus = ref(false)
// 输入框获得焦点
const inputFocuss = () => {
  isFocus.value = true
}

// 输入框失去焦点
const inputBlurs = () => {
  isFocus.value = false
}

// 表单提交
const submit = () => {
  const { type } = commonParams.value
  if (!formData.value.relation) {
    showToast('请选择与登记人关系')
    return
  } else if (!formData.value.gravePosition) {
    showToast('请选择所处位置')
    return
  } else if (!formData.value.graveType) {
    showToast('请选择穴位')
    return
  } else if (!formData.value.number) {
    showToast('请输入数量')
    return
  } else if (!formData.value.materials) {
    showToast('请选择材料')
    return
  } else if (!formData.value.graveAutoNo) {
    showToast('请输入坟墓编号')
    return
  } else if (leftDoor.value.length < 15) {
    uni.showToast({
      title: '该户所在行政村没有坟墓村集体，请联系信息管理员新增移民村村集体',
      icon: 'none'
    })
    return
  } else if (!formData.value.inundationRange) {
    showToast('请选择淹没范围')
    return
  } else {
    const { uid, villageCode } = commonParams.value
    let params = {
      ...formData.value,
      graveAutoNo: leftDoor.value + formData.value.graveAutoNo
    }
    let itemData = collectiveList.value?.find(
      (item: any) => item.villageCode === villageCode && item.villageType == 'grave'
    )
    params.villageDoorNo = itemData ? itemData.doorNo : ''
    params.villageId = itemData ? itemData.id : ''
    params.villageName = itemData ? itemData.text : ''
    console.log(params, 'params')
    if (type === 'add') {
      addLandlordGraveApi(uid, params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    } else if (type === 'edit') {
      updateLandlordGraveApi(uid, params)
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
  }
}
let change = (e: any) => {
  if (commonParams.value.type === 'add') {
    formData.value.inundationRange = setlocationType(e)
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .main {
    height: calc(100vh - 33rpx);
    padding: 6rpx;
    background-color: #e7edfd;
    border-radius: 2rpx;
    box-sizing: border-box;

    .form {
      height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
      padding: 9rpx 0;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      ::v-deep.uni-forms-item__label {
        font-size: 9rpx !important;
        color: rgba(23, 23, 24, 0.6) !important;
      }

      ::v-deep.uni-easyinput__content {
        width: 200rpx !important;

        .uni-easyinput__placeholder-class,
        .uni-input-input {
          font-size: 9rpx !important;
        }
      }

      ::v-deep.uni-data-tree,
      ::v-deep.uni-stat__select {
        flex: 0 auto !important;
        width: 200rpx !important;
      }

      ::v-deep.uni-select__input-text {
        width: 90% !important;
        font-size: 9rpx !important;
      }

      ::v-deep.uni-date,
      ::v-deep.uni-date-editor {
        width: 200rpx !important;
      }

      ::v-deep.uni-input-input,
      ::v-deep.uni-input-placeholder {
        font-size: 9rpx !important;
      }

      .name-wrapper {
        width: 200rpx;
        height: 23rpx;
        padding-left: 7rpx;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #999;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.isSelected {
          color: #171718;
        }
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 200rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txt {
          width: 168rpx;
          height: 35px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
        }

        .unit {
          width: 23rpx;
          height: 35px;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
          text-align: center;
          background-color: #f5f7fa;
          border-left: 1px solid #d9d9d9;
        }
      }
      .input-wrappers {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 200rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .pre-txt {
          width: 120rpx;
          height: 35px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
          background-color: #f5f7fa;
          border-right: 1px solid #d9d9d9;
        }

        .input-txt {
          width: 84rpx;
          height: 35px;
          padding-left: 11rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;

          &.disabled {
            width: 200rpx;
            background-color: #f5f7fa;
          }
        }
      }
    }

    .submit-btn {
      position: fixed;
      right: 25rpx;
      bottom: 20rpx;
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
    }
  }
}
</style>
