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
              required
              label="身份证号"
              :label-width="150"
              label-align="right"
              name="formData.card"
            >
              <uni-easyinput v-model="formData.card" type="idcard" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="性别"
              :label-width="150"
              label-align="right"
              name="formData.sex"
            >
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
              name="formData.cardPic"
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
              name="formData.householdPic"
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
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { routerBack, getStorage, StorageKey } from '@/utils'
import { addLandlordPeopleApi, updateLandlordPeopleApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'

// 表单数据
const formData = ref<any>({})

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

// 出生年月选择
const changeDate = (e: any) => {
  console.log('e:', e)
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
  const params = { ...formData.value }
  if (!formData.value.name) {
    showToast('请输入姓名')
    return
  } else if (!formData.value.card) {
    showToast('请输入身份证号')
    return
  } else if (!formData.value.sex) {
    showToast('请选择性别')
    return
  } else if (!formData.value.birthday) {
    showToast('请选择出生年月')
    return
  } else if (!formData.value.realation) {
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
        .catch((e) => {
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
        .catch((e) => {
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
