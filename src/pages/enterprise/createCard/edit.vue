<template>
  <view class="form-wrapper">
    <Back title="编辑" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="安置方式"
              :label-width="150"
              label-align="right"
              name="formData.setaddrn"
            >
               <uni-data-select v-model="formData.setaddrn" :localdata="dict[422]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="迁前厂址"
              :label-width="150"
              label-align="right"
              name="formData.beforeAddress"
            >
              <uni-easyinput v-model="formData.beforeAddress" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24" v-if="formData.setaddrn=='2'" >
            <uni-forms-item
              label="安置厂址"
              :label-width="150"
              label-align="right"
              name="formData.afterAddress"
            >
              <uni-easyinput v-model="formData.afterAddress" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="员工总数"
              :label-width="150"
              label-align="right"
              name="formData.peopleNumber"
            >
              <uni-easyinput v-model="formData.peopleNumber" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="开户名"
              :label-width="150"
              label-align="right"
              name="formData.accountName"
            >
              <uni-easyinput v-model="formData.accountName" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              required
              label="开户行"
              :label-width="150"
              label-align="right"
              name="formData.bankName"
            >
              <uni-easyinput v-model="formData.bankName" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              required
              label="银行账号"
              :label-width="150"
              label-align="right"
              name="formData.bankAccount"
            >
              <uni-easyinput v-model="formData.bankAccount" type="text" placeholder="请输入" />
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
import { routerBack,getStorage,StorageKey } from '@/utils'
import { getImpLandlordItemApi, saveImpLandlordItemApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

const uid = ref<string>('')
const dict = getStorage(StorageKey.DICT)

// 表单数据
const formData = ref<any>({
  accountName: '', // 开户名
  bankName: '', // 开户行
  bankAccount: '' // 银行账号
})

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  if (option && option.uid) {
    uid.value = option.uid
    getLandlordDetail()
  }
})

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  getImpLandlordItemApi(uid.value).then((res: any) => {
    formData.value = { ...res }
  })
}

// 表单提交
const submit = () => {
  let params = {
    ...formData.value
  }
  if (!formData.value.accountName) {
    showToast('开户名不能为空')
    return
  }

  if (!formData.value.bankName) {
    showToast('开户行不能为空')
    return
  }

  if (!formData.value.bankAccount) {
    showToast('银行账号不能为空')
    return
  }
  saveImpLandlordItemApi(params)
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

          &.disabled {
            width: 200rpx;
            background-color: #f5f7fa;
          }
        }
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

      .village-select-wrapper {
        display: flex;
        align-items: center;

        .add-btn {
          margin-left: 3rpx;
          font-size: 9rpx;
          color: #3e73ec;
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
