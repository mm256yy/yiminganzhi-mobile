<template>
  <view class="migrate-card-wrapper">
    <!-- 居民户实施 —— 移民建卡 -->
    <view class="main">
      <view class="title-wrap">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        家庭基本情况
      </view>
      <view class="row">
        <uni-table border stripe emptyText="暂无更多数据">
          <!-- 表头行 -->
          <uni-tr>
            <uni-th align="left" width="40rpx" class="uTitle">序号</uni-th>
            <uni-th align="left" width="60rpx" class="uTitle">姓名</uni-th>
            <uni-th align="left" width="70rpx" class="uTitle">与户主关系</uni-th>
            <uni-th align="left" width="50rpx" class="uTitle">性别</uni-th>
            <uni-th align="left" width="140rpx" class="uTitle">身份证号</uni-th>
            <uni-th align="left" width="80rpx" class="uTitle">人口性质</uni-th>
            <uni-th align="left" width="80rpx" class="uTitle">户籍册类别</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr v-for="(item, index) in props.dataList" :key="index">
            <uni-td align="left" class="uTd">{{ index + 1 }}</uni-td>
            <uni-td align="left" class="uTd">{{ item.name }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.relation, 307) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.sex, 292) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatStr(item.card) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.populationType, 244) }}</uni-td>
            <uni-td align="left" class="uTd">{{ formatDict(item.censusType, 249) }}</uni-td>
          </uni-tr>
        </uni-table>
      </view>
      <view class="title-wrap">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        费用补偿情况
      </view>
      <view class="expenses-table">
        <view class="table-header">
          <view class="td1" />
          <view class="td2">补偿指标名称</view>
          <view class="td3">代码</view>
          <view class="td3">补偿金额</view>
        </view>
        <!--补偿费-->
        <view class="flex-display">
          <view class="line-span span1"> 补偿费 </view>
          <view>
            <view class="expenses-content">
              <view class="td2">房屋主体补偿费用</view>
              <view class="td3">01</view>
              <view class="td3">8,053.32</view>
            </view>
            <view class="expenses-content">
              <view class="td2">房屋装修补偿费</view>
              <view class="td3">02</view>
              <view class="td3">7,302.19</view>
            </view>
            <view class="expenses-content">
              <view class="td2">附属物补偿费</view>
              <view class="td3">03</view>
              <view class="td3">6,182.22</view>
            </view>
            <view class="expenses-content">
              <view class="td2">零星果木补偿费</view>
              <view class="td3">04</view>
              <view class="td3">4,452.32</view>
            </view>
            <view class="expenses-content">
              <view class="td2">地上青苗及附着物补偿费</view>
              <view class="td3">05</view>
              <view class="td3">5,514.77</view>
            </view>
            <view class="expenses-content">
              <view class="td2">土地补偿费(到户)</view>
              <view class="td3">06</view>
              <view class="td3">7,741.85</view>
            </view>
            <view class="expenses-content">
              <view class="td2">坟墓迁移补偿费</view>
              <view class="td3">07</view>
              <view class="td3">9,222.02</view>
            </view>
            <view class="expenses-content">
              <view class="td2">农副业设施设备补偿费</view>
              <view class="td3">08</view>
              <view class="td3">7,889.37</view>
            </view>
            <view class="expenses-content">
              <view class="td2">其他补偿费</view>
              <view class="td3">09</view>
              <view class="td3">9,217.97</view>
            </view>
            <view class="expense-bottom">
              <view class="td2">补偿费小计</view>
              <view class="td3">10</view>
              <view class="td3">3,809.43</view>
            </view>
          </view>
        </view>
        <!--补助费-->
        <view class="flex-display">
          <view class="line-span span2">补助费</view>
          <view>
            <view class="expenses-content">
              <view class="td2">建房补助费</view>
              <view class="td3">11</view>
              <view class="td3">7,379.99</view>
            </view>
            <view class="expenses-content">
              <view class="td2">搬迁补助费</view>
              <view class="td3">12</view>
              <view class="td3">8,441.25</view>
            </view>
            <view class="expenses-content">
              <view class="td2">过渡期补助费</view>
              <view class="td3">13</view>
              <view class="td3">2,550.56</view>
            </view>
            <view class="expenses-content">
              <view class="td2">临时安置补助费 </view>
              <view class="td3">14</view>
              <view class="td3">6,181.67</view>
            </view>
            <view class="expenses-content">
              <view class="td2">分散安置移民基础设施费</view>
              <view class="td3">15</view>
              <view class="td3">2,595.03</view>
            </view>
            <view class="expenses-content">
              <view class="td2">其他补助费</view>
              <view class="td3">16</view>
              <view class="td3">8,000.70</view>
            </view>
            <view class="expense-bottom">
              <view class="td2">补助费小计</view>
              <view class="td3">17</view>
              <view class="td3">7,492.65</view>
            </view>
          </view>
        </view>
        <!--奖励费-->
        <view class="expIncentive">
          <view class="col1">奖励费</view>
          <view>
            <view class="flex-display">
              <view class="col2 field1">签约奖</view>
              <view>
                <div class="flex-display">
                  <view class="col3">网格签约奖</view>
                  <view class="col4">18</view>
                  <view class="col4">7,379.99</view>
                </div>
                <div class="flex-display">
                  <view class="col3">按时签约奖</view>
                  <view class="col4">19</view>
                  <view class="col4">4,289.54</view>
                </div>
                <div class="flex-display">
                  <view class="col3">其他签约奖</view>
                  <view class="col4">20</view>
                  <view class="col4">6,256.30</view>
                </div>
              </view>
            </view>
            <view class="flex-display">
              <view class="col2 field2">提前腾空奖</view>
              <view>
                <div class="flex-display">
                  <view class="col3">房屋提前腾空奖</view>
                  <view class="col4">21</view>
                  <view class="col4">4,470.44</view>
                </div>
                <div class="flex-display">
                  <view class="col3">青苗提前腾空奖</view>
                  <view class="col4">22</view>
                  <view class="col4">1,726.38</view>
                </div>
              </view>
            </view>
            <view class="flex-display">
              <view class="col2 field1">建房奖</view>
              <view>
                <div class="flex-display">
                  <view class="col3">启动建房奖励</view>
                  <view class="col4">23</view>
                  <view class="col4">7,326.77</view>
                </div>
                <div class="flex-display">
                  <view class="col3">完成建房奖励</view>
                  <view class="col4">24</view>
                  <view class="col4">6,517.25</view>
                </div>
                <div class="flex-display">
                  <view class="col3">搬迁入住奖励</view>
                  <view class="col4">25</view>
                  <view class="col4">2,660.54</view>
                </div>
              </view>
            </view>
            <view class="flex-display">
              <view class="otherField">其他奖励费</view>
              <view class="col4">26</view>
              <view class="col4">8,682.00</view>
            </view>
            <view class="expense-bottom">
              <view class="td2">奖励费小计</view>
              <view class="td3">27</view>
              <view class="td3">7,325.06</view>
            </view>
          </view>
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
    default: () => {}
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.migrate-card-wrapper {
  width: 100%;
  height: calc(100vh - 80rpx - var(--status-bar-height));
  overflow-y: scroll;

  .title-wrap {
    display: flex;
    width: 100%;
    padding: 6rpx 0;
    font-size: 9rpx;
    color: #171718;
    box-sizing: border-box;
    align-items: center;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-right: 10rpx;
    }
  }

  .row {
    font-size: 10rpx;

    .uTable {
      font-size: 9rpx;
    }

    .uTitle {
      font-size: 9rpx;
      font-weight: 400;
      color: #737374;
    }

    .uTd {
      font-size: 9rpx;
      font-weight: 400;
      color: #171718;
    }
  }

  .expenses-table {
    border: 0.5rpx solid #ebebeb;
    .table-header {
      background: #ebebeb;
      height: 28rpx;
      font-size: 10rpx;
      font-weight: 400;
      color: #737374;
      line-height: 28rpx;
      display: flex;
    }

    .td1 {
      width: 63rpx;
      text-align: left;
      padding-left: 10rpx;
      border: 0.5rpx solid #ebebeb;
    }
    .td2 {
      width: 282rpx;
      text-align: left;
      padding-left: 10rpx;
      border: 0.5rpx solid #ebebeb;
    }
    .td3 {
      width: 88rpx;
      text-align: left;
      padding-left: 10rpx;
      border: 0.5rpx solid #ebebeb;
    }

    .flex-display {
      display: flex;
    }

    .line-span {
      width: 62rpx;
      font-size: 9rpx;
      color: #171718;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.5rpx solid #ebebeb;
      box-sizing: border-box;

      &.span1 {
        height: 282rpx;
      }
      &.span2 {
        height: 198rpx;
      }
      &.span3 {
        height: 282rpx;
      }
    }

    .expenses-content {
      display: flex;
      font-size: 9rpx;
      color: #171718;

      .td2 {
        width: 282rpx;
        height: 28rpx;
        text-align: left;
        line-height: 28rpx;
        padding-left: 10rpx;
        border: 0.5rpx solid #ebebeb;
      }
      .td3 {
        width: 88rpx;
        height: 28rpx;
        text-align: left;
        line-height: 28rpx;
        padding-left: 10rpx;
        border: 0.5rpx solid #ebebeb;
      }

      .expenses-flex {
        display: flex;
        font-size: 9rpx;
        color: #171718;
        height: 28rpx;

        .t22 {
          width: 212rpx;
          height: 28rpx;
        }

        .td3 {
          width: 88rpx;
          height: 28rpx;
          text-align: left;
          line-height: 28rpx;
          padding-left: 10rpx;
          border: 0.5rpx solid #ebebeb;
        }
      }

      .t22 {
        width: 212rpx;
        height: 28rpx;
      }

      .t4 {
        height: 84rpx;
        width: 70rpx;
      }
      .t5 {
        height: 56rpx;
        width: 70rpx;
      }
      .t6 {
        width: 282rpx;
        height: 28rpx;
      }
    }

    .w-280 {
      width: 280rpx;
    }

    .w-90 {
      width: 90rpx;
    }

    .w-60 {
      width: 60rpx;
    }

    .expense-bottom {
      background: #ebebeb;
      font-size: 9rpx;
      color: #171718;
      display: flex;
      height: 30rpx;
      box-sizing: border-box;
      font-weight: bold;

      .td2 {
        width: 282rpx;
        font-size: 9rpx;
        text-align: center;
        line-height: 28rpx;
        border: 0.5rpx solid #ebebeb;
      }
      .td3 {
        width: 88rpx;
        font-size: 9rpx;
        text-align: left;
        line-height: 28rpx;
        padding-left: 10rpx;
        border: 0.5rpx solid #ebebeb;
      }
    }

    .expIncentive {
      display: flex;
      font-size: 9rpx;
      color: #171718;

      .col1 {
        width: 63rpx;
        height: 282rpx;
        width: 62rpx;
        font-size: 9rpx;
        color: #171718;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.5rpx solid #ebebeb;
      }

      .flex-display {
        display: flex;
        align-items: center;
        text-align: center;
      }

      .col2 {
        &.field1 {
          height: 84rpx;
          width: 70rpx;
          border: 0.5rpx solid #ebebeb;
          line-height: 84rpx;
          padding-left: 10rpx;
          text-align: left;
        }

        &.field2 {
          height: 56rpx;
          width: 70rpx;
          border: 0.5rpx solid #ebebeb;
          line-height: 56rpx;
          text-align: left;
          padding-left: 10rpx;
        }

        .field3 {
          height: 84rpx;
          width: 70rpx;
          border: 0.5rpx solid #ebebeb;
          line-height: 84rpx;
          text-align: left;
          padding-left: 10rpx;
        }
      }

      .otherField {
        width: 282rpx;
        height: 28rpx;
        text-align: center;
        line-height: 28rpx;
        border: 0.5rpx solid #ebebeb;
        line-height: 28rpx;
        text-align: left;
        padding-left: 10rpx;
      }

      .col3 {
        width: 212rpx;
        height: 28rpx;
        text-align: center;
        line-height: 28rpx;
        border: 0.5rpx solid #ebebeb;
        text-align: left;
        padding-left: 10rpx;
      }

      .col4 {
        width: 88rpx;
        height: 28rpx;
        text-align: center;
        border: 0.5rpx solid #ebebeb;
        line-height: 28rpx;
        text-align: left;
        padding-left: 10rpx;
      }
    }
  }
}
</style>
