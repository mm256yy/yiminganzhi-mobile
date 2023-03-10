<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户主姓名"
              :label-width="150"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="自然村/村民小组"
              :label-width="150"
              label-align="right"
              name="formData.virutalVillageCode"
            >
              <natural-village-select-form-item
                v-model:areaCode="formData.areaCode"
                v-model:townCode="formData.townCode"
                v-model:villageCode="formData.villageCode"
                v-model:virutalVillageCode="formData.virutalVillageCode"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="联系方式"
              :label-width="150"
              label-align="right"
              name="formData.phone"
            >
              <uni-easyinput
                v-model="formData.phone"
                type="number"
                :maxlength="11"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="所在位置"
              :label-width="150"
              label-align="right"
              name="formData.locationType"
            >
              <uni-data-select v-model="formData.locationType" :localdata="locationTypes" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户号"
              :label-width="150"
              label-align="right"
              name="formData.suffixNo"
            >
              <view :class="['input-wrapper', isFocus ? 'focus' : '']">
                <view class="pre-txt">{{ formData.villageCode }}</view>
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="text"
                  v-model="formData.suffixNo"
                  @focus="inputFocus"
                  @blur="inputBlur"
                />
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="财产户"
              :label-width="150"
              label-align="right"
              name="formData.hasPropertyAccount"
            >
              <uni-data-select v-model="formData.hasPropertyAccount" :localdata="yesAndNoEnums" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="户籍所在地"
              :label-width="150"
              label-align="right"
              name="formData.address"
            >
              <uni-easyinput v-model="formData.address" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="淹没范围"
              :label-width="150"
              label-align="right"
              name="formData.inundationRange"
            >
              <uni-data-select v-model="formData.inundationRange" :localdata="dict[346]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="高程"
              :label-width="150"
              label-align="right"
              name="formData.altitude"
            >
              <uni-easyinput v-model="formData.altitude" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="中心经纬度"
              :label-width="150"
              label-align="right"
              name="formData.position"
            >
              <view class="lg-txt-wrapper">
                <uni-data-checkbox v-model="formData.check" :localdata="lgTagList" />
                <uni-easyinput
                  class="m-t-5"
                  v-model="formData.position"
                  :disabled="formData.check === 1"
                  type="text"
                  :placeholder="
                    formData.check === 1 ? '获取定位' : formData.check === 2 ? '输入经纬度' : ''
                  "
                />
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
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { yesAndNoEnums, lgTagList } from '../config'
import { routerBack, getStorage, StorageKey } from '@/utils'
import { addLandlordApi, updateLandlordApi } from '@/service'
import { locationTypes } from '@/config/common'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { MainType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import NaturalVillageSelectFormItem from '@/components/NaturalVillageSelectFormItem/index.vue'

// 表单数据
const formData = ref<any>({})

// 输入框是否获得焦点
const isFocus = ref<boolean>(false)
const title = ref<string>('')
const type = ref<string>('')

// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const emit = defineEmits(['updateTree'])

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  type.value = option.type
  if (option.type === 'edit') {
    let params = JSON.parse(option.params)
    formData.value = { ...params }
    title.value = '居民户信息编辑'
  } else if (option.type === 'add') {
    title.value = '添加居民户信息'
  }
})

// 输入框获得焦点
const inputFocus = () => {
  isFocus.value = true
}

// 输入框失去焦点
const inputBlur = () => {
  isFocus.value = false
}

// 表单提交
const submit = () => {
  let params = {
    ...formData.value,
    doorNo: formData.value.villageCode
      ? String(formData.value.villageCode) + formData.value.suffixNo
      : '',
    type: MainType.PeasantHousehold
  }

  if (!formData.value.name) {
    showToast('请输入户主姓名')
    return
  } else if (!formData.value.virutalVillageCode) {
    showToast('请选择自然村/村民小组')
    return
  } else if (!formData.value.suffixNo) {
    showToast('请输入户号后四位')
    return
  } else {
    if (type.value === 'add') {
      addLandlordApi(params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            emit('updateTree')
            routerBack()
          }
        })
        .catch((e) => {
          showToast(ERROR_MSG)
        })
    } else if (type.value === 'edit') {
      updateLandlordApi(params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            emit('updateTree')
            routerBack()
          }
        })
        .catch((e) => {
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

      .input-wrapper {
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
          width: 104rpx;
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
        }
      }

      .lg-txt-wrapper {
        display: flex;
        flex-direction: column;
      }

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
    }

    .submit-btn {
      position: fixed;
      right: 6rpx;
      bottom: 6rpx;
      width: 66rpx;
      height: 66rpx;
      border-radius: 50%;
    }
  }
}
</style>
