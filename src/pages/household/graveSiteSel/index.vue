<template>
  <view class="house-info-wrapper">
    <!-- 择址确认 —— 坟墓择址 -->
    <view class="row" v-if="props.dataList && props.dataList.length > 0">
      <view class="left" />
      <view class="right">
        <view class="btn blue" @click="onArchives">
          <image class="icon" src="@/static/images/icon_upload_white.png" mode="scaleToFill" />
          档案上传
        </view>
        <!-- <view class="btn blue-btn">
          <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
          <text class="txt">问题反馈</text>
        </view> -->
      </view>
    </view>

    <view class="list" v-if="props.dataList && props.dataList.length > 0">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            与登记人关系：{{ formatDict(item.relation, 307) }}
          </view>
          <view class="right" />
        </view>
        <view class="list-2" @click="toLink(item.uid)">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">材料：</view>
                <view class="content">
                  {{ formatDict(item.materials, 295) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">穴位：</view>
                <view class="content">{{ formatDict(item.graveType, 345) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">数量：</view>
                <view class="content">
                  {{ formatStr(item.number, '（座）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">处理方式：</view>
                <view class="content">{{ formatDict(item.handleWay, 238) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">安置公墓/择址地址：</view>
                <view class="content">
                  <!-- handleWay 处理方式，1 择址地址 2 安置公墓 -->

                  {{
                    item.handleWay === '1'
                      ? item.settingAddress
                      : formatDict(item.settingGrave, 377)
                  }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">编号：</view>
                <view class="content">
                  {{ formatStr(item.graveNo) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">
                  {{ formatStr(item.remark) }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">该户无需办理坟墓择址</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { formatStr, routerForward, formatDict } from '@/utils'

interface PropsType {
  dataList: any[]
  baseInfo: any
}

const props = defineProps<PropsType>()

// 档案上传
const onArchives = () => {
  routerForward('archives', {
    type: 5,
    uid: props.baseInfo.uid
  })
}

const toLink = (itemUid?: any) => {
  const { uid, doorNo } = props.baseInfo
  let params = { uid, doorNo, itemUid }
  routerForward('graveSiteSelEdit', {
    params: JSON.stringify(params)
  })
}
</script>

<style lang="scss" scoped>
.house-info-wrapper {
  width: 100%;
  overflow-y: scroll;

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

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6rpx 0;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          font-size: 9rpx;
          color: #171718;
          align-items: center;
          flex: 1;

          .icon {
            width: 10rpx;
            height: 10rpx;
            margin-left: 10rpx;
          }
        }

        .right {
          display: flex;
          flex-direction: row;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 86rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
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
