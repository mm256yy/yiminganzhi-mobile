<template>
  <view class="form-wrapper">
    <Back title="企业基本概况编辑" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业基本信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="法人姓名"
              :label-width="170"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="法人身份证号"
              :label-width="170"
              label-align="right"
              name="formData.idCard"
            >
              <uni-easyinput v-model="formData.idCard" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="联系方式"
              :label-width="170"
              label-align="right"
              name="formData.phone"
            >
              <uni-easyinput v-model="formData.phone" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="企业名称"
              :label-width="170"
              label-align="right"
              name="formData.entName"
            >
              <uni-easyinput v-model="formData.entName" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="企业编码"
              :label-width="170"
              label-align="right"
              name="formData.entCode"
            >
              <uni-easyinput v-model="formData.entCode" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="所在位置"
              :label-width="170"
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
              label="企业联系方式"
              :label-width="170"
              label-align="right"
              name="formData.entContactInfo"
            >
              <uni-easyinput v-model="formData.entContactInfo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="所属区域"
              :label-width="170"
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

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业证照信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="许可证类型"
              :label-width="170"
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
          <uni-col :span="12">
            <uni-forms-item
              label="编号"
              :label-width="170"
              label-align="right"
              name="formData.number"
            >
              <uni-easyinput v-model="formData.number" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="有效期"
              :label-width="170"
              label-align="right"
              name="formData.expirationDate"
            >
              <uni-easyinput v-model="formData.expirationDate" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="颁布单位"
              :label-width="170"
              label-align="right"
              name="formData.issuingUnit"
            >
              <uni-easyinput v-model="formData.issuingUnit" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="税务许可证编号"
              :label-width="170"
              label-align="right"
              name="formData.taxLicenseNum"
            >
              <uni-easyinput v-model="formData.taxLicenseNum" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="税务许可证有效期"
              :label-width="170"
              label-align="right"
              name="formData.taxLicenseValidity"
            >
              <uni-datetime-picker
                type="date"
                placeholder="请选择"
                v-model="formData.taxLicenseValidity"
                @change="changeDate"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="税务许可证颁布单位"
              :label-width="170"
              label-align="right"
              name="formData.taxLicenseValidityIsuuingUnit"
            >
              <uni-easyinput
                v-model="formData.taxLicenseValidityIsuuingUnit"
                type="text"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业工商信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="许可证类型"
              :label-width="170"
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
          <uni-col :span="12">
            <uni-forms-item
              label="成立日期"
              :label-width="170"
              label-align="right"
              name="formData.estDate"
            >
              <uni-datetime-picker
                type="date"
                placeholder="请选择"
                v-model="formData.estDate"
                @change="changeDate"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="企业地址"
              :label-width="170"
              label-align="right"
              name="formData.address"
            >
              <uni-easyinput v-model="formData.address" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="注册资金"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">m</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="所属行业"
              :label-width="170"
              label-align="right"
              name="formData.trade"
            >
              <uni-data-select
                v-model="formData.trade"
                :localdata="positionRange"
                @change="changePosition"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="企业所属分类"
              :label-width="170"
              label-align="right"
              name="formData.classify"
            >
              <uni-data-select
                v-model="formData.classify"
                :localdata="positionRange"
                @change="changePosition"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="经济性质"
              :label-width="170"
              label-align="right"
              name="formData.economicNature"
            >
              <uni-easyinput v-model="formData.economicNature" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="其他权证情况"
              :label-width="170"
              label-align="right"
              name="formData.otherWarrants"
            >
              <uni-easyinput v-model="formData.otherWarrants" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="经营范围"
              :label-width="170"
              label-align="right"
              name="formData.businessNature"
            >
              <uni-easyinput
                v-model="formData.businessNature"
                type="textarea"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业资产信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="固定资产原值"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="固定资产净值"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(3)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="正式员工人数"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(4)"
                  @blur="inputBlur"
                />
                <view class="unit">人</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="临时员工人数"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 5 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(5)"
                  @blur="inputBlur"
                />
                <view class="unit">人</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="年工资总金额"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 6 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(6)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="近三年平均年产值"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 7 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(7)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="近三年平均年利润"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 8 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(8)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="近三年平均年缴税金额"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 9 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(9)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业其他信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="生产经营状况"
              :label-width="170"
              label-align="right"
              name="formData.trade"
            >
              <uni-data-select
                v-model="formData.trade"
                :localdata="positionRange"
                @change="changePosition"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="主要产品种类"
              :label-width="170"
              label-align="right"
              name="formData.classify"
            >
              <uni-data-select
                v-model="formData.classify"
                :localdata="positionRange"
                @change="changePosition"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="企业涉及情况"
              :label-width="170"
              label-align="right"
              name="formData.trade"
            >
              <uni-data-select
                v-model="formData.trade"
                :localdata="positionRange"
                @change="changePosition"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="企业初步处理方案"
              :label-width="170"
              label-align="right"
              name="formData.classify"
            >
              <uni-data-select
                v-model="formData.classify"
                :localdata="positionRange"
                @change="changePosition"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="备注"
              :label-width="170"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput v-model="formData.remark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">土地使用情况</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="出让权属面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 10 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(10)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="出让占用面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 11 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(11)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="划拨权属面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 12 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(12)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="划拨占用面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 13 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(13)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="租用权属面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 14 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(14)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="租用占用面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 15 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(15)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="其他权属面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 16 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(16)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="其他占用面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view :class="['input-wrapper', focusIndex === 17 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regAmount"
                  @focus="inputFocus(17)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="其他占用面积"
              :label-width="170"
              label-align="right"
              name="formData.regAmount"
            >
              <view class="input-wrapper">
                <input
                  class="input-txt"
                  placeholder="合计"
                  type="number"
                  readonly
                  v-model="formData.regAmount"
                />
                <view class="unit">亩</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="备注"
              :label-width="170"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput v-model="formData.remark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">营业执照</view>
        </view>

        <view class="upload-wrapper">
          <uni-file-picker
            title="最多选择20张图片"
            :limit="20"
            @select="select"
            @progress="progress"
            @success="success"
            @fail="fail"
          />
        </view>
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

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

// 所在位置选项
const positionRange = ref<any>([
  { text: '淹没区', value: 0 },
  { text: '非淹没区', value: 1 }
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

// 所在位置选择
const changePosition = (data: any) => {
  console.log('data:', data)
}

// 税务许可证有效期选择
const changeDate = (e: any) => {
  console.log('e:', e)
}

// 输入框获得焦点
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点
const inputBlur = () => {
  focusIndex.value = -1
}

// 选择所属区域
const changeVillage = (e: any) => {
  console.log('e:', e)
}

// 点击 所属区域 节点
const clickVillageNode = (node: any) => {
  console.log('node:', node)
}

// 获取上传状态
const select = (e: any) => {
  console.log('选择文件：', e)
}

// 获取上传进度
const progress = (e: any) => {
  console.log('上传进度：', e)
}

// 上传成功
const success = (e: any) => {
  console.log('上传成功')
}

// 上传失败
const fail = (e: any) => {
  console.log('上传失败：', e)
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
  width: 100%;
  height: 100vh;
  background: url('../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

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

      .upload-wrapper {
        padding: 0 6rpx;
        box-sizing: border-box;
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
