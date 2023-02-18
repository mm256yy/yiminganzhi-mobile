<template>
  <view class="form-wrapper">
    <view class="line"></view>
    <Back />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="姓名"
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
              label="身份证号"
              :label-width="150"
              label-align="right"
              name="formData.idCard"
            >
              <uni-easyinput v-model="formData.idCard" type="idcard" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="性别"
              :label-width="150"
              label-align="right"
              name="formData.gender"
            >
              <uni-data-select
                v-model="formData.gender"
                :localdata="genderData"
                @change="changeGender"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="联系方式"
              :label-width="150"
              label-align="right"
              name="formData.phone"
            >
              <uni-easyinput v-model="formData.phone" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="出生年月"
              :label-width="150"
              label-align="right"
              name="formData.birthday"
            >
              <uni-datetime-picker
                type="date"
                placeholder="选择出生年月"
                v-model="formData.birthday"
                @change="changeDate"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="与户主关系"
              :label-width="150"
              label-align="right"
              name="formData.relationship"
            >
              <uni-data-select
                v-model="formData.relationship"
                :localdata="relationshipData"
                @change="changeRelationship"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="民族"
              :label-width="150"
              label-align="right"
              name="formData.nation"
            >
              <uni-data-select
                v-model="formData.nation"
                :localdata="nationData"
                @change="changeNation"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="婚姻状况"
              :label-width="150"
              label-align="right"
              name="formData.marital"
            >
              <uni-data-select
                v-model="formData.marital"
                :localdata="maritalData"
                @change="changeMarital"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="文化程度"
              :label-width="150"
              label-align="right"
              name="formData.education"
            >
              <uni-data-select
                v-model="formData.education"
                :localdata="educationData"
                @change="changeEducation"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="参保情况"
              :label-width="150"
              label-align="right"
              name="formData.insurance"
            >
              <uni-data-select
                v-model="formData.insurance"
                :localdata="insuranceData"
                @change="changeInsurance"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="工作单位"
              :label-width="150"
              label-align="right"
              name="formData.work"
            >
              <uni-easyinput v-model="formData.work" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="职业"
              :label-width="150"
              label-align="right"
              name="formData.occupation"
            >
              <uni-data-select
                v-model="formData.occupation"
                :localdata="occupationData"
                @change="changeOccupation"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="人口类型"
              :label-width="150"
              label-align="right"
              name="formData.populationType"
            >
              <uni-data-select
                v-model="formData.populationType"
                :localdata="populationTypeData"
                @change="changePopulationType"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="人口类别"
              :label-width="150"
              label-align="right"
              name="formData.populationCategory"
            >
              <uni-data-select
                v-model="formData.populationCategory"
                :localdata="populationCategoryData"
                @change="changePopulationCategory"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="户籍册类别"
              :label-width="150"
              label-align="right"
              name="formData.registeredResidence"
            >
              <uni-data-select
                v-model="formData.registeredResidence"
                :localdata="registeredResidenceData"
                @change="changeRegisteredResidence"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="户籍册编号"
              :label-width="150"
              label-align="right"
              name="formData.registeredResidenceNo"
            >
              <uni-easyinput
                v-model="formData.registeredResidenceNo"
                type="text"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="户籍地址"
              :label-width="150"
              label-align="right"
              name="formData.address"
            >
              <uni-easyinput v-model="formData.address" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput v-model="formData.remark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="上传身份证照片"
              :label-width="150"
              label-align="right"
              name="formData.address"
            >
              <uni-file-picker
                title="最多选择2张图片"
                :limit="2"
                @select="selectIdCard"
                @progress="idCardProgress"
                @success="idCardSuccess"
                @fail="idCardFail"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="上传户口本照片"
              :label-width="150"
              label-align="right"
              name="formData.householdRegister"
            >
              <uni-file-picker
                title="最多选择1张图片"
                :limit="1"
                @select="selectHouseholdRegister"
                @progress="householdRegisterProgress"
                @success="householdRegisterSuccess"
                @fail="householdRegisterFail"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="上传人口其他照片"
              :label-width="150"
              label-align="right"
              name="formData.otherPic"
            >
              <uni-file-picker
                title="最多选择20张图片"
                :limit="20"
                @select="selectOtherPic"
                @progress="otherPicProgress"
                @success="otherPicSuccess"
                @fail="otherPicFail"
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
import Back from '@/components/Back/Index.vue'

// 表单数据
const formData = ref<any>({})

// 表单校验规则
const rules = ref<any>({})

// 性别数据选项
const genderData = ref<any>([
  { text: '男', value: 1 },
  { text: '女', value: 2 }
])

// 与户主关系数据选项
const relationshipData = ref<any>([
  { text: '户主', value: 1 },
  { text: '夫', value: 2 },
  { text: '妻', value: 3 },
  { text: '子', value: 4 },
  { text: '独生子', value: 5 },
  { text: '长子', value: 6 },
  { text: '次子', value: 7 }
])

// 民族数据选项
const nationData = ref<any>([
  { text: '汉族', value: 1 },
  { text: '蒙古族', value: 2 },
  { text: '壮族', value: 3 },
  { text: '苗族', value: 4 }
])

// 婚姻状况数据选项
const maritalData = ref<any>([
  { text: '已婚', value: 1 },
  { text: '未婚', value: 2 },
  { text: '离异', value: 3 },
  { text: '丧偶', value: 4 },
  { text: '再婚', value: 5 },
  { text: '复婚', value: 6 }
])

// 文化程度数据选项
const educationData = ref<any>([
  { text: '研究生', value: 1 },
  { text: '大学生', value: 2 }
])

// 参保情况数据选项
const insuranceData = ref<any>([
  { text: '商业保险', value: 1 },
  { text: '医疗保险', value: 2 },
  { text: '养老保险', value: 1 },
  { text: '其他', value: 2 },
  { text: '无', value: 1 }
])

// 职业数据选项
const occupationData = ref<any>([
  { text: '专业技术人员', value: 1 },
  { text: '办事人员和有关人员', value: 2 }
])

// 人口类型数据选项
const populationTypeData = ref<any>([
  { text: '册内人口', value: 1 },
  { text: '册外人口', value: 2 },
  { text: '其他人口', value: 3 }
])

// 人口类别数据选项
const populationCategoryData = ref<any>([
  { text: '正常', value: 1 },
  { text: '婚嫁未出（可迁出）', value: 2 },
  { text: '婚嫁未出（不可迁出）', value: 3 }
])

// 户籍册类别数据选项
const registeredResidenceData = ref<any>([
  { text: '农村家庭户', value: 1 },
  { text: '农村集体户', value: 2 },
  { text: '城镇家庭户', value: 3 }
])

// 性别选择
const changeGender = (data: any) => {
  console.log('data:', data)
}

// 出生年月选择
const changeDate = (e: any) => {
  console.log('e:', e)
}

// 与户主关系选择
const changeRelationship = (data: any) => {
  console.log('data:', data)
}

// 民族选择
const changeNation = (data: any) => {
  console.log('data:', data)
}

// 婚姻状况选择
const changeMarital = (data: any) => {
  console.log('data:', data)
}

// 文化程度选择
const changeEducation = (data: any) => {
  console.log('data:', data)
}

// 参保情况选择
const changeInsurance = (data: any) => {
  console.log('data:', data)
}

// 职业选择
const changeOccupation = (data: any) => {
  console.log('data:', data)
}

// 人口类型选择
const changePopulationType = (data: any) => {
  console.log('data:', data)
}

// 人口类别选择
const changePopulationCategory = (data: any) => {
  console.log('data:', data)
}

// 户籍册类别选择
const changeRegisteredResidence = (data: any) => {
  console.log('data:', data)
}

// 获取身份证上传状态
const selectIdCard = (e: any) => {
  console.log('选择文件：', e)
}

// 获取身份证上传进度
const idCardProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 户口本上传成功
const idCardSuccess = (e: any) => {
  console.log('上传成功')
}

// 户口本上传失败
const idCardFail = (e: any) => {
  console.log('上传失败：', e)
}

// 获取户口本上传状态
const selectHouseholdRegister = (e: any) => {
  console.log('选择文件：', e)
}

// 获取户口本上传进度
const householdRegisterProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 户口本上传成功
const householdRegisterSuccess = (e: any) => {
  console.log('上传成功')
}

// 户口本上传失败
const householdRegisterFail = (e: any) => {
  console.log('上传失败：', e)
}

// 获取人口其他照片上传状态
const selectOtherPic = (e: any) => {
  console.log('选择文件：', e)
}

// 获取人口其他照片上传进度
const otherPicProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 人口其他照片上传成功
const otherPicSuccess = (e: any) => {
  console.log('上传成功')
}

// 人口其他照片上传失败
const otherPicFail = (e: any) => {
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
  flex: 1;
  height: 100vh;

  .line {
    height: var(--status-bar-height);
  }

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

      ::v-deep.uni-forms-item__label {
        font-size: 9rpx !important;
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
