<template>
  <view class="appendant-info-wrapper">
    <view class="appendant-container">
      <view class="row">
        <view class="col">序号</view>
        <view class="col w-117">项目</view>
        <view class="col w-57">规格</view>
        <view class="col">单位</view>
        <view class="col w-94">数量</view>
        <view class="col w-183">备注</view>
      </view>

      <view class="row" v-for="(item, index) in formData" :key="item.id">
        <view class="col">{{ index + 1 }}</view>
        <view class="col w-117">{{ item.name }}</view>
        <view class="col w-57">{{ item.size }}</view>
        <view class="col">{{ item.unit }}</view>
        <view class="col w-94">
          <input class="remark" type="number" v-model="item.number" placeholder="请输入" />
        </view>
        <view class="col w-183">
          <input
            class="remark"
            v-model="item.remark"
            :maxlength="100"
            placeholder="请输入(100字以内)"
          />
        </view>
      </view>
    </view>

    <image
      class="submit-btn"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAppendantListApi } from '@/service'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  dataList: {
    type: Array as any,
    default: () => []
  }
})

const formData = ref<any>([])
const emit = defineEmits(['submit'])
const commonParams = {
  number: '',
  remark: ''
}

// 获取附属物初始化列表信息
const getList = () => {
  getAppendantListApi().then((res) => {
    res.map((item: any) => {
      formData.value.push({
        surveyId: item.id,
        name: item.name,
        size: item.size,
        unit: item.unit,
        ...commonParams
      })
    })
  })
}

// 表单提交
const submit = () => {
  const params = [...formData.value]
  emit('submit', params)
}

onMounted(() => {
  if (props.dataList && props.dataList.length > 0) {
    formData.value = [...props.dataList]
  } else {
    getList()
  }
})
</script>

<style lang="scss" scoped>
.appendant-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .appendant-container {
    display: table;
    width: 100%;
    border-collapse: collapse;

    .row {
      display: table-row;
      width: 100%;
      height: 28rpx;

      &:nth-child(2n - 1) {
        background-color: #f8f8f8;
      }

      &:first-child {
        font-size: 9rpx;
        color: #737374;

        .col {
          padding: 0;
          text-align: center;
        }
      }

      .col {
        display: table-cell;
        width: 35rpx;
        height: 28rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 28rpx;
        color: #171718;
        vertical-align: middle;
        border: 1rpx solid #f0f0f0;

        &.w-117 {
          width: 117rpx;
        }

        &.w-57 {
          width: 57rpx;
        }

        &.w-94 {
          width: 94rpx;
        }

        &.w-183 {
          width: 183rpx;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 73rpx;
          margin-left: 3rpx;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;

          .reduce {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-right: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }

          .num {
            width: 30rpx;
            height: 21rpx;
            font-size: 9rpx;
            line-height: 21rpx;
            text-align: center;
          }

          .plus {
            display: flex;
            width: 21rpx;
            height: 21rpx;
            background: #f8f8f8;
            border-left: 1rpx solid #ebebeb;
            border-radius: 2rpx 0 0 2rpx;
            align-items: center;
            justify-content: center;
          }
        }

        .remark {
          height: 19rpx;
          font-size: 9rpx;
        }
      }
    }
  }

  .submit-btn {
    position: fixed;
    right: 6rpx;
    bottom: 6rpx;
    width: 66rpx;
    height: 66rpx;
    border-radius: 50%;
  }
}
</style>
