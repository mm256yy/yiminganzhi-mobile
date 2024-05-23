<template>
  <view class="self-build-house">
    <view class="main" v-if="getRelocationResettlement">
      <view class="row">
        <view class="left" />
        <view class="right">
          <!-- <view class="btn green">
            <image class="icon" src="@/static/images/icon_print_white.png" mode="scaleToFill" />
            打印
          </view> -->
          <view class="btn blue" @click="onArchives">
            <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
            进度上报
          </view>
          <!-- <view class="btn blue-btn">
						<image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
						<text class="txt">购房测算</text>
					</view> -->
          <!-- <view class="btn blue-btn">
						<image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
						<text class="txt">问题反馈</text>
					</view> -->
        </view>
      </view>
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
                  <view class="mini-btn" v-if="item.type === '1'" @click="onPrint(item)">
                    打印
                  </view>
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

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">该户未选择宅基地安置</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { routerForward } from '@/utils'
import { LandlordType } from '@/types/sync'
import { HouseAreaType } from '@/types/common'
import { updateImpLandlordBuildSelfApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'

interface PropsType {
  dataList: any[]
  dataInfo: LandlordType
  pdfdata: any[]
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])

// 搬迁安置方式
const getRelocationResettlement = computed(() => {
  const { houseAreaType } = props.dataInfo
  return houseAreaType === HouseAreaType.homestead
})

/**
 * 打印
 * @params{Object} data 当前行信息
 */
const onPrint = (data: any) => {
  const params = {
    ...data,
    doorNo: props.dataInfo.doorNo,
    isComplete: '1',
    completeDate: dayjs(new Date()),
    completePic: '[]'
  }
  updateImpLandlordBuildSelfApi(props.dataInfo.uid, data.uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateData')
        handleClick()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

/**
 * 填写
 * @params{Object} data 当前行信息
 */
const onFill = (data: any) => {
  if (data.isComplete !== '0') {
    const { uid, doorNo } = props.dataInfo
    let params = {
      uid,
      doorNo,
      itemUid: data.uid,
      isComplete: data.isComplete
    }
    routerForward('selfBuildHouseFill', {
      params: JSON.stringify(params)
    })
  }
}

// 档案上传
const onArchives = () => {
  let params = {
    uid: props.dataInfo.uid,
    type: 14
  }
  routerForward('archives', params)
}
const handleClick = () => {
  routerForward('pdfSerch', {
    data: JSON.stringify(props.pdfdata),
    dataInfo: JSON.stringify(props.dataInfo),
    id: 5,
    show: true
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

  .row {
    display: flex;
    align-items: center;
    margin: 9rpx 0;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;

      .btn {
        display: flex;
        height: 23rpx;
        padding: 0 9rpx;
        margin-right: 6rpx;
        font-size: 9rpx;
        color: #fff;
        border-radius: 23rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;

        &.green {
          background-color: #30a952;
        }

        &.blue {
          background-color: #3e73ec;
        }

        .icon {
          width: 9rpx;
          height: 9rpx;
          margin-right: 2rpx;
        }
      }
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
</style>
