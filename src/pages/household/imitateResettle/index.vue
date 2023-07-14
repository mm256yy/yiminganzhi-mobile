<template>
  <view class="resettle-wrap">
    <!-- 人口列表 -->
    <view class="common-head">
      <image class="icon" src="" mode="scaleToFill" />
      <text>居民情况</text>
    </view>
    <view class="population-list">
      <view class="population-item">
        <view class="item-list">
          <view class="item">
            <view class="label">姓名：</view>
            <view class="value">2</view>
          </view>
          <view class="item">
            <view class="label">与户主关系：</view>
            <view class="value">2</view>
          </view>
          <view class="item">
            <view class="label">人口性质：</view>
            <view class="value">2</view>
          </view>
          <view class="item">
            <view class="label">生产用地补偿：</view>
            <view class="value">2</view>
          </view>
          <view class="item">
            <view class="label">补助标准：</view>
            <view class="value">由政府统一安排生活用地的安置方式</view>
          </view>
        </view>

        <view class="item-list">
          <view class="item">
            <view class="label">生产安置方式：</view>
            <view class="value">
              <uni-data-select :localdata="[]" />
            </view>
          </view>
          <view class="item">
            <view class="label">户籍类别：</view>
            <view class="value">2</view>
          </view>
          <view class="item">
            <view class="label">搬迁补助：</view>
            <view class="value red">3,500元/人</view>
          </view>
          <view class="item">
            <view class="label">房屋装修补偿：</view>
            <view class="value red">3,500元</view>
          </view>
          <view class="item">
            <view class="label">合计：</view>
            <view class="value red">10,500元</view>
          </view>
        </view>
      </view>
    </view>
    <view class="population-price">
      <text class="tit">该户补偿补助合计：</text>
      <text class="txt red">21,000 </text>
      <text class="txt">元</text>
    </view>

    <view class="common-head">
      <image class="icon" src="" mode="scaleToFill" />
      <text>安置方案</text>
    </view>

    <!-- 人口展示 -->
    <view class="resettle-people">
      <view class="resettle-item">
        <view class="tit-box">
          <view class="point" />
          <view class="tit">安置人口数</view>
        </view>
        <view class="num-box">
          <text class="num red">5</text>
          <text>人</text>
        </view>
      </view>

      <view class="resettle-item">
        <view class="tit-box">
          <view class="point" />
          <view class="tit">农村移民人数</view>
        </view>
        <view class="num-box">
          <text class="num red">5</text>
          <text>人</text>
        </view>
      </view>

      <view class="resettle-item">
        <view class="tit-box">
          <view class="point" />
          <view class="tit">非农村移民人数</view>
        </view>
        <view class="num-box">
          <text class="num">5</text>
          <text>人</text>
        </view>
      </view>
    </view>

    <!-- 选房类型列表 -->
    <view class="house-list">
      <!-- 宅基地 -->
      <view class="house-item">
        <view class="item">
          <view class="label">安置房类型：</view>
          <view class="value-box"> 宅基地 </view>
        </view>

        <view class="item">
          <view class="label">安置人数：</view>
          <view class="value-box">
            <view class="flex-row">
              <view class="ipt-wrap">
                <input type="text" class="ipt" />
                <view class="unit">人</view>
              </view>
              <view class="desc">按照政策该方式安置人口数最大为 <text class="red">3</text>人 </view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label">选择地块：</view>
          <view class="value-box">
            <view class="flex-row">
              <view class="area-item">
                <image class="icon" src="@/static/images/add.png" mode="scaleToFill" />
                <text>曙光安置区</text>
              </view>

              <view class="area-item">
                <image class="icon" src="@/static/images/add.png" mode="scaleToFill" />
                <text>曙光安置区</text>
              </view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label">宅基地面积：</view>
          <view class="value-box">
            <view class="flex-row">
              <view class="check-item"> 65㎡（小户) </view>
              <view class="check-item"> 105㎡（中户) </view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label">建房层数：</view>
          <view class="value-box">
            <input type="text" class="full-ipt" />
          </view>
        </view>

        <view class="item">
          <view class="label">预估单价：</view>
          <view class="value-box">
            <view class="ipt-wrap middle">
              <input type="text" class="ipt" />
              <view class="unit">元/㎡</view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label">房屋建安费：</view>
          <view class="value-box">
            <text class="txt red-bold">185,000.00</text>
            <text class="txt"> 元</text>
          </view>
        </view>

        <view class="item">
          <view class="label">建房补助费：</view>
          <view class="value-box">
            <text class="txt red-bold">1,000.00</text>
            <text class="txt"> 元</text>
          </view>
        </view>
      </view>

      <!-- 公寓 -->
      <view class="house-item">
        <view class="item">
          <view class="label">安置房类型：</view>
          <view class="value-box"> 公寓房 </view>
        </view>

        <view class="item">
          <view class="label">安置人数：</view>
          <view class="value-box">
            <view class="flex-row">
              <view class="ipt-wrap">
                <input type="text" class="ipt" />
                <view class="unit">人</view>
              </view>
              <view class="desc">按照政策该方式安置人口数最大为 <text class="red">3</text> 人</view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label">选择地块：</view>
          <view class="value-box">
            <view class="flex-row">
              <view class="area-item">
                <image class="icon" src="@/static/images/add.png" mode="scaleToFill" />
                <text>曙光安置区</text>
              </view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label flex-start">可选公寓面积：</view>
          <view class="value-box">
            <view class="check-item-box">
              <view class="area-check-item">
                <view class="item-lt">
                  <view class="area-num">105㎡</view>
                  <text> x 数量</text>
                  <input class="ipt" type="number" />
                  <text>套</text>
                </view>
                <view class="item-rt">
                  <view class="check-box" />
                  <view class="check-box checked" />
                </view>
              </view>

              <view class="area-check-item">
                <view class="item-lt">
                  <view class="area-num">105㎡</view>
                  <text> x 数量</text>
                  <input class="ipt" type="number" />
                  <text>套</text>
                </view>
                <view class="item-rt">
                  <view class="check-box" />
                  <view class="check-box checked" />
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label">已选户型：</view>
          <view class="value-box">
            <text class="txt">110㎡户型 </text>
            <text class="txt red">2</text>
            <text class="txt">套，已选总面积 </text>
            <text class="txt red">44444.22m²</text>
          </view>
        </view>

        <view class="item">
          <view class="label">建房补助费：</view>
          <view class="value-box">
            <text class="txt red-bold">185,000.00</text>
            <text class="txt"> 元</text>
          </view>
        </view>

        <view class="item">
          <view class="label flex-start">购房总金额：</view>
          <view class="value-box">
            <view>
              <text class="txt red-bold">1,000.00</text>
              <text class="txt"> 元</text>
            </view>
            <view class="desc">
              (实际选购面积在安排面积内以综合成本价购买，超出安排面积的部分以市场优惠价购买)
            </view>
          </view>
        </view>
      </view>

      <!-- 无需安置搬迁 -->
      <view class="house-item">
        <view class="item">
          <view class="label">安置房类型：</view>
          <view class="value-box"> 无需安置搬迁 </view>
        </view>

        <view class="item">
          <view class="label">安置人数：</view>
          <view class="value-box">
            <view class="ipt-wrap">
              <input type="text" class="ipt" />
              <view class="unit">人</view>
            </view>
          </view>
        </view>

        <view class="item">
          <view class="label">补助费：</view>
          <view class="value-box">
            <text class="txt red-bold">185,000.00</text>
            <text class="txt"> 元</text>
          </view>
        </view>
      </view>
    </view>

    <view class="btn-wrap">
      <view @click="addCar($event)" class="add-btn"> 加入比选 </view>
    </view>

    <view class="tab-pup">
      <view class="tab-item" @click="viewPdf">安置办法</view>
      <view class="tab-item" @click="descClick">安置说明</view>
      <view class="tab-item" @click="areaDetailOpen">安置点详情</view>
      <view class="tab-item" @click="planOpen">
        方案比选
        <view class="num">
          6

          <!-- 加购特效 -->
          <cartsBall
            ref="cartBtn"
            :endPos="{
              x: width,
              y: height
            }"
          />
        </view>
      </view>
    </view>

    <uni-popup ref="descpopup" type="center">
      <resettleDesc @close="descClose" />
    </uni-popup>

    <uni-popup ref="areadetailpopup" type="center">
      <areaDetail @close="areaDetailClose" />
    </uni-popup>

    <uni-popup ref="planpopup" type="center">
      <planSelect @close="planClose" />
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import cartsBall from './cartsBall.vue'
import resettleDesc from './resettleDesc.vue'
import areaDetail from './areaDetail.vue'
import planSelect from './planSelect.vue'

const height = ref<number>(0)
const width = ref<number>(0)
const descpopup = ref<any>(null)
const areadetailpopup = ref<any>(null)
const planpopup = ref<any>(null)

onMounted(() => {
  height.value = uni.getWindowInfo().windowHeight / 2
  width.value = uni.getWindowInfo().windowWidth - 10
})

const cartBtn = ref()
const addCar = (e: any) => {
  cartBtn.value.drop({
    x: e.detail.x,
    y: e.detail.y
  })
}

const descClick = () => {
  descpopup.value?.open()
}

const descClose = () => {
  descpopup.value?.close()
}

const areaDetailOpen = () => {
  areadetailpopup.value?.open()
}

const areaDetailClose = () => {
  areadetailpopup.value?.close()
}

const planOpen = () => {
  planpopup.value?.open()
}

const planClose = () => {
  planpopup.value?.close()
}

const viewPdf = () => {
  uni.downloadFile({
    url: 'https://oss.zdwp.tech/migrate/files/85f6a5f5-eadd-46ae-9747-48d3ff8fa24b.pdf',
    success: function (res) {
      var filePath = res.tempFilePath
      uni.openDocument({
        filePath: filePath,
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功')
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.resettle-wrap {
  width: 100%;
  height: 100%;
  padding-bottom: 50rpx;
  overflow-y: scroll;
}

.population-list {
  width: 100%;
  padding: 7rpx 9rpx;

  .population-item {
    display: flex;
    justify-content: space-between;
    width: 504rpx;
    height: 148rpx;
    padding: 9rpx 12rpx;
    background: #f2f6ff;
    border-radius: 5rpx;
  }

  .item-list {
    width: 234rpx;

    .item {
      display: flex;
      align-items: center;
      height: 21rpx;
      margin-bottom: 6rpx;

      .label {
        width: 66rpx;
        font-size: 9rpx;
        color: #171718;
        text-align: right;
      }

      .value {
        flex: 1;
        font-size: 9rpx;
        color: #171718;

        &.red {
          color: #e43030;
        }
      }

      &:last-child {
        margin-bottom: 0rpx;
      }
    }
  }
}

.population-price {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 28rpx;
  padding: 0 9rpx;

  .tit {
    font-size: 9rpx;
    color: #171718;
  }

  .txt {
    font-size: 12rpx;
    color: #171718;

    &.red {
      color: #e43030;
    }
  }
}

.resettle-people {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 9rpx;

  .resettle-item {
    display: flex;
    width: 164rpx;
    height: 57rpx;
    padding: 12rpx 14rpx;
    margin-right: 6rpx;
    background: #fafafa;
    border-radius: 7rpx;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    // background: url('@/static/images/resettle_population_icon.png') center no-repeat;

    &:last-child {
      margin-right: 0rpx;
    }

    .tit-box {
      display: flex;
      align-items: center;

      .point {
        width: 5rpx;
        height: 5rpx;
        margin-right: 5rpx;
        background: #3e73ec;
        border-radius: 50%;
      }

      .tit {
        font-size: 9rpx;
        font-weight: 500;
        color: #666666;
      }
    }

    .num-box {
      padding-left: 10rpx;
      font-size: 9rpx;
      font-weight: 500;
      color: #131313;

      .num {
        margin-right: 4rpx;
        font-size: 16rpx;
        font-weight: bold;
        color: #171718;

        &.red {
          color: #e43030;
        }
      }
    }
  }
}

.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  padding: 0 14rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
  border-radius: 5rpx 5rpx 0px 0px;
  align-items: center;

  .icon {
    width: 4rpx;
    height: 4rpx;
    margin-right: 6rpx;
    background-color: #3e73ec;
  }
}

.house-list {
  padding-bottom: 50rpx;

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
}

// 右侧区域的样式集合
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
    background: #f2f6ff;
    border: 1rpx solid #3e73ec;
    border-radius: 5rpx;
    align-items: center;
    justify-content: center;

    .icon {
      width: 12rpx;
      height: 12rpx;
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
      border: 1px solid #3e73ec;
    }
  }

  .full-ipt {
    height: 23rpx;
    padding: 0 10rpx;
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
      }
    }
  }
}

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9rpx 0;

  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94rpx;
    height: 26rpx;
    font-size: 11rpx;
    font-weight: 500;
    color: #fff;
    background: #3e73ec;
    border-radius: 2rpx;
  }
}

.tab-pup {
  position: fixed;
  right: 144rpx;
  bottom: 23rpx;

  display: flex;
  height: 32rpx;
  padding: 0 14rpx;
  background: #ffffff;
  border-radius: 38rpx;
  box-shadow: 0rpx 5rpx 12rpx 5rpx rgba(0, 0, 0, 0.05);
  align-items: center;

  .tab-item {
    display: flex;
    height: 13rpx;
    padding: 0 7rpx;
    font-size: 9rpx;
    color: #171718;
    border-right: 1rpx solid #ebebeb;
    align-items: center;
    justify-content: center;

    &:last-child {
      border-right: 0 none;
    }
  }
}
</style>
