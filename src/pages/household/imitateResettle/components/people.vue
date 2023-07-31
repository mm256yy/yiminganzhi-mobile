<template>
  <view class="population-list">
    <!-- <view class="population-item" v-for="item in demographicList" :key="item.uid">
      <view class="item-list">
        <view class="item">
          <view class="label">姓名：</view>
          <view class="value">{{ item.name }}</view>
        </view>
        <view class="item">
          <view class="label">与户主关系：</view>
          <view class="value">{{ formatDict(item.relation, 307) }}</view>
        </view>
        <view class="item">
          <view class="label">人口性质：</view>
          <view class="value">{{ formatDict(item.populationNature, 363) }}</view>
        </view>
        <view class="item">
          <view class="label">生产用地补偿：</view>
          <view class="value">生产安置</view>
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
            <uni-data-select
              class="select-wrap"
              v-model="item.settingWay"
              @change="wayChange($event, item)"
              :localdata="resettleWayVillage"
            />
          </view>
        </view>
        <view class="item">
          <view class="label">户籍类别：</view>
          <view class="value">{{ formatDict(item.censusType, 249) }}</view>
        </view>
        <view class="item">
          <view class="label">搬迁补助：</view>
          <view class="value red">3,500元/人</view>
        </view>
        <view class="item">
          <view class="label">房屋装修补偿：</view>
          <view class="value red">7,000元</view>
        </view>
        <view class="item">
          <view class="label">合计：</view>
          <view class="value red">10,500元</view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
