<template>
  <view class="household-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="icon">户主</view>
          <view class="name">
            {{ formatStr(props.dataInfo.name) }}
          </view>
        </view>
        <view class="list-2" @click="toLink('edit')">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.doorNo) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">自然村/村民小组：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.virutalVillageCodeText) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">是否财产户：</view>
                <view class="content">
                  {{ dictOption(yesAndNoEnums, props.dataInfo.hasPropertyAccount) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.phone) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.address) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ dictOption(locationTypes, props.dataInfo.locationType) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">淹没范围：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.inundationRange, 346) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">高程：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.altitude, 'm') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">经纬度：</view>
                <view class="content">
                  {{ props.dataInfo.longitude }} {{ props.dataInfo.latitude }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
    <!-- <image
		  class="btn record"
		  src="@/static/images/icon_record.png"
		  mode="scaleToFill"
		  @click="showModifyRecord"
		/> -->
    <image
      class="btn edit"
      src="@/static/images/icon_edit.png"
      mode="scaleToFill"
      @click="toLink('edit')"
    />
    <!-- 修改记录 -->
    <!-- <modify-records v-if="showRecord" @close="closeModifyRecords" /> -->
  </view>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { formatStr, formatDict, dictOption, splitStr, routerForward } from '@/utils'
import { locationTypes, yesAndNoEnums } from '@/config/common'
// import modifyRecords from '../../common/modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

// const showRecord = ref<boolean>(false)

// 展示修改记录
// const showModifyRecord = () => {
// 	showRecord.value = true
// }

// 关闭修改记录弹窗
// const closeModifyRecords = () => {
// 	showRecord.value = false
// }

const toLink = (type: string) => {
  const params = {
    id: props.dataInfo.id,
    uid: props.dataInfo.uid,
    name: props.dataInfo.name, // 姓名
    areaCode: props.dataInfo.areaCode, // 区/县
    townCode: props.dataInfo.townCode, // 镇/街道
    villageCode: props.dataInfo.villageCode, // 行政村
    virutalVillageCode: props.dataInfo.virutalVillageCode, // 自然村/村民小组
    phone: props.dataInfo.phone, // 联系方式
    locationType: props.dataInfo.locationType ? props.dataInfo.locationType : null, // 所在位置
    householdNumber: props.dataInfo.householdNumber, // 户籍册编号
    suffixNo: splitStr(props.dataInfo.doorNo, 12, 16), // 户号后四位
    doorNo: props.dataInfo.doorNo, // 户号
    hasPropertyAccount: props.dataInfo.hasPropertyAccount, // 是否财产户
    address: props.dataInfo.address, // 户籍所在地
    inundationRange: props.dataInfo.inundationRange, // 淹没范围
    altitude: props.dataInfo.altitude, // 高程
    longitude: props.dataInfo.longitude, // 经度
    latitude: props.dataInfo.latitude // 纬度
  }

  routerForward('householdInfoEdit', {
    params: JSON.stringify(params),
    type
  })
}
</script>

<style lang="scss" scoped>
.household-info-wrapper {
  width: 100%;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

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

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 80rpx;
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

  .btn {
    position: fixed;

    width: 66rpx;
    height: 66rpx;
    border-radius: 50%;

    &.edit {
      right: 6rpx;
      bottom: 6rpx;
    }

    &.record {
      right: 6rpx;
      bottom: 72rpx;
    }
  }
}
</style>
