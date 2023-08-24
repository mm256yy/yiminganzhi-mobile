<template>
  <view class="centralized-support">
    <!-- 集中供养办理/查看 -->
    <view class="title-wrapper">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>基本信息</text>
    </view>

    <view class="row-1">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">姓名：</view>
            <view class="content">{{ formatStr(form.name) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">与户主关系：</view>
            <view class="content"> {{ formatDict(form.relation, 307) }} </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">性别：</view>
            <view class="content">{{ formatDict(form.sex, 292) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">身份证号：</view>
            <view class="content"> {{ formatStr(form.card) }} </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户籍类别：</view>
            <view class="content">{{ formatDict(form.censusType, 249) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">人口性质：</view>
            <view class="content">{{ formatDict(form.populationNature, 363) }}</view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">安置方式：</view>
            <view class="content">{{ formatDict(form.settingWay, 375) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12" />
      </uni-row>
    </view>

    <view class="title-wrapper">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>办理信息</text>
    </view>

    <view class="row-2">
      <view class="label"> <text class="red">*</text>完成时间： </view>
      <view class="content">
        <uni-datetime-picker
          type="date"
          :clear-icon="true"
          :disabled="status === 'view'"
          v-model="form.relocateCompleteTime"
        />
      </view>
    </view>

    <view class="row-2">
      <view class="label"> <text class="red">*</text> 集中供养凭证： </view>
      <view class="content">
        <uploadFiles
          v-model="relocatePicStr"
          :file-list="relocatePicStr"
          :limit="20"
          :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
          :is-preview="status === 'view'"
          show-type="grid"
        />
      </view>
    </view>

    <image
      v-if="status !== 'view'"
      class="submit-btn"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import uploadFiles from '@/components/UploadFile/index.vue'
import { getImpLandlordItemApi, updateImpLandlordPeopleApi } from '@/service'
import dayjs from 'dayjs'
import { formatDict, formatStr, fmtPicUrl } from '@/utils'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'

interface PropsType {
  uid: string
  itemUid: string
  status: string
}

const props = defineProps<PropsType>()
const form = ref<any>({})
const emit = defineEmits(['submit'])
const relocatePicStr = ref<string>('[]')

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid, itemUid } = props
  getImpLandlordItemApi(uid).then((res: any) => {
    let arr: any = res && res.demographicList ? res.demographicList : []
    if (arr && arr.length) {
      let obj: any = arr.filter((item: any) => item.uid === itemUid)[0]
      form.value = {
        ...obj,
        relocatePic: fmtPicUrl(obj.relocatePic),
        relocateCompleteTime: obj.relocateCompleteTime
          ? dayjs(obj.relocateCompleteTime).format('YYYY-MM-DD')
          : ''
      }
      relocatePicStr.value = fmtPicUrl(obj.relocatePic)
    }
  })
}

const submit = async () => {
  if (!relocatePicStr.value || relocatePicStr.value === '[]') {
    showToast('请上传集中供养凭证')
    return
  } else if (!form.value.relocateCompleteTime) {
    showToast('请选择完成时间')
    return
  } else {
    const { uid } = props
    const params = {
      ...form.value,
      relocateStatus: '1',
      relocatePic: relocatePicStr.value,
      relocateCompleteTime: form.value.relocateCompleteTime
        ? dayjs(form.value.relocateCompleteTime)
        : ''
    }
    updateImpLandlordPeopleApi(uid, params)
      .then((res: any) => {
        if (res) {
          showToast(SUCCESS_MSG)
          emit('submit')
        }
      })
      .catch(() => {
        showToast(ERROR_MSG)
      })
  }
}

onMounted(() => {
  getLandlordDetail()
})
</script>

<style lang="scss" scoped>
.centralized-support {
  height: calc(100vh - 33rpx);
  padding: 6rpx;
  background-color: #fff;
  border-radius: 2rpx;
  box-sizing: border-box;

  .title-wrapper {
    display: flex;
    width: 100%;
    height: 28rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
    background: #ffffff;
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

  .row-1 {
    padding: 5rpx 12rpx 12rpx 0;
    box-sizing: border-box;

    .col {
      display: flex;
      flex-direction: row;

      .label {
        width: 150rpx;
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
      }
    }
  }

  .row-2 {
    display: flex;
    align-items: center;
    padding: 5rpx 12rpx;
    margin-top: 9rpx;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;

      .red {
        color: red;
      }
    }

    .content {
      flex: 1;
      display: flex;
      align-items: center;

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
