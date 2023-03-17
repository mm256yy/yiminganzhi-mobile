<template>
  <view class="select-wrap">
    <view class="mask" />
    <view class="content show">
      <view class="head">
        <view class="cancle" @click.stop="cancle">取消</view>
        <view class="name">选择行政村</view>
        <view class="right">
          <view class="confirm" @click.stop="reset">重置</view>
          <view class="confirm ml-10" @click.stop="confirm">确定</view>
        </view>
      </view>

      <view class="body">
        <view class="select-item">
          <view class="select-title">区/县:</view>
          <view class="select-cont">
            <view
              class="common-item"
              v-for="item in props.treeData"
              :key="item.code"
              @click.stop="areaClick(item)"
              :class="[currentSelect[0] && currentSelect[0] === item.code ? 'active' : '']"
              >{{ item.name }}</view
            >
          </view>
        </view>
        <view class="select-item" v-if="currentTown && currentTown.length">
          <view class="select-title">乡镇/街道:</view>
          <view class="select-cont">
            <view
              class="common-item"
              :class="[currentSelect[1] && currentSelect[1] === item.code ? 'active' : '']"
              v-for="item in currentTown"
              :key="item.code"
              @click.stop="townClick(item)"
              >{{ item.name }}</view
            >
          </view>
        </view>
        <view class="line" v-if="currentVillage && currentVillage.length" />
        <view class="select-item" v-if="currentVillage && currentVillage.length">
          <view class="select-title">行政村:</view>
          <view class="select-cont">
            <view
              class="common-item"
              :class="[currentSelect[2] && currentSelect[2] === item.code ? 'active' : '']"
              v-for="item in currentVillage"
              :key="item.code"
              @click.stop="villageClick(item)"
              >{{ item.name }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface PropsType {
  treeData: any
  title?: string[]
  value?: string[]
  selectAny?: boolean // 是否选择任意一项
}

const props = defineProps<PropsType>()
const emit = defineEmits(['onClose', 'onConfirm'])

const currentTown = ref<any>([])
const currentVillage = ref<any>([])
const currentSelect = ref<string[]>([])
const title = ref<string[]>([])

watch(
  () => props.value,
  (val) => {
    if (val && val.length) {
      currentSelect.value = [...val]
      const townList = props.treeData.find((item: any) => item.code === val[0]).children || []
      currentTown.value = townList
      currentVillage.value = townList.find((item: any) => item.code === val[1]).children || []
    }
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
  if (props.title) {
    title.value = [...props.title]
  }
})

const areaClick = (item: any) => {
  const condition = currentSelect.value[0] && currentSelect.value[0] === item.code
  currentSelect.value[0] = condition ? '' : item.code
  title.value[0] = condition ? '' : item.name

  currentTown.value = condition ? [] : item.children
  currentVillage.value = []
  currentSelect.value[1] = ''
  currentSelect.value[2] = ''
  title.value[1] = ''
  title.value[2] = ''
}

const townClick = (item: any) => {
  const condition = currentSelect.value[1] && currentSelect.value[1] === item.code
  currentSelect.value[1] = condition ? '' : item.code
  title.value[1] = condition ? '' : item.name
  currentVillage.value = condition ? [] : item.children
  currentSelect.value[2] = ''
  title.value[2] = ''
}

const villageClick = (item: any) => {
  const condition = currentSelect.value[2] && currentSelect.value[2] === item.code
  currentSelect.value[2] = condition ? '' : item.code
  title.value[2] = condition ? '' : item.name
}

const cancle = () => {
  emit('onClose')
}

const confirm = () => {
  const realArray = currentSelect.value.filter((item) => !!item)
  if (!props.selectAny && realArray.length < 3) {
    uni.showToast({
      title: '未完成选择',
      icon: 'none'
    })
    return
  }
  emit('onConfirm', currentSelect.value, title.value)
}

const reset = () => {
  title.value = []
  currentSelect.value = []
  emit('onConfirm', currentSelect.value, title.value)
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
      width: 70rpx;
      height: 47rpx;
      margin: 18rpx 9rpx 0 0;
      font-size: 9rpx;
      line-height: 13rpx;
      color: #171718;
      background: #d6ebff;
      border-radius: 7rpx;
      box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.08);
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
