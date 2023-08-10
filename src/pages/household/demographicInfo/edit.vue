<template>
  <view class="form-wrapper">
    <Back :title="title" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
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
              label="身份证号"
              :label-width="150"
              label-align="right"
              name="formData.card"
            >
              <uni-easyinput v-model="formData.card" type="idcard" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item label="性别" :label-width="150" label-align="right" name="formData.sex">
              <uni-data-select v-model="formData.sex" :localdata="dict[292]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="联系方式"
              :label-width="150"
              label-align="right"
              name="formData.phone"
            >
              <uni-easyinput
                v-model="formData.phone"
                type="number"
                :maxlength="11"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="出生日期"
              :label-width="150"
              label-align="right"
              name="formData.birthday"
            >
              <view class="picker-wrapper">
                <picker mode="date" :value="currentDate" :fields="'month'" @change="bindDateChange">
                  <view :class="['uni-input', formData.birthday ? '' : 'select']">
                    {{ formData.birthday ? formData.birthday : '选择出生日期' }}
                  </view>
                </picker>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="与户主关系"
              :label-width="150"
              label-align="right"
              name="formData.relation"
            >
              <uni-data-select v-model="formData.relation" :localdata="dict[307]" />
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
              <uni-data-select v-model="formData.nation" :localdata="dict[278]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="婚姻状况"
              :label-width="150"
              label-align="right"
              name="formData.marital"
            >
              <uni-data-select v-model="formData.marital" :localdata="dict[260]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="文化程度"
              :label-width="150"
              label-align="right"
              name="formData.education"
            >
              <uni-data-select v-model="formData.education" :localdata="dict[272]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="参保情况"
              :label-width="150"
              label-align="right"
              name="formData.insuranceType"
            >
              <muti-select
                v-model="formData.insuranceType"
                :value="formData.insuranceType"
                :list="dict[306]"
                label-key="text"
                value-key="value"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="工作单位"
              :label-width="150"
              label-align="right"
              name="formData.company"
            >
              <uni-easyinput v-model="formData.company" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="职业"
              :label-width="150"
              label-align="right"
              name="formData.occupation"
            >
              <view
                :class="['name-wrapper', selectedData ? 'isSelected' : '']"
                @click="selectOccupation"
              >
                {{ selectedData ? selectedData : '请选择' }}
              </view>
              <!-- <uni-data-select v-model="formData.occupation" :localdata="dict[305]" /> -->
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="人口类型"
              :label-width="150"
              label-align="right"
              name="formData.populationType"
            >
              <uni-data-select v-model="formData.populationType" :localdata="dict[244]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="人口类别"
              required
              :label-width="150"
              label-align="right"
              name="formData.populationSort"
            >
              <uni-data-select v-model="formData.populationSort" :localdata="dict[274]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="户籍册类别"
              required
              :label-width="150"
              label-align="right"
              name="formData.censusType"
            >
              <uni-data-select v-model="formData.censusType" :localdata="dict[249]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="户籍册编号"
              :label-width="150"
              label-align="right"
              name="formData.householdNumber"
            >
              <uni-easyinput v-model="formData.householdNumber" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="户籍所在地"
              :label-width="150"
              label-align="right"
              name="formData.censusRegister"
            >
              <uni-easyinput
                v-model="formData.censusRegister"
                type="textarea"
                placeholder="请输入"
              />
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
          <uni-col :span="24" v-if="stage === MainStage.review && type === 'add'">
            <uni-forms-item
              required
              label="新增原因"
              :label-width="150"
              label-align="right"
              name="formData.addReason"
            >
              <uni-easyinput v-model="formData.addReason" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="上传身份证照片"
              :label-width="150"
              label-align="right"
              name="formData.cardPic"
            >
              <upload-file
                v-model="formData.cardPic"
                :file-list="formData.cardPic"
                :limit="2"
                show-type="list"
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="上传户口本照片"
              :label-width="150"
              label-align="right"
              name="formData.householdPic"
            >
              <upload-file
                v-model="formData.householdPic"
                :file-list="formData.householdPic"
                :limit="10"
                show-type="list"
                :accepts="['.jpg', '.png']"
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
              <upload-file
                v-model="formData.otherPic"
                :file-list="formData.otherPic"
                :limit="10"
                show-type="list"
                :accepts="['.jpg', '.png']"
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

    <cascade-select
      v-if="showSelect"
      :data-list="occupationOptions"
      :value="selectValue"
      :label="selectLabel"
      :select-any="true"
      @on-close="showSelect = false"
      @on-confirm="confirmSelect"
    />
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import dayjs from 'dayjs'
import {
  routerBack,
  getStorage,
  StorageKey,
  fmtOccupation,
  fmtOccupationStr,
  cardReg
} from '@/utils'
import { addLandlordPeopleApi, updateLandlordPeopleApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { MainStage } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import MutiSelect from '@/components/MutiSelect/Index.vue'
import UploadFile from '@/components/UploadFile/index.vue'
import CascadeSelect from '@/components/CascadeSelect/Index.vue'

// 表单数据
const formData = ref<any>({
  name: '',
  sex: '',
  phone: '',
  birthday: null,
  relation: '',
  nation: '',
  marital: '',
  education: '',
  insuranceType: '',
  company: '',
  occupation: '',
  populationType: '',
  populationSort: '',
  censusType: '',
  householdNumber: '',
  censusRegister: '',
  remark: '',
  addReason: '',
  cardPic: '[]',
  householdPic: '[]',
  otherPic: '[]'
})

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey

// 表单类型，add 新增表单，edit 编辑表单
const type = ref<string>('')
const title = ref<string>('')
const uid = ref<string>('')
const showSelect = ref<boolean>(false)
const occupationOptions = ref<any>([])
const selectValue = ref<any>([])
const selectLabel = ref<any>([])
const selectedData = ref<string>('')

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取年月
const getDate = () => {
  if (formData.value.birthday) {
    return formData.value.birthday
  } else {
    return `${dayjs().year()}-${dayjs().month() + 1}`
  }
}

const currentDate = ref<any>('')

onLoad((option: any) => {
  if (option) {
    type.value = option.type
    uid.value = option.uid
    occupationOptions.value = JSON.parse(option.occupationOptions)
    if (option.type === 'edit') {
      formData.value = JSON.parse(option.params)
      selectValue.value = formData.value.occupation ? JSON.parse(formData.value.occupation) : []
      selectLabel.value = fmtOccupation(occupationOptions.value, formData.value.occupation)
      selectedData.value = formData.value.occupation
        ? fmtOccupationStr(occupationOptions.value, formData.value.occupation, 1)
        : ''
      title.value = '个人信息编辑'
      currentDate.value = getDate()
    } else if (option.type === 'add') {
      title.value = '新增个人信息'
      currentDate.value = getDate()
    }
  }
})

/**
 * 日期选择
 * @param{Object} e
 */
const bindDateChange = (e: any) => {
  formData.value.birthday = e.detail.value
}

// 选择职业（弹出职业选择框）
const selectOccupation = () => {
  showSelect.value = true
}

// 确认选择职业
const confirmSelect = (currentSelect: any[], label: any[]) => {
  if (currentSelect && currentSelect.length > 0) {
    selectValue.value = currentSelect
    formData.value.occupation = JSON.stringify(currentSelect)
  }
  if (label && label.length > 0) {
    selectLabel.value = label
    selectedData.value = label.toString()
  }
  showSelect.value = false
}

// 表单提交
const submit = () => {
  const params = {
    ...formData.value,
    birthday: formData.value.birthday ? dayjs(formData.value.birthday) : formData.value.birthday
  }
  if (!formData.value.name) {
    showToast('请输入姓名')
    return
  } else if (!formData.value.relation) {
    showToast('请选择与户主关系')
    return
  } else if (!formData.value.insuranceType) {
    showToast('请选择参保情况')
    return
  } else if (!formData.value.populationType) {
    showToast('请选择人口类型')
    return
  } else if (!formData.value.populationSort) {
    showToast('请选择人口类别')
    return
  } else if (!formData.value.censusType) {
    showToast('请选择户籍册类别')
    return
  } else if (!formData.value.addReason && type.value === 'add' && stage === MainStage.review) {
    showToast('请输入新增原因')
    return
  } else if (formData.value.card && !cardReg.test(formData.value.card)) {
    showToast('请输入正确的身份证号')
    return
  } else {
    if (type.value === 'add') {
      addLandlordPeopleApi(uid.value, params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    } else {
      updateLandlordPeopleApi(uid.value, params)
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

      .name-wrapper {
        width: 200rpx;
        height: 23rpx;
        padding-left: 7rpx;
        overflow: hidden;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #999;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.isSelected {
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
