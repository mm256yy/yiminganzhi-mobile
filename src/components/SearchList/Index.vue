<template>
  <view class="search-wrapper">
    <view class="nav-wrapper">
      <view class="status-bar" />
      <view class="content">
        <image class="icon-back" src="@/static/images/back.png" mode="scaleToFill" @click="close" />
        <view class="title">选择列表</view>
        <label class="right" @click="confirmSelect">确定</label>
      </view>
    </view>
    <view class="search-input">
      <input class="input-txt" v-model="name" type="text" placeholder="请输入" @confirm="confirm" />
    </view>
    <view class="search-list" v-if="dataList && dataList.length > 0">
      <view class="search-item" v-for="(item, index) in dataList" :key="index">
        <view class="content" @click="select(item, index)">
          <view class="left">
            <view class="label">{{ item.label }}</view>
            <view class="value">{{ item.value }}</view>
          </view>
          <view class="right">
            <image
              v-if="item.checked"
              class="icon"
              src="@/static/images/icon_selected.png"
              mode="scaleToFill"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">暂无数据，请先输入搜索内容</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { getLandlordListBySearchApi } from '@/service'

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  villageCode: {
    type: String,
    default: ''
  }
})

const dataList = ref<any>([])
const name = ref<string>('')
const emit = defineEmits(['confirmSelect', 'close'])
const selectedData = ref<any>({})

/**
 * 搜索居民户
 * @param{object} name 居民姓名
 * @param{Object} type 居民户类型
 */
const getLandlordListBySearch = (name: string, type: any) => {
  let params = {
    name,
    type,
    villageCode: props.villageCode,
    page: 1,
    pageSize: 50
  }
  getLandlordListBySearchApi(params).then((res) => {
    if (res && res.length > 0) {
      let arr: any = []
      res.map((item: any) => {
        arr.push({
          id: item.id,
          label: item.name,
          value: item.doorNo,
          checked: item.checked
        })
      })
      dataList.value = [...arr]
    }
  })
}

/**
 * 确认搜索
 * @param{Object} e
 */
const confirm = (e: any) => {
  name.value = e.detail.value
  getLandlordListBySearch(name.value, props.type)
}

// 选择
const select = (data: any, index: any) => {
  selectedData.value = { ...data }
  dataList.value.map((item: any, idx: any) => {
    if (index === idx) {
      dataList.value[index].checked = true
    } else {
      dataList.value[idx].checked = false
    }
  })
}

// 回退，关闭当前组件
const close = () => {
  emit('close')
}

// 确认选择
const confirmSelect = () => {
  emit('confirmSelect', selectedData.value)
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: url('../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .nav-wrapper {
    background: transparent;

    .status-bar {
      height: var(--status-bar-height);
    }

    .content {
      display: flex;
      height: 33rpx;
      padding: 0 9rpx;

      /* #ifdef H5 */
      cursor: pointer;
      box-sizing: border-box;
      flex-direction: row;
      align-items: center;
      /* #endif */

      .icon-back {
        width: 14rpx;
        height: 14rpx;
      }

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15rpx;
        color: #fff;
        flex: 1 auto;
      }

      .right {
        font-size: 10rpx;
        color: #fff;
      }
    }
  }

  .search-input {
    width: calc(100% - 30rpx);
    height: 30rpx;
    padding: 0 7rpx;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 5rpx;
    box-sizing: border-box;

    ::v-deep.uni-input-input,
    ::v-deep.uni-input-placeholder {
      font-size: 9rpx !important;
    }

    .input-txt {
      height: 30rpx;
      font-size: 9rpx;
      line-height: 30rpx;
      color: #171718;
    }
  }

  .search-list {
    width: 100%;
    height: calc(100vh - 30rpx - 10rpx - 5rpx - var(--status-bar-height));
    padding: 0 15rpx;
    margin-top: 5rpx;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;

    .search-item {
      width: 100%;
      height: 40rpx;
      border-bottom: 1rpx solid #e7edfd;

      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40rpx;

        .left {
          display: flex;
          align-items: center;
          width: calc(100% - 40rpx);
          height: 40rpx;

          .label,
          .value {
            font-size: 10rpx;
            color: #171718;
          }

          .value {
            margin-left: 10rpx;
          }
        }

        .right {
          width: 40rpx;
          height: 40rpx;
          text-align: right;

          .icon {
            width: 20rpx;
            height: 20rpx;
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
    height: calc(100vh - 30rpx - 10rpx - var(--status-bar-height));

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

  .submit-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
