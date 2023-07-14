<template>
  <view class="area-detail-wrap">
    <view class="desc-header">
      <view class="title">安置点详情</view>
      <image
        class="close"
        @click="close"
        src="@/static/images/resettle_close.png"
        mode="scaleToFill"
      />
    </view>

    <view class="area-box">
      <view class="tabs">
        <view
          class="tab-item"
          :class="{ active: tabId === item.id }"
          v-for="item in tabs"
          :key="item.id"
          @click="tabChange(item.id)"
        >
          {{ item.name }}
        </view>
      </view>

      <view class="tabs-cont">
        <view v-if="tabId === 1" class="tab-cont-item">
          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>A地块基本信息</text>
          </view>

          <view class="base-info">
            <view class="base-column">
              <view class="info-item">
                <view class="label">小区名称：</view>
                <view class="value">太阳小区</view>
              </view>
              <view class="info-item">
                <view class="label">结构类型：</view>
                <view class="value">钢架</view>
              </view>
              <view class="info-item">
                <view class="label">用地面积(㎡)：</view>
                <view class="value">20,020</view>
              </view>
              <view class="info-item">
                <view class="label">地理位置：</view>
                <view class="value">浙江省龙游县石乡大力山村白岩25号</view>
              </view>
            </view>

            <view class="base-column">
              <view class="info-item">
                <view class="label">绿化率：</view>
                <view class="value">25%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑密度：</view>
                <view class="value">12%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑面积（㎡）：</view>
                <view class="value">13,500</view>
              </view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>周边配套</text>
          </view>

          <view class="periphery">
            <view class="periphery-item">
              <view class="label">交通：</view>
              <view class="value">直接连接市区和机场1号线，7号线</view>
            </view>

            <view class="periphery-item">
              <view class="label">商业：</view>
              <view class="value">位于市区，各种商业配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">教育：</view>
              <view class="value">周边有幼儿园、小学、初中、高中，教育配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">医院：</view>
              <view class="value">镇中心医院</view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>地图</text>
          </view>

          <view class="map-cont">
            <image class="map" src="@/static/images/resettle_map.png" mode="scaleToFill" />
            <!-- <map class="map" longitude="120.17327222279103" latitude="30.235643678475068"></map> -->
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>户型图</text>
          </view>

          <view class="house-pic">
            <view class="house-info">
              <view class="house-info-item">
                <view class="tit">4室2厅</view>
                <view class="txt">底层(共24层）</view>
              </view>

              <view class="house-info-item">
                <view class="tit">65㎡</view>
                <view class="txt">精装修</view>
              </view>

              <view class="house-info-item">
                <view class="tit">南北朝向</view>
                <view class="txt">2023年竣工</view>
              </view>
            </view>

            <view class="pic-img-box">
              <image
                class="pic-img"
                src="@/static/images/resettle_house_pic.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>

        <view v-else-if="tabId === 2" class="tab-cont-item">
          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>A地块基本信息</text>
          </view>

          <view class="base-info">
            <view class="base-column">
              <view class="info-item">
                <view class="label">小区名称：</view>
                <view class="value">龙湖天地小区</view>
              </view>
              <view class="info-item">
                <view class="label">结构类型：</view>
                <view class="value">钢架</view>
              </view>
              <view class="info-item">
                <view class="label">用地面积(㎡)：</view>
                <view class="value">20,020</view>
              </view>
              <view class="info-item">
                <view class="label">地理位置：</view>
                <view class="value">浙江省龙游县石乡大力山村白岩24号</view>
              </view>
            </view>

            <view class="base-column">
              <view class="info-item">
                <view class="label">绿化率：</view>
                <view class="value">25%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑密度：</view>
                <view class="value">12%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑面积（㎡）：</view>
                <view class="value">13,500</view>
              </view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>周边配套</text>
          </view>

          <view class="periphery">
            <view class="periphery-item">
              <view class="label">交通：</view>
              <view class="value">直接连接市区和机场1号线，7号线</view>
            </view>

            <view class="periphery-item">
              <view class="label">商业：</view>
              <view class="value">位于市区，各种商业配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">教育：</view>
              <view class="value">周边有幼儿园、小学、初中、高中，教育配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">医院：</view>
              <view class="value">镇中心医院</view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>地图</text>
          </view>

          <view class="map-cont">
            <image class="map" src="@/static/images/resettle_map.png" mode="scaleToFill" />
            <!-- <map class="map" longitude="120.17327222279103" latitude="30.235643678475068"></map> -->
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>户型图</text>
          </view>

          <view class="house-pic">
            <view class="house-info">
              <view class="house-info-item">
                <view class="tit">4室2厅</view>
                <view class="txt">底层(共24层）</view>
              </view>

              <view class="house-info-item">
                <view class="tit">65㎡</view>
                <view class="txt">精装修</view>
              </view>

              <view class="house-info-item">
                <view class="tit">南北朝向</view>
                <view class="txt">2023年竣工</view>
              </view>
            </view>

            <view class="pic-img-box">
              <image
                class="pic-img"
                src="https://oss.zdwp.tech/migrate/files/image/c53c8819-29b0-4e9e-b054-6c2bdf94caae.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>

        <view v-else-if="tabId === 3" class="tab-cont-item">
          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>A地块基本信息</text>
          </view>

          <view class="base-info">
            <view class="base-column">
              <view class="info-item">
                <view class="label">小区名称：</view>
                <view class="value">汤臣一品小区</view>
              </view>
              <view class="info-item">
                <view class="label">结构类型：</view>
                <view class="value">钢架</view>
              </view>
              <view class="info-item">
                <view class="label">用地面积(㎡)：</view>
                <view class="value">20,020</view>
              </view>
              <view class="info-item">
                <view class="label">地理位置：</view>
                <view class="value">浙江省龙游县石乡大力山村白岩23号</view>
              </view>
            </view>

            <view class="base-column">
              <view class="info-item">
                <view class="label">绿化率：</view>
                <view class="value">25%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑密度：</view>
                <view class="value">12%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑面积（㎡）：</view>
                <view class="value">13,500</view>
              </view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>周边配套</text>
          </view>

          <view class="periphery">
            <view class="periphery-item">
              <view class="label">交通：</view>
              <view class="value">直接连接市区和机场1号线，7号线</view>
            </view>

            <view class="periphery-item">
              <view class="label">商业：</view>
              <view class="value">位于市区，各种商业配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">教育：</view>
              <view class="value">周边有幼儿园、小学、初中、高中，教育配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">医院：</view>
              <view class="value">镇中心医院</view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>地图</text>
          </view>

          <view class="map-cont">
            <image class="map" src="@/static/images/resettle_map.png" mode="scaleToFill" />
            <!-- <map class="map" longitude="120.17327222279103" latitude="30.235643678475068"></map> -->
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>户型图</text>
          </view>

          <view class="house-pic">
            <view class="house-info">
              <view class="house-info-item">
                <view class="tit">4室2厅</view>
                <view class="txt">底层(共24层）</view>
              </view>

              <view class="house-info-item">
                <view class="tit">65㎡</view>
                <view class="txt">精装修</view>
              </view>

              <view class="house-info-item">
                <view class="tit">南北朝向</view>
                <view class="txt">2023年竣工</view>
              </view>
            </view>

            <view class="pic-img-box">
              <image
                class="pic-img"
                src="https://oss.zdwp.tech/migrate/files/image/c53c8819-29b0-4e9e-b054-6c2bdf94caae.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>

        <view v-else-if="tabId === 4" class="tab-cont-item">
          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>A地块基本信息</text>
          </view>

          <view class="base-info">
            <view class="base-column">
              <view class="info-item">
                <view class="label">小区名称：</view>
                <view class="value">雅乐居小区</view>
              </view>
              <view class="info-item">
                <view class="label">结构类型：</view>
                <view class="value">钢架</view>
              </view>
              <view class="info-item">
                <view class="label">用地面积(㎡)：</view>
                <view class="value">20,020</view>
              </view>
              <view class="info-item">
                <view class="label">地理位置：</view>
                <view class="value">浙江省龙游县石乡大力山村白岩22号</view>
              </view>
            </view>

            <view class="base-column">
              <view class="info-item">
                <view class="label">绿化率：</view>
                <view class="value">25%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑密度：</view>
                <view class="value">12%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑面积（㎡）：</view>
                <view class="value">13,500</view>
              </view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>周边配套</text>
          </view>

          <view class="periphery">
            <view class="periphery-item">
              <view class="label">交通：</view>
              <view class="value">直接连接市区和机场1号线，7号线</view>
            </view>

            <view class="periphery-item">
              <view class="label">商业：</view>
              <view class="value">位于市区，各种商业配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">教育：</view>
              <view class="value">周边有幼儿园、小学、初中、高中，教育配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">医院：</view>
              <view class="value">镇中心医院</view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>地图</text>
          </view>

          <view class="map-cont">
            <image class="map" src="@/static/images/resettle_map.png" mode="scaleToFill" />
            <!-- <map class="map" longitude="120.17327222279103" latitude="30.235643678475068"></map> -->
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>户型图</text>
          </view>

          <view class="house-pic">
            <view class="house-info">
              <view class="house-info-item">
                <view class="tit">4室2厅</view>
                <view class="txt">底层(共24层）</view>
              </view>

              <view class="house-info-item">
                <view class="tit">65㎡</view>
                <view class="txt">精装修</view>
              </view>

              <view class="house-info-item">
                <view class="tit">南北朝向</view>
                <view class="txt">2023年竣工</view>
              </view>
            </view>

            <view class="pic-img-box">
              <image
                class="pic-img"
                src="https://oss.zdwp.tech/migrate/files/image/c53c8819-29b0-4e9e-b054-6c2bdf94caae.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>

        <view v-else-if="tabId === 5" class="tab-cont-item">
          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>A地块基本信息</text>
          </view>

          <view class="base-info">
            <view class="base-column">
              <view class="info-item">
                <view class="label">小区名称：</view>
                <view class="value">青山湖小区</view>
              </view>
              <view class="info-item">
                <view class="label">结构类型：</view>
                <view class="value">钢架</view>
              </view>
              <view class="info-item">
                <view class="label">用地面积(㎡)：</view>
                <view class="value">20,020</view>
              </view>
              <view class="info-item">
                <view class="label">地理位置：</view>
                <view class="value">浙江省龙游县石乡大力山村白岩29号</view>
              </view>
            </view>

            <view class="base-column">
              <view class="info-item">
                <view class="label">绿化率：</view>
                <view class="value">25%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑密度：</view>
                <view class="value">12%</view>
              </view>
              <view class="info-item">
                <view class="label">建筑面积（㎡）：</view>
                <view class="value">13,500</view>
              </view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>周边配套</text>
          </view>

          <view class="periphery">
            <view class="periphery-item">
              <view class="label">交通：</view>
              <view class="value">直接连接市区和机场1号线，7号线</view>
            </view>

            <view class="periphery-item">
              <view class="label">商业：</view>
              <view class="value">位于市区，各种商业配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">教育：</view>
              <view class="value">周边有幼儿园、小学、初中、高中，教育配套齐全</view>
            </view>

            <view class="periphery-item">
              <view class="label">医院：</view>
              <view class="value">镇中心医院</view>
            </view>
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>地图</text>
          </view>

          <view class="map-cont">
            <image class="map" src="@/static/images/resettle_map.png" mode="scaleToFill" />
            <!-- <map class="map" longitude="120.17327222279103" latitude="30.235643678475068"></map> -->
          </view>

          <view class="common-head">
            <image class="icon" src="" mode="scaleToFill" />
            <text>户型图</text>
          </view>

          <view class="house-pic">
            <view class="house-info">
              <view class="house-info-item">
                <view class="tit">4室2厅</view>
                <view class="txt">底层(共24层）</view>
              </view>

              <view class="house-info-item">
                <view class="tit">65㎡</view>
                <view class="txt">精装修</view>
              </view>

              <view class="house-info-item">
                <view class="tit">南北朝向</view>
                <view class="txt">2023年竣工</view>
              </view>
            </view>

            <view class="pic-img-box">
              <image
                class="pic-img"
                src="https://oss.zdwp.tech/migrate/files/image/c53c8819-29b0-4e9e-b054-6c2bdf94caae.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])
const tabId = ref(1)
const tabs = ref<any[]>([
  {
    id: 1,
    name: '曙光安置区'
  },
  {
    id: 2,
    name: '东坪安置区'
  },
  {
    id: 3,
    name: '镜岭集镇安置区'
  },
  {
    id: 4,
    name: '家田安置区'
  },
  {
    id: 5,
    name: '棠村安置区'
  }
])

const tabChange = (id: number) => {
  tabId.value = id
}

const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.area-detail-wrap {
  width: 527rpx;
  padding-bottom: 20rpx;
  background-color: #fff;
  border-radius: 7rpx;

  .desc-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 32rpx;
    padding: 0 12rpx;
    border-bottom: 1rpx solid #f0f0f0;

    .title {
      font-size: 12rpx;
      font-weight: bold;
      color: #171718;
    }

    .close {
      width: 14rpx;
      height: 14rpx;
    }
  }

  .area-box {
    padding: 9rpx 18rpx;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1rpx solid #ebebeb;

    .tab-item {
      position: relative;
      bottom: -2rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 28rpx;
      padding: 0 9rpx;
      font-size: 9rpx;
      font-weight: 500;
      color: rgba(23, 23, 24, 0.6);
      border-bottom: 2rpx solid transparent;

      &.active {
        color: #3e73ec;
        border-bottom: 2rpx solid #3e73ec;
      }
    }
  }

  .tabs-cont {
    height: 300rpx;
    overflow-y: scroll;
  }

  .base-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .base-column {
      flex: 50%;

      .info-item {
        display: flex;
        align-items: center;
        height: 13rpx;
        margin-bottom: 6rpx;

        .label {
          width: 75rpx;
          font-size: 9rpx;
          color: rgba(19, 19, 19, 0.4);
        }

        .value {
          width: 175rpx;
          font-size: 9rpx;
          color: #171718;
        }
      }
    }
  }

  .periphery {
    .periphery-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 13rpx;
      margin-bottom: 6rpx;

      .label {
        width: 28rpx;
        font-size: 9rpx;
        color: rgba(19, 19, 19, 0.4);
      }

      .value {
        flex: 1;
        font-size: 9rpx;
        color: #171718;
      }
    }
  }

  .map-cont {
    width: 492rpx;
    height: 112rpx;

    .map {
      width: 492rpx;
      height: 112rpx;
    }
  }

  .house-pic {
    .house-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .house-info-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 145rpx;
        height: 30rpx;
        margin-right: 12rpx;

        .tit {
          font-size: 11rpx;
          font-weight: bold;
          color: #171718;
        }

        .txt {
          margin-top: 2rpx;
          font-size: 9rpx;
          color: rgba(19, 19, 19, 0.4);
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .pic-img-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .pic-img {
        width: 206rpx;
        height: 206rpx;
      }
    }
  }
}

.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-radius: 5rpx 5rpx 0px 0px;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 4rpx;
    height: 4rpx;
    margin-right: 6rpx;
    background-color: #3e73ec;
  }
}
</style>
