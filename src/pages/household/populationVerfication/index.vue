<template>
  <view class="population-wrapper">
    <!-- 居民户实施 —— 人口核定 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <view class="icon">户主</view>
            <view class="name">杨汉中</view>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deletePopulation"
            />
          </view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">性别：</view>
                <view class="content">男</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">身份证号：</view>
                <view class="content">360429199008071235</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍类别：</view>
                <view class="content">农村家庭户</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">婚姻状况：</view>
                <view class="content">已婚</view>
              </view>
            </uni-col>
          </uni-row>
          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">人口性质：</view>
                <view class="content">册内人口</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <!-- <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加人口核定信息</view>
    </view> -->

    <image class="btn add" src="@/static/images/icon_add.png" mode="scaleToFill" />

    <!-- 删除确认弹框 -->
    <!-- <uni-popup ref="alertDialog" type="dialog">
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
import { ref } from 'vue'
// import dayjs from 'dayjs'
// import {
//   formatDict,
//   formatStr,
//   fmtOccupationStr,
//   routerForward,
//   fmtPicUrl,
//   getStorage,
//   StorageKey
// } from '@/utils'
// import { showToast } from '@/config'
// import { MainStage } from '@/types/common'

// const props = defineProps({
//   dataList: {
//     type: Array as any,
//     default: () => {}
//   },
//   dataInfo: {
//     type: Object as any,
//     default: () => {}
//   },
//   occupationOptions: {
//     type: Array as any,
//     default: () => []
//   }
// })

// const emit = defineEmits(['deletePopulation'])
// const alertDialog = ref<any>(null)
// const currentItem = ref<any>({})
// const reason = ref<string>('') // 删除原因

// const toLink = (type: string, data?: any) => {
//   const { uid } = props.dataInfo
//   if (type === 'add') {
//     routerForward('demographicInfoEdit', {
//       type,
//       uid,
//       occupationOptions: JSON.stringify(props.occupationOptions)
//     })
//   } else if (type === 'edit') {
//     let params = {
//       ...data,
//       cardPic: fmtPicUrl(data.cardPic),
//       householdPic: fmtPicUrl(data.householdPic),
//       otherPic: fmtPicUrl(data.otherPic),
//       birthday: data.birthday ? dayjs(data.birthday).format('YYYY-MM') : null
//     }
//     routerForward('demographicInfoEdit', {
//       params: JSON.stringify(params),
//       occupationOptions: JSON.stringify(props.occupationOptions),
//       type,
//       uid
//     })
//   }
// }

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deletePopulation = () => {
  // alertDialog.value?.open()
  // currentItem.value = { ...data }
}

// const dialogConfirm = (data: any) => {
//   if (!data) {
//     showToast('请输入删除原因')
//     return
//   }
//   let params = {
//     ...currentItem.value,
//     reason: data
//   }
//   emit('deletePopulation', params)
// }

// const dialogClose = () => {
//   alertDialog.value.close()
// }
</script>

<style lang="scss" scoped>
.population-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      border-radius: 5rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.08);

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

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
