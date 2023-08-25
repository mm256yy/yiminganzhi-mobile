<template>
  <!-- 生产用地（实施） -->
  <view class="base-info-wrapper">
    <!-- 安置方式 settingWay: 1 农业安置 -->
    <view v-if="baseInfo.settingWay && baseInfo.settingWay === '1'">
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

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">该户未选择农业安置，无需办理生产用地</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { resettleArea, apartmentArea } from '../../common/config'
import { LandlordType } from '@/types/sync'
import { updateImpLandlordImmigrantLandApi, getChooseConfigApi } from '@/service'
import UploadFile from '@/components/UploadFile/index.vue'

interface PropsType {
  baseInfo: LandlordType
  dataInfo: any
}

const props = defineProps<PropsType>()
const { immigrantSettle } = props.baseInfo as any
const emit = defineEmits(['updateData'])
const landNoList = ref<any[]>([])
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

/**
 * 获取地块编号选项列表
 * type：1 地块编号，2 宅基地地块，3 储藏室编号，4 车位编号
 */
const getLandNoList = () => {
  getChooseConfigApi().then((res: any) => {
    let arr: any = []
    if (res && res.length) {
      res.map((item: any) => {
        if (item.type === '1') {
          arr.push({
            text: item.name,
            value: item.id,
            disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
          })
        }
      })
      landNoList.value = [...arr]
    }
  })
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

onMounted(() => {
  getLandNoList()
})
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

  .null-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
    background-color: #fff;

    .icon {
      width: 152rpx;
      height: 92rpx;
    }

    .tips {
      margin-top: 17rpx;
      font-size: 9rpx;
      line-height: 1;
      color: #171718;
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
