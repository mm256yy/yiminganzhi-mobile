<template>
  <view class="form-wrapper">
    <Back title="添加坟墓" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="坟墓与登记人关系："
              :label-width="150"
              label-align="right"
              name="formData.relation"
            >
              <view v-if="query.actionType === 'edit'">
                {{ formatDict(formData.relation, 307) }}
              </view>
              <uni-data-select v-else v-model="formData.relation" :localdata="dict[307]" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="12">
            <uni-forms-item
              label="材料："
              :label-width="150"
              label-align="right"
              name="formData.materials"
            >
              <view v-if="query.actionType === 'edit'">
                {{ formatDict(formData.materials, 295) }}
              </view>
              <uni-data-select v-else v-model="formData.materials" :localdata="dict[295]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="穴位："
              :label-width="150"
              label-align="right"
              name="formData.graveType"
            >
              <view v-if="query.actionType === 'edit'">
                {{ formatDict(formData.graveType, 345) }}
              </view>
              <uni-data-select v-else v-model="formData.graveType" :localdata="dict[345]" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="12">
            <uni-forms-item
              label="数量："
              :label-width="150"
              label-align="right"
              name="formData.number"
            >
              <view v-if="query.actionType === 'edit'">
                {{ formData.number }}
              </view>
              <uni-easyinput
                v-else
                placeholder="请输入"
                :style="{ width: '166rpx' }"
                type="number"
                v-model="formData.number"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="处理方式："
              :label-width="150"
              label-align="right"
              name="formData.handleWay"
            >
              <uni-data-select v-model="formData.handleWay" :localdata="dict[238]" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="12">
            <uni-forms-item
              v-if="formData.handleWay === '2'"
              label="安置公墓："
              :label-width="150"
              label-align="right"
              name="formData.settingGrave"
            >
              <uni-data-select v-model="formData.settingGrave" :localdata="dict[377]" />
            </uni-forms-item>
            <uni-forms-item
              v-else-if="formData.handleWay === '1'"
              label="择址地址："
              :label-width="150"
              label-align="right"
              name="formData.settingAddress"
            >
              <uni-easyinput placeholder="请输入" type="text" v-model="formData.settingAddress" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="备注："
              :label-width="150"
              label-align="right"
              name="formData.settingRemark"
            >
              <uni-easyinput
                v-model="formData.settingRemark"
                type="textarea"
                placeholder="请输入"
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
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'
import { formatDict, getStorage, StorageKey, routerBack } from '@/utils'
import { showToast, SUCCESS_MSG } from '@/config/msg'
import {
  updateImpLandlordGraveApi,
  getImpLandlordGraveItemApi,
  addImpLandlordGraveApi
} from '@/service'

interface QueryType {
  uid: string // 坟墓 uid
  actionType: 'add' | 'edit'
}

const query = ref<any>({})
const formData = ref<any>({
  relation: '',
  materials: '',
  graveType: '',
  number: '',
  handleWay: '',
  settingGrave: '',
  settingAddress: '',
  settingRemark: ''
})
// 获取数据字典
const dict = getStorage(StorageKey.DICT)

onLoad((option) => {
  if (option) {
    query.value = option as QueryType
    if (query.value && query.value.uid) {
      getDetail()
    }
  }
})

// 获取调查对象详情的档案数据
const getDetail = async () => {
  if (query.value.uid) {
    const res = await getImpLandlordGraveItemApi(query.value.uid)
    if (res) {
      formData.value = res
    } else {
      formData.value = {
        ...formData.value,
        registrantDoorNo: query.value.doorNo
      }
    }
  }
}

const submit = async () => {
  if (query.value.actionType === 'edit') {
    let params = {
      ...formData.value,
      uid: query.value.uid
    }
    const res = await updateImpLandlordGraveApi(params)
    if (res) {
      showToast(SUCCESS_MSG)
      routerBack()
    }
  } else {
    let params = {
      ...formData.value,
      registrantDoorNo: query.value.doorNo
    }
    const res = await addImpLandlordGraveApi(params)
    if (res) {
      showToast(SUCCESS_MSG)
      routerBack()
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
}
</style>
