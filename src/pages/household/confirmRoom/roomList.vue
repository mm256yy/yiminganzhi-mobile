<template>
  <view class="room-list-wrapper">
    <!-- 选房确认 —— 房屋列表 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            公寓房
          </view>
          <view class="right">
            <!-- <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
            /> -->
          </view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">区块：</view>
                <view class="content">曙光安置区</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">幢号：</view>
                <view class="content">1</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">室号：</view>
                <view class="content">11</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房型：</view>
                <view class="content">75㎡</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">储藏室编号：</view>
                <view class="content">1001</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            公寓房
          </view>
          <view class="right">
            <!-- <image
			        class="icon m-r-10"
			        src="@/static/images/icon_delete_mini.png"
			        mode="scaleToFill"
			      /> -->
          </view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">区块：</view>
                <view class="content">曙光安置区</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">幢号：</view>
                <view class="content">2</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">室号：</view>
                <view class="content">12</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房型：</view>
                <view class="content">95㎡</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">储藏室编号：</view>
                <view class="content">1003</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            公寓房
          </view>
          <view class="right">
            <!-- <image
			        class="icon m-r-10"
			        src="@/static/images/icon_delete_mini.png"
			        mode="scaleToFill"
			      /> -->
          </view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">区块：</view>
                <view class="content">曙光安置区</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">幢号：</view>
                <view class="content">3</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">室号：</view>
                <view class="content">13</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">房型：</view>
                <view class="content">85㎡</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">储藏室编号：</view>
                <view class="content">1003</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <!-- <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加房屋信息</view>
    </view> -->

    <!-- <image class="btn add" src="@/static/images/icon_add.png" mode="scaleToFill" /> -->

    <!-- 删除确认框 -->
    <!-- <uni-popup
      ref="alertDialog"
      type="dialog"
    >
      <uni-popup-dialog
        type="warn"
        mode="input"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        :value="reason"
        placeholder="请输入删除原因"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup> -->
  </view>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
// import dayjs from 'dayjs'
// import { formatDict, formatStr } from '@/utils'
// import { MainStage, MainType } from '@/types/common'
// import { showToast } from '@/config'

// const props = defineProps({
//   dataList: {
//     type: Array as any,
//     default: () => []
//   },
//   dataInfo: {
//     type: Object as any,
//     default: () => {}
//   }
// })

// const emit = defineEmits(['deleteHouse'])
// const alertDialog = ref<any>(null)
// const currentItem = ref<any>({})
// const reason = ref<string>('') // 删除原因

// const toLink = (type: string, data?: any) => {
//   const { dataInfo, mainType } = props
//   const { uid, doorNo, longitude, latitude } = dataInfo
//   let commonParams = { type, uid, doorNo, longitude, latitude, mainType }
//   if (type === 'edit') {
//     let params = {
//       ...data,
//       completedTime: data.completedTime
//         ? dayjs(data.completedTime).format('YYYY-MM')
//         : data.completedTime,
//       housePic: fmtPicUrl(data.housePic),
//       landPic: fmtPicUrl(data.landPic),
//       otherPic: fmtPicUrl(data.otherPic),
//       homePic: fmtPicUrl(data.homePic)
//     }
//     routerForward('houseInfoEdit', {
//       params: JSON.stringify(params),
//       commonParams: JSON.stringify(commonParams)
//     })
//   } else if (type === 'add') {
//     routerForward('houseInfoEdit', {
//       commonParams: JSON.stringify(commonParams)
//     })
//   }
// }

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
// const deleteHouse = (data: any) => {
//   alertDialog.value?.open()
//   currentItem.value = { ...data }
// }

// const dialogConfirm = (data: any) => {
//   if (!data) {
//     showToast('请输入删除原因')
//     return
//   }
//   let params = {
//     ...currentItem.value,
//     reason: data
//   }
//   emit('deleteHouse', params)
// }

// const dialogClose = () => {
//   alertDialog.value.close()
// }
</script>

<style lang="scss" scoped>
.room-list-wrapper {
  width: 100%;

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
  }
}
</style>
