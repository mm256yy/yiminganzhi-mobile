<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户基本信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="法人姓名"
              :label-width="170"
              label-align="right"
              name="formData.legalPersonName"
            >
              <uni-easyinput v-model="formData.legalPersonName" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="法人身份证号"
              :label-width="170"
              label-align="right"
              name="formData.legalPersonCard"
            >
              <uni-easyinput v-model="formData.legalPersonCard" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
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
              required
              label="个体工商户名称"
              :label-width="170"
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
              label="所属区域"
              :label-width="170"
              label-align="right"
              name="formData.villageCode"
            >
              <village-select-form-item
                v-model:areaCode="formData.areaCode"
                v-model:townCode="formData.townCode"
                v-model:villageCode="formData.villageCode"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="所在位置"
              :label-width="170"
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
              label="个体工商户编码"
              :label-width="170"
              label-align="right"
              name="formData.suffixNo"
            >
              <view v-if="!formData.id" :class="['code-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  v-model="formData.doorNo"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
              </view>
              <view v-else class="code-wrapper">
                <input class="input-txt disabled" v-model="formData.doorNo" disabled />
              </view>
              <!-- <view v-if="!formData.id" :class="['code-wrapper', focusIndex === 1 ? 'focus' : '']">
                <view class="pre-txt">
                  {{ formData.villageCode ? 'G' + formData.villageCode : '' }}
                </view>
                <input
                  class="input-txt"
                  type="number"
                  placeholder="请输入"
                  :maxlength="4"
                  v-model="formData.suffixNo"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
              </view>
              <view v-else class="code-wrapper">
                <input class="input-txt disabled" v-model="formData.doorNo" disabled />
              </view> -->
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="关联居民户"
              :label-width="150"
              label-align="right"
              name="formData.householderDoorNo"
            >
              <view class="flex-center">
                <view
                  :class="['name-wrapper', formData.householderName ? 'isSelected' : '']"
                  @click="selectName"
                >
                  {{ formData.householderName ? formData.householderName : '请选择' }}
                </view>
                <view @click="resetOwnersName">
                  <image
                    class="icon_img"
                    src="@/static/images/icon_delete_mini.png"
                    mode="scaleToFill"
                  />
                </view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户证照信息</view>
        </view>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="税务许可证编号"
              :label-width="170"
              label-align="right"
              name="formData.taxLicenceNo"
            >
              <uni-easyinput v-model="formData.taxLicenceNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="税务许可证有效期"
              :label-width="170"
              label-align="right"
              name="formData.taxPeriodValidity"
            >
              <uni-easyinput
                v-model="formData.taxPeriodValidity"
                type="text"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="税务许可证颁布单位"
              :label-width="170"
              label-align="right"
              name="formData.taxLicenceCompany"
            >
              <uni-easyinput
                v-model="formData.taxLicenceCompany"
                type="text"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="许可证类型"
              :label-width="170"
              label-align="right"
              name="formData.licenceType"
            >
              <uni-data-select v-model="formData.licenceType" :localdata="dict[217]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="许可证编号"
              :label-width="170"
              label-align="right"
              name="formData.licenceNo"
            >
              <uni-easyinput v-model="formData.licenceNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="许可证有效期"
              :label-width="170"
              label-align="right"
              name="formData.periodValidity"
            >
              <uni-easyinput v-model="formData.periodValidity" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="许可证颁布单位"
              :label-width="170"
              label-align="right"
              name="formData.issuingCompany"
            >
              <uni-easyinput v-model="formData.issuingCompany" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户工商信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="登记注册类型"
              :label-width="170"
              label-align="right"
              name="formData.registerType"
            >
              <uni-data-select v-model="formData.registerType" :localdata="dict[219]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="成立日期"
              :label-width="170"
              label-align="right"
              name="formData.establishDate"
            >
              <uni-datetime-picker
                type="date"
                placeholder="请选择"
                v-model="formData.establishDate"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="个体工商户地址"
              :label-width="170"
              label-align="right"
              name="formData.companyAddress"
            >
              <uni-easyinput v-model="formData.companyAddress" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="注册资金"
              :label-width="170"
              label-align="right"
              name="formData.registeredAmount"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.registeredAmount"
                  @focus="inputFocus(2)"
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
              label="所属行业"
              :label-width="170"
              label-align="right"
              name="formData.industryType"
            >
              <uni-data-select v-model="formData.industryType" :localdata="dict[215]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="其他权证情况"
              :label-width="170"
              label-align="right"
              name="formData.ohterLicence"
            >
              <uni-easyinput v-model="formData.ohterLicence" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="经营范围"
              :label-width="170"
              label-align="right"
              name="formData.natureBusiness"
            >
              <uni-easyinput
                v-model="formData.natureBusiness"
                type="textarea"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户资产信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="固定资产原值"
              :label-width="170"
              label-align="right"
              name="formData.fixedAssetsOriginalValue"
            >
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.fixedAssetsOriginalValue"
                  @focus="inputFocus(3)"
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
              name="formData.fixedAssetsNetValue"
            >
              <view :class="['input-wrapper', focusIndex === 4 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.fixedAssetsNetValue"
                  @focus="inputFocus(4)"
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
              name="formData.regularWorkerNum"
            >
              <view :class="['input-wrapper', focusIndex === 5 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.regularWorkerNum"
                  @focus="inputFocus(5)"
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
              name="formData.temporaryWorkerNum"
            >
              <view :class="['input-wrapper', focusIndex === 6 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.temporaryWorkerNum"
                  @focus="inputFocus(6)"
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
              name="formData.annualPayroll"
            >
              <view :class="['input-wrapper', focusIndex === 7 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.annualPayroll"
                  @focus="inputFocus(7)"
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
              name="formData.averageAnnualOutputValue"
            >
              <view :class="['input-wrapper', focusIndex === 8 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.averageAnnualOutputValue"
                  @focus="inputFocus(8)"
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
              name="formData.averageAnnualProfit"
            >
              <view :class="['input-wrapper', focusIndex === 9 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.averageAnnualProfit"
                  @focus="inputFocus(9)"
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
              name="formData.averageAnnualTaxPaid"
            >
              <view :class="['input-wrapper', focusIndex === 10 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.averageAnnualTaxPaid"
                  @focus="inputFocus(10)"
                  @blur="inputBlur"
                />
                <view class="unit">万元</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户其他信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="生产经营状况"
              :label-width="170"
              label-align="right"
              name="formData.managementStatus"
            >
              <uni-data-select v-model="formData.managementStatus" :localdata="dict[213]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="主要产品种类"
              :label-width="170"
              label-align="right"
              name="formData.productCategory"
            >
              <uni-easyinput v-model="formData.productCategory" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="个体户影响情况"
              :label-width="170"
              label-align="right"
              name="formData.informationInvolved"
            >
              <uni-data-select v-model="formData.informationInvolved" :localdata="dict[209]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="个体户初步处理方案"
              :label-width="170"
              label-align="right"
              name="formData.treatmentScheme"
            >
              <uni-data-select v-model="formData.treatmentScheme" :localdata="dict[210]" />
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
          <view class="title">个体工商户附件信息</view>
        </view>

        <view class="upload-wrapper">
          <uni-row>
            <uni-col :span="24">
              <uni-forms-item
                label="营业执照"
                :label-width="170"
                label-align="right"
                name="formData.licensePic"
              >
                <upload-file
                  v-model="formData.licensePic"
                  :file-list="formData.licensePic"
                  :limit="20"
                  show-type="list"
                  :accepts="['.jpg', '.png']"
                />
              </uni-forms-item>
            </uni-col>
            <uni-col :span="24">
              <uni-forms-item
                label="其他附件"
                :label-width="170"
                label-align="right"
                name="formData.otherPic"
              >
                <upload-file
                  v-model="formData.otherPic"
                  :file-list="formData.otherPic"
                  :limit="20"
                  show-type="list"
                  :accepts="['.jpg', '.png']"
                />
              </uni-forms-item>
            </uni-col>
          </uni-row>
        </view>
      </uni-forms>

      <image
        class="submit-btn"
        src="@/static/images/icon_submit.png"
        mode="scaleToFill"
        @click="submit"
      />
    </view>
    <!-- 搜索选择户号 -->
    <search-list
      v-show="showSearch"
      :mainType="MainType.PeasantHousehold"
      type="multiple"
      stage="implementation"
      status="1"
      @close="close"
      @confirm-select="confirmSelect"
    />
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { routerBack, getStorage, StorageKey, fmtPicUrl, cardReg } from '@/utils'
import { addLandlordApi, updateLandlordCompanyApi, updateAssociation } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'
import VillageSelectFormItem from '@/components/VillageSelectFormItem/index.vue'
import UploadFile from '@/components/UploadFile/index.vue'
import { MainType } from '@/types/common'
import SearchList from '@/components/SearchList/Index.vue'
const showSearch = ref<boolean>(false)
import { getImpLandlordListBySearchApi } from '@/service'
const getLandlordListBySearch = () => {
  let params = {
    type: MainType.PeasantHousehold,
    page: 1,
    pageSize: 50
  }
  getImpLandlordListBySearchApi(params).then((res) => {
    console.log(res, '居民户数据')
    const list = res.filter((item: any) => item.doorNo == formData.value.householderDoorNo)
    formData.value.relateDoorName = list[0]?.name
    console.log(formData.value.relateDoorName, '用户名字')
  })
}
// 表单数据
const formData = ref<any>({
  name: '',
  areaCode: '',
  townCode: '',
  villageCode: '',
  locationType: null,
  phone: '',
  periodValidity: null,
  establishDate: null,
  taxPeriodValidity: null,
  legalPersonName: '',
  legalPersonCard: '',
  legalPersonPhone: '',
  companyType: '',
  companyAddress: '',
  licenceType: '',
  licenceNo: '',
  taxLicenceNo: '',
  taxLicenceCompany: '',
  ohterLicence: '',
  registerType: '',
  natureBusiness: '',
  industryType: '',
  economicNature: '',
  registeredAmount: '',
  fixedAssetsOriginalValue: '',
  fixedAssetsNetValue: '',
  regularWorkerNum: '',
  temporaryWorkerNum: '',
  annualPayroll: '',
  averageAnnualOutputValue: '',
  averageAnnualProfit: '',
  averageAnnualTaxPaid: '',
  productCategory: '',
  managementStatus: '',
  informationInvolved: '',
  treatmentScheme: '',
  otherRemark: '',
  licensePic: '[]',
  otherPic: '[]',
  householderDoorNo: null,
  householderName: null
})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)
const title = ref<string>('')
const type = ref<string>('')
const uid = ref<string>('')

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  if (option) {
    type.value = option.type
    if (type.value === 'edit') {
      let params = JSON.parse(option.params)
      formData.value = { ...params }
      title.value = '个体工商户基本概况编辑'
      uid.value = option.uid
      console.log(uid.value, '测试传入的uid是什么？')
    } else if (type.value === 'add') {
      console.log(option)

      title.value = '添加个体工商户'
      if (option.areaCode && option.townCode && option.villageCode) {
        formData.value.areaCode = option.areaCode
        formData.value.townCode = option.townCode
        formData.value.villageCode = option.villageCode
      }
      if (option.householderDoorNo && option.householderName) {
        formData.value.householderDoorNo = option.householderDoorNo
        formData.value.householderName = option.householderName
      }
    }
    if (!formData.value.registerType) {
      formData.value.registerType = '31'
    }
  }
})

// 输入框获得焦点
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点
const inputBlur = () => {
  focusIndex.value = -1
}
// 选择户主姓名/户号
const selectName = () => {
  showSearch.value = true
}
// 关闭搜索组件
const close = () => {
  showSearch.value = false
}

/**
 * 确认搜索户主姓名/户号
 * @param{Object} data
 */
const confirmSelect = (data: any) => {
  let idArr: any = []
  let nameArr: any = []
  if (data && data.length) {
    data.map((item: any) => {
      idArr.push(item.value)
      nameArr.push(item.label)
    })
    formData.value.householderDoorNo = idArr.toString()
    console.log(formData.value.householderDoorNo, '测试ID')
    formData.value.householderName = nameArr.toString()
  }
  close()
}

const resetOwnersName = () => {
  formData.value.householderDoorNo = ''
  formData.value.householderName = ''
}
// 表单提交
const submit = () => {
  let baseInfo: any = {
    uid: uid.value,
    name: formData.value.name,
    // doorNo:
    //   formData.value.id && formData.value.doorNo
    //     ? formData.value.doorNo
    //     : formData.value.suffixNo
    //     ? 'G' + formData.value.villageCode + formData.value.suffixNo
    //     : '',
    doorNo: formData.value.doorNo,
    areaCode: formData.value.areaCode,
    townCode: formData.value.townCode,
    villageCode: formData.value.villageCode,
    locationType: formData.value.locationType,
    phone: formData.value.phone,
    type: MainType.IndividualHousehold,
    householderDoorNo: formData.value.householderDoorNo,
    householderName: formData.value.householderName
  }

  let company: any = {
    // doorNo:
    //   formData.value.id && formData.value.doorNo
    //     ? formData.value.doorNo
    //     : formData.value.suffixNo
    //     ? 'G' + formData.value.villageCode + formData.value.suffixNo
    //     : '',
    doorNo: formData.value.doorNo,
    legalPersonName: formData.value.legalPersonName,
    legalPersonCard: formData.value.legalPersonCard,
    legalPersonPhone: formData.value.legalPersonPhone,
    companyType: formData.value.companyType,
    companyAddress: formData.value.companyAddress,
    licenceType: formData.value.licenceType,
    licenceNo: formData.value.licenceNo,
    taxLicenceNo: formData.value.taxLicenceNo,
    taxLicenceCompany: formData.value.taxLicenceCompany,
    ohterLicence: formData.value.ohterLicence,
    registerType: formData.value.registerType,
    natureBusiness: formData.value.natureBusiness,
    industryType: formData.value.industryType,
    economicNature: formData.value.economicNature,
    periodValidity: formData.value.periodValidity,
    establishDate: formData.value.establishDate
      ? dayjs(formData.value.establishDate)
      : formData.value.establishDate,
    taxPeriodValidity: formData.value.taxPeriodValidity,
    registeredAmount: formData.value.registeredAmount,
    fixedAssetsOriginalValue: formData.value.fixedAssetsOriginalValue,
    fixedAssetsNetValue: formData.value.fixedAssetsNetValue,
    regularWorkerNum: formData.value.regularWorkerNum,
    temporaryWorkerNum: formData.value.temporaryWorkerNum,
    annualPayroll: formData.value.annualPayroll,
    averageAnnualOutputValue: formData.value.averageAnnualOutputValue,
    averageAnnualProfit: formData.value.averageAnnualProfit,
    averageAnnualTaxPaid: formData.value.averageAnnualTaxPaid,
    productCategory: formData.value.productCategory,
    issuingCompany: formData.value.issuingCompany,
    managementStatus: formData.value.managementStatus,
    informationInvolved: formData.value.informationInvolved,
    treatmentScheme: formData.value.treatmentScheme,
    remark: formData.value.remark,
    licensePic: fmtPicUrl(formData.value.licensePic),
    otherPic: fmtPicUrl(formData.value.otherPic),
    householderDoorNo: formData.value.householderDoorNo
  }

  if (!formData.value.legalPersonName) {
    showToast('请输入法人姓名')
    return
  } else if (!formData.value.legalPersonCard) {
    showToast('请输入法人身份证号')
    return
  } else if (!cardReg.test(formData.value.legalPersonCard)) {
    showToast('请输入正确的法人身份证号')
    return
  } else if (!formData.value.name) {
    showToast('请输入个体工商户名称')
    return
  } else if (!formData.value.villageCode) {
    showToast('请选择所属区域')
    return
  } else if (!formData.value.doorNo) {
    showToast('请输入个体工商户编码')
    return
  } else if (!formData.value.registerType) {
    showToast('请选择登记注册类型')
    return
  } else if (!formData.value.taxLicenceCompany) {
    showToast('请输入税务许可证颁布单位')
    return
  } else if (!formData.value.taxPeriodValidity) {
    showToast('请输入税务许可证有效期')
    return
  } else if (!formData.value.taxLicenceNo) {
    showToast('请输入税务许可证编号')
    return
  } else if (!formData.value.phone) {
    showToast('请输入联系方式')
    return
  } else {
    if (type.value === 'add') {
      let params = {
        ...baseInfo,
        company
      }
      addLandlordApi(params)
        .then((res) => {
          if (res) {
            updateCommon()
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    } else if (type.value === 'edit') {
      company = {
        id: formData.value.id,
        uid: formData.value.uid,
        ...company
      }
      let params = {
        ...baseInfo,
        company
      }
      console.log(params, '测试传输数据')
      updateLandlordCompanyApi(uid.value, params)
        .then((res) => {
          if (res) {
            updateCommon()
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    }
  }
}
const updateCommon = () => {
  let values = {
    type: MainType.PeasantHousehold,
    doorNo: formData.value.householderDoorNo
  }
  getImpLandlordListBySearchApi(values).then((res) => {
    console.log(res, '居民户数据')
    let uid = res[0]?.uid
    let relateIndividualHouseholdName = formData.value.name
    updateAssociation({
      uid: uid,
      relateIndividualHouseholdName: relateIndividualHouseholdName,
      type: 'IndividualHousehold'
    }).then((res) => {
      console.log(res, '更新关联成功')
    })
  })
}

onMounted(() => {
  getLandlordListBySearch()
})
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
}
.name-wrapper {
  width: 200rpx;
  height: 23rpx;
  padding-left: 7rpx;
  font-size: 9rpx;
  line-height: 23rpx;
  color: #999;
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  &.isSelected {
    color: #171718;
  }
}
.icon_img {
  width: 23rpx;
  height: 23rpx;
  margin-left: 4rpx;
}
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
