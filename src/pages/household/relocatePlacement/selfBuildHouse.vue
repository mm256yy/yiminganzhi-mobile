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
                class="icon"
                src="@/static/images/icon_finished.png"
                mode="scaleToFill"
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
  let params = {
    uid: props.dataInfo.uid,
    itemUid: data.uid,
    isComplete: data.isComplete
  }
  routerForward('selfBuildHouseFill', {
    params: JSON.stringify(params)
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
    padding: 9rpx 9rpx 9rpx 30rpx;
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
          margin-right: 8rpx;

          .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 11rpx;

            .icon {
              width: 11rpx;
              height: 11rpx;
            }

            .hollow {
              width: 6rpx;
              height: 6rpx;
              border: 0.5rpx solid #3e73ec;
              border-radius: 3rpx;
            }

            .disabled {
              width: 6rpx;
              height: 6rpx;
              background-color: #ebebeb;
              border-radius: 3rpx;
            }
          }

          .line {
            width: 1rpx;
            height: 62rpx;
            background-color: #3e73ec;

            &.in-progress {
              height: 49rpx;
            }

            &.disabled {
              height: 49rpx;
              background-color: #ebebeb;
            }

            &.none {
              height: 49rpx;
              background-color: #fff;
            }
          }
        }

        .right {
          width: 285rpx;
          padding-bottom: 8rpx;

          .content-box {
            width: 285rpx;
            padding: 9rpx 8rpx;
            border: 0.5rpx solid #ebebeb;
            border-radius: 2rpx;
            box-sizing: border-box;

            &.finish {
              background: #fafafa;
            }

            .content-1 {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .name {
                font-size: 8rpx;
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
              margin-top: 5rpx;
              font-size: 8rpx;
              color: #3e73ec;
            }

            .time {
              font-size: 8rpx;
              color: rgba(19, 19, 19, 0.4);
            }
          }
        }
      }
    }
  }
}
</style>
