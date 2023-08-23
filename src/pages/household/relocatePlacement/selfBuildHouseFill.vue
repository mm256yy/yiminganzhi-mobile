<template>
  <view class="form-wrapper">
    <Back title="填写" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="完成时间"
              :label-width="150"
              label-align="right"
              name="formData.completeDate"
            >
              <uni-datetime-picker
                type="date"
                placeholder="请选择"
                v-model="formData.completeDate"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="照片"
              :label-width="150"
              label-align="right"
              name="formData.completePic"
            >
              <uploadFiles
                :limit="20"
                show-type="grid"
                v-model="completePicStr"
                :file-list="completePicStr"
                :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
              />
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
import dayjs from 'dayjs'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { routerBack } from '@/utils'
import { getImpLandlordItemApi, updateImpLandlordChooseHouseApi } from '@/service'

const formData = ref<any>({})
const commonParams = ref<any>({})
const completePicStr = ref<string>('[]')

onLoad((option) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    getLandlordDetail()
  }
})

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid, itemUid } = commonParams.value
  getImpLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.immigrantBuildOneself ? res.immigrantBuildOneself : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = {
        ...obj,
        completeDate: obj.completeDate ? dayjs(obj.completeDate).format('YYYY-MM-DD') : ''
      }
      completePicStr.value = obj.completePic ? obj.completePic : '[]'
    }
  })
}

// 表单提交
const submit = () => {
  const { uid } = commonParams.value
  const params = {
    ...formData.value,
    completeDate: formData.value.completeDate ? dayjs(formData.value.completeDate) : '',
    completePic: completePicStr.value
  }
  updateImpLandlordChooseHouseApi(uid, params)
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

      .title-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28rpx;
        margin-bottom: 10rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .icon {
          width: 10rpx;
          height: 10rpx;
          margin-left: 10rpx;
        }

        .title {
          margin-left: 5rpx;
          font-size: 9rpx;
          font-weight: 600;
          color: #171718;
        }
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

      ::v-deep.uni-date,
      ::v-deep.uni-date-editor {
        width: 200rpx !important;
      }

      ::v-deep.uni-input-input,
      ::v-deep.uni-input-placeholder {
        font-size: 9rpx !important;
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

        .txt {
          width: 177rpx;
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

      .code-wrapper {
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

          &.disabled {
            width: 200rpx;
            background-color: #f5f7fa;
          }
        }
      }

      .upload-wrapper {
        padding: 0 6rpx;
        box-sizing: border-box;
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
