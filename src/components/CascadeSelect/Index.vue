<template>
  <view class="select-wrap">
    <view class="mask" />
    <view class="content show">
      <view class="head">
        <view class="cancle" @click.stop="cancle">取消</view>
        <view class="name">选择职业</view>
        <view class="right">
          <view class="confirm" @click.stop="reset">重置</view>
          <view class="confirm ml-10" @click.stop="confirm">确定</view>
        </view>
      </view>

      <view class="body">
        <view class="select-item">
          <view class="select-title">类别一:</view>
          <view class="select-cont">
            <view
              class="common-item"
              v-for="item in props.dataList"
              :key="item.value"
              @click.stop="firstClick(item)"
              :class="[currentSelect[0] && currentSelect[0] === item.value ? 'active' : '']"
            >
              {{ item.label }}
            </view>
          </view>
        </view>
        <view class="select-item" v-if="currentType && currentType.length">
          <view class="select-title">类别二:</view>
          <view class="select-cont">
            <view
              class="common-item"
              :class="[currentSelect[1] && currentSelect[1] === item.value ? 'active' : '']"
              v-for="item in currentType"
              :key="item.value"
              @click.stop="secondClick(item)"
            >
              {{ item.label }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface PropsType {
  dataList: any
  label?: string[]
  value?: string[]
}

const props = defineProps<PropsType>()
const emit = defineEmits(['onClose', 'onConfirm'])

const currentType = ref<any>([])
const currentSelect = ref<string[]>([])
const label = ref<string[]>([])

watch(
  () => props.value,
  (val) => {
    if (val && val.length) {
      currentSelect.value = [...val]
      const currentList = props.dataList.find((item: any) => item.value === val[0]).children || []
      currentType.value = currentList
    }
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
  if (props.label) {
    label.value = [...props.label]
  }
})

const firstClick = (item: any) => {
  const condition = currentSelect.value[0] && currentSelect.value[0] === item.value
  currentSelect.value[0] = condition ? '' : item.value
  label.value[0] = condition ? '' : item.label

  currentType.value = condition ? [] : item.children
  currentSelect.value[1] = ''
  label.value[1] = ''
}

const secondClick = (item: any) => {
  const condition = currentSelect.value[1] && currentSelect.value[1] === item.value
  currentSelect.value[1] = condition ? '' : item.value
  label.value[1] = condition ? '' : item.label
  console.log('label：', label.value)
}

const cancle = () => {
  emit('onClose')
}

const confirm = () => {
  const realArray = currentSelect.value.filter((item) => !!item)
  if (realArray.length < 2) {
    uni.showToast({
      title: '未完成选择',
      icon: 'none'
    })
    return
  }
  emit('onConfirm', currentSelect.value, label.value)
}

const reset = () => {
  label.value = []
  currentSelect.value = []
  emit('onConfirm', currentSelect.value, label.value)
}
</script>
<style lang="scss" scoped>
.select-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 0rpx;
    padding: 12rpx 18rpx;
    background-color: #ffffff;
    border-radius: 19rpx 19rpx 0rpx 0rpx;
    transition: all 0.3s;

    &.show {
      height: 90%;
    }
  }

  .head {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 3rpx;

    .cancle {
      font-size: 9rpx;
      line-height: 13rpx;
      color: #0a54ff;
    }

    .name {
      font-size: 11rpx;
      font-weight: 500;
      line-height: 12rpx;
      color: #171718;
    }

    .right {
      display: flex;
      align-items: center;
    }

    .confirm {
      font-size: 9rpx;
      line-height: 13rpx;
      color: #0a54ff;
    }

    .ml-10 {
      padding-left: 10rpx;
    }
  }

  .body {
    flex: 1;
    overflow-y: scroll;
  }

  .line {
    width: 100%;
    margin-top: 18rpx;
    border-bottom: 1rpx dashed #d0cbcb;
  }

  .select-item {
    display: flex;
    align-items: flex-start;

    .select-title {
      display: flex;
      width: 42rpx;
      height: 47rpx;
      margin-top: 18rpx;
      font-size: 11rpx;
      font-weight: 500;
      line-height: 12rpx;
      color: #171718;
      flex: none;
      align-items: center;
      justify-content: flex-start;
    }

    .select-cont {
      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .common-item {
      display: flex;
      width: 100rpx;
      height: 60rpx;
      padding: 6rpx;
      margin: 18rpx 9rpx 0 0;
      font-size: 9rpx;
      line-height: 13rpx;
      color: #171718;
      text-align: justify;
      word-break: break-all;
      background: #d6ebff;
      border-radius: 7rpx;
      box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.08);
      box-sizing: border-box;
      align-items: center;
      justify-content: center;

      &.active {
        color: #ffffff;
        background: linear-gradient(360deg, #72abf7 0%, #2b64e8 100%);
        box-shadow: 2rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.14),
          0rpx 2rpx 0rpx 0rpx rgba(64, 118, 236, 1);
      }
    }
  }
}
</style>
