<template>
  <view class="house-info-wrapper">
    <view class="list">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">{{ formatStr(item.houseNo, '幢') }}</view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteHouse(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toEdit(item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋用途：</view>
                <view class="content">
                  {{ formatDict(item.usageType, 265) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">层高：</view>
                <view class="content">
                  {{ formatStr(item.storeyHeight, '（米）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">层数：</view>
                <view class="content">
                  {{ formatStr(item.storeyNumber, '（层）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋高程：</view>
                <view class="content">
                  {{ formatStr(item.houseHeight, '（米）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">建筑面积：</view>
                <view class="content">
                  {{ formatStr(item.landArea, '（m³）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">竣工日期：</view>
                <view class="content">{{ item.completedTime }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋类别：</view>
                <view class="content">
                  {{ formatDict(item.houseType, 266) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">房屋产别：</view>
                <view class="content">
                  {{ formatDict(item.propertyType, 284) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label"></view>
                <view class="content"></view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { formatDict, formatStr } from '@/utils'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  }
})

const emit = defineEmits(['deleteHouse'])

const toEdit = (data: any) => {
  const params = { ...data }
  uni.navigateTo({
    url: '/pages/common/houseInfo/edit?params=' + JSON.stringify(params)
  })
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteHouse = (data: any) => {
  emit('deleteHouse', data)
}
</script>

<style lang="scss" scoped>
.house-info-wrapper {
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
        padding: 6rpx 0;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          padding-left: 6rpx;
          font-size: 9rpx;
          color: #171718;
          align-items: center;
          flex: 1;
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
}
</style>
