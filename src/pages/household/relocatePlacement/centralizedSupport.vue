<template>
  <view class="demographic-wrapper">
    <!-- 搬迁安置 —— 集中供养 -->
    <view class="main" v-if="getRelocationResettlement">
      <view class="list" v-if="props.dataList && props.dataList.length > 0">
        <view class="list-item" v-for="item in props.dataList" :key="item.id">
          <view class="list-1">
            <view class="left">
              <view class="icon">{{ formatDict(item.relation, 307) }}</view>
              <view class="name">{{ formatStr(item.name) }}</view>
            </view>
            <view class="right">
              <view
                v-if="item.relocateStatus === '1'"
                class="mini-btn"
                @click="onHandle('view', item.uid)"
                >查看</view
              >
              <view v-else class="mini-btn" @click="onHandle('handle', item.uid)">办理</view>
            </view>
          </view>
          <view class="list-2">
            <uni-row>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">身份证号：</view>
                  <view class="content">
                    {{ formatStr(item.card) }}
                  </view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">性别：</view>
                  <view class="content">
                    {{ formatDict(item.sex, 292) }}
                  </view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">户籍类别：</view>
                  <view class="content">{{ formatDict(item.censusType, 249) }}</view>
                </view>
              </uni-col>
              <uni-col :span="12">
                <view class="col">
                  <view class="label">人口性质：</view>
                  <view class="content">
                    {{ formatDict(item.populationNature, 263) }}
                  </view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <!-- <uni-col :span="12">
                <view class="col">
                  <view class="label">安置方式：</view>
                  <view class="content">{{ formatDict(item.settingWay, 321) }}</view>
                </view>
              </uni-col> -->
              <uni-col :span="12">
                <view class="col">
                  <view class="label">办理状态：</view>
                  <view class="content">
                    {{ item.relocateStatus === '1' ? '已办理' : '未办理' }}
                  </view>
                </view>
              </uni-col>
            </uni-row>

            <uni-row>
              <uni-col :span="24">
                <view class="col">
                  <view class="label">完成时间：</view>
                  <view class="content">
                    {{
                      item.relocateCompleteTime
                        ? dayjs(item.relocateCompleteTime).format('YYYY-MM-DD')
                        : '-'
                    }}
                  </view>
                </view>
              </uni-col>
            </uni-row>
          </view>
        </view>
      </view>

      <view class="null-wrapper" v-else>
        <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
        <view class="tips">暂无集中供养信息</view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">该户未选择集中供养</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { formatDict, formatStr, routerForward } from '@/utils'
import { HouseAreaType } from '@/types/common'

interface PropsType {
  dataList: any[]
  dataInfo: any
}

const props = defineProps<PropsType>()

// 搬迁安置方式
const getRelocationResettlement = computed(() => {
  const { houseAreaType } = props.dataInfo
  return houseAreaType === HouseAreaType.concentrate
})

/**
 * 办理/查看
 * @params {Object} data：handle: 办理 , view: 查看
 */
const onHandle = (status: string, itemUid: string) => {
  const { uid } = props.dataInfo
  routerForward('attendto', {
    uid,
    type: 7,
    status,
    itemUid
  })
}
</script>

<style lang="scss" scoped>
.demographic-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          align-items: center;

          .icon {
            display: flex;
            width: auto;
            height: 16rpx;
            padding: 0 5rpx;
            font-size: 9rpx;
            color: #fff;
            background: #faad14;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
          }

          .name {
            margin-left: 5rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;

          .mini-btn {
            display: flex;
            width: 30rpx;
            height: 18rpx;
            font-size: 9rpx;
            line-height: 1;
            color: #3e73ec;
            border: 1rpx solid rgba(62, 115, 236, 0.5);
            border-radius: 3rpx;
            align-items: center;
            justify-content: center;
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
            width: 56rpx;
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

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.add {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
