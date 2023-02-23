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
              name="formData.buildingNo"
            >
              <uni-easyinput v-model="formData.buildingNo" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="房屋用途"
              :label-width="150"
              label-align="right"
              name="formData.purpose"
            >
              <uni-easyinput v-model="formData.purpose" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="层高"
              :label-width="150"
              label-align="right"
              name="formData.storeyH"
            >
              <uni-easyinput v-model="formData.storeyH" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="层数"
              :label-width="150"
              label-align="right"
              name="formData.layerNum"
            >
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.layerNum"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">层</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋产别"
              :label-width="150"
              label-align="right"
              name="formData.houseProperty"
            >
              <uni-data-select
                v-model="formData.houseProperty"
                :localdata="housePropertyData"
                @change="changeHouseProperty"
              />
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
              <uni-data-select
                v-model="formData.houseType"
                :localdata="houseTypeData"
                @change="changeHouseType"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="土地使用权证编号"
              :label-width="150"
              label-align="right"
              name="formData.landUseNo"
            >
              <uni-easyinput v-model="formData.landUseNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="房产所有权证编号"
              :label-width="150"
              label-align="right"
              name="formData.houseOwnershipNo"
            >
              <uni-easyinput v-model="formData.houseOwnershipNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="层面形式"
              :label-width="150"
              label-align="right"
              name="formData.layerForm"
            >
              <uni-data-select
                v-model="formData.layerForm"
                :localdata="layerFormData"
                @change="changeLayerForm"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="层面材料"
              :label-width="150"
              label-align="right"
              name="formData.layerMaterial"
            >
              <uni-data-select
                v-model="formData.layerMaterial"
                :localdata="layerMaterialData"
                @change="changeLayerMaterial"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="外墙"
              :label-width="150"
              label-align="right"
              name="formData.exteriorWall"
            >
              <uni-data-select
                v-model="formData.exteriorWall"
                :localdata="exteriorWallData"
                @change="changeExteriorWall"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="内墙"
              :label-width="150"
              label-align="right"
              name="formData.interiorWall"
            >
              <uni-data-select
                v-model="formData.interiorWall"
                :localdata="interiorWallData"
                @change="changeInteriorWall"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="地面"
              :label-width="150"
              label-align="right"
              name="formData.ground"
            >
              <uni-data-select
                v-model="formData.ground"
                :localdata="groundData"
                @change="changeGround"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="门窗"
              :label-width="150"
              label-align="right"
              name="formData.doorsAndWindows"
            >
              <uni-data-select
                v-model="formData.doorsAndWindows"
                :localdata="doorsAndWindowsData"
                @change="changeDoorsAndWindows"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="水电"
              :label-width="150"
              label-align="right"
              name="formData.hydropower"
            >
              <uni-data-select
                v-model="formData.hydropower"
                :localdata="hydropowerData"
                @change="changeHydropower"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="建筑面积"
              :label-width="150"
              label-align="right"
              name="formData.builtUpArea"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.builtUpArea"
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
              name="formData.structureType"
            >
              <uni-data-select
                v-model="formData.structureType"
                :localdata="structureTypeData"
                @change="changeStructureType"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="房屋高程"
              :label-width="150"
              label-align="right"
              name="formData.houseElevation"
            >
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.houseElevation"
                  @focus="inputFocus(3)"
                  @blur="inputBlur"
                />
                <view class="unit">m</view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="土地性质"
              :label-width="150"
              label-align="right"
              name="formData.natureLand"
            >
              <uni-data-select
                v-model="formData.natureLand"
                :localdata="natureLandData"
                @change="changeNatureLand"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="竣工日期"
              :label-width="150"
              label-align="right"
              name="formData.completionDate"
            >
              <uni-datetime-picker
                type="date"
                placeholder="请选择竣工日期"
                v-model="formData.completionDate"
                @change="changeDate"
              />
            </uni-forms-item>
          </uni-col>
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
              name="formData.housePlan"
            >
              <uni-file-picker
                title="最多选择20张图片"
                :limit="20"
                @select="selectHousePlan"
                @progress="housePlanProgress"
                @success="housePlanSuccess"
                @fail="housePlanFail"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="土地证照片"
              :label-width="150"
              label-align="right"
              name="formData.landCertificate"
            >
              <uni-file-picker
                title="最多选择1张图片"
                :limit="1"
                @select="selectLandCertificate"
                @progress="landCertificateProgress"
                @success="landCertificateSuccess"
                @fail="landCertificateFail"
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

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

// 表单校验规则
const rules = ref<any>({})

// 房屋产别数据选项
const housePropertyData = ref<any>([
  { text: '国有房产', value: 1 },
  { text: '集体所有房产', value: 2 }
])

// 房屋类别数据选项
const houseTypeData = ref<any>([
  { text: '主房', value: 1 },
  { text: '杂房', value: 2 },
  { text: '附属房', value: 3 }
])

// 层面形式数据选项
const layerFormData = ref<any>([
  { text: '平面屋', value: 1 },
  { text: '坡面屋', value: 2 },
  { text: '其他（网架、悬索、壳体、拆板等）', value: 3 },
  { text: '无', value: 4 }
])

// 层面材料数据选项
const layerMaterialData = ref<any>([
  { text: '现烧斜屋面加盖彩瓦', value: 1 },
  { text: '钢性屋面', value: 2 },
  { text: '多孔板屋面', value: 3 },
  { text: '预制小梁平板', value: 4 }
])

// 外墙数据选项
const exteriorWallData = ref<any>([
  { text: '瓷砖', value: 1 },
  { text: '水泥', value: 2 },
  { text: '石灰', value: 3 }
])

// 内墙数据选项
const interiorWallData = ref<any>([
  { text: '装饰涂料', value: 1 },
  { text: '大理石瓷砖', value: 2 },
  { text: '一般抹灰', value: 3 }
])

// 地面数据选项
const groundData = ref<any>([
  { text: '浇楼板', value: 1 },
  { text: '多孔板', value: 2 },
  { text: '预制小梁板', value: 3 }
])

// 门窗数据选项
const doorsAndWindowsData = ref<any>([
  { text: '铝合金窗（塑钢窗）木门', value: 1 },
  { text: '钢门窗木门', value: 2 },
  { text: '硬木有腰木门窗', value: 3 }
])

// 水电数据选项
const hydropowerData = ref<any>([
  { text: '管线暗敷', value: 1 },
  { text: '管线普通', value: 2 },
  { text: '全通', value: 3 }
])

// 结构类型数据选项
const structureTypeData = ref<any>([
  { text: '钢架', value: 1 },
  { text: '框架', value: 2 },
  { text: '砖混', value: 3 }
])

// 土地性质数据选项
const natureLandData = ref<any>([
  { text: '国有划拨', value: 1 },
  { text: '国有出让', value: 2 },
  { text: '租用村集体', value: 3 }
])

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

// 房屋产别选择
const changeHouseProperty = (data: any) => {
  console.log('data:', data)
}

// 房屋类别选择
const changeHouseType = (data: any) => {
  console.log('data:', data)
}

// 层面形式选择
const changeLayerForm = (data: any) => {
  console.log('data:', data)
}

// 层面材料选择
const changeLayerMaterial = (data: any) => {
  console.log('data:', data)
}

// 外墙选择
const changeExteriorWall = (data: any) => {
  console.log('data:', data)
}

// 内墙选择
const changeInteriorWall = (data: any) => {
  console.log('data:', data)
}

// 地面选择
const changeGround = (data: any) => {
  console.log('data:', data)
}

// 门窗选择
const changeDoorsAndWindows = (data: any) => {
  console.log('data:', data)
}

// 水电选择
const changeHydropower = (data: any) => {
  console.log('data:', data)
}

// 结构类型选择
const changeStructureType = (data: any) => {
  console.log('data:', data)
}

// 土地性质选择
const changeNatureLand = (data: any) => {
  console.log('data:', data)
}

// 竣工日期选择
const changeDate = (e: any) => {
  console.log('e:', e)
}

// 获取房屋平面示意图上传状态
const selectHousePlan = (e: any) => {
  console.log('选择文件：', e)
}

// 获取房屋平面示意图上传进度
const housePlanProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 房屋平面示意图上传成功
const housePlanSuccess = (e: any) => {
  console.log('上传成功')
}

// 房屋平面示意图上传失败
const housePlanFail = (e: any) => {
  console.log('上传失败：', e)
}

// 获取土地证照片上传状态
const selectLandCertificate = (e: any) => {
  console.log('选择文件：', e)
}

// 获取土地证照片上传进度
const landCertificateProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 土地证照片上传成功
const landCertificateSuccess = (e: any) => {
  console.log('上传成功')
}

// 土地证照片上传失败
const landCertificateFail = (e: any) => {
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
const selectHousePic = (e: any) => {
  console.log('选择文件：', e)
}

// 获取房屋照片上传进度
const housePicProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 房屋照片上传成功
const housePicSuccess = (e: any) => {
  console.log('上传成功')
}

// 房屋照片上传失败
const housePicFail = (e: any) => {
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
      right: 0;
      bottom: 0;
      width: 80rpx;
      height: 80rpx;
    }
  }
}
</style>
