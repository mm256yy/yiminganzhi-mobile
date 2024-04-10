<template>
  <view class="form-wrapper">
    <!-- 集中供养办理/查看 -->
    <uni-forms class="form" ref="form" :modelValue="formData">
      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>基本信息</text>
      </view>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">姓名：</view>
            <view class="content">{{ formatStr(formData.name) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">与户主关系：</view>
            <view class="content"> {{ formatDict(formData.relation, 307) }} </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">性别：</view>
            <view class="content">{{ formatDict(formData.sex, 292) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">身份证号：</view>
            <view class="content"> {{ formatStr(formData.card) }} </view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户籍类别：</view>
            <view class="content">{{ formatDict(formData.censusType, 249) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">人口性质：</view>
            <view class="content">{{ formatDict(formData.populationNature, 263) }}</view>
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="24">
          <view class="col">
            <view class="label">安置方式：</view>
            <!-- <view class="content">{{ formatDict(formData.settingWay, 321) }}</view> -->
            <view class="content">{{ formData.settingWay=='1'?'集中供养':'--' }}</view>
          </view>
        </uni-col>
      </uni-row>

      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>办理信息</text>
      </view>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="完成时间："
            :label-width="150"
            label-align="right"
            name="formData.relocateCompleteTime"
          >
            <view :class="['picker-wrapper', status === 'view' ? 'no-border' : '']">
              <view v-if="status === 'view'" class="uni-input">
                {{ formatStr(formData.relocateCompleteTime) }}
              </view>
              <picker
                v-else
                mode="date"
                :value="currentDate"
                :fields="'date'"
                @change="bindDateChange"
              >
                <view :class="['uni-input', formData.relocateCompleteTime ? '' : 'select']">
                  {{ formData.relocateCompleteTime ? formData.relocateCompleteTime : '请选择' }}
                </view>
              </picker>
            </view>
          </uni-forms-item>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="集中供养证："
            :label-width="150"
            label-align="right"
            name="formData.relocatePicStr"
          >
            <uploadFiles
              v-model="relocatePicStr"
              :file-list="relocatePicStr"
              :limit="20"
              :accepts="['.jpg', '.png', '.pdf', '.jpeg']"
              :is-preview="status === 'view'"
              show-type="grid"
            />
          </uni-forms-item>
        </uni-col>
      </uni-row>
    </uni-forms>

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
const formData = ref<any>({
  name: '',
  relation: '',
  sex: '',
  card: '',
  censusType: '',
  populationNature: '',
  settingWay: '',
  relocateCompleteTime: '',
  relocatePic: ''
})
const emit = defineEmits(['submit'])
const relocatePicStr = ref<string>('[]')

// 获取年月日
const getDate = () => {
  if (formData.value.houseEmptyDate) {
    return formData.value.houseEmptyDate
  } else {
    return `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`
  }
}

const currentDate = ref<any>('')

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
      formData.value = {
        ...obj,
        relocatePic: fmtPicUrl(obj.relocatePic),
        relocateCompleteTime: obj.relocateCompleteTime
          ? dayjs(obj.relocateCompleteTime).format('YYYY-MM-DD')
          : getDate()
      }
      console.log(formData.value,'formData.value测试数据')
      currentDate.value = obj.relocateCompleteTime
        ? dayjs(obj.relocateCompleteTime).format('YYYY-MM-DD')
        : getDate()
      relocatePicStr.value = fmtPicUrl(obj.relocatePic)
    }
  })
}

/**
 *日期选择
 */
const bindDateChange = (e: any) => {
  formData.value.relocateCompleteTime = e.detail.value
}

const submit = () => {
  if (!relocatePicStr.value || relocatePicStr.value === '[]') {
    showToast('请上传集中供养凭证')
    return
  } else if (!formData.value.relocateCompleteTime) {
    showToast('请选择完成时间')
    return
  } else {
    const { uid } = props
    const params = {
      ...formData.value,
      relocateStatus: '1',
      relocatePic: relocatePicStr.value,
      relocateCompleteTime: formData.value.relocateCompleteTime
        ? dayjs(formData.value.relocateCompleteTime)
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

    .col {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 23rpx;

      .label {
        width: 100rpx;
        height: 23rpx;
        margin-right: 9rpx;
        font-size: 9rpx;
        color: rgba(23, 23, 24, 0.6);
        text-align: right;
      }

      .content {
        height: 23rpx;
        font-size: 9rpx;
        color: #171718;
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

      &.no-border {
        border: none;
      }

      .uni-input {
        width: 180rpx;

        &.select {
          color: #999;
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
</style>
