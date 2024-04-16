<template>
  <view class="form-wrapper">
    <Back title="编辑" needConfirm />
    <view class="main">
      <!-- type: homestead 宅基地，flat 公寓房 -->
      <uni-forms
        class="form"
        ref="form"
        :modelValue="formData"
        v-if="commonParams.type === 'homestead'"
      >
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="安置区"
              :label-width="150"
              label-align="right"
              name="formData.settleAddress"
            >
              <view class="content-txt">
                {{ getSettleAddress(formData.settleAddress, commonParams.type) }}
              </view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              required
              label="类型"
              :label-width="150"
              label-align="right"
              name="formData.houseAreaType"
            >
              <view class="content-txt">宅基地</view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              required
              label="户型/套型"
              :label-width="150"
              label-align="right"
              name="formData.area"
            >
              <view class="content-txt"> {{ formatStr(formData.area, '㎡') }} </view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="地块编号"
              :label-width="150"
              label-align="right"
              name="formData.landNo"
            >
              <uni-data-select v-model="formData.landNo" :localdata="landNoList" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="摇号顺序号"
              :label-width="150"
              label-align="right"
              name="formData.lotteryOrder"
            >
              <uni-easyinput v-model="formData.lotteryOrder" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="择址顺序号"
              :label-width="150"
              label-align="right"
              name="formData.placeOrder"
            >
              <uni-easyinput v-model="formData.placeOrder" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
      </uni-forms>

      <uni-forms class="form" ref="form" :modelValue="formData" v-if="commonParams.type === 'flat'">
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="安置区"
              :label-width="150"
              label-align="right"
              name="formData.settleAddress"
            >
              <view class="content-txt">
                {{ getSettleAddress(formData.settleAddress, commonParams.type) }}
              </view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="类型"
              :label-width="150"
              label-align="right"
              name="formData.houseAreaType"
            >
              <view class="content-txt">公寓房</view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="户型/套型"
              :label-width="150"
              label-align="right"
              name="formData.area"
            >
              <view class="content-txt"> {{ formatStr(formData.area, '㎡') }} </view>
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="幢号-房号"
              :label-width="150"
              label-align="right"
              name="formData.roomNo"
            >
              <uni-data-select v-model="formData.roomNo" :localdata="roomNoList" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="储藏室编号"
              :label-width="150"
              label-align="right"
              name="formData.storeroomNo"
            >
              <uni-data-select v-model="formData.storeroomNo" :localdata="storeroomNoList" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="车位编号"
              :label-width="150"
              label-align="right"
              name="formData.carNo"
            >
              <uni-data-select v-model="formData.carNo" :localdata="carNoList" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="摇号顺序号"
              :label-width="150"
              label-align="right"
              name="formData.lotteryOrder"
            >
              <uni-easyinput v-model="formData.lotteryOrder" type="number" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>

          <uni-col :span="24">
            <uni-forms-item
              label="择房顺序号"
              :label-width="150"
              label-align="right"
              name="formData.placeOrder"
            >
              <uni-easyinput v-model="formData.placeOrder" type="number" placeholder="请输入" />
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
import { onLoad } from '@dcloudio/uni-app'
import { routerBack, formatStr } from '@/utils'
import { apartmentArea, resettleArea } from '@/config'
import {
  getChooseConfigApi,
  getHouseConfigApi,
  updateImpLandlordChooseHouseApi,
  getImpLandlordItemApi,
  getResettleDetail
} from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import Back from '@/components/Back/Index.vue'
import { OtherDataType } from '@/database'

const commonParams = ref<any>({})
let dataLists = ref([])
const getDataRequest = async () => {
  try {
    const datas = await getResettleDetail(OtherDataType.settleAddressList)
    dataLists.value = datas
    // resettleArea.value=dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
  } catch (error) {
    console.log('error', error)
  }
}
// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  settleAddress: '', // 安置区
  houseAreaType: '', // 类型
  area: '', // 户型/套型
  landNo: '', // 地块编号
  lotteryOrder: '', // 摇号顺序号
  placeOrder: '', // 择址/择房 顺序号
  roomNo: '', // 幢号-房号
  storeroomNo: '', // 储藏室编号
  carNo: '' // 车位编号
})

const landNoList = ref<any[]>([]) // 地块编号选项列表
const storeroomNoList = ref<any[]>([]) // 储藏室编号选项列表
const carNoList = ref<any[]>([]) // 车位号选项列表
const roomNoList = ref<any[]>([]) // 幢号-房号 选项列表

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
  const { uid, itemUid } = commonParams.value
  getImpLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.immigrantChooseHouseList ? res.immigrantChooseHouseList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = { ...obj }
    }
  })
}

/**
 * 获取安置区块
 * @param data
 */
const getSettleAddress = (data: string, type: string) => {
  console.error(data, dataLists.value)

  if (data) {
    // type: flat 公寓房的安置方式, homestead 宅基地的安置方式
    if (type === 'flat') {
      let str = ''
      dataLists.value.map((item: any) => {
        if (item.id == data) {
          str = item.name
        }
      })
      return str
    } else if (type === 'homestead') {
      let str = ''
      dataLists.value.map((item: any) => {
        if (item.id == data) {
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
        if (item.type === '2') {
          arr1.push({
            text: item.name,
            value: item.name,
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
      console.log(landNoList.value, '测试数据下拉列表')
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

// 表单提交
const submit = () => {
  const { uid, doorNo } = commonParams.value
  const params = {
    doorNo,
    ...formData.value
  }
  console.log(params, '测试提交数据')
  updateImpLandlordChooseHouseApi(uid, params)
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
