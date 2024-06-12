<template>
  <view class="form-wrapper">
    <!-- 人口核定编辑 -->
    <Back :title="title" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12" v-if="commonParams.type === 'add'">
            <uni-forms-item
              required
              label="新增原因"
              :label-width="150"
              label-align="right"
              name="formData.addReason"
            >
              <uni-data-select v-model="formData.addReason" :localdata="dict[370]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12" v-if="formData.addReason !== '3'">
            <uni-forms-item
              required
              label="人口性质"
              :label-width="150"
              label-align="right"
              name="formData.populationNature"
            >
              <uni-data-select
                :disabled="formData.addReason === '3'"
                v-model="formData.populationNature"
                :localdata="dict[263]"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              :required="formData?.relation == '1' ? true : false"
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
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.checkRemark"
            >
              <uni-easyinput v-model="formData.checkRemark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12" v-if="formData.addReason == '3'">
            <uni-forms-item
              required
              label="增计人口添加原因"
              :label-width="150"
              label-align="right"
              name="formData.incrementAddReason"
            >
              <uni-data-select v-model="formData.incrementAddReason" :localdata="dict[436]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row v-if="formData.addReason !== '3'">
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
        </uni-row>

        <uni-row v-if="formData.addReason !== '3'">
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

        <uni-row v-if="formData.addReason !== '3'">
          <uni-col :span="12">
            <uni-forms-item
              required
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
              required
              label="户籍册类别"
              :label-width="150"
              label-align="right"
              name="formData.censusType"
            >
              <uni-data-select v-model="formData.censusType" :localdata="dict[249]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row v-if="formData.addReason !== '3'">
          <uni-col :span="24">
            <uni-forms-item
              required
              label="身份证照片"
              :label-width="150"
              label-align="right"
              name="formData.cardPic"
            >
              <view class="display-flex">
                <upload-file
                  v-model="formData.cardPic"
                  :file-list="formData.cardPic"
                  :limit="2"
                  uploadType="IdCard"
                  show-type="list"
                  :accepts="['.jpg', '.png']"
                  style="width: 100%"
                />
              </view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              required
              label="户口本照片"
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
              label="其他照片"
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
import { ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, getStorage, StorageKey, fmtPicUrl, cardReg,phoneReg } from '@/utils'
import {
  addImpLandlordPeopleApi,
  updateImpLandlordPeopleApi,
  getImpLandlordItemApi
} from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'
import UploadFile from '@/components/UploadFile/index.vue'

const title = ref<string>('')
const commonParams = ref<any>({})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    const { type, phone } = commonParams.value
    formData.value.phone = phone
    if (type === 'edit') {
      title.value = '人口核定编辑'
      getLandlordDetail()
    } else if (type === 'add') {
      title.value = '新增人口核定'
    }
  }
})

// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  addReason: '', // 新增原因
  populationNature: '', // 人口性质
  checkRemark: '', // 备注
  name: '', // 姓名
  sex: '', // 性别
  card: '', // 身份证号
  relation: '', // 与户主关系
  marital: '', // 婚姻状况
  censusType: '', // 户籍册类别
  cardPic: '[]', // 身份证照片
  householdPic: '[]', // 户口本照片
  otherPic: '[]' // 其他照片
})

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid, itemUid } = commonParams.value
  getImpLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.demographicList ? res.demographicList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = {
        ...obj,
        // phone: obj.phone ? obj.phone : commonParams.value.phone,
        phone: commonParams.value.phone,
        cardPic: fmtPicUrl(obj.cardPic),
        householdPic: fmtPicUrl(obj.householdPic),
        otherPic: fmtPicUrl(obj.otherPic)
      }
    }
  })
}

watch(
  () => formData.value.card,
  (val) => {
    if (formData.value.card && cardReg.test(formData.value.card)) {
      const genderCode = formData.value.card.slice(-2, -1)
      genderCode % 2 === 0 ? (formData.value.sex = '2') : (formData.value.sex = '1')
    }
  },
  {
    immediate: true,
    deep: true
  }
)

// 表单提交
const submit = () => {
  const { uid, doorNo, type } = commonParams.value
  const params = {
    doorNo,
    ...formData.value,
    cardPic: fmtPicUrl(formData.value.cardPic),
    householdPic: fmtPicUrl(formData.value.householdPic),
    otherPic: fmtPicUrl(formData.value.otherPic)
  }

  if (!formData.value.addReason && type === 'add') {
    showToast('请输入新增原因')
    return
  } else if (!formData.value.populationNature && formData.value.addReason !== '3') {
    showToast('请选择人口性质')
    return
  } else if (!formData.value.name && formData.value.addReason !== '3') {
    showToast('请输入姓名')
    return
  } else if (!phoneReg.test(formData.value.phone)) {
    showToast('请输入正确的联系方式')
    return
  } else if (!formData.value.sex && formData.value.addReason !== '3') {
    showToast('请选择性别')
    return
  } else if (!formData.value.card && formData.value.addReason !== '3') {
    showToast('请输入身份证号')
    return
  } else if (!cardReg.test(formData.value.card) && formData.value.addReason !== '3') {
    showToast('请输入正确的法人身份证号')
    return
  } else if (!formData.value.relation && formData.value.addReason !== '3') {
    showToast('请选择与户主关系')
    return
  } else if (!formData.value.marital && formData.value.addReason !== '3') {
    showToast('请选择婚姻状况')
    return
  } else if (!formData.value.censusType && formData.value.addReason !== '3') {
    showToast('请选择户籍类别')
    return
  } else if (
    (!formData.value.cardPic || formData.value.cardPic === '[]') &&
    formData.value.addReason !== '3'
  ) {
    showToast('请上传身份证照片')
    return
  } else if (
    (!formData.value.householdPic || formData.value.householdPic === '[]') &&
    formData.value.addReason !== '3'
  ) {
    showToast('请上传户口本照片')
    return
  } else if (!formData.value.incrementAddReason && formData.value.addReason == '3') {
    showToast('请选择增计人口添加原因')
    return
  } else {
    if (formData.value.addReason === '3') {
      params.name = '增计人口'
    }
    if (type === 'add') {
      addImpLandlordPeopleApi(uid, params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    } else if (type === 'edit') {
      updateImpLandlordPeopleApi(uid, params)
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

      .lg-txt-wrapper {
        display: flex;
        flex-direction: column;

        .position {
          display: flex;
          width: 200rpx;
          height: 23rpx;
          margin-top: 5rpx;
          background: #ffffff;
          border: 1px solid #d9d9d9;
          border-radius: 2rpx;
          align-items: center;
          justify-content: center;

          .txt {
            margin-left: 6rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }
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

        &.disabled {
          background-color: #f5f7fa;
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

  .display-flex {
    display: flex;
    align-items: center;
  }
}
</style>
