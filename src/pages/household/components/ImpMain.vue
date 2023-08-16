<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 居民户实施 -->
    <Back title="居民户实施" />

    <view class="content">
      <LeftSidebar @switch-tab="switchTab" :dataList="sidebarList" />

      <view class="right">
        <!-- 头部 -->
        <Header :dataInfo="dataInfo" :type="MainType.PeasantHousehold" />

        <view class="box">
          <!-- 居民户信息 -->
          <base-info-imp v-if="tabVal === 1" :dataInfo="dataInfo" />

          <!-- 人口核定 -->
          <population-verfication
            v-if="tabVal === 2"
            :dataList="dataInfo.demographicList"
            :dataInfo="dataInfo"
          />

          <!-- 房屋确权 -->
          <house-confirm
            v-if="tabVal === 3"
            :dataList="dataInfo.immigrantHouseList"
            :dataInfo="dataInfo"
          />

          <!-- 模拟安置 -->
          <ImitateResettle v-if="tabVal === 4" :dataInfo="(dataInfo as any)" />

          <!-- 安置确认 -->
          <ImitateResettleConfirm v-if="tabVal === 5" :dataInfo="(dataInfo as any)" />

          <!-- 选房确认 -->
          <confirm-room v-if="tabVal === 6" :dataInfo="dataInfo" />

          <!-- 选址确认 -->
          <confirm-address v-if="tabVal === 7" />

          <!-- 协议 -->
          <Agreement v-if="tabVal === 8" />

          <!--移民建卡-->
          <migrateCard
            v-if="tabVal === 9"
            :dataInfo="dataInfo"
            :dataList="dataInfo.demographicList"
          />

          <!-- 过渡安置 -->
          <trans-resettlement v-if="tabVal === 12" :dataInfo="dataInfo" />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { MainType } from '@/types/common'
import Back from '@/components/Back/Index.vue'
import LeftSidebar from '@/components/LeftSidebar/Index.vue' // 引入左侧边栏组件
import Header from '@/components/Header/ImpIndex.vue' // 引入头部组件
import ImitateResettle from '../imitateResettle/index.vue'
import ImitateResettleConfirm from '../resettleConfirm/relocate.vue'
import Agreement from '../agreement/index.vue'
import baseInfoImp from '../baseInfoImp/index.vue'
import populationVerfication from '../populationVerfication/index.vue' // 引入人口核定组件
import houseConfirm from '../houseConfirm/index.vue' // 引入房屋确权组件
import confirmRoom from '../confirmRoom/index.vue' // 引入选房确认组件
import confirmAddress from '../confirmAddress/index.vue' // 引入选址确认组件
import migrateCard from '../migrateCard/index.vue' // 移民建卡
import transResettlement from '../transResettlement/index.vue' // 引入过渡安置组件

import iconHouseholdDef from '@/static/images/icon_household_imp_def.png' // 引入居民户信息默认 icon
import iconHouseholdSel from '@/static/images/icon_household_imp_sel.png' // 引入居民户信息选中时 icon
import iconRkhdDef from '@/static/images/icon_rkhd_def.png' // 引入人口核定默认 icon
import iconRkhdSel from '@/static/images/icon_rkhd_sel.png' // 引入人口核定选中时 icon
import iconFwqqDef from '@/static/images/icon_fwqq_def.png' // 引入房屋确权默认 icon
import iconFwqqSel from '@/static/images/icon_fwqq_sel.png' // 引入房屋确权选中时 icon
import iconMnazDef from '@/static/images/icon_mnaz_def.png' // 引入模拟安置默认 icon
import iconMnazSel from '@/static/images/icon_mnaz_sel.png' // 引入模拟安置选中时 icon
import iconAzqrDef from '@/static/images/icon_azqr_def.png' // 引入安置确认默认 icon
import iconAzqrSel from '@/static/images/icon_azqr_sel.png' // 引入安置确认选中时 icon
import iconGdazDef from '@/static/images/icon_gdaz_def.png' // 引入过渡安置默认 icon
import iconGdazSel from '@/static/images/icon_gdaz_sel.png' // 引入过渡安置选中时 icon
import iconXfqrDef from '@/static/images/icon_xfqr_def.png' // 引入选房确认默认 icon
import iconXfqrSel from '@/static/images/icon_xfqr_sel.png' // 引入选房确认选中时 icon
import iconXzqrDef from '@/static/images/icon_xzqr_def.png' // 引入选址确认默认 icon
import iconXzqrSel from '@/static/images/icon_xzqr_sel.png' // 引入选址确认选中时 icon
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
import iconSbDef from '@/static/images/icon_sb_def.png' // 引入社保默认 icon
import iconSbSel from '@/static/images/icon_sb_sel.png' // 引入社保选中时 icon
import iconScydDef from '@/static/images/icon_scyd_def.png' // 引入生产用地默认 icon
import iconScydSel from '@/static/images/icon_scyd_sel.png' // 引入生产用地选中时 icon
import iconQtazDef from '@/static/images/icon_qtaz_def.png' // 引入其他安置默认 icon
import iconQtazSel from '@/static/images/icon_qtaz_sel.png' // 引入其他安置选中时 icon
import iconXgsxDef from '@/static/images/icon_xgsx_def.png' // 引入相关手续默认 icon
import iconXgsxSel from '@/static/images/icon_xgsx_sel.png' // 引入相关手续选中时 icon

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  }
})

const tabVal = ref<number>(5)

// 是否为空数组
const isNotNullArray = (arr: any) => {
  return arr && Array.isArray(arr) && arr.length
}

const sidebarList = computed(() => {
  const { demographicList, immigrantHouseList } = props.dataInfo
  return [
    {
      label: '居民户信息',
      value: 1,
      filled: false,
      iconDef: iconHouseholdDef,
      iconSel: iconHouseholdSel
    },
    {
      label: '人口核定',
      value: 2,
      filled: isNotNullArray(demographicList),
      iconDef: iconRkhdDef,
      iconSel: iconRkhdSel
    },
    {
      label: '房屋确权',
      value: 3,
      filled: isNotNullArray(immigrantHouseList),
      iconDef: iconFwqqDef,
      iconSel: iconFwqqSel
    },
    { label: '模拟安置', value: 4, filled: true, iconDef: iconMnazDef, iconSel: iconMnazSel },
    { label: '安置确认', value: 5, filled: true, iconDef: iconAzqrDef, iconSel: iconAzqrSel },
    { label: '选房确认', value: 6, filled: true, iconDef: iconXfqrDef, iconSel: iconXfqrSel },
    { label: '选址确认', value: 7, filled: true, iconDef: iconXzqrDef, iconSel: iconXzqrSel },
    { label: '协议签订', value: 8, filled: true, iconDef: iconXyqdDef, iconSel: iconXyqdSel },
    { label: '移民建卡', value: 9, filled: true, iconDef: iconYmjkDef, iconSel: iconYmjkSel },
    { label: '房屋腾空', value: 10, filled: false, iconDef: iconFwtkDef, iconSel: iconFwtkSel },
    { label: '青苗腾空', value: 11, filled: false, iconDef: iconQmtkDef, iconSel: iconQmtkSel },
    { label: '过渡安置', value: 12, filled: true, iconDef: iconGdazDef, iconSel: iconGdazSel },
    { label: '自建房', value: 13, filled: false, iconDef: iconZjfDef, iconSel: iconZjfSel },
    { label: '统建房', value: 14, filled: false, iconDef: iconTjfDef, iconSel: iconTjfSel },
    { label: '社保', value: 15, filled: false, iconDef: iconSbDef, iconSel: iconSbSel },
    { label: '生产用地', value: 16, filled: false, iconDef: iconScydDef, iconSel: iconScydSel },
    { label: '其他安置', value: 17, filled: false, iconDef: iconQtazDef, iconSel: iconQtazSel },
    { label: '相关手续', value: 18, filled: false, iconDef: iconXgsxDef, iconSel: iconXgsxSel }
  ]
})

const switchTab = (item: any) => {
  tabVal.value = item.value
}
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

      .box {
        width: 100%;
        height: calc(100vh - 33rpx - 12rpx - 33rpx - var(--status-bar-height));
        padding: 0 6rpx;
        overflow-y: scroll;
        box-sizing: border-box;
      }
    }
  }
}
</style>
