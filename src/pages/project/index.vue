<template>
  <view class="project-wrap">
    <swiper class="swiper" :indicator-dots="true">
      <swiper-item v-for="(item, index) in list" :key="item.index">
        <view class="grid">
          <view
            class="project-item"
            v-for="(projectItem, dex) in item.children"
            :index="[index, dex]"
            :key="dex"
          >
            <image class="img" src="@/static/images/card_enterprise_bg.png" alt=" " />
            <view class="bottom">
              <text class="txt">{{ projectItem.name }}</text>
            </view>
            <image class="tag" src="@/static/images/current_tag.png" mode="scaleToFill" />
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref<any[]>([
  {
    key: '1',
    children: [{ name: '都是见风使舵' }, { name: '都是见风使舵2' }]
  }
])
const onChangeProject = () => {}
</script>

<style lang="scss" scoped>
uni-page-body {
  /* #ifdef H5 */
  height: 100%;
  /* #endif */

  /* #ifdef APP-PLUS */
  flex: 1;
  /* #endif */
}

.project-wrap {
  /* #endif */
  width: 750rpx;
  /* #ifdef H5 */
  height: 100%;
  padding: 40rpx;
  background-color: #e7edfd;
  border-radius: 9rpx 9rpx 0rpx 0rpx;
  /* #endif */

  /* #ifdef APP-PLUS */
  flex: 1;
}

.swiper {
  /* #ifdef H5 */
  height: 100%;
  /* #endif */

  /* #ifdef APP-PLUS */
  flex: 1;
  /* #endif */
}

.grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100%;
  padding-bottom: 40rpx;
}

.project-item {
  position: relative;
  display: flex;
  width: 152rpx;
  height: 141rpx;
  margin: 0 13rpx 23rpx 0;
  background-color: rgba(255, 255, 255, 0.98);
  border: 1rpx solid #eeeeee;
  border-radius: 5rpx;
  box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(45, 71, 103, 0.1);
  flex-direction: column;
}

.img {
  width: 152rpx;
  height: 141rpx;
}

.bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40rpx;
}

.tag {
  position: absolute;
  top: 0;
  left: 0;
  width: 40rpx;
  height: 35rpx;
}
</style>
