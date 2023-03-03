<template>
  <view class="form-wrapper">
    <Back title="居民户信息编辑" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
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
              name="formData.parentCode"
            >
              <uni-data-picker
                :localdata="villageData"
                popup-title="请选择"
                @change="changeVillage"
                @nodeclick="clickVillageNode"
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
              <uni-easyinput v-model="formData.phone" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="所在位置"
              :label-width="150"
              label-align="right"
              name="formData.locationType"
            >
              <uni-data-select v-model="formData.locationType" :localdata="dict[326]" />
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
                <view class="pre-txt">{{ formData.preCode }}</view>
                <input
                  class="input-txt"
                  type="number"
                  placeholder="请输入"
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
import { ref, reactive } from 'vue'
import Back from '@/components/Back/Index.vue'
import { yesAndNoEnums, lgTagList } from '../config'
import { getStorage, StorageKey } from '@/utils'
import { updateLandlordApi } from '@/service'

// 表单数据
const formData = ref<any>({})

// 表单校验规则
const rules = reactive({
  name: { rules: [{ required: true, message: '请输入账号', trigger: 'blur' }] },
  parentCode: { rules: [{ required: true, message: '请选择', trigger: 'change' }] },
  doorNo: { rules: [{ required: true, message: '请输入', trigger: 'blur' }] }
})

// 输入框是否获得焦点
const isFocus = ref<boolean>(false)

// 自然村/村民小组 选项
const villageData = ref<any>([
  {
    text: '清溪镇',
    value: '1',
    children: [
      {
        text: '清溪行政村',
        value: '1-1',
        children: [
          {
            text: '杨村自然村',
            value: '1-1-1'
          },
          {
            text: '李村自然村',
            value: '1-1-2'
          }
        ]
      }
    ]
  },
  {
    text: '大溪镇',
    value: '2',
    children: [
      {
        text: '大溪行政村',
        value: '2-1',
        children: [
          {
            text: '王村自然村',
            value: '2-1-1'
          },
          {
            text: '石村自然村',
            value: '2-1-2'
          }
        ]
      }
    ]
  }
])

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  console.log('option:', option)
  let params = JSON.parse(option.params)
  formData.value = { ...params }
})

// 输入框获得焦点
const inputFocus = () => {
  isFocus.value = true
}

// 输入框失去焦点
const inputBlur = () => {
  isFocus.value = false
}

// 选择自然村/村名小组
const changeVillage = (e: any) => {
  console.log('e:', e)
}

// 点击 自然村/村名小组 节点
const clickVillageNode = (node: any) => {
  console.log('node:', node)
}

// 表单提交
const submit = () => {
  const params = { ...formData.value }
  formData.value.validate((valid: any) => {
    if (valid) {
      updateLandlordApi(params).then((res) => {
        console.log('res:', res)
      })
    }
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
