<template>
  <view class="tabs-wrapper">
    <view :class="['tabs-list', 'expand']">
      <view
        v-for="(item, index) in tabsList"
        :key="item.value"
        :class="['tabs-item', currentIndex === index ? 'active' : '']"
        @click="selectTabs(item, index)"
      >
        <image
          v-if="item.filled"
          class="fill-suc-icon"
          src="@/static/images/tabs_fill_suc.png"
          mode="scaleToFill"
        />
        <view class="icon-wrapper">
          <image
            class="icon"
            :src="currentIndex === index ? item.selIcon : item.defIcon"
            mode="scaleToFill"
          />
        </view>
        <view :class="['label', currentIndex === index ? 'active' : '']">{{ item.label }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['selectTabs'])
const tabsList = ref<any>([])
const currentIndex = ref<number>(props.currentIndex)

const selectTabs = (data: any, index: number) => {
  currentIndex.value = index
  emit('selectTabs', data, index)
}

watch(
  () => props.currentIndex,
  (val) => {
    currentIndex.value = val
  }
)

watch(
  () => props.dataList,
  (val) => {
    if (val && val.length) {
      tabsList.value = JSON.parse(JSON.stringify(val))
    }
  }
)

onMounted(() => {
  if (props.dataList && props.dataList.length) {
    tabsList.value = JSON.parse(JSON.stringify(props.dataList))
  }
})
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  height: 60rpx;
  margin: 5rpx 0;

  .tabs-list {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60rpx;

    &.expand {
      width: 100%;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &::-moz-scrollbar {
      display: none;
    }

    .tabs-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: none;
      flex: 1;
      max-width: 90rpx;
      height: 60rpx;
      margin-right: 6rpx;
      background: #e1f0ff;
      border-radius: 7rpx;
      box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.08);

      &.active {
        height: 59rpx;
        background: url('../../static/images/icon_tabs_sel_bg.png') no-repeat;
        background-color: linear-gradient(360deg, #72abf7 0%, #3e73ec 100%);
        background-size: 100% 100%;
        box-shadow: 2rpx 2rpx 6rpx 0 rgba(0, 0, 0, 0.14), 0 2rpx 0 0 rgba(64, 118, 236, 1);

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 38rpx;
        }
      }

      .fill-suc-icon {
        position: absolute;
        top: 4rpx;
        right: 4rpx;
        width: 11rpx;
        height: 11rpx;
      }

      .icon-wrapper {
        text-align: center;

        .icon {
          width: 22rpx;
          height: 22rpx;
        }
      }

      .label {
        font-size: 8rpx;
        color: #171718;
        text-align: center;
        word-break: break-all;
        white-space: nowrap;

        &.active {
          margin-top: 2rpx;
          color: #fff;
        }
      }
    }
  }
}
</style>
