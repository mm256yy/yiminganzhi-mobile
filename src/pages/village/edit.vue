<template>
  <view class="form-wrapper">
    <Back title="添加自然村" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="所属区域"
              :label-width="170"
              label-align="right"
              name="formData.parentCode"
            >
              <uni-data-picker
                placeholder="请选择区域"
                popup-title="请选择所在区域"
                :localdata="districtTree"
                :map="{ text: 'name', value: 'code' }"
                v-model="formData.parentCode"
                @change="changeDistrict"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="自然村名称"
              :label-width="170"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="中心经纬度"
              :label-width="170"
              label-align="right"
              name="formData.position"
            >
              <view class="lg-txt-wrapper">
                <uni-data-checkbox v-model="formData.check" :localdata="lgTagList" />
                <uni-easyinput
                  class="m-t-5"
                  v-model="formData.lg"
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
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'
import { getOtherItemApi } from '@/service'
import { OtherDataType } from '@/database'

// 表单数据
const formData = ref<any>({})

// 表单校验规则
const rules = ref<any>({})

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)
const districtTree = ref<any[]>([])

// 中心经纬度输入选项
const lgTagList = ref<any>([
  { text: '获取定位', value: 1 },
  { text: '输入经纬度', value: 2 }
])

// 所在位置选择
const changeDistrict = (data: any) => {
  console.log('data:', data)
}

// 表单提交
const submit = () => {
  console.log('表单提交')
}

const getDistrictTree = async () => {
  const res = await getOtherItemApi(OtherDataType.DistrictTree)
  console.log(res, '----')
  districtTree.value = res
}

getDistrictTree()
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
    overflow-y: scroll;
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
        }
      }

      .lg-txt-wrapper {
        display: flex;
        flex-direction: column;
      }
    }

    .submit-btn {
      position: fixed;
      right: 0;
      bottom: 0;
      width: 80rpx;
      height: 80rpx;
    }
  }
}
</style>
