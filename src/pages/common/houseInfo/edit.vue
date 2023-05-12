<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="幢号"
              :label-width="150"
              label-align="right"
              name="formData.houseNo"
            >
              <uni-easyinput v-model="formData.houseNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="房屋用途"
              :label-width="150"
              label-align="right"
              name="formData.usageType"
            >
              <uni-data-select v-model="formData.usageType" :localdata="dict[265]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="层高"
              :label-width="150"
              label-align="right"
              name="formData.storeyHeight"
            >
              <uni-easyinput v-model="formData.storeyHeight" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="层数"
              :label-width="150"
              label-align="right"
              name="formData.storeyNumber"
            >
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.storeyNumber"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">层</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋产别"
              :label-width="150"
              label-align="right"
              name="formData.propertyType"
            >
              <uni-data-select v-model="formData.propertyType" :localdata="dict[284]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="房屋类别"
              :label-width="150"
              label-align="right"
              name="formData.houseType"
            >
              <uni-data-select v-model="formData.houseType" :localdata="dict[266]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="土地使用权证编号"
              :label-width="150"
              label-align="right"
              name="formData.landNo"
            >
              <uni-easyinput v-model="formData.landNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="房产所有权证编号"
              :label-width="150"
              label-align="right"
              name="formData.propertyNo"
            >
              <uni-easyinput v-model="formData.propertyNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="屋面形式"
              :label-width="150"
              label-align="right"
              name="formData.roofType"
            >
              <uni-data-select v-model="formData.roofType" :localdata="dict[246]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="屋面材料"
              :label-width="150"
              label-align="right"
              name="formData.roofMaterialsType"
            >
              <uni-data-select v-model="formData.roofMaterialsType" :localdata="dict[309]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="外墙"
              :label-width="150"
              label-align="right"
              name="formData.outerWallType"
            >
              <uni-data-select v-model="formData.outerWallType" :localdata="dict[280]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="内墙"
              :label-width="150"
              label-align="right"
              name="formData.interiorWallType"
            >
              <uni-data-select v-model="formData.interiorWallType" :localdata="dict[257]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="地面"
              :label-width="150"
              label-align="right"
              name="formData.groundType"
            >
              <uni-data-select v-model="formData.groundType" :localdata="dict[320]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="门窗"
              :label-width="150"
              label-align="right"
              name="formData.doorsWindowsType"
            >
              <uni-data-select v-model="formData.doorsWindowsType" :localdata="dict[333]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="水电"
              :label-width="150"
              label-align="right"
              name="formData.waterElectricityType"
            >
              <uni-data-select v-model="formData.waterElectricityType" :localdata="dict[241]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="建筑面积"
              :label-width="150"
              label-align="right"
              name="formData.landArea"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landArea"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                />
                <view class="unit">m²</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="结构类型"
              :label-width="150"
              label-align="right"
              name="formData.constructionType"
            >
              <uni-data-select v-model="formData.constructionType" :localdata="dict[252]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋高程"
              :label-width="150"
              label-align="right"
              name="formData.houseHeight"
            >
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.houseHeight"
                  @focus="inputFocus(3)"
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
              label="土地性质"
              :label-width="150"
              label-align="right"
              name="formData.landType"
            >
              <uni-data-select v-model="formData.landType" :localdata="dict[222]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="竣工日期"
              :label-width="150"
              label-align="right"
              name="formData.completedTime"
            >
              <uni-datetime-picker
                type="date"
                placeholder="请选择竣工日期"
                v-model="formData.completedTime"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
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
          <uni-col :span="12">
            <uni-forms-item label="中心经纬度" :label-width="150" label-align="right">
              <view class="lg-txt-wrapper">
                <uni-data-checkbox v-model="check" :localdata="lgTagList" />
                <view class="position" v-if="check === 1" @click="gotoMap">
                  <uni-icons type="map" color="#5D8CF7" size="14rpx" />
                  <text class="txt">{{
                    formData.longitude && formData.latitude
                      ? `${formData.longitude},${formData.latitude}`
                      : '获取定位'
                  }}</text>
                </view>
                <view v-else-if="check === 2">
                  <uni-easyinput
                    class="m-t-5"
                    type="digit"
                    v-model="formData.longitude"
                    placeholder="输入经度"
                  />
                  <uni-easyinput
                    class="m-t-5"
                    type="digit"
                    v-model="formData.latitude"
                    placeholder="输入纬度"
                  />
                </view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput
                v-model="formData.remark"
                type="textarea"
                :maxlength="30"
                placeholder="请输入(30字以内)"
              />
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

        <uni-row
          v-if="
            stage === MainStage.review && type === 'add' && mainType === MainType.PeasantHousehold
          "
        >
          <uni-col :span="24">
            <uni-forms-item
              label="新增原因"
              :label-width="150"
              label-align="right"
              name="formData.addReason"
            >
              <uni-easyinput
                v-model="formData.addReason"
                type="textarea"
                :maxlength="300"
                placeholder="请输入(300字以内)"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="房屋平面示意图"
              :label-width="150"
              label-align="right"
              name="formData.housePic"
            >
              <upload-file
                v-model="formData.housePic"
                :file-list="formData.housePic"
                :limit="20"
                show-type="list"
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="土地证/房屋产权证照片"
              :label-width="150"
              label-align="right"
              name="formData.landPic"
            >
              <upload-file
                v-model="formData.landPic"
                :file-list="formData.landPic"
                :limit="20"
                show-type="list"
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="房屋其他附件照片"
              :label-width="150"
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
          <uni-col :span="24">
            <uni-forms-item
              label="房屋照片"
              :label-width="150"
              label-align="right"
              name="formData.homePic"
            >
              <upload-file
                v-model="formData.homePic"
                :file-list="formData.homePic"
                :limit="20"
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
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { routerBack, getStorage, StorageKey, routerForward, networkCheck } from '@/utils'
import { addLandlordHouseApi, updateLandlordHouseApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'
import UploadFile from '@/components/UploadFile/index.vue'
import { MainStage, MainType } from '@/types/common'

// 表单数据
const formData = ref<any>({
  houseNo: '',
  propertyType: '',
  usageType: '',
  houseType: '',
  constructionType: '',
  storeyNumber: '',
  completedTime: null,
  propertyNo: '',
  landNo: '',
  landType: '',
  landArea: '',
  storeyHeight: '',
  houseHeight: '',
  outerWallType: '',
  interiorWallType: '',
  groundType: '',
  roofType: '',
  roofMaterialsType: '',
  doorsWindowsType: '',
  waterElectricityType: '',
  formula: '',
  longitude: '',
  latitude: '',
  locationType: '',
  remark: '',
  addReason: '',
  housePic: '[]',
  landPic: '[]',
  otherPic: '[]',
  homePic: '[]'
})

const title = ref<string>('')
const commonParams = ref<any>({})
const type = ref<string>('')

// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const mainType = ref<string>('')

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)
const check = ref<number>(1)

// 中心经纬度输入选项
const lgTagList = ref<any>([
  { text: '获取定位', value: 1, disable: false },
  { text: '输入经纬度', value: 2, disable: false }
])

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.commonParams)
    type.value = commonParams.value?.type ? commonParams.value.type : ''
    mainType.value = commonParams.value?.mainType ? commonParams.value.mainType : ''
    if (type.value === 'edit') {
      let params = JSON.parse(option.params)
      formData.value = { ...params }
      title.value = '房屋信息编辑'
    } else if (type.value === 'add') {
      title.value = '新增房屋'
      if (commonParams.value.longitude && commonParams.value.latitude) {
        formData.value.longitude = commonParams.value.longitude
        formData.value.latitude = commonParams.value.latitude
      }
    }
  }
})

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

const gotoMap = () => {
  routerForward('map', {
    longitude: formData.value.longitude,
    latitude: formData.value.latitude
  })
}

// 表单提交
const submit = () => {
  const { uid, doorNo } = commonParams.value
  const params = {
    doorNo,
    ...formData.value,
    completedTime: formData.value.completedTime
      ? dayjs(formData.value.completedTime)
      : formData.value.completedTime
  }

  if (!formData.value.houseNo) {
    showToast('请输入幢号')
    return
  } else if (!formData.value.usageType) {
    showToast('请选择房屋用途')
  } else if (!formData.value.houseType) {
    showToast('请选择房屋类别')
    return
  } else if (
    !formData.value.addReason &&
    stage === MainStage.review &&
    type.value === 'add' &&
    mainType.value === MainType.PeasantHousehold
  ) {
    showToast('请输入新增原因')
    return
  } else {
    if (type.value === 'add') {
      addLandlordHouseApi(uid, params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    } else if (type.value === 'edit') {
      updateLandlordHouseApi(uid, params)
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

const mapChooseCallBack = (data: any) => {
  if (data && data.longitude && data.latitude) {
    formData.value.longitude = data.longitude
    formData.value.latitude = data.latitude
  }
}

onMounted(() => {
  networkCheck().then((res) => {
    if (!res) {
      lgTagList.value = [
        { text: '获取定位', value: 1, disable: true },
        { text: '输入经纬度', value: 2, disable: false }
      ]
      check.value = 2
    }
  })
  uni.$on('chooseMap', mapChooseCallBack)
})
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
    }

    .submit-btn {
      position: fixed;
      right: 25rpx;
      bottom: 20rpx;
      width: 28rpx;
      height: 28rpx;
      border-radius: 50%;
    }
  }
}
</style>
