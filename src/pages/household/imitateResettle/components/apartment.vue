<template>
  <view class="house-item">
    <view class="item">
      <view class="label">安置房类型：</view>
      <view class="value-box"> 公寓房 </view>
    </view>

    <view class="item">
      <view class="label">安置人数：</view>
      <view class="value-box" />
    </view>

    <view class="item">
      <view class="label">选择地块：</view>
      <view class="value-box">
        <view class="flex-row">
          <view
            class="area-item"
            :class="{ active: resettleDefault.apartmentResettleRegion === item.id }"
            @click="apartmentPlaceChange(item.id)"
            v-for="item in resettleArea"
            :key="item.id"
          >
            <uni-icons
              class="icon"
              type="map"
              :color="resettleDefault.apartmentResettleRegion === item.id ? '#3E73EC' : '#131313'"
              size="16"
            />
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="item">
      <view class="label flex-start">可选公寓面积：</view>
      <view class="value-box">
        <view class="check-item-box">
          <view
            class="area-check-item"
            :class="{ active: item.isSelected }"
            v-for="item in apartmentAreaSizeArray"
            :key="item.id"
          >
            <view class="item-lt">
              <view class="area-num">{{ item.name }}{{ item.unit }}</view>
              <text> x 数量</text>
              <input class="ipt" type="number" v-model.number="item.num" />
              <text>套</text>
            </view>
            <view class="item-rt" @click="apartmentAreaChange(item)" />
          </view>
        </view>
      </view>
    </view>

    <view class="item">
      <view class="label"> 推荐方案： </view>
      <view class="value-box">
        <div class="plan-table-wrap">
          <table>
            <!-- 第一行 -->
            <tr class="head-tr">
              <td colspan="2" class="column-w1 bold">搬迁安置</td>

              <td class="column-w3" v-for="(item, index) in tableData" :key="item.id">
                <div class="plan-tit" :class="{ active: item.isSelected }">
                  方案{{ index + 1 }}
                </div>
              </td>
            </tr>

            <tr>
              <td rowspan="4" class="column-w1 bold">套数</td>
              <td class="column-w2">65</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                {{ item.typeOneNum }}
              </td>
            </tr>

            <tr>
              <td class="column-w2">85</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                {{ item.typeTwoNum }}
              </td>
            </tr>

            <tr>
              <td class="column-w2">110</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                {{ item.typeThreeNum }}
              </td>
            </tr>

            <tr>
              <td class="column-w2">140</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                {{ item.typeFourNum }}
              </td>
            </tr>

            <tr>
              <td class="column-w1 bold" colspan="2">购房总面积</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                {{ item.areaTotal }}
              </td>
            </tr>

            <tr>
              <td class="column-w1" rowspan="3">金额</td>
              <td class="column-w2">购房金额估算</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                <div class="flex-center-center pointer" @click="viewBuyHouseClick(item.id)">
                  {{ item.preorderAmount }}
                  <!-- <Icon icon="ant-design:question-circle-filled" color="#DCDFE6" /> -->
                </div>
              </td>
            </tr>

            <tr>
              <td class="column-w2">补偿补助估算</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                <div class="flex-center-center pointer" @click="viewSubsidyClick(item.id)">
                  {{ item.compensationAmount }}
                  <!-- <Icon icon="ant-design:question-circle-filled" color="#DCDFE6" /> -->
                </div>
              </td>
            </tr>

            <tr>
              <td class="column-w2">差额</td>
              <td class="column-w3" v-for="item in tableData" :key="item.id">
                {{ item.differenceAmount }}
              </td>
            </tr>

            <tr>
              <td class="column-w1 bold" colspan="2">确定方案</td>
              <td class="column-w3" v-for="item in tableData" :key="item.type">
                <div
                  class="select-btn"
                  :class="{ active: item.isSelected }"
                  @click="selectPlan(item.type)"
                >
                  <div class="icon" v-if="!item.isSelected"></div>
                  <!-- <Icon v-else icon="ant-design:check-circle-filled" size="16" color="#3E73EC" /> -->
                  <div class="txt">选择该方案</div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </view>
    </view>

    <view class="item">
      <view class="label">已选户型：</view>
      <view class="value-box flex-row">
        <template v-for="item in apartmentAreaSizeArray" :key="item.id">
          <template v-if="item.isSelected">
            <text class="txt">{{ item.name }}{{ item.unit }}户型 </text>
            <text class="txt red">{{ item.num }}</text>
            <text class="txt">套，</text>
          </template>
        </template>
        <text>已选总面积 </text>
        <text class="txt red">{{ 0 }}m²</text>
      </view>
    </view>

    <view class="item">
      <view class="label">建房补助费：</view>
      <view class="value-box">
        <text class="txt red-bold">{{ resettleDefault.buildHouseSubsidyPrice }}</text>
        <text class="txt"> 元</text>
      </view>
    </view>

    <view class="item">
      <view class="label flex-start">购房总金额：</view>
      <view class="value-box">
        <view>
          <text class="txt red-bold">{{ resettleDefault.apartmentBuyPrice }}</text>
          <text class="txt"> 元</text>
        </view>
        <view class="desc">
          (实际选购面积在安排面积内以综合成本价购买，超出安排面积的部分以市场优惠价购买)
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { apartmentAreaSize, resettleArea } from '../config'
import { deepClone } from '@/utils'

const resettleDefault = ref()
// 公寓面积选择
const apartmentAreaSizeArray = ref(deepClone(apartmentAreaSize))
const tableData = ref<any[]>([])

// 公寓地块
const apartmentPlaceChange = (id: string) => {
  resettleDefault.value.apartmentResettleRegion = id
}

// 公寓面积选择
const apartmentAreaChange = (data: any) => {
  data.isSelected = !data.isSelected
}

const viewBuyHouseClick = (id: string) => {}
const selectPlan = (type: any) => {
  console.log(type)
}

const viewSubsidyClick = (id: string) => {}
</script>

<style lang="scss" scoped>
.house-item {
  display: flex;
  width: 100%;
  height: auto;
  padding: 9rpx 12rpx;
  margin-top: 9rpx;
  background: linear-gradient(
    180deg,
    rgba(242, 246, 255, 0.62) 0%,
    rgba(242, 246, 255, 0.62) 16%,
    rgba(242, 246, 255, 0) 100%
  );
  border: 1rpx solid #ebebeb;
  border-radius: 5rpx;
  flex-direction: column;

  .item {
    display: flex;
    height: auto;
    min-height: 23rpx;
    margin-bottom: 12rpx;
    align-items: center;

    .label {
      width: 84rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;

      &.flex-start {
        align-self: flex-start;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.value-box {
  flex: 1;
  font-size: 9rpx;
  color: #171718;

  .red {
    color: #e43030;
  }

  .red-bold {
    font-size: 12rpx;
    font-weight: bold;
    color: #e43030;
  }

  .flex-row {
    display: flex;
    align-items: center;
  }

  .ipt-wrap {
    display: flex;
    align-items: center;
    width: 60rpx;
    height: 23rpx;
    margin-right: 6rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 2rpx;

    .ipt {
      flex: 1;
      height: 23rpx;
      padding: 0 4rpx;
    }

    .unit {
      display: flex;
      height: 100%;
      padding: 0 6rpx;
      font-size: 9rpx;
      color: #171718;
      background: #f5f7fa;
      border-left: 1rpx solid #ebebeb;
      align-items: center;
      justify-content: center;
    }

    &.middle {
      width: 150rpx;
    }
  }

  .area-item {
    display: flex;
    width: 107rpx;
    height: 33rpx;
    margin-right: 14rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
    background: #fff;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    align-items: center;
    justify-content: center;

    .icon {
      margin-right: 6rpx;
    }

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #3e73ec;
      background: #f2f6ff;
      border: 1px solid #3e73ec;
    }
  }

  .check-item {
    display: inline-flex;
    height: 23rpx;
    padding: 0 14rpx;
    margin-right: 14rpx;
    font-size: 9rpx;
    color: #171718;
    background: #ffffff;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    align-items: center;
    justify-content: center;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #3e73ec;
      background: #f2f6ff;
      border: 1rpx solid #3e73ec;
    }
  }

  .full-ipt {
    height: 23rpx;
    padding: 0 4rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 2rpx;
  }

  .desc {
    font-size: 8rpx;
    color: #171718;
  }

  .check-item-box {
    display: flex;
    flex-direction: column;

    .area-check-item {
      display: flex;
      height: 33rpx;
      padding: 0 9rpx;
      margin-bottom: 7rpx;
      border: 1rpx solid #ebebeb;
      border-radius: 2rpx;
      align-items: center;
      justify-content: space-between;

      .item-lt {
        display: flex;
        align-items: center;

        .area-num {
          width: 30rpx;
        }

        .ipt {
          width: 48rpx;
          height: 20rpx;
          padding: 0 4rpx;
          margin: 0 5rpx;
          background: #ffffff;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;
        }
      }

      .item-rt {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 40rpx;
        height: 100%;

        .check-box {
          display: flex;
          width: 12rpx;
          height: 12rpx;
          background: #ffffff;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;
          align-items: center;
          justify-content: center;
        }
      }

      &.active {
        .check-box {
          background: #3e73ec;
          border: 1rpx solid #2f6eff;
        }
      }
    }
  }
}

.plan-table-wrap {
  table {
    /* 用于表格属性, 表示表格的两边框合并为一条 */
    border-collapse: collapse;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    /* 设置边缘间距0 */
    border-spacing: 0;
  }

  tr td {
    height: 40px;
    font-size: 14px;
    color: #171718;
    text-align: center;
    border-top: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
  }

  .column-w1 {
    width: 153px;
    background: #f6f6f6;
  }

  .column-w2 {
    width: 160px;
  }

  .column-w3 {
    width: 273px;
  }

  .bold {
    font-weight: 500;
  }

  .blue {
    color: #3e73ec;
  }

  .plan-tit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #3e73ec;
    background: #f2f6ff;

    &.active {
      color: #fff;
      background: #3e73ec;
    }
  }

  .select-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 16px;
      height: 16px;
      background: #ffffff;
      border: 1px solid #dcdde6;
      border-radius: 50%;
    }

    .txt {
      margin-left: 10px;
      font-size: 14px;
      color: #171718;
    }
  }
}
</style>
