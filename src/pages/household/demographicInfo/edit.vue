<template>
  <view class="form-wrapper">
    <Back :title="title" />
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
              <uni-datetime-picker
                type="date"
                placeholder="选择出生日期"
                v-model="formData.birthday"
              />
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
              label="参保情况"
              :label-width="150"
              label-align="right"
              name="formData.insuranceType"
            >
              <uni-data-select v-model="formData.insuranceType" :localdata="dict[306]" />
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
              <uni-data-select v-model="formData.occupation" :localdata="dict[305]" />
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
              <uni-data-select v-model="formData.populationType" :localdata="dict[244]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="人口类别"
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
              :label-width="150"
              label-align="right"
              name="formData.censusType"
            >
              <uni-data-select v-model="formData.censusType" :localdata="dict[273]" />
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
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { routerBack, getStorage, StorageKey } from '@/utils'
import { addLandlordPeopleApi, updateLandlordPeopleApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'
import UploadFile from '@/components/UploadFile/index.vue'

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
  cardPic: '[]',
  householdPic: '[]',
  otherPic: '[]'
})

// 表单类型，add 新增表单，edit 编辑表单
const type = ref<string>('')
const title = ref<string>('')
const uid = ref<string>('')

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

onLoad((option: any) => {
  if (option) {
    type.value = option.type
    uid.value = option.uid
    if (option.type === 'edit') {
      formData.value = JSON.parse(option.params)
      title.value = '个人信息编辑'
    } else if (option.type === 'add') {
      title.value = '新增个人信息'
    }
  }
})

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
