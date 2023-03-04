<template>
  <view class="form-wrapper">
    <Back title="房屋信息编辑" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="幢号"
              :label-width="150"
              label-align="right"
              name="formData.houseNo"
            >
              <uni-easyinput v-model="formData.houseNo" type="number" placeholder="请输入" />
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
              <uni-data-select v-model="formData.roofType" :localdata="dict[309]" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="层面材料"
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
                @change="changeDate"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="中心经纬度"
              :label-width="150"
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
              label="房屋平面示意图"
              :label-width="150"
              label-align="right"
              name="formData.housePic"
            >
              <uni-file-picker
                title="最多选择20张图片"
                :limit="20"
                @select="selectHousePic"
                @progress="housePicProgress"
                @success="housePicSuccess"
                @fail="housePicFail"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="土地证照片"
              :label-width="150"
              label-align="right"
              name="formData.landPic"
            >
              <uni-file-picker
                title="最多选择1张图片"
                :limit="1"
                @select="selectLandPic"
                @progress="landPicProgress"
                @success="landPicSuccess"
                @fail="landPicFail"
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
          <uni-col :span="24">
            <uni-forms-item
              label="房屋照片"
              :label-width="150"
              label-align="right"
              name="formData.homePic"
            >
              <uni-file-picker
                title="最多选择20张图片"
                :limit="20"
                @select="selectHomePic"
                @progress="homePicProgress"
                @success="homePicSuccess"
                @fail="homePicFail"
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
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getStorage, StorageKey } from '@/utils'
import { updateLandlordHouseApi } from '@/service'
import Back from '@/components/Back/Index.vue'

// 表单数据
const formData = ref<any>({})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

// 表单校验规则
const rules = reactive({
  houseNo: { rules: [{ required: true, message: '请输入', trigger: 'blur' }] },
  usageType: { rules: [{ required: true, message: '请选择', trigger: 'change' }] },
  houseType: { rules: [{ required: true, message: '请选择', trigger: 'change' }] }
})

onLoad((option: any) => {
  if (option.params) {
    formData.value = JSON.parse(option.params)
  }
})

// 中心经纬度输入选项
const lgTagList = ref<any>([
  { text: '获取定位', value: 1 },
  { text: '输入经纬度', value: 2 }
])

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

// 竣工日期选择
const changeDate = (e: any) => {
  console.log('e:', e)
}

// 获取房屋平面示意图上传状态
const selectHousePic = (e: any) => {
  console.log('选择文件：', e)
}

// 获取房屋平面示意图上传进度
const housePicProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 房屋平面示意图上传成功
const housePicSuccess = (e: any) => {
  console.log('上传成功')
}

// 房屋平面示意图上传失败
const housePicFail = (e: any) => {
  console.log('上传失败：', e)
}

// 获取土地证照片上传状态
const selectLandPic = (e: any) => {
  console.log('选择文件：', e)
}

// 获取土地证照片上传进度
const landPicProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 土地证照片上传成功
const landPicSuccess = (e: any) => {
  console.log('上传成功')
}

// 土地证照片上传失败
const landPicFail = (e: any) => {
  console.log('上传失败：', e)
}

// 获取房屋其他附件照片上传状态
const selectOtherPic = (e: any) => {
  console.log('选择文件：', e)
}

// 获取房屋其他附件照片上传进度
const otherPicProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 房屋其他附件照片上传成功
const otherPicSuccess = (e: any) => {
  console.log('上传成功')
}

// 房屋其他附件照片上传失败
const otherPicFail = (e: any) => {
  console.log('上传失败：', e)
}

// 获取房屋照片上传状态
const selectHomePic = (e: any) => {
  console.log('选择文件：', e)
}

// 获取房屋照片上传进度
const homePicProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 房屋照片上传成功
const homePicSuccess = (e: any) => {
  console.log('上传成功')
}

// 房屋照片上传失败
const homePicFail = (e: any) => {
  console.log('上传失败：', e)
}

// 表单提交
const submit = () => {
  const params = { ...formData.value }
  formData.value.validate((valid: any) => {
    if (valid) {
      updateLandlordHouseApi(params.uid, params).then((res) => {
        console.log('res:', res)
      })
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
