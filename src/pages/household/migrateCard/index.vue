<template>
  <view class="migrate-card-wrapper">
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            家庭基本情况
          </view>
        </view>
        <view class="list-2">
          <uni-table border stripe emptyText="暂无更多数据">
            <!-- 表头行 -->
            <uni-tr>
              <uni-th align="center" width="50px">序号</uni-th>
              <uni-th align="center">姓名</uni-th>
              <uni-th align="center" width="50px">与户主关系</uni-th>
              <uni-th align="center" width="50px">性别</uni-th>
              <uni-th align="center">身份证号</uni-th>
              <uni-th align="center">人口性质</uni-th>
              <uni-th align="center">户籍册类别</uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <uni-tr v-for="(item, index) in tableData1" :key="index">
              <uni-td align="center">{{ item.no }}</uni-td>
              <uni-td align="center">{{ item.name }}</uni-td>
              <uni-td align="center">{{ item.relationship }}</uni-td>
              <uni-td align="center">{{ item.gender }}</uni-td>
              <uni-td align="center">{{ item.idCard }}</uni-td>
              <uni-td align="center">{{ item.personAttr }}</uni-td>
              <uni-td align="center">{{ item.type }}</uni-td>
            </uni-tr>
          </uni-table>
        </view>
        <view class="list-1">
          <view class="left">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            费用补偿情况
          </view>
        </view>
        <view class="list-2">
          <uni-table border stripe emptyText="暂无更多数据">
            <!-- 表头行 -->
            <uni-tr>
              <uni-th align="center" />
              <uni-th align="center" class="w-282">补偿指标名称</uni-th>
              <uni-th align="center" class="w-88">代码</uni-th>
              <uni-th align="center" class="w-88">补偿金额(元）</uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <uni-tr class="w-486">
              <uni-td align="center">补偿费</uni-td>
              <uni-tr class="w-458">
                <uni-td align="center" class="w-282">房屋主体补偿费用</uni-td>
                <uni-td align="center" class="w-88">01</uni-td>
                <uni-td align="center" class="w-88">8,053.32</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">房屋装修补偿费</uni-td>
                <uni-td align="center">02</uni-td>
                <uni-td align="center">7,302.19</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">附属物补偿费</uni-td>
                <uni-td align="center">03</uni-td>
                <uni-td align="center">7,302.19</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">零星果木补偿费</uni-td>
                <uni-td align="center">04</uni-td>
                <uni-td align="center">4,452.32</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">地上青苗及附着物补偿费</uni-td>
                <uni-td align="center">05</uni-td>
                <uni-td align="center">5,514.77</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">土地补偿费(到户)</uni-td>
                <uni-td align="center">06</uni-td>
                <uni-td align="center">7,741.85</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">坟墓迁移补偿费</uni-td>
                <uni-td align="center">07</uni-td>
                <uni-td align="center">9,222.02</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">农副业设施设备补偿费</uni-td>
                <uni-td align="center">08</uni-td>
                <uni-td align="center">7,889.37</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">其他补偿费</uni-td>
                <uni-td align="center">09</uni-td>
                <uni-td align="center">9,217.97</uni-td>
              </uni-tr>
              <uni-tr class="table-tr">
                <uni-td align="center">补偿费小计</uni-td>
                <uni-td align="center">10</uni-td>
                <uni-td align="center">3,809.43</uni-td>
              </uni-tr>
            </uni-tr>
            <uni-tr class="w-486">
              <uni-td align="center">补助费</uni-td>
              <uni-tr class="w-458">
                <uni-td align="center" class="w-282">建房补助费</uni-td>
                <uni-td align="center" class="w-88">11</uni-td>
                <uni-td align="center" class="w-88">7,379.99</uni-td>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">搬迁补助费</uni-td>
                <uni-td align="center">12</uni-td>
                <uni-td align="center">8,441.25</uni-td>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">过渡期补助费</uni-td>
                <uni-td align="center">13</uni-td>
                <uni-td align="center">2,550.56</uni-td>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">临时安置补助费</uni-td>
                <uni-td align="center">14</uni-td>
                <uni-td align="center">6,181.67</uni-td>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">分散安置移民基础设施费</uni-td>
                <uni-td align="center">15</uni-td>
                <uni-td align="center">2,595.03</uni-td>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">其他补助费</uni-td>
                <uni-td align="center">16</uni-td>
                <uni-td align="center">8,000.70</uni-td>
              </uni-tr>
              <uni-tr class="countField">
                <uni-td align="center">补助费小计</uni-td>
                <uni-td align="center">16</uni-td>
                <uni-td align="center">7,492.65</uni-td>
              </uni-tr>
            </uni-tr>
            <uni-tr class="w-486">
              <uni-td align="center">奖励费</uni-td>
              <uni-tr>
                <uni-td align="center">签约奖</uni-td>
                <uni-tr>
                  <uni-td align="center">网格签约奖</uni-td>
                  <uni-td align="center">18</uni-td>
                  <uni-td align="center">1,049.91</uni-td>
                </uni-tr>
                <uni-tr>
                  <uni-td align="center">按时签约奖</uni-td>
                  <uni-td align="center">19</uni-td>
                  <uni-td align="center">4,289.54</uni-td>
                </uni-tr>
                <uni-tr>
                  <uni-td align="center">其他签约奖</uni-td>
                  <uni-td align="center">20</uni-td>
                  <uni-td align="center">6,256.30</uni-td>
                </uni-tr>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">提前腾空奖</uni-td>
                <uni-tr>
                  <uni-td align="center">房屋提前腾空奖</uni-td>
                  <uni-td align="center">21</uni-td>
                  <uni-td align="center">4,470.44</uni-td>
                </uni-tr>
                <uni-tr>
                  <uni-td align="center">青苗提前腾空奖</uni-td>
                  <uni-td align="center">22</uni-td>
                  <uni-td align="center">1,726.38</uni-td>
                </uni-tr>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">建房奖</uni-td>
                <uni-tr>
                  <uni-td align="center">启动建房奖励</uni-td>
                  <uni-td align="center">23</uni-td>
                  <uni-td align="center">7,326.77</uni-td>
                </uni-tr>
                <uni-tr>
                  <uni-td align="center">完成建房奖励</uni-td>
                  <uni-td align="center">24</uni-td>
                  <uni-td align="center">6,517.25</uni-td>
                </uni-tr>
                <uni-tr>
                  <uni-td align="center">搬迁入住奖励</uni-td>
                  <uni-td align="center">25</uni-td>
                  <uni-td align="center">2,660.54</uni-td>
                </uni-tr>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">其他奖励费</uni-td>
                <uni-td align="center">26</uni-td>
                <uni-td align="center">8,682.00</uni-td>
              </uni-tr>
              <uni-tr>
                <uni-td align="center">奖励费小计</uni-td>
                <uni-td align="center">27</uni-td>
                <uni-td align="center">7,325.06</uni-td>
              </uni-tr>
            </uni-tr>
          </uni-table>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface BaseInfo {
  no: string
  name: string
  relationship: string
  gender: string
  idCard: string
  personAttr: string
  type: string
}

const tableData1 = ref<BaseInfo[]>([
  {
    no: '1',
    name: '李飞',
    relationship: '户主',
    gender: '男',
    idCard: '370611195001262542',
    personAttr: '册内人口',
    type: '农村家庭户'
  },
  {
    no: '2',
    name: '王丹',
    relationship: '妻子',
    gender: '女',
    idCard: '370105197308093683',
    personAttr: '册内人口',
    type: '农村家庭户'
  },
  {
    no: '3',
    name: '李丹妮',
    relationship: '女儿',
    gender: '女',
    idCard: '610429197201221538',
    personAttr: '册内人口',
    type: '农村家庭户'
  }
])
</script>

<style lang="scss" scoped>
.migrate-card-wrapper {
  width: 100%;
  overflow-y: scroll;
  height: calc(100vh - 80rpx - var(--status-bar-height));
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
        margin-bottom: 5rpx;

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
        width: 100%;
      }
    }
  }

  .w-63 {
    width: 63rpx;
  }

  .w-458 {
    width: 458rpx;
  }

  .w-486 {
    width: 486rpx;
  }
  .w-282 {
    width: 282rpx;
  }
  .w-88 {
    width: 88rpx;
  }
  .countField {
    font-size: 9px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #171718;
  }
}
</style>
