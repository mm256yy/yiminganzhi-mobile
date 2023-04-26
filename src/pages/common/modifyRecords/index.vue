<template>
  <view class="modify-record-wrapper">
    <uni-drawer ref="drawerModal" mode="right" :width="600" :mask-click="false">
      <view class="scroll-view">
        <view class="title-wrapper">
          <view class="title">修改日志</view>
          <image
            class="icon-close"
            src="@/static/images/icon_close.png"
            mode="scaleToFill"
            @click="close"
          />
        </view>
        <view class="list">
          <view class="list-col" v-if="dataList && dataList.length">
            <view class="col-line-container">
              <view class="col-line-item" v-for="(item, index) in dataList" :key="index">
                <template v-if="dataList.length === 1">
                  <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                </template>
                <template v-if="dataList.length > 1">
                  <image class="line icon" src="@/static/images/icon_ok.png" mode="scaleToFill" />
                  <view :class="['line', index === dataList.length ? 'after-line' : 'after']" />
                </template>
              </view>
            </view>
            <view class="col-text-container">
              <view class="col-text-item" v-for="(item, index) in dataList" :key="index">
                <view class="time">{{ item.createdDate }}</view>
                <view class="content-box" v-if="item.operationType === '修改'">
                  <view class="text">操作人员姓名：{{ item.createdName }}</view>
                  <view v-for="(info, idx) in JSON.parse(item.updateJson)" :key="idx" class="text">
                    {{ info.propertyName }}：{{ info.oldValue }} 修改为 {{ info.newValue }}
                  </view>
                </view>
                <view class="content-box" v-else-if="item.operationType === '新增'">
                  <view class="text">操作人员姓名：{{ item.createdName }}</view>
                  <view class="text" v-if="item.remark">
                    {{ item.operationType }}[{{ item.name }}]{{ item.type }}：{{ item.remark }}
                  </view>
                  <view class="text" v-else>
                    {{ item.operationType }}[{{ item.name }}]{{ item.type }}
                  </view>
                </view>
                <view class="content-box" v-else-if="item.operationType === '删除'">
                  <view class="text">操作人员姓名：{{ item.createdName }}</view>
                  <view class="text">
                    {{ item.operationType }}[{{ item.name }}]{{ item.type }}：{{ item.remark }}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="list-col" v-else>
            <view class="null-wrapper">
              <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
              <view class="tips">暂无信息</view>
            </view>
          </view>
        </view>
      </view>
    </uni-drawer>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getUpdateLogApi } from '@/api/index'

const props = defineProps({
  doorNo: {
    type: String,
    default: ''
  },
  // 复核类目，如 人口信息、房屋信息...
  reviewCategory: {
    type: String,
    default: ''
  }
})

const drawerModal = ref<any>(null)
const dataList = ref<any>([])
const emit = defineEmits(['close'])

const showDrawer = () => {
  drawerModal.value.open()
}

const close = () => {
  drawerModal.value.close()
  emit('close')
}

const initData = () => {
  getUpdateLogApi({
    size: 999,
    type: props.reviewCategory,
    doorNo: props.doorNo
  }).then((res: any) => {
    console.log('res:', res)
    dataList.value = res.content
  })
}

onMounted(() => {
  initData()
  showDrawer()
})
</script>

<style lang="scss" scoped>
.modify-record-wrapper {
  width: 100%;
  height: 100vh;

  .scroll-view {
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
    border-radius: 12rpx 0 0 12rpx;

    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 34rpx;
      padding: 0 14rpx;
      border-bottom: 1rpx solid #ebebeb;

      .title {
        font-size: 12rpx;
        color: #131313;
      }

      .icon-close {
        width: 9rpx;
        height: 9rpx;
      }
    }

    .list {
      display: flex;
      flex: 1;
      height: calc(100vh - 58rpx - 1rpx);
      overflow-y: scroll;

      .list-col {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: max-content;
        padding: 14rpx 28rpx 20rpx 14rpx;

        .col-line-container {
          display: inline-flex;
          flex-direction: column;
          width: 38rpx;

          .col-line-item {
            display: flex;
            flex-direction: column;
            flex: 1;
            align-items: center;
            justify-content: center;

            .line {
              width: 1rpx;
              background-color: #b7bdc6;

              &.before-line {
                width: 0;
                height: 6rpx;
                transform: translateY(-12rpx);
              }

              &.icon {
                width: 24rpx;
                height: 24rpx;
                background-color: transparent;
              }

              &.after {
                margin: 5rpx 0;
                transform: translateY(1rpx);
                flex: 1;
              }

              &.after-line {
                width: 0;
                margin: 5rpx 0;
                transform: translateY(1rpx);
                flex: 1;
              }
            }
          }
        }

        .col-text-container {
          display: flex;
          flex-direction: column;
          flex: 1;

          .col-text-item {
            .time {
              padding: 6rpx 0;
              font-size: 12rpx;
              font-weight: bold;
              color: #171718;
            }

            .content-box {
              display: flex;
              flex-direction: column;
              padding: 15rpx;
              background-color: #f6f6f6;

              .text {
                height: 13rpx;
                font-size: 9rpx;
                line-height: 13rpx;
                color: #131313;
              }
            }
          }
        }

        .null-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
          background-color: #fff;

          .icon {
            width: 152rpx;
            height: 92rpx;
          }

          .tips {
            margin-top: 17rpx;
            font-size: 9rpx;
            line-height: 1;
            color: #171718;
          }
        }
      }
    }
  }
}
</style>
