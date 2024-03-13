<template>
  <view class="form-wrapper">
    <Back :title="title" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="姓名"
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
              label="与户主关系"
              :label-width="150"
              label-align="right"
              name="formData.relation"
            >
              <uni-data-select v-model="formData.relation" :localdata="dict[307]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="身份证号"
              :label-width="150"
              label-align="right"
              name="formData.card"
            >
              <uni-easyinput
                v-model="formData.card"
                :maxlength="18"
                type="text"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="联系方式"
              :label-width="150"
              label-align="right"
              name="formData.phone"
            >
              <uni-easyinput
                v-model="formData.phone"
                :maxlength="11"
                type="numberr"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="生产安置方式"
              :label-width="150"
              label-align="right"
              name="formData.settingWay"
            >
              <uni-data-select v-model="formData.settingWay" :localdata="dict[375]" />
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
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, getStorage, StorageKey } from '@/utils'
import { addLandlordPeopleApi, updateLandlordPeopleApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

const title = ref<string>('')
const commonParams = ref<any>({})
const typeInfo = ref<string>('add')

// 表单数据
const formData = ref<any>({
  name: '', // 姓名
  relation: '', // 与户主关系
  card: '', // 身份证
  phone: '', // 联系方式
  settingWay: '' // 生产安置方式
})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    const { type } = commonParams.value
    typeInfo.value = type
    if (type === 'edit') {
      title.value = '生产安置人口编辑'
      formData.value = commonParams.value.formValue
    } else if (type === 'add') {
      title.value = '生产安置人口新增'
      formData.value = {}
    }
  }
})

// 表单提交
const submit = () => {
  const { uid, doorNo } = commonParams.value
  const params = {
    doorNo,
    ...formData.value
  }

  if (!formData.value.name) {
    showToast('姓名不能为空')
    return
  }
  if (!formData.value.relation) {
    showToast('与户主关系不能为空')
    return
  }
  if (!formData.value.card) {
    showToast('身份证号不能为空')
    return
  }
  if (!formData.value.card) {
    showToast('生产安置方式不能为空')
    return
  }

  if (typeInfo.value === 'add') {
    addLandlordPeopleApi(uid, params)
      .then((res: any) => {
        if (res) {
          showToast(SUCCESS_MSG)
          routerBack()
          uni.$emit('customRefresh')
        }
      })
      .catch(() => {
        showToast(ERROR_MSG)
      })
  } else {
    updateLandlordPeopleApi(uid, params)
      .then((res: any) => {
        if (res) {
          showToast(SUCCESS_MSG)
          routerBack()
          uni.$emit('customRefresh')
        }
      })
      .catch(() => {
        showToast(ERROR_MSG)
      })
  }
}

watch(
  () => formData.value.valuationAmount,
  (newValue) => {
    if (!formData.value.compensationAmount) {
      formData.value.compensationAmount = newValue
    }
  }
)
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../../static/images/common_bg.png') no-repeat;
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

      .lg-txt-wrapper {
        display: flex;
        flex-direction: column;

        .position {
          display: flex;
          width: 200rpx;
          height: 23rpx;
          margin-top: 5rpx;
          background: #ffffff;
          border: 1px solid #d9d9d9;
          border-radius: 2rpx;
          align-items: center;
          justify-content: center;

          .txt {
            margin-left: 6rpx;
            font-size: 9rpx;
            color: #171718;
          }
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

      .input-txtarea-wrapper {
        display: flex;
        align-items: center;
        width: 570rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txtarea {
          width: 570rpx;
          height: 70px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
        }
      }

      .picker-wrapper {
        display: flex;
        width: 200rpx;
        height: 23rpx;
        padding-left: 7rpx;
        overflow: hidden;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #171718;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        .uni-input {
          width: 180rpx;

          &.select {
            color: #999;
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

  .label-txt {
    margin-left: 6rpx;
    font-size: 9rpx;
    color: #171718;
    line-height: 36px;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    width: 240rpx;
  }
}
</style>
