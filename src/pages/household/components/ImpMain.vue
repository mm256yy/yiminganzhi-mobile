<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 居民户实施 -->
    <Back title="居民户实施" />

    <view class="content">
      <LeftSidebar title="居民户信息" :dataList="sidebarList" />

      <view class="right">
        <Header />
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import Back from '@/components/Back/Index.vue'
import LeftSidebar from '@/components/LeftSidebar/Index.vue'
import Header from '@/components/Header/ImpIndex.vue'

import iconRkhdDef from '@/static/images/icon_rkhd_def.png' // 引入人口核定默认 icon
import iconRkhdSel from '@/static/images/icon_rkhd_sel.png' // 引入人口核定选中时 icon
import iconFwqqDef from '@/static/images/icon_fwqq_def.png' // 引入房屋确权默认 icon
import iconFwqqSel from '@/static/images/icon_fwqq_sel.png' // 引入房屋确权选中时 icon
import iconBqmnDef from '@/static/images/icon_bqmn_def.png' // 引入搬迁模拟默认 icon
import iconBqmnSel from '@/static/images/icon_bqmn_sel.png' // 引入搬迁模拟选中时 icon
import iconScmnDef from '@/static/images/icon_scmn_def.png' // 引入生产模拟默认 icon
import iconScmnSel from '@/static/images/icon_scmn_sel.png' // 引入生产模拟选中时 icon
import iconMnjgDef from '@/static/images/icon_mnjg_def.png' // 引入模拟结果默认 icon
import iconMnjgSel from '@/static/images/icon_mnjg_sel.png' // 引入模拟结果选中时 icon
import iconBqazDef from '@/static/images/icon_bqaz_def.png' // 引入搬迁安置默认 icon
import iconBqazSel from '@/static/images/icon_bqaz_sel.png' // 引入搬迁安置选中时 icon
import iconScazDef from '@/static/images/icon_scaz_def.png' // 引入生产安置默认 icon
import iconScazSel from '@/static/images/icon_scaz_sel.png' // 引入生产安置选中时 icon
import iconFmazDef from '@/static/images/icon_fmaz_def.png' // 引入坟墓安置默认 icon
import iconFmazSel from '@/static/images/icon_fmaz_sel.png' // 引入坟墓安置选中时 icon
import iconXyqdDef from '@/static/images/icon_xyqd_def.png' // 引入协议签订默认 icon
import iconXyqdSel from '@/static/images/icon_xyqd_sel.png' // 引入协议签订选中时 icon
import iconYmjkDef from '@/static/images/icon_ymjk_def.png' // 引入移民建卡默认 icon
import iconYmjkSel from '@/static/images/icon_ymjk_sel.png' // 引入移民建卡选中时 icon
import iconFwtkDef from '@/static/images/icon_fwtk_def.png' // 引入房屋腾空默认 icon
import iconFwtkSel from '@/static/images/icon_fwtk_sel.png' // 引入房屋腾空选中时 icon
import iconQmtkDef from '@/static/images/icon_qmtk_def.png' // 引入青苗腾空默认 icon
import iconQmtkSel from '@/static/images/icon_qmtk_sel.png' // 引入青苗腾空选中时 icon
import iconZjfDef from '@/static/images/icon_zjf_def.png' // 引入自建房默认 icon
import iconZjfSel from '@/static/images/icon_zjf_sel.png' // 引入自建房选中时 icon
import iconTjfDef from '@/static/images/icon_tjf_def.png' // 引入统建房默认 icon
import iconTjfSel from '@/static/images/icon_tjf_sel.png' // 引入统建房选中时 icon
import iconScydDef from '@/static/images/icon_scyd_def.png' // 引入生产用地默认 icon
import iconScydSel from '@/static/images/icon_scyd_sel.png' // 引入生产用地选中时 icon
import iconSbDef from '@/static/images/icon_sb_def.png' // 引入社保默认 icon
import iconSbSel from '@/static/images/icon_sb_sel.png' // 引入社保选中时 icon
import iconQtazDef from '@/static/images/icon_qtaz_def.png' // 引入其他安置默认 icon
import iconQtazSel from '@/static/images/icon_qtaz_sel.png' // 引入其他安置选中时 icon
import iconXgsxDef from '@/static/images/icon_xgsx_def.png' // 引入相关手续默认 icon
import iconXgsxSel from '@/static/images/icon_xgsx_sel.png' // 引入相关手续选中时 icon

const sidebarList = [
  { label: '人口核定', value: 1, iconDef: iconRkhdDef, iconSel: iconRkhdSel },
  { label: '房屋确权', value: 2, iconDef: iconFwqqDef, iconSel: iconFwqqSel },
  { label: '搬迁模拟', value: 3, iconDef: iconBqmnDef, iconSel: iconBqmnSel },
  { label: '生产模拟', value: 4, iconDef: iconScmnDef, iconSel: iconScmnSel },
  { label: '模拟结果', value: 5, iconDef: iconMnjgDef, iconSel: iconMnjgSel },
  { label: '搬迁安置', value: 6, iconDef: iconBqazDef, iconSel: iconBqazSel },
  { label: '生产安置', value: 7, iconDef: iconScazDef, iconSel: iconScazSel },
  { label: '坟墓安置', value: 8, iconDef: iconFmazDef, iconSel: iconFmazSel },
  { label: '协议签订', value: 9, iconDef: iconXyqdDef, iconSel: iconXyqdSel },
  { label: '移民建卡', value: 10, iconDef: iconYmjkDef, iconSel: iconYmjkSel },
  { label: '房屋腾空', value: 11, iconDef: iconFwtkDef, iconSel: iconFwtkSel },
  { label: '青苗腾空', value: 12, iconDef: iconQmtkDef, iconSel: iconQmtkSel },
  { label: '自建房', value: 13, iconDef: iconZjfDef, iconSel: iconZjfSel },
  { label: '统建房', value: 14, iconDef: iconTjfDef, iconSel: iconTjfSel },
  { label: '生产用地', value: 15, iconDef: iconScydDef, iconSel: iconScydSel },
  { label: '社保', value: 16, iconDef: iconSbDef, iconSel: iconSbSel },
  { label: '其他安置', value: 17, iconDef: iconQtazDef, iconSel: iconQtazSel },
  { label: '相关手续', value: 18, iconDef: iconXgsxDef, iconSel: iconXgsxSel }
]
</script>
<style lang="scss" scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .content {
    display: flex;
    padding: 0 9rpx 9rpx 9rpx;
    box-sizing: border-box;

    .right {
      width: 533rpx;
      height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
      margin-left: 6rpx;
      background-color: #fff;
      border-radius: 7rpx;
      box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
