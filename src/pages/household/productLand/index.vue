<template>
  <!-- 生产用地（实施） -->
  <view class="base-info-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      择地结果录入
    </view>

    <view class="row">
      <uni-row>
        <uni-col :span="24" class="m-b-10">
          <view class="col">
            <view class="label">区块：</view>
            <view class="content">
              {{ getSettleAddress(formData.settleAddress) }}
            </view>
          </view>
        </uni-col>

        <uni-col :span="24" class="m-b-10">
          <view class="col">
            <view class="label">地块编号：</view>
            <view class="content">
              <uni-data-select v-model="formData.landNo" :localdata="landNoList" />
            </view>
          </view>
        </uni-col>

        <uni-col :span="24" class="m-b-10">
          <view class="col">
            <view class="label">面积：</view>
            <view class="content">
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landArea"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">亩</view>
              </view>
            </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row class="m-t-10">
        <uni-col :span="24">
          <view class="col">
            <view class="label">相关凭证：</view>
            <view class="content">
              <upload-file
                v-model="landPicStr"
                :file-list="landPicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
    </view>

    <image
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { resettleArea, apartmentArea } from '../config'
import { LandlordType } from '@/types/sync'
import { updateImpLandlordImmigrantLandApi } from '@/service'
import UploadFile from '@/components/UploadFile/index.vue'

interface PropsType {
  baseInfo: LandlordType
  dataInfo: any
  landNoList: any[]
}

const props = defineProps<PropsType>()
const { immigrantSettle } = props.baseInfo
const emit = defineEmits(['updateData'])
const formData = ref<any>({})
const landPicStr = ref<string>('[]') // 凭证照片

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      formData.value = { ...val }
      const { landPic } = formData.value
      if (landPic) {
        landPicStr.value = landPic
      }
    }
  },
  { immediate: true, deep: true }
)

/**
 * 获取安置区块
 * @param data
 */
const getSettleAddress = (data: string) => {
  if (data) {
    // 选择了公寓房的安置方式
    if (immigrantSettle) {
      if (immigrantSettle.houseAreaType === 'flat') {
        let str = ''
        apartmentArea.map((item: any) => {
          if (item.id === data) {
            str = item.name
          }
        })
        return str
      } else {
        let str = ''
        resettleArea.map((item: any) => {
          if (item.id === data) {
            str = item.name
          }
        })
        return str
      }
    } else {
      return ''
    }
  } else {
    return ''
  }
}

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

const submit = () => {
  const params: any = {
    ...formData.value,
    landPic: landPicStr.value
  }
  updateImpLandlordImmigrantLandApi(props.baseInfo.uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateData')
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;

  .title {
    display: flex;
    height: 28rpx;
    margin-bottom: 9rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    border-bottom: 1rpx solid #f0f0f0;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-left: 6rpx;
    }
  }

  .row {
    padding: 5rpx 12rpx 12rpx 0;
    box-sizing: border-box;

    .col {
      display: flex;
      flex-direction: row;

      .label {
        width: 90rpx;
        height: 16rpx;
        margin-left: 9rpx;
        font-size: 9rpx;
        line-height: 16rpx;
        color: rgba(23, 23, 24, 0.6);
      }

      .content {
        font-size: 9rpx;
        line-height: 16rpx;
        color: #171718;

        &.blue {
          color: #3e73ec;
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
      }
    }

    .line {
      width: 100%;
      height: 1rpx;
      margin: 9rpx 0;
      background: #ebebeb;
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.submit {
      bottom: 16rpx;
    }
  }
}
</style>
