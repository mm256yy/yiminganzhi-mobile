<template>
  <view class="form-wrapper">
    <Back title="关联绑定" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="户名："
              :label-width="150"
              label-align="right"
              name="formData.id"
            >
              <view class="flex-center">
                <view
                  :class="['name-wrapper', formData.name ? 'isSelected' : '']"
                  @click="selectName"
                >
                  {{ formData.name ? formData.name : '请选择' }}
                </view>
                <view @click="resetOwnersName">
                  <image
                    class="icon_img"
                    src="@/static/images/icon_delete_mini.png"
                    mode="scaleToFill"
                  />
                </view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              style="margin-left: 54rpx"
              :label="landNo"
              :label-width="150"
              name="formData.uid"
            />
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item :label-width="85">
              <checkbox-group @change="handleRadioChange">
                <checkbox :value="checkSelectedStr" :checked="checkSelected" />
                <text class="common-txt"
                  >没有查询到户名，使用以下信息新增户名，只征地不搬迁才可以新增户名</text
                >
              </checkbox-group>
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row v-show="checkSelected">
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户主："
              :label-width="150"
              label-align="right"
              name="formData.rightHolder"
            >
              <uni-easyinput v-model="formData.rightHolder" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="类别："
              :label-width="150"
              label-align="right"
              name="formData.landUserType"
            >
              <uni-data-select v-model="formData.landUserType" :localdata="dict[418]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row v-show="checkSelected">
          <uni-col :span="12">
            <uni-forms-item
              :required="formData.landUserType == 'PeasantHousehold'"
              label="身份证号："
              :label-width="150"
              label-align="right"
              name="formData.card"
            >
              <uni-easyinput v-model="formData.card" :maxlength="18" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="所属区域："
              :label-width="150"
              label-align="right"
              name="formData.virutalVillageCode"
            >
              <view class="village-select-wrapper">
                <natural-village-select-form-item
                  ref="naturalVillageRef"
                  v-model:areaCode="formData.areaCode"
                  v-model:townCode="formData.townCode"
                  v-model:villageCode="formData.villageCode"
                  v-model:virutalVillageCode="formData.virutalVillageCode"
                  type="land"
                  @open="initNaturalVillageData"
                  @confirm="confirmSelectNaturalVillage"
                />
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row v-show="checkSelected">
          <uni-col :span="12">
            <uni-forms-item
              required
              label="户号："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <view :class="['code-wrapper', focusIndex === 1 ? 'focus' : '']">
                <view class="pre-txt" style="padding-left: 8rpx">
                  {{ suffixNo() }}
                </view>
                <input
                  class="input-txt"
                  placeholder="请输入四位数"
                  type="number"
                  :maxlength="4"
                  v-model="formData.doorNo"
                  @focus="inputFocus"
                  @blur="inputBlur"
                />
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="联系方式"
              :label-width="150"
              label-align="right"
              name="formData.phone"
            >
              <uni-easyinput v-model="formData.phone" :maxlength="18" placeholder="请输入" />
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
    <!-- 绑定确认弹框 -->
    <uni-popup ref="confirmBindingRef" type="dialog" :is-mask-click="false">
      <uni-popup-dialog
        type="info"
        cancelText="暂时不评"
        confirmText="进行评估"
        title="绑定成功，是否继续进行资产评估？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>

    <SearchList
      v-show="showSearch"
      :mainType="MainType.LandNoMove"
      type="single"
      @close="close"
      @confirm-select="confirmSelect"
    />
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import Back from '@/components/Back/Index.vue'
import { MainType } from '@/types/common'
import {
  routerBack,
  routerForward,
  getStorage,
  StorageKey,
  filterViewDoorNoWithBefore
} from '@/utils'
import NaturalVillageSelectFormItem from '@/components/NaturalVillageSelectFormItem/index.vue'
import { getLandPeasantHouseholdDtoListApi, updateLandlord } from '@/service'
import { compatibleOldSystems } from '@/pages/common/config'
import { showToast } from '@/config/msg'
import { getLandlordListBySearchApi } from '@/service'
import SearchList from '../components/searchList/index.vue'
import { filterViewDoorNoWithBeforeOther } from '@/utils'

const formData = ref<any>({
  id: '', // 户名
  uid: '', // 土地编号
  rightHolder: '', // 户主
  landUserType: '', // 类别
  card: '', // 身份证号
  doorNo: '', // 户号
  areaCode: '',
  townCode: '',
  villageCode: '',
  virutalVillageCode: '',
  otherCode: '',
  name: ''
})
const naturalVillageRef = ref<any>(null)
const checkSelectedStr = ref<string>('1') // 未选中
const checkSelected = ref<boolean>(false)
const confirmBindingRef = ref()
const doorNoInfoList = ref<any[]>()
const landNo = ref<string>('')
// 输入框是否获得焦点
const isFocus = ref<boolean>(false)
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const checkList = ref<any[]>([])
const landMark = ref<string>('')
const showSearch = ref<boolean>(false)
const doorNoList = ref<any[]>([])
let oldDoorNo = ref([])
const topDoorNo = ref<string>('') // 顶部户名
const focusIndex = ref<number>(-1)

onLoad((option) => {
  if (option && option.params) {
    const params = JSON.parse(option.params)
    checkList.value = params
    landMark.value = checkList.value.map((item) => item.landNumber).join()
    landNo.value = `土地编号：${landMark.value}`
    formData.value.uid = checkList.value.map((item) => item.uid).join()
    oldDoorNo.value = checkList.value.reduce((pre, item) => {
      if (item.doorNo) {
        pre.push(item.doorNo)
      }

      return pre
    }, [])
  }
})

const suffixNo = () => {
  return formData.value.villageCode
    ? 'ZD' + filterViewDoorNoWithBeforeOther(formData.value.villageCode)
    : ''
}
const resetOwnersName = () => {
  formData.value.name = ''
}

const submit = async () => {
  let doorNoResult = null
  if (checkSelected.value) {
    if (!formData.value.rightHolder) {
      showToast('户主不能为空')
      return
    }

    if (!formData.value.landUserType) {
      showToast('类别不能为空')
      return
    }
    if (!formData.value.villageCode) {
      showToast('所属区域不能为空')
      return
    }
    if (!formData.value.doorNo) {
      showToast('户号不能为空')
      return
    } else {
      if (formData.value.doorNo?.length < 4) {
        showToast('请输入只征地不搬迁编号后四位数字')
        return
      }
    }
    if (formData.value.landUserType == 'PeasantHousehold' && !formData.value.card) {
      showToast('身份证号不能为空')
      return
    }
    if (!formData.value.phone) {
      showToast('联系方式不能为空')
      return
    }

    doorNoResult = `${suffixNo()}${formData.value.doorNo}`

    // 校验户号是否已存在
    if (doorNoList.value.includes(doorNoResult)) {
      showToast('当前户号已存在')
      return
    }
  }

  let params = {
    ...formData.value,
    type: checkSelectedStr.value,
    doorNo: checkSelected.value ? doorNoResult : topDoorNo.value,
    oldDoorNo: oldDoorNo.value
  }
  console.log('submit-params', params)
  try {
    const res = await updateLandlord(params)
    if (res) {
      confirmBindingRef.value?.open()
      // 触发自定义事件
      uni.$emit('customRefresh')
    }
  } catch {
    showToast('绑定失败')
  }
}

// 初始化自然村/村民小组组件数据
const initNaturalVillageData = () => {
  naturalVillageRef.value?.getTreeData()
}

// 选择户主姓名/户号
const selectName = () => {
  showSearch.value = true
}

/**
 * 自然村/村民小组选择确认
 * @param{Object} otherCode 用于兼容老系统，该code值由 1位乡/镇code + 2位行政村code组成
 */
const confirmSelectNaturalVillage = (otherCode: string) => {
  formData.value.otherCode = otherCode || ''
}

const dialogConfirm = () => {
  getUidFromAPi()
}

const dialogClose = () => {
  confirmBindingRef.value?.close()
  routerBack()
}

const handleRadioChange = (e: any) => {
  checkSelected.value = !checkSelected.value
  checkSelectedStr.value = checkSelected.value ? '0' : '1'
  console.log(e)
}

// 获取农户信息
const getDoorNoInfoList = async () => {
  try {
    const res = await getLandPeasantHouseholdDtoListApi()
    if (res) {
      doorNoInfoList.value = res.map((item: any) => {
        return {
          text: item.result,
          value: item.id
        }
      })
    }
  } catch {
    doorNoInfoList.value = []
  }
}

/**
 * 确认搜索户主姓名/户号
 * @param{Object} data
 */
const confirmSelect = (data: any) => {
  if (data) {
    formData.value.id = data.value
    formData.value.name = data.label
    topDoorNo.value = data.doorNo
  }
  close()
}

// 关闭搜索组件
const close = () => {
  showSearch.value = false
}

// // 输入框获得焦点
// const inputFocus = () => {
//   isFocus.value = true
// }

// // 输入框失去焦点
// const inputBlur = () => {
//   isFocus.value = false
// }

// 输入框获得焦点
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点
const inputBlur = () => {
  focusIndex.value = -1
}
const getUidFromAPi = async () => {
  const requestParams = {
    doorNo: checkSelected.value ? `${suffixNo()}${formData.value.doorNo}` : topDoorNo.value
  }
  try {
    let result = await getLandlordListBySearchApi(requestParams)
    console.error(requestParams, result)

    const routeName = 'landEvaIndex'
    const obj = {
      type: 'land',
      uid: result[0]?.uid
    }

    routerForward(routeName, {
      replace: true,
      params: JSON.stringify(obj)
    })
  } catch {}
}

const getCheckList = async () => {
  try {
    let result = await getLandlordListBySearchApi({
      type: 'LandNoMove'
    } as any)
    doorNoList.value = result.map((item: any) => item.showDoorNo)
  } catch {}
}

onMounted(() => {
  getDoorNoInfoList()
  getCheckList()
})
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
}

.name-wrapper {
  width: 400rpx;
  height: 23rpx;
  padding-left: 7rpx;
  font-size: 9rpx;
  line-height: 23rpx;
  color: #999;
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  &.isSelected {
    color: #171718;
  }
}
.icon_img {
  width: 23rpx;
  height: 23rpx;
  margin-left: 4rpx;
}

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

      .input-txtarea-wrapper {
        display: flex;
        align-items: center;
        width: 570rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txtarea {
          width: 570rpx;
          height: 70px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
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

  .value {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .common-txt {
    font-size: 9rpx;
    color: #666;
    margin-left: 10px;
  }

  .land-segment {
    display: flex;
    align-items: center;
    padding: 0 20rpx 20rpx 20rpx 20rpx;
    margin-left: 40rpx;
    box-sizing: border-box;
  }

  .village-select-wrapper {
    display: flex;
    align-items: center;
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

      &.small {
        width: 120rpx;
      }

      &.mini {
        width: 40rpx;
      }
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
</style>
