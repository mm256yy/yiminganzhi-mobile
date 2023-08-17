<template>
  <view class="sidebar-wrapper">
    <view class="main">
      <view class="content">
        <view class="list">
          <view class="item-1" v-for="(item, index) in dataList" :key="index">
            <view class="title-1" v-if="item.title">
              <view class="line" />
              <view class="content">{{ item.title }}</view>
              <view class="line" />
            </view>
            <view class="item-2" v-for="(sItem, sIndex) in item.list" :key="sIndex">
              <view class="title-2" v-if="sItem.title">{{ sItem.title }}</view>
              <view class="item-2-list">
                <view
                  v-for="tItem in sItem.list"
                  :key="tItem.label"
                  :class="[
                    'item-3',
                    currentIndex === tItem.value ? 'active' : '',
                    !item.title ? 'full' : ''
                  ]"
                  @click="switchTab(tItem)"
                >
                  <image
                    :src="currentIndex === tItem.value ? tItem.iconSel : tItem.iconDef"
                    class="icon"
                    mode="aspectFill"
                  />
                  {{ tItem.label }}
                  <image
                    v-if="tItem.filled"
                    class="filled-icon"
                    src="@/static/images/tabs_fill_suc.png"
                    mode="scaleToFill"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  }
})

const currentIndex = ref<number>(1)
const emit = defineEmits(['switchTab'])

const switchTab = (item: any) => {
  currentIndex.value = item.value
  emit('switchTab', item)
}
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  width: 200rpx;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  padding: 14rpx 9rpx 0 9rpx;
  background-color: #fff;
  border-radius: 7rpx;
  box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;

  .list {
    height: calc(100vh - 33rpx - 12rpx - 14rpx - var(--status-bar-height));
    overflow-y: scroll;

    .item-1 {
      .title-1 {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5rpx;

        .content {
          margin: 0 3rpx;
          font-size: 9rpx;
          font-weight: bold;
          color: #171718;
        }

        .line {
          width: 50rpx;
          height: 1rpx;
          background-color: #d1d1d1;
        }
      }

      .item-2 {
        margin-bottom: 5rpx;

        .title-2 {
          margin-bottom: 5rpx;
          font-size: 8rpx;
          font-weight: bold;
          color: #171718;
        }

        .item-2-list {
          display: flex;
          padding: 5rpx 4rpx 0 5rpx;
          background-color: #fafafa;
          border-radius: 2rpx;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          .item-3 {
            display: flex;
            width: 80rpx;
            height: 28rpx;
            margin-bottom: 5rpx;
            font-size: 9rpx;
            color: #171718;
            border: 1rpx solid #ebebeb;
            border-radius: 2rpx;
            align-items: center;
            justify-content: center;

            &.full {
              width: 100%;
            }

            &.active {
              color: #fff;
              background: #3e73ec;
              border: 1rpx solid #3e73ec;
            }

            .icon {
              width: 12rpx;
              height: 12rpx;
              margin-right: 2rpx;
            }

            .filled-icon {
              width: 9rpx;
              height: 9rpx;
              margin-left: 2rpx;
            }
          }
        }
      }
    }
  }
}
</style>
