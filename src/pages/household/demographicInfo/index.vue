<template>
  <view class="demographic-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <view class="icon">户主</view>
            <view class="name">{{ formatStr(item.name) }}</view>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deleteDemographic(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">性别：</view>
                <view class="content">
                  {{ formatDict(item.sex, 292) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">民族：</view>
                <view class="content">
                  {{ formatDict(item.nation, 278) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">出生年月：</view>
                <view class="content">
                  {{ item.birthday ? dayjs(item.birthday).format('YYYY年MM月') : '-' }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">身份证：</view>
                <view class="content">{{ formatStr(item.card) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">婚姻状况：</view>
                <view class="content">
                  {{ formatDict(item.marital, 260) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">人口类型：</view>
                <view class="content">
                  {{ formatDict(item.populationType, 244) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">职业：</view>
                <view class="content">
                  {{ formatDict(item.occupation, 305) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">{{ formatStr(item.address) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <image
      class="add-btn"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add')"
    />
  </view>
</template>

<script lang="ts" setup>
import { formatDict, formatStr, routerForward } from '@/utils'
import dayjs from 'dayjs'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => {}
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const emit = defineEmits(['deleteDemographic'])

const toLink = (type: string, data?: any) => {
  const { uid } = props.dataInfo
  if (type === 'add') {
    routerForward('demographicInfoEdit', { type, uid })
  } else if (type === 'edit') {
    let params = {
      ...data,
      birthday: data.birthday ? dayjs(data.birthday).format('YYYY-MM-DD') : ''
    }
    routerForward('demographicInfoEdit', {
      params: JSON.stringify(params),
      type,
      uid
    })
  }
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deleteDemographic = (data: any) => {
  emit('deleteDemographic', data)
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
            width: 32rpx;
            height: 16rpx;
            font-size: 9rpx;
            color: #fff;
            background: #faad14;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
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

  .add-btn {
    position: fixed;
    right: 6rpx;
    bottom: 6rpx;
    width: 66rpx;
    height: 66rpx;
    border-radius: 50%;
  }
}
</style>
