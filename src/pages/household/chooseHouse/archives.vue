<template>
  <view class="form-wrapper">
    <Back title="档案上传" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row v-for="(item, index) in formData" :key="index">
          <uni-row v-if="commonParams.type === 'homestead'">
            <uni-col :span="12">
              <uni-forms-item
                label="区块"
                :label-width="150"
                label-align="right"
                name="settleAddress"
              >
                <view class="content-txt">
                  {{ getSettleAddress(item.settleAddress, commonParams.type) }}
                </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="类型"
                :label-width="150"
                label-align="right"
                name="houseAreaType"
              >
                <view class="content-txt">宅基地</view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="摇号顺序号"
                :label-width="150"
                label-align="right"
                name="lotteryOrder"
              >
                <view class="content-txt">
                  {{ formatStr(item.lotteryOrder) }}
                </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="择址顺序号"
                :label-width="150"
                label-align="right"
                name="placeOrder"
              >
                <view class="content-txt">
                  {{ formatStr(item.placeOrder) }}
                </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item label="户型" :label-width="150" label-align="right" name="area">
                <view class="content-txt"> {{ formatStr(item.area) }} </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item label="地块编号" :label-width="150" label-align="right" name="landNo">
                <view class="content-txt">
                  {{ dictOption(landNoList, item.landNo) }}
                </view>
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row v-if="commonParams.type === 'flat'">
            <uni-col :span="12">
              <uni-forms-item
                label="区块"
                :label-width="150"
                label-align="right"
                name="settleAddress"
              >
                <view class="content-txt">
                  {{ getSettleAddress(item.settleAddress, commonParams.type) }}
                </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="类型"
                :label-width="150"
                label-align="right"
                name="houseAreaType"
              >
                <view class="content-txt">公寓房</view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="摇号顺序号"
                :label-width="150"
                label-align="right"
                name="lotteryOrder"
              >
                <view class="content-txt">
                  {{ formatStr(item.lotteryOrder) }}
                </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="择房顺序号"
                :label-width="150"
                label-align="right"
                name="placeOrder"
              >
                <view class="content-txt">
                  {{ formatStr(item.placeOrder) }}
                </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item label="套型" :label-width="150" label-align="right" name="area">
                <view class="content-txt"> {{ formatStr(item.area) }} </view>
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="幢号-室号"
                :label-width="150"
                label-align="right"
                name="roomNo"
              >
                <view class="content-txt"> {{ formatStr(item.roomNo) }} </view>
              </uni-forms-item>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                label="摇号顺序凭证"
                :label-width="150"
                label-align="right"
                name="settleAddress"
              >
                <upload-files
                  v-model="item.lotteryOrderPic"
                  :file-list="item.lotteryOrderPic"
                  :limit="20"
                  show-type="grid"
                  :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                />
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                :label="commonParams.type === 'homestead' ? '择址顺序号凭证' : '择房顺序号凭证'"
                :label-width="150"
                label-align="right"
                name="settleAddress"
              >
                <upload-files
                  v-model="item.placeOrderPic"
                  :file-list="item.placeOrderPic"
                  :limit="20"
                  show-type="grid"
                  :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                />
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                required
                :label="commonParams.type === 'homestead' ? '择址确认单' : '择房确认单'"
                :label-width="150"
                label-align="right"
                name="settleAddress"
              >
                <upload-files
                  v-model="item.chooseHousePic"
                  :file-list="item.chooseHousePic"
                  :limit="20"
                  show-type="grid"
                  :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                />
              </uni-forms-item>
            </uni-col>

            <uni-col :span="12">
              <uni-forms-item
                label="其他附件"
                :label-width="150"
                label-align="right"
                name="settleAddress"
              >
                <upload-files
                  v-model="item.otherPic"
                  :file-list="item.otherPic"
                  :limit="20"
                  show-type="grid"
                  :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                />
              </uni-forms-item>
            </uni-col>
          </uni-row>
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
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, dictOption, formatStr } from '@/utils'
import { apartmentArea, resettleArea } from '@/config'
import {
  getChooseConfigApi,
  getHouseConfigApi,
  updateImpLandlordChooseHouseBatchApi,
  getImpLandlordItemApi,
  getResettleDetail
} from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'
import UploadFiles from '@/components/UploadFile/index.vue'
import { OtherDataType } from '@/database'

const commonParams = ref<any>({})
const formData = ref<any[]>([]) // 表单数据

const landNoList = ref<any[]>([]) // 地块编号选项列表
const storeroomNoList = ref<any[]>([]) // 储藏室编号选项列表
const carNoList = ref<any[]>([]) // 车位号选项列表
const roomNoList = ref<any[]>([]) // 幢号-房号 选项列表
let dataLists=ref([])
const getDataRequest = async () => {
  try {
    const datas = await getResettleDetail(OtherDataType.settleAddressList)
    dataLists.value = datas
    // resettleArea.value=dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
  } catch (error) {
    console.log('error', error)
  }
}
onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    getLandlordDetail()
    getChooseConfig()
    getHouseConfig()
    getDataRequest()
  }
})

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid } = commonParams.value
  getImpLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.immigrantChooseHouseList ? res.immigrantChooseHouseList : []
    if (arr && arr.length) {
      let newArr: any = []
      arr.map((item: any) => {
        newArr.push({
          ...item,
          lotteryOrderPic: item.lotteryOrderPic ? item.lotteryOrderPic : '[]', // 摇号顺序凭证
          placeOrderPic: item.placeOrderPic ? item.placeOrderPic : '[]', // 择房顺序号凭证
          chooseHousePic: item.chooseHousePic ? item.chooseHousePic : '[]', // 择房确认单
          otherPic: item.otherPic ? item.otherPic : '[]' // 其他附件
        })
      })
      formData.value = [...newArr]
    }
  })
}

/**
 * 获取安置区块
 * @param data
 */
const getSettleAddress = (data: string, type: string) => {
  if (data) {
    // type: flat 公寓房的安置方式, homestead 宅基地的安置方式
    if (type === 'flat') {
      let str = ''
      dataLists.value.map((item: any) => {
        if (item.id === data) {
          str = item.name
        }
      })
      return str
    } else if (type === 'homestead') {
      let str = ''
      dataLists.value.map((item: any) => {
        if (item.id === data) {
          str = item.name
        }
      })
      return str
    }
  } else {
    return ''
  }
}

/**
 * 获取选项列表
 * type：1 地块编号，2 宅基地地块，3 储藏室编号，4 车位编号
 */
const getChooseConfig = () => {
  getChooseConfigApi().then((res: any) => {
    let arr1: any = []
    let arr2: any = []
    let arr3: any = []
    if (res && res.length) {
      res.map((item: any) => {
        if (item.type === '1') {
          arr1.push({
            text: item.name,
            value: item.id,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        } else if (item.type === '3') {
          arr2.push({
            text: item.name,
            value: item.id,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        } else if (item.type === '4') {
          arr2.push({
            text: item.name,
            value: item.id,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        }
      })
      landNoList.value = [...arr1]
      storeroomNoList.value = [...arr2]
      carNoList.value = [...arr3]
    }
  })
}

// 获取  幢号-房号 选项列表
const getHouseConfig = () => {
  getHouseConfigApi().then((res: any) => {
    let arr: any = []
    if (res && res.length) {
      res.map((item: any) => {
        if (item.level === '2') {
          arr.push({
            text: item.code,
            value: item.code,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        }
      })
      roomNoList.value = [...arr]
    }
  })
}

// 择房/择址确认单是否为空
const isNullChooseHousePic = () => {
  const arr: any = formData.value.map((item: any) => {
    return item.chooseHousePic && item.chooseHousePic !== '[]'
  })
  const result = arr.every((item: boolean) => item)
  return result
}

// 表单提交
const submit = () => {
  const { uid, type } = commonParams.value
  if (!isNullChooseHousePic()) {
    showToast(`${type === 'homestead' ? '请上传择址确认单' : '请上传择房确认单'}`)
    return
  } else {
    updateImpLandlordChooseHouseBatchApi(uid, formData.value)
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

      .content-txt {
        display: flex;
        align-items: center;
        width: 200rpx;
        height: 25rpx;
        font-size: 9rpx;
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
