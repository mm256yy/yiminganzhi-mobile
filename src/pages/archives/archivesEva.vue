<template>
  <view class="form-wrapper">
    <uni-forms class="form">
      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>资产评估档案上传</text>
      </view>

      <uni-row>
        <template v-if="role === RoleCodeType.assessor">
          <uni-col :span="24">
            <uni-forms-item
              required
              label="房屋评估报告："
              :label-width="150"
              label-align="right"
              name="houseEstimatePicStr"
            >
              <uploadFiles
                v-model="houseEstimatePicStr"
                :file-list="houseEstimatePicStr"
                :limit="20"
                :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                show-type="grid"
              />
            </uni-forms-item>
          </uni-col>

          <uni-col
            v-if="type === MainType.Company || type === MainType.IndividualHousehold"
            :span="24"
          >
            <uni-forms-item
              required
              label="设施设备评估报告："
              :label-width="150"
              label-align="right"
              name="devicePicStr"
            >
              <uploadFiles
                v-model="devicePicStr"
                :file-list="devicePicStr"
                :limit="20"
                :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                show-type="grid"
              />
            </uni-forms-item>
          </uni-col>

          <uni-col v-if="type === MainType.Village" :span="24">
            <uni-forms-item
              required
              label="农村小型专项设施评估报告："
              :label-width="150"
              label-align="right"
              name="specialPicStr"
            >
              <uploadFiles
                v-model="specialPicStr"
                :file-list="specialPicStr"
                :limit="20"
                :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                show-type="grid"
              />
            </uni-forms-item>
          </uni-col>
        </template>

        <template v-else-if="role === RoleCodeType.assessorland">
          <uni-col :span="24">
            <uni-forms-item
              required
              label="土地评估报告："
              :label-width="150"
              label-align="right"
              name="landEstimatePicStr"
            >
              <uploadFiles
                v-model="landEstimatePicStr"
                :file-list="landEstimatePicStr"
                :limit="20"
                :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
                show-type="grid"
              />
            </uni-forms-item>
          </uni-col>
        </template>
      </uni-row>
    </uni-forms>

    <image
      class="submit-btn"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { showToast } from '@/config/msg'
import uploadFiles from '@/components/UploadFile/index.vue'
import { ImmigrantDocumentationType } from '@/types/impDataFill'
import { fmtPicUrl, getStorage, StorageKey } from '@/utils'
import { MainType, RoleCodeType } from '@/types/common'

interface PropsType {
  type: string
  immigrantDocumentation: Partial<ImmigrantDocumentationType>
}

const props = defineProps<PropsType>()
const emit = defineEmits(['submit'])
const houseEstimatePicStr = ref<string>('[]') // 房屋评估报告
const landEstimatePicStr = ref<string>('[]') // 土地评估报告
const devicePicStr = ref<string>('[]') // 设施设备评估报告
const specialPicStr = ref<string>('[]') // 农村小型专项设施评估报告
const role = ref<RoleCodeType>(RoleCodeType.assessor)

watch(
  () => props.immigrantDocumentation,
  (val) => {
    if (val) {
      const { houseEstimatePic, landEstimatePic, devicePic, specialPic } = val
      houseEstimatePicStr.value = fmtPicUrl(houseEstimatePic)
      landEstimatePicStr.value = fmtPicUrl(landEstimatePic)
      devicePicStr.value = fmtPicUrl(devicePic)
      specialPicStr.value = fmtPicUrl(specialPic)
    }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  role.value = getStorage(StorageKey.USERROLE)
})

const submit = async () => {
  const { type } = props
  if (role.value === RoleCodeType.assessor) {
    if (!houseEstimatePicStr.value || houseEstimatePicStr.value === '[]') {
      showToast('请上传房屋评估报告')
      return
    }
    if (
      (!devicePicStr.value || devicePicStr.value === '[]') &&
      (type === MainType.Company || type === MainType.IndividualHousehold)
    ) {
      showToast('请上传设施设备评估报告')
      return
    }
    if ((!specialPicStr.value || specialPicStr.value === '[]') && type === MainType.Village) {
      showToast('请上传农村小型专项设施评估报告')
      return
    }
    const params = {
      houseEstimatePic: houseEstimatePicStr.value,
      devicePic: devicePicStr.value,
      specialPic: specialPicStr.value
    }
    emit('submit', params)
  } else {
    if (!landEstimatePicStr.value || landEstimatePicStr.value === '[]') {
      showToast('请上传土地评估报告')
      return
    }
    emit('submit', {
      landEstimatePic: landEstimatePicStr.value
    })
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  padding: 6rpx;
  background-color: #fff;
  border-radius: 2rpx;
  box-sizing: border-box;

  .form {
    height: calc(100vh - 33rpx - 12rpx - 9rpx - var(--status-bar-height));
    padding: 0 0 9rpx 0;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;

    ::v-deep.uni-forms-item__label {
      font-size: 9rpx !important;
      color: rgba(23, 23, 24, 0.6) !important;
    }

    .title-wrapper {
      display: flex;
      width: 100%;
      height: 28rpx;
      margin-bottom: 9rpx;
      font-size: 9rpx;
      color: #171718;
      background: #fff;
      border-bottom: 1rpx solid #f0f0f0;
      border-radius: 5rpx 5rpx 0px 0px;
      flex-direction: row;
      align-items: center;

      .icon {
        width: 10rpx;
        height: 10rpx;
        margin-right: 6rpx;
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
</style>
