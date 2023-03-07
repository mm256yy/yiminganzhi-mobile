<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
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
              label="法人联系方式"
              :label-width="170"
              label-align="right"
              name="formData.legalPersonPhone"
            >
              <uni-easyinput v-model="formData.legalPersonPhone" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
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
              label="个体工商户编码"
              :label-width="170"
              label-align="right"
              name="formData.suffixNo"
            >
              <view :class="['code-wrapper', focusIndex === 1 ? 'focus' : '']">
                <view class="pre-txt">{{ 'G' + formData.villageCode }}</view>
                <input
                  class="input-txt"
                  type="number"
                  placeholder="请输入"
                  v-model="formData.suffixNo"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
              </view>
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
              label="个体工商户联系方式"
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
        </uni-row>

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户证照信息</view>
        </view>

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

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
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
              label="税务许可证有效期"
              :label-width="170"
              label-align="right"
              name="formData.taxPeriodValidity"
            >
              <uni-datetime-picker
                type="date"
                placeholder="请选择"
                v-model="formData.taxPeriodValidity"
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

        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户工商信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
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
                @change="changeDate"
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
              name="formData.industryType"
            >
              <uni-data-select v-model="formData.industryType" :localdata="dict[215]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="个体工商户所属分类"
              :label-width="170"
              label-align="right"
              name="formData.companyType"
            >
              <uni-data-select v-model="formData.companyType" :localdata="dict[216]" />
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
              <uni-easyinput v-model="formData.economicNature" placeholder="请输入" />
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
              label="个体户涉及情况"
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
              name="formData.otherRemark"
            >
              <uni-easyinput v-model="formData.otherRemark" type="textarea" placeholder="请输入" />
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
                <uni-file-picker
                  title="最多选择20张图片"
                  :limit="20"
                  @select="select"
                  @progress="progress"
                  @success="success"
                  @fail="fail"
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
                <uni-file-picker
                  title="最多选择20张图片"
                  :limit="20"
                  @select="select"
                  @progress="progress"
                  @success="success"
                  @fail="fail"
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
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { routerBack, getStorage, StorageKey } from '@/utils'
import { addLandlordCompanyApi, updateLandlordCompanyApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'
import VillageSelectFormItem from '@/components/VillageSelectFormItem/index.vue'

// 表单数据
const formData = ref<any>({})
const form = ref<any>(null)

// 表单校验规则
// 表单校验规则
const rules = reactive({
  legalPersonName: { rules: [{ required: true, message: '请输入', trigger: 'blur' }] },
  legalPersonCard: { rules: [{ required: true, message: '请输入', trigger: 'blur' }] },
  suffixNo: { rules: [{ required: true, message: '请输入', trigger: 'blur' }] },
  villageCode: { rules: [{ required: true, message: '请选择', trigger: 'change' }] }
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
  console.log('option:', option)
  if (option) {
    type.value = option.type
    uid.value = option.uid
    if (option.type === 'edit') {
      let params = JSON.parse(option.params)
      formData.value = { ...params }
      title.value = '个体工商户基本概况编辑'
    } else if (option.type === 'add') {
      title.value = '添加个体工商户'
    }
  }
})

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
  let baseInfo = {
    uid: uid.value,
    name: formData.value.name,
    doorNo: 'G' + formData.value.villageCode + formData.value.suffixNo,
    areaCode: formData.value.areaCode,
    townCode: formData.value.townCode,
    villageCode: formData.value.villageCode,
    locationType: formData.value.locationType,
    phone: formData.value.phone,
    periodValidity: formData.value.periodValidity,
    establishDate: formData.value.establishDate,
    taxPeriodValidity: formData.value.taxPeriodValidity
  }

  let company = {
    id: formData.value.id,
    doorNo: 'G' + formData.value.villageCode + formData.value.suffixNo,
    householdId: formData.value.householdId,
    uid: formData.value.uid,
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
    managementStatus: formData.value.managementStatus,
    informationInvolved: formData.value.informationInvolved,
    treatmentScheme: formData.value.treatmentScheme,
    otherRemark: formData.value.otherRemark,
    licensePic: formData.value.licensePic,
    otherPic: formData.value.otherPic
  }

  let params = {
    ...baseInfo,
    company
  }

  form.value?.validate().then((valid: any) => {
    if (valid) {
      if (type.value === 'add') {
        addLandlordCompanyApi(uid.value, params)
          .then((res) => {
            if (res) {
              showToast(SUCCESS_MSG)
              routerBack()
            }
          })
          .catch((e) => {
            showToast(ERROR_MSG)
          })
      } else if (type.value === 'edit') {
        updateLandlordCompanyApi(uid.value, params)
          .then((res) => {
            if (res) {
              showToast(SUCCESS_MSG)
              routerBack()
            }
          })
          .catch((e) => {
            showToast(ERROR_MSG)
          })
      }
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
