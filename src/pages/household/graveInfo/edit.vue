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
              label="所处位置"
              :label-width="150"
              label-align="right"
              name="formData.gravePosition"
            >
              <uni-data-select v-model="formData.gravePosition" :localdata="dict[288]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="所属村集体"
              :label-width="150"
              label-align="right"
              name="formData.villageId"
            >
              <uni-data-select
                v-model="formData.villageId"
                :localdata="collectiveList"
                @change="changeCollective"
              />
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
import { routerBack, getStorage, StorageKey } from '@/utils'
import { addLandlordGraveApi, updateLandlordGraveApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config'
import Back from '@/components/Back/Index.vue'

// 表单数据
const formData = ref<any>({})

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)
const title = ref<string>('')
const commonParams = ref<any>({})
const collectiveList = ref<any>([])

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.commonParams)
    let params = JSON.parse(option.params)
    formData.value = { ...params }
    collectiveList.value = commonParams.value.collectiveList
    if (commonParams.value.type === 'edit') {
      title.value = '坟墓信息编辑'
    } else if (commonParams.value.type === 'add') {
      title.value = '添加坟墓'
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

/**
 * 选择村集体
 * @param {object} e
 */
const changeCollective = (e: any) => {
  console.log('e:', e)
  // let itemData = collectiveList.value?.find((item: any) => item.value === e)
  formData.value.villageDoorNo = e.doorNo
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
  } else {
    const { uid } = commonParams.value
    let params = {
      ...formData.value
    }
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
    }

    .submit-btn {
      position: fixed;
      right: 25rpx;
      bottom: 20rpx;
      width: 28rpx;
      height: 28rpx;
      border-radius: 50%;
    }
  }
}
</style>
