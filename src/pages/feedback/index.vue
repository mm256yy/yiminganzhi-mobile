<template>
  <view class="form-wrapper">
    <Back title="信息反馈" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item label="户主：" :label-width="150" label-align="right" name="formData.householder">
              <uni-easyinput v-model="formData.householder" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="12">
            <uni-forms-item label="反馈阶段：" :label-width="150" label-align="right" name="formData.type">
              <uni-data-select v-model="formData.type" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item label="问题描述：" :label-width="150" label-align="right" name="formData.remark">
              <uni-easyinput v-model="formData.remark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item label="附件：" :label-width="150" label-align="right" name="feedbackPic">
              <uploadFiles
v-model="flatOtherPicStr" :file-list="flatOtherPicStr" :limit="20"
                :accepts="['.jpg', '.png', '.pdf', '.jpeg']" show-type="grid" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
      </uni-forms>

      <image class="submit-btn" src="@/static/images/icon_submit.png" mode="scaleToFill" @click="submit" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'
import { routerBack } from '@/utils'
import { showToast, SUCCESS_MSG } from '@/config/msg'
import uploadFiles from '@/components/UploadFile/index.vue'
import { MainType } from '@/types/common'
import { householdTypes, enterpriseTypes, individualTypes, villageTypes } from './config'
import {
  addOtherItemApi
} from '@/service'
import { fmtPicUrl } from '@/utils'

interface DictType {
  text: string,
  value: string
}

const formData = ref<any>({
  householder: '',
  typeText: '',
  remark: ''
})
const flatOtherPicStr = ref<string>('[]') // 其他附件
const typeOptionsList = ref<DictType[]>([])

onLoad((option) => {
  if (option) {
    const { name, type } = option
    typeOptionsList.value = feedbackStatusList(type)
    console.log(typeOptionsList, 'typeOptionsList')
    formData.value.householder = name
  }
})

const feedbackStatusList = (type: any) => {
  if (type === MainType.PeasantHousehold) {
    return householdTypes
  } else if (type === MainType.Company) {
    return enterpriseTypes
  } else if (type === MainType.IndividualHousehold) {
    return individualTypes
  } else {
    return villageTypes
  }
}

const submit = async () => {
  if (!formData.value.householder) {
    showToast('户主不能为空')
    return
  }
  if (!formData.value.type) {
    showToast('反馈阶段不能为空')
    return
  }
  if (!formData.value.remark) {
    showToast('问题描述不能为空')
    return
  }

  let params = {
    ...formData.value,
    feedbackPic: fmtPicUrl(flatOtherPicStr.value)
  }
  console.log(params, 'params')
  try {
    const res = await addOtherItemApi(params)
    if (res) {
      showToast(SUCCESS_MSG)
      routerBack()
      // 触发自定义事件
      uni.$emit('customRefresh');
    }
  } catch {
  }
}

</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../static/images/common_bg.png') no-repeat;
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

  .value {
    display: flex;
    height: 100%;
    align-items: center;
  }
}
</style>
