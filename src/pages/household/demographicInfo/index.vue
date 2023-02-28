<template>
  <view class="demographic-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item" v-for="item in props.dataList" :key="item.id">
        <view class="list-1">
          <view class="left">
            <view class="icon">户主</view>
            <view class="name">{{ item.name }}</view>
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
                <view class="content">{{ dict[292][item.sex].text }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">民族：</view>
                <view class="content">{{ dict[278][item.nation].text }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">出生年月：</view>
                <view class="content">{{ item.birthday }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">身份证：</view>
                <view class="content">{{ item.card }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">婚姻状况：</view>
                <view class="content">{{ dict[260][item.marital].text }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">人口类型：</view>
                <view class="content">{{ dict[244][item.populationType].text }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">职业：</view>
                <view class="content">{{ dict[305][item.occupation].text }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">{{ item.address }}</view>
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
      @click="toLink('add', {})"
    />
  </view>
</template>

<script lang="ts" setup>
import { getStorage, StorageKey } from '@/utils'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => {}
  }
})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const emit = defineEmits(['deleteDemographic'])

const toLink = (type: string, data: any) => {
  if (type === 'add') {
    uni.navigateTo({
      url: '/pages/household/demographicInfo/edit?type=' + type
    })
  } else {
    const params = { ...data }
    uni.navigateTo({
      url:
        '/pages/household/demographicInfo/edit?params=' + JSON.stringify(params) + '&type=' + type
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
    right: 0;
    bottom: 0;
    width: 66rpx;
    height: 66rpx;
  }
}
</style>
