<template>
  <!-- 居民户信息（实施） -->
  <view class="base-info-wrapper">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      家庭情况
    </view>

    <view class="row">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">是否财产户：</view>
            <view class="content">
              {{ dictOption(yesAndNoEnums, dataInfo.hasPropertyAccount) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content">
              {{ formatStr(dataInfo.phone) }}
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户籍所在地：</view>
            <view class="content">{{ formatStr(dataInfo.address) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">所属网格：</view>
            <view class="content">XXX</view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">行政村：</view>
            <view class="content">{{ formatStr(dataInfo.villageCodeText) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">自然村/村民小组：</view>
            <view class="content">{{ formatStr(dataInfo.virutalVillageCodeText) }}</view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">所在位置：</view>
            <view class="content">
              {{ dictOption(locationTypes, dataInfo.locationType) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">淹没范围：</view>
            <view class="content">{{ formatDict(dataInfo.formatDict, 346) }}</view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="24">
          <view class="col">
            <view class="label">经纬度：</view>
            <view class="content"> {{ dataInfo.longitude }} {{ dataInfo.latitude }} </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row class="m-t-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">户主照片：</view>
            <view class="content">
              <upload-file
                v-model="householdPicStr"
                :file-list="householdPicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">全家福照片：</view>
            <view class="content">
              <upload-file
                v-model="familyPicStr"
                :file-list="familyPicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row class="m-t-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">库区房屋照片：</view>
            <view class="content">
              <upload-file
                v-model="housePicStr"
                :file-list="housePicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">安置房照片：</view>
            <view class="content">
              <upload-file
                v-model="resettlePicStr"
                :file-list="resettlePicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
    </view>

    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      居民户支付情况
    </view>

    <view class="row">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">拨付资金：</view>
            <view class="content">搬迁生活费</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">发放状态：</view>
            <view class="content blue">已发放</view>
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
import { ref, computed, watch } from 'vue'
import { formatStr, dictOption, formatDict } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { locationTypes, yesAndNoEnums } from '@/config/common'
import { LandlordType } from '@/types/sync'
import { saveImpLandlordItemApi } from '@/service'
import UploadFile from '@/components/UploadFile/index.vue'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])

// const householdPic = computed(() => {
//   return props.dataInfo.householdPic || '[]'
// })

// const familyPic = computed(() => {
//   return props.dataInfo.familyPic || '[]'
// })

// const housePic = computed(() => {
//   return props.dataInfo.housePic || '[]'
// })

// const resettlePic = computed(() => {
//   return props.dataInfo.resettlePic || '[]'
// })

const householdPicStr = ref<string>('[]') // 户主照片
const familyPicStr = ref<string>('[]') // 全家福照片
const housePicStr = ref<string>('[]') // 库区房屋照片
const resettlePicStr = ref<string>('[]') // 安置房照片

watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      const { householdPic, familyPic, housePic, resettlePic } = val
      if (householdPic) {
        householdPicStr.value = householdPic
      }
      if (familyPic) {
        familyPicStr.value = familyPic
      }
      if (housePic) {
        housePicStr.value = housePic
      }
      if (resettlePic) {
        resettlePicStr.value = resettlePic
      }
    }
  },
  { immediate: true, deep: true }
)

const submit = () => {
  const params: any = {
    ...props.dataInfo,
    householdPic: householdPicStr.value,
    familyPic: familyPicStr.value,
    housePic: housePicStr.value,
    resettlePic: resettlePicStr.value
  }
  saveImpLandlordItemApi(params)
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
