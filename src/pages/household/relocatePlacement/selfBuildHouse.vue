<template>
  <view class="self-build-house">
    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      建房进度
    </view>

    <view class="progress-wrapper">
      <view class="progress-list">
        <view class="progress-item" v-for="item in dataList" :key="item.name">
          <view class="left">
            <view class="icon-box">
              <view v-if="item.isComplete === '0'" class="disabled" />
              <image
                v-if="item.isComplete === '1'"
                src="@/assets/imgs/icon_finish.png"
                width="18"
                height="18"
              />
              <view v-if="item.isComplete === '2'" class="hollow" />
            </view>
            <view v-if="item.isComplete === '0' && item.type !== '9'" class="line disabled" />
            <view v-if="item.isComplete === '1' && item.type !== '9'" class="line" />
            <view v-if="item.isComplete === '2' && item.type !== '9'" class="line in-progress" />
            <view v-if="item.type === '9'" class="line none" />
          </view>
          <view class="right">
            <view class="content-box">
              <view class="content-1">
                <view class="name">{{ item.name }}</view>
                <view class="mini-btn" v-if="item.type === '1'" @click="onPrint(item)"> 打印 </view>
                <view
                  v-if="item.type !== '1' && item.isComplete !== '1'"
                  :class="['mini-btn', item.isComplete === '0' ? 'disabled' : '']"
                  @click="onFill(item)"
                >
                  填写
                </view>
                <view
                  v-if="item.type !== '1' && item.isComplete === '1'"
                  class="mini-btn"
                  @click="onFill(item)"
                >
                  查看
                </view>
              </view>
              <view class="status" v-if="item.isComplete === '1'">已完成</view>
              <view class="time" v-if="item.isComplete === '1'">
                {{ dayjs(item.completeDate).format('YYYY-MM-DD') }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { routerForward } from '@/utils'

interface PropsType {
  dataList: any[]
  dataInfo: any
}

const props = defineProps<PropsType>()

/**
 * 打印
 * @params{Object} data 当前行信息
 */
const onPrint = (data: any) => {}

/**
 * 填写
 * @params{Object} data 当前行信息
 */
const onFill = (data: any) => {
  routerForward('selfBuildHouseFill', {
    uid: props.dataInfo.uid,
    itemUid: data.uid
  })
}
</script>

<style lang="scss" scoped>
.self-build-house {
  width: 100%;

  .title {
    display: flex;
    height: 28rpx;
    margin-bottom: 9rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    border-bottom: 1rpx solid #f0f0f0;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-left: 6rpx;
    }
  }

  .progress-wrapper {
    width: 100%;
    height: 100%;
    padding: 16rpx 16rpx 16rpx 50rpx;
    box-sizing: border-box;

    .progress-list {
      display: flex;
      flex-direction: column;

      .progress-item {
        display: flex;

        .left {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 16rpx;

          .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20rpx;

            .hollow {
              width: 18rpx;
              height: 18rpx;
              border: 1rpx solid #3e73ec;
              border-radius: 9rpx;
            }

            .disabled {
              width: 18rpx;
              height: 18rpx;
              background-color: #ebebeb;
              border-radius: 9rpx;
            }
          }

          .line {
            width: 2rpx;
            height: 124rpx;
            background-color: #3e73ec;

            &.in-progress {
              height: 74rpx;
            }

            &.disabled {
              height: 74rpx;
              background-color: #ebebeb;
            }

            &.none {
              height: 74rpx;
              background-color: #fff;
            }
          }
        }

        .right {
          width: 570rpx;
          padding-bottom: 16rpx;

          .content-box {
            width: 570rpx;
            padding: 21rpx 16rpx;
            border: 1rpx solid #ebebeb;
            border-radius: 4rpx;
            box-sizing: border-box;

            &.finish {
              background: #fafafa;
            }

            .content-1 {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .name {
                font-size: 16rpx;
                color: #171718;
              }

              .mini-btn {
                display: flex;
                width: 35rpx;
                height: 19rpx;
                font-size: 9rpx;
                color: #3e73ec;
                border: 0.5rpx solid #3e73ec;
                border-radius: 2rpx;
                align-items: center;
                justify-content: center;

                &.disabled {
                  color: #999;
                  border: 0.5rpx solid #999;
                }
              }
            }

            .status {
              margin-top: 9rpx;
              font-size: 14rpx;
              color: #3e73ec;
            }

            .time {
              font-size: 14rpx;
              color: rgba(19, 19, 19, 0.4);
            }
          }
        }
      }
    }
  }
}
</style>
