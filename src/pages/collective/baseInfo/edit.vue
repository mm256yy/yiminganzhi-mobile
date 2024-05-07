<template>
  <view class="form-wrapper">
    <Back :title="title" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <view class="title-wrapper">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">村集体基本信息</view>
        </view>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="村集体名称"
              :label-width="170"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
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

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="村集体编码"
              :label-width="170"
              label-align="right"
              name="formData.collectiveCode"
            >
              <!-- <view v-if="!formData.id" :class="['code-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  v-model="formData.doorNo"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
              </view>
              <view v-else class="code-wrapper">
                <input class="input-txt disabled" v-model="formData.doorNo" disabled />
              </view> -->
              <view v-if="type == 'add'" :class="['code-wrapper', focusIndex === 1 ? 'focus' : '']">
                <view class="pre-txt">
                  {{
                    formData.villageCode
                      ? 'JT' + filterViewDoorNoWithBeforeOther(formData.villageCode)
                      : ''
                  }}
                </view>
                <input
                  class="input-txt"
                  type="number"
                  placeholder="请输入"
                  :maxlength="4"
                  v-model="formData.suffixNo"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
              </view>
              <view v-else class="code-wrapper">
                <input class="input-txt disabled" v-model="formData.doorNo" disabled />
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="联系方式"
              :label-width="170"
              label-align="right"
              name="formData.phone"
            >
              <uni-easyinput v-model="formData.phone" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="所在位置"
              :label-width="170"
              label-align="right"
              name="formData.locationType"
            >
              <uni-data-select
                v-model="formData.locationType"
                :localdata="dict[326]"
                @change="change"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="淹没范围"
              :label-width="170"
              label-align="right"
              name="formData.inundationRange"
            >
              <uni-data-select v-model="formData.inundationRange" :localdata="dict[346]" />
            </uni-forms-item>
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
import { addLandlordApi, updateLandlordApi } from '@/service'
import { routerBack, getStorage, StorageKey, setlocationType, routerForward } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { MainType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import VillageSelectFormItem from '@/components/VillageSelectFormItem/index.vue'
import { filterViewDoorNoWithBeforeOther } from '@/utils'
// 表单数据
const formData = ref<any>({
  name: '',
  areaCode: '',
  townCode: '',
  villageCode: '',
  // suffixNo: '',
  collectiveCode: '',
  phone: '',
  locationType: null
})

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)
const title = ref<string>('')
const type = ref<string>('')

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获取上个页面传递的参数，给表单赋值
onLoad((option: any) => {
  if (option) {
    type.value = option.type
    if (type.value === 'edit') {
      let params = JSON.parse(option.params)
      formData.value = { ...params }
      title.value = '村集体基本情况编辑'
    } else if (type.value === 'add') {
      title.value = '添加村集体'
      if (option.areaCode && option.townCode && option.villageCode) {
        formData.value.areaCode = option.areaCode
        formData.value.townCode = option.townCode
        formData.value.villageCode = option.villageCode
        formData.value.virutalVillageCode = option.virutalVillageCode
          ? option.virutalVillageCode
          : ''
      }
    }
  }
})

// 输入框获得焦点
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点
const inputBlur = () => {
  focusIndex.value = -1
}

// 表单提交
const submit = () => {
  let params = {
    ...formData.value,
    // doorNo: formData.value.doorNo,
    doorNo:
      formData.value.id && formData.value.doorNo
        ? formData.value.doorNo
        : formData.value.suffixNo
        ? 'JT' +
          filterViewDoorNoWithBeforeOther(formData.value.villageCode) +
          formData.value.suffixNo
        : '',
    type: MainType.Village
  }

  if (!formData.value.name) {
    showToast('请输入村集体名称')
    return
  } else if (!formData.value.villageCode) {
    showToast('请选择所属区域')
    return
  } else if (
    !formData.value.doorNo &&
    formData.value.suffixNo &&
    formData.value.suffixNo.length !== 4
  ) {
    showToast('村集体编码不全，请输入四位数字')
    return
  }
  // else if (!formData.value.doorNo) {
  //   showToast('请输入村集体编码')
  //   return
  // }
  else if (!formData.value.phone) {
    showToast('村集体联系方式')
    return
  } else if (!formData.value.locationType) {
    showToast('请选择所在位置')
    return
  } else {
    if (type.value === 'add') {
      addLandlordApi(params)
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
      updateLandlordApi(params)
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
let change = (e: any) => {
  if (type.value === 'add') {
    formData.value.inundationRange = setlocationType(e)
  }
}
const gotoMap = () => {
  routerForward('map', {
    longitude: formData.value.longitude,
    latitude: formData.value.latitude
  })
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
    overflow-y: scroll;
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

      .code-wrapper {
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
</style>
