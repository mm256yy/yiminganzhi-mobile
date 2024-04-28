<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户主姓名"
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
              label="自然村/村民小组"
              :label-width="150"
              label-align="right"
              name="formData.virutalVillageCode"
            >
              <view class="village-select-wrapper">
                <natural-village-select-form-item
                  ref="naturalVillage"
                  v-model:areaCode="formData.areaCode"
                  v-model:townCode="formData.townCode"
                  v-model:villageCode="formData.villageCode"
                  v-model:virutalVillageCode="formData.virutalVillageCode"
                  @open="initNaturalVillageData"
                  @confirm="confirmSelectNaturalVillage"
                />
                <view class="add-btn" @click="addNaturalVillage">添加自然村</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
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
              label="所在位置"
              :label-width="150"
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
              label="户号"
              :label-width="150"
              label-align="right"
              name="formData.suffixNo"
            >
              <view v-if="type == 'add'" :class="['input-wrapper', isFocus ? 'focus' : '']">
                <view class="pre-txt">
                  {{
                    compatibleOldSystems()
                      ? filterViewDoorNoWithBeforeOther(formData.villageCode)
                      : formData.otherCode 
                  }}
                </view>
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  :maxlength="4"
                  v-model="formData.suffixNo"
                  @focus="inputFocus"
                  @blur="inputBlur"
                />
              </view>
              <view v-else class="input-wrapper">
                <input
                  class="input-txt disabled"
                  :value="filterViewDoorNo({ ...formData, type: MainType.PeasantHousehold })"
                  disabled
                />
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="财产户"
              :label-width="150"
              label-align="right"
              name="formData.hasPropertyAccount"
            >
              <uni-data-select v-model="formData.hasPropertyAccount" :localdata="yesAndNoEnums" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
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
              name="formData.address"
            >
              <uni-easyinput v-model="formData.address" type="text" placeholder="请输入" />
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
            <!-- <uni-forms-item
              label="高程"
              :label-width="150"
              label-align="right"
              name="formData.altitude"
            >
              <uni-easyinput v-model="formData.altitude" type="number" placeholder="请输入" />
            </uni-forms-item> -->
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item label="中心经纬度" :label-width="150" label-align="right">
              <view class="lg-txt-wrapper">
                <view class="position" @click="gotoMap">
                  <uni-icons type="map" color="#5D8CF7" size="14rpx" />
                  <text class="txt">{{
                    formData.longitude && formData.latitude
                      ? `${formData.longitude},${formData.latitude}`
                      : '获取定位'
                  }}</text>
                </view>
              </view>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  routerBack,
  getStorage,
  StorageKey,
  routerForward,
  filterViewDoorNo,
  filterViewDoorNoWithBefore,
  filterViewDoorNoWithBeforeOther,
  formatDict
} from '@/utils'
import { addLandlordApi, updateLandlordApi } from '@/service'
import { locationTypes, yesAndNoEnums } from '@/config/common'
import { compatibleOldSystems } from '@/pages/common/config'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { MainType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import NaturalVillageSelectFormItem from '@/components/NaturalVillageSelectFormItem/index.vue'
// 表单数据
const formData = ref<any>({
  name: '', // 姓名
  areaCode: '', // 区/县
  townCode: '', // 镇/街道
  villageCode: '', // 行政村
  virutalVillageCode: '', // 自然村/村民小组
  phone: '', // 联系方式
  locationType: null, // 所在位置
  householdNumber: '', // 户籍册编号
  suffixNo: '', // 户号后四位
  doorNo: '', // 户号
  hasPropertyAccount: 'true', // 是否财产户, 默认是
  address: '', // 户籍所在地
  inundationRange: '', // 淹没范围
  type: MainType.PeasantHousehold,
  // altitude: null, // 高程
  longitude: '', // 经度
  latitude: '' // 纬度
})

// 输入框是否获得焦点
const isFocus = ref<boolean>(false)
const title = ref<string>('')
const type = ref<string>('')
const naturalVillage = ref<any>(null)

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  type.value = option.type
  if (option.type === 'edit') {
    let params = JSON.parse(option.params)
    formData.value = { ...params }
    title.value = '居民户信息编辑'
  } else if (option.type === 'add') {
    title.value = '添加居民户信息'
    if (option.areaCode && option.townCode && option.villageCode) {
      formData.value.areaCode = option.areaCode
      formData.value.townCode = option.townCode
      formData.value.villageCode = option.villageCode
      formData.value.virutalVillageCode = option.virutalVillageCode ? option.virutalVillageCode : ''
    }
    if (option.otherCode) {
      formData.value.otherCode = option.otherCode
    }
    formData.value.type = MainType.PeasantHousehold
  }
})

// 初始化自然村/村民小组组件数据
const initNaturalVillageData = () => {
  naturalVillage.value?.getTreeData()
}

// 输入框获得焦点
const inputFocus = () => {
  isFocus.value = true
}

// 输入框失去焦点
const inputBlur = () => {
  isFocus.value = false
}

/**
 * 自然村/村民小组选择确认
 * @param{Object} otherCode 用于兼容老系统，该code值由 1位乡/镇code + 2位行政村code组成
 */
const confirmSelectNaturalVillage = (otherCode: string) => {
  formData.value.otherCode = otherCode || ''
}

const gotoMap = () => {
  routerForward('map', {
    longitude: formData.value.longitude,
    latitude: formData.value.latitude
  })
}

// 添加自然村
const addNaturalVillage = () => {
  routerForward('villageEdit', {
    type: 'add'
  })
}

// 表单提交
const submit = () => {
  let doorNo = ''
  console.log((getStorage(StorageKey.PROJECTINFO) || {}).reservoirCode, '账号是什么？')
  if (formData.value.id && formData.value.doorNo) {
    doorNo = formData.value.doorNo
  } else {
    if (compatibleOldSystems()) {
      if ((getStorage(StorageKey.PROJECTINFO) || {}).reservoirCode == 'jlsk') {
        doorNo = 'jl' + filterViewDoorNoWithBeforeOther(formData.value.villageCode) + formData.value.suffixNo
      } else{
        doorNo = filterViewDoorNoWithBeforeOther(formData.value.villageCode) + formData.value.suffixNo
      }
    } else {
      if (formData.value.villageCode) {
        if ((getStorage(StorageKey.PROJECTINFO) || {}).reservoirCode == 'jlsk') {
          doorNo = 'jl'+String(formData.value.otherCode)+ formData.value.suffixNo
        } else{
          doorNo = String(formData.value.otherCode)+ formData.value.suffixNo
        }
      } else {
        doorNo = ''
      }
    }
  }
  console.error(doorNo);
  
  let params = {
    ...formData.value,
    doorNo: doorNo,
    // doorNo:
    //   formData.value.id && formData.value.doorNo
    //     ? formData.value.doorNo
    //     : formData.value.villageCode
    //     ? String(formData.value.villageCode) + formData.value.suffixNo
    //     : '',
    type: MainType.PeasantHousehold
  }

  if (!formData.value.name) {
    showToast('请输入户主姓名')
    return
  } else if (!formData.value.virutalVillageCode) {
    showToast('请选择自然村/村民小组')
    return
  } else if (!formData.value.doorNo && !formData.value.suffixNo) {
    showToast('请输入户号后四位')
    return
  } else if (
    !formData.value.doorNo &&
    formData.value.suffixNo &&
    formData.value.suffixNo.length !== 4
  ) {
    showToast('户号不全，请输入四位数字')
    return
  } else if (!formData.value.locationType) {
    showToast('请选择所在位置')
    return
  } else {
    if (type.value === 'add') {
      console.error(params)

      addLandlordApi(params)
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
      updateLandlordApi(params)
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

// 地图选择经纬度后回调返回经纬度
const mapChooseCallBack = (data: any) => {
  if (data && data.longitude && data.latitude) {
    formData.value.longitude = data.longitude
    formData.value.latitude = data.latitude
  }
}

onMounted(() => {
  uni.$on('chooseMap', mapChooseCallBack)
})

onBeforeUnmount(() => {
  uni.$off('chooseMap', mapChooseCallBack)
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

      .input-wrapper {
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

      .village-select-wrapper {
        display: flex;
        align-items: center;

        .add-btn {
          margin-left: 3rpx;
          font-size: 9rpx;
          color: #3e73ec;
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
