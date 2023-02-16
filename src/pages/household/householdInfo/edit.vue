<template>
  <view class="form-wrapper">
    <Back />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户主姓名"
              :label-width="120"
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
              :label-width="120"
              label-align="right"
              name="formData.village"
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
              required
              label="联系方式"
              :label-width="120"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="所在位置"
              :label-width="120"
              label-align="right"
              name="formData.position"
            >
              <uni-data-select
                v-model="formData.position"
                :localdata="positionRange"
                @change="changePosition"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户号"
              :label-width="120"
              label-align="right"
              name="formData.accountNo"
            >
              <view class="account-no">
                <view class="pre-txt">
                  <text class="txt">104009234532</text>
                </view>
                <input
                  class="account-no-input"
                  type="number"
                  v-model="formData.accountNo"
                  placeholder="请输入"
                />
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="财产户"
              :label-width="120"
              label-align="right"
              name="formData.account"
            >
              <uni-data-select
                v-model="formData.account"
                :localdata="rangeAccount"
                @change="changeAccount"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户籍所在地"
              :label-width="120"
              label-align="right"
              name="formData.address"
            >
              <uni-easyinput v-model="formData.address" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="淹没范围"
              :label-width="120"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="高程"
              :label-width="120"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="中心经纬度"
              :label-width="120"
              label-align="right"
              name="formData.lg"
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

// 表单数据
const formData = ref<any>({})

// 表单校验规则
const rules = ref<any>({})

// 所在位置选项
const positionRange = ref<any>([
  {
    text: '淹没区',
    value: 0
  },
  {
    text: '非淹没区',
    value: 1
  }
])

// 财产户选项
const rangeAccount = ref<any>([
  {
    text: '否',
    value: 0
  },
  {
    text: '是',
    value: 1
  }
])

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

// 中心经纬度输入选项
const lgTagList = ref<any>([
  {
    text: '获取定位',
    value: 1
  },
  {
    text: '输入经纬度',
    value: 2
  }
])

// 所在位置选择
const changePosition = (data: any) => {
  console.log('data:', data)
}

// 财产户选择
const changeAccount = (data: any) => {
  console.log('data:', data)
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
  console.log('表单提交')
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;

  .main {
    height: calc(100vh - 23rpx);
    padding: 6rpx;
    background-color: #e7edfd;
    border-radius: 2rpx;
    box-sizing: border-box;

    .form {
      height: calc(100vh - 23rpx - 12rpx - 18rpx);
      padding: 9rpx 0;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      .account-no {
        display: flex;
        flex-direction: row;
        align-items: center;

        .pre-txt {
          width: 104rpx;
          height: 35px;
          padding-left: 7rpx;
          line-height: 35px;
          background-color: #f5f7fa;
          border: 1rpx solid #d9d9d9;
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;

          .txt {
            font-size: 9rpx;
            color: #171718;
          }
        }

        .account-no-input {
          width: 76rpx;
          height: 35px;
          padding-left: 11rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
          border-top: 1rpx solid #d9d9d9;
          border-right: 1rpx solid #d9d9d9;
          border-bottom: 1rpx solid #d9d9d9;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }

      .lg-txt-wrapper {
        display: flex;
        flex-direction: column;

        .m-t-5 {
          margin-top: 5rpx;
        }
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

::v-deep.uni-forms-item__label {
  font-size: 12rpx !important;
}

::v-deep.uni-easyinput__content {
  width: 200rpx !important;
}

::v-deep.uni-data-tree,
::v-deep.uni-stat__select {
  flex: 0 auto !important;
  width: 200rpx !important;
}

::v-deep.uni-select__input-text {
  width: 90% !important;
}
</style>
