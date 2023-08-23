<template>
  <view class="form-wrapper">
    <Back :title="title" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="坟墓与登记人关系"
              :label-width="150"
              label-align="right"
              name="formData.relation"
            >
              <view class="content-txt">
                {{ formatDict(formData.relation, 307) }}
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
              <view class="content-txt">
                {{ formatDict(formData.materials, 295) }}
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="穴位"
              :label-width="150"
              label-align="right"
              name="formData.graveType"
            >
              <view class="content-txt">
                {{ formatDict(formData.graveType, 345) }}
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="数量"
              :label-width="150"
              label-align="right"
              name="formData.number"
            >
              <view class="content-txt">
                {{ formatStr(formData.number) }}
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="处理方式"
              :label-width="150"
              label-align="right"
              name="formData.handleWay"
            >
              <view class="content-txt">
                {{ formatDict(formData.handleWay, 238) }}
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="安置公墓/择址地址"
              :label-width="150"
              label-align="right"
              name="formData.handleWay"
            >
              <view class="content-txt" v-if="formData.handleWay === '1'">
                {{ formatStr(formData.settingGrave) }}
              </view>
              <uni-easyinput
                v-if="formData.handleWay === '2'"
                v-model="formData.settingAddress"
                type="text"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="编号"
              :label-width="150"
              label-align="right"
              name="formData.graveNo"
            >
              <uni-easyinput v-model="formData.graveNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput
                v-model="formData.remark"
                type="textarea"
                :maxlength="50"
                placeholder="请输入(50字以内)"
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
import { routerBack, formatDict, formatStr } from '@/utils'
import { getImpLandlordItemApi, updateImpLandlordGraveApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

const title = ref<string>('')
const commonParams = ref<any>({})

// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  relation: '', // 坟墓与登记人关系
  materials: '', // 材料
  graveType: '', // 穴位
  number: '', // 数量
  handleWay: '', // 处理方式
  settingGrave: '', // 安置公墓
  settingAddress: '', // 择址地址
  graveNo: '', // 编号
  remark: '' // 备注
})

onLoad((option: any) => {
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
    let arr: any = res && res.immigrantGraveList ? res.immigrantGraveList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = { ...obj }
    }
  })
}

// 表单提交
const submit = () => {
  const { doorNo } = commonParams.value
  const params = {
    doorNo,
    ...formData.value
  }
  updateImpLandlordGraveApi(params)
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

        &.disabled {
          background-color: #f5f7fa;
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
}
</style>
