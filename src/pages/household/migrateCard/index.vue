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
            <uni-th align="center" width="40rpx">序号</uni-th>
            <uni-th align="center" width="60rpx">姓名</uni-th>
            <uni-th align="center" width="70rpx">与户主关系</uni-th>
            <uni-th align="center" width="50rpx">性别</uni-th>
            <uni-th align="center" width="140rpx">身份证号</uni-th>
            <uni-th align="center" width="80rpx">人口性质</uni-th>
            <uni-th align="center" width="80rpx">户籍册类别</uni-th>
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
      <view class="title-wrap">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        费用补偿情况
      </view>
      <view class="row">
        <uni-table border stripe emptyText="暂无更多数据">
          <!-- 表头行 -->
          <uni-tr>
            <uni-th align="center">
              <view class="w-60"></view>
            </uni-th>
            <uni-th align="center" width="280rpx">
              <view class="w-280">补偿指标名称</view>
            </uni-th>
            <uni-th align="center" width="90rpx">
              <view class="w-90">代码</view>
            </uni-th>
            <uni-th align="center" width="90rpx">
              <view class="w-90">补偿金额(元</view>
            </uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr>
            <uni-td align="center">
              <view class="w-60">补偿费</view>
            </uni-td>
            <uni-tr>
              <uni-td align="center">
                <view class="w-280">房屋主体补偿费用</view>
              </uni-td>
              <uni-td align="center">
                <view class="w-90">01</view>
              </uni-td>
              <uni-td align="center">
                <view class="w-90">8,053.32</view>
              </uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">房屋装修补偿费</uni-td>
              <uni-td align="center">02</uni-td>
              <uni-td align="center">7,302.19</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">附属物补偿费</uni-td>
              <uni-td align="center">03</uni-td>
              <uni-td align="center">7,302.19</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">零星果木补偿费</uni-td>
              <uni-td align="center">04</uni-td>
              <uni-td align="center">4,452.32</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">地上青苗及附着物补偿费</uni-td>
              <uni-td align="center">05</uni-td>
              <uni-td align="center">5,514.77</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">土地补偿费(到户)</uni-td>
              <uni-td align="center">06</uni-td>
              <uni-td align="center">7,741.85</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">坟墓迁移补偿费</uni-td>
              <uni-td align="center">07</uni-td>
              <uni-td align="center">9,222.02</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">农副业设施设备补偿费</uni-td>
              <uni-td align="center">08</uni-td>
              <uni-td align="center">7,889.37</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">其他补偿费</uni-td>
              <uni-td align="center">09</uni-td>
              <uni-td align="center">9,217.97</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">补偿费小计</uni-td>
              <uni-td align="center">10</uni-td>
              <uni-td align="center">3,809.43</uni-td>
            </uni-tr>
          </uni-tr>
          <uni-tr>
            <uni-td align="center">补助费</uni-td>
            <uni-tr>
              <uni-td align="center">建房补助费</uni-td>
              <uni-td align="center">11</uni-td>
              <uni-td align="center">7,379.99</uni-td>
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
            <uni-tr>
              <uni-td align="center">补助费小计</uni-td>
              <uni-td align="center">16</uni-td>
              <uni-td align="center">7,492.65</uni-td>
            </uni-tr>
          </uni-tr>
          <uni-tr>
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

  .w-280 {
    width: 280rpx;
  }

  .w-90 {
    width: 90rpx;
  }

  .w-60 {
    width: 60rpx;
  }

  .countField {
    font-family: PingFang SC-Bold, PingFang SC;
    font-size: 9px;
    font-weight: bold;
    color: #171718;
  }
}
</style>
