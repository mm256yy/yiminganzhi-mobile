<template>
  <view class="tabs-wrapper">
    <view :class="['tabs-list', props.expand ? 'expand' : '']">
      <view
        v-for="(item, index) in tabsList"
        :key="item.value"
        :class="['tabs-item', currentIndex === index ? 'active' : '']"
        @click="selectTabs(item, index)"
      >
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
import { ref, onMounted } from 'vue'

interface PropsType {
  dataList: any[]
  expand: boolean
}

const props = defineProps<PropsType>()

const emit = defineEmits(['selectTabs'])

const tabsList = ref<any>([])
const currentIndex = ref<number>(0)

onMounted(() => {
  if (props.dataList && props.dataList.length) {
    tabsList.value = JSON.parse(JSON.stringify(props.dataList))
  }
})

const selectTabs = (data: any, index: number) => {
  currentIndex.value = index
  emit('selectTabs', data, index)
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  height: 60rpx;
  margin: 5rpx 0;

  .tabs-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 520rpx;
    height: 60rpx;
    overflow-x: scroll;

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
      width: 70rpx;
      height: 60rpx;
      margin-right: 6rpx;
      background: #e1f0ff;
      border-radius: 7rpx;
      box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.08);
      flex: none;

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

      .icon-wrapper {
        text-align: center;

        .icon {
          width: 22rpx;
          height: 22rpx;
        }
      }

      .label {
        font-size: 9rpx;
        color: #171718;
        text-align: center;
        word-break: break-all;
        white-space: nowrap;

        &.active {
          margin-top: 6rpx;
          color: #fff;
        }
      }
    }
  }
}
</style>
