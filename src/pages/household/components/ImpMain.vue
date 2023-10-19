<template>
  <view class="main-wrap">
    <!-- 移民实施阶段 —— 居民户实施 -->
    <Back title="居民户实施" />

    <view class="content">
      <LeftSidebar @switch-tab="switchTab" :dataList="tabList" />

      <view class="right">
        <!-- 头部 -->
        <Header :dataInfo="dataInfo" />

        <view class="box">
          <!-- 居民户信息 -->
          <base-info-imp v-if="tabVal === 1" :dataInfo="dataInfo" @update-data="updateData" />

          <!-- 人口核定 -->
          <population-verfication
            v-if="tabVal === 2"
            :dataList="dataInfo.demographicList"
            :dataInfo="dataInfo"
            @delete-population="deletePopulation"
            @update-data="updateData"
          />

          <!-- 房屋产权 -->
          <house-property
            v-if="tabVal === 3"
            :dataList="dataInfo.immigrantHouseList"
            :dataInfo="dataInfo"
            @update-data="updateData"
          />

          <!-- 房屋/附属物评估报告 -->
          <house-accessory-eva-report
            v-if="tabVal === 4"
            :dataInfo="dataInfo.immigrantDocumentation"
          />

          <!-- 土地/附着物评估报告 -->
          <land-accessory-eva-report
            v-if="tabVal === 5"
            :dataInfo="dataInfo.immigrantDocumentation"
          />

          <!-- 模拟安置 -->
          <imitate-resettle
            v-if="tabVal === 6"
            :dataInfo="(dataInfo as any)"
            @update-data="updateData"
          />

          <!-- 生产安置 -->
          <produce-resettle-confirm
            v-if="tabVal === 7"
            :dataInfo="(dataInfo as any)"
            @update-data="updateData"
          />

          <!-- 搬迁安置 -->
          <relocate-resettle-confirm
            v-if="tabVal === 8"
            :dataInfo="(dataInfo as any)"
            @update-data="updateData"
          />

          <!-- 坟墓确认 -->
          <grave-resettle-confirm
            v-if="tabVal === 9"
            :dataInfo="(dataInfo as any)"
            @update-data="updateData"
          />

          <!-- 生产用地 -->
          <product-land
            v-if="tabVal === 10"
            :baseInfo="dataInfo"
            :dataInfo="dataInfo.immigrantLand"
            @update-data="updateData"
          />

          <!-- 选房择址 -->
          <choose-house
            v-if="tabVal === 11"
            :baseInfo="dataInfo"
            :dataList="dataInfo.immigrantChooseHouseList"
          />

          <!-- 坟墓择址 -->
          <grave-site-sel
            v-if="tabVal === 12"
            :baseInfo="dataInfo"
            :dataList="dataInfo.immigrantGraveList"
          />

          <!--移民建卡-->
          <migrate-card
            v-if="tabVal === 13"
            :dataInfo="dataInfo"
            :dataList="dataInfo.demographicList"
          />

          <!-- 房屋腾空 -->
          <house-vacate v-if="tabVal === 14" :dataInfo="dataInfo" @update-data="updateData" />

          <!-- 土地腾让 -->
          <land-vacate v-if="tabVal === 15" :dataInfo="dataInfo" @update-data="updateData" />

          <!-- 过渡安置 -->
          <transition-vacate v-if="tabVal === 16" :dataInfo="dataInfo" @update-data="updateData" />

          <!-- 动迁协议 -->
          <agreement v-if="tabVal === 17" :dataInfo="dataInfo" />

          <!-- 自建房 -->
          <self-build-house
            v-if="tabVal === 18"
            :dataList="dataInfo.immigrantBuildOneselfList"
            :dataInfo="dataInfo"
            @update-data="updateData"
          />

          <!-- 公寓房 -->
          <apartment
            v-if="tabVal === 19"
            :data-list="dataInfo.immigrantChooseHouseList"
            :dataInfo="dataInfo"
          />

          <!-- 集中供养 -->
          <centralized-support
            v-if="tabVal === 20"
            :data-list="dataInfo.demographicList"
            :data-info="dataInfo"
          />

          <!-- 自谋出路 -->
          <self-find-way
            v-if="tabVal === 21"
            :data-info="dataInfo"
            :base-info="dataInfo.immigrantSelfSeeking"
          />

          <!-- 生产安置 农业安置 -->
          <farming v-if="tabVal === 22" :dataInfo="dataInfo" />

          <!-- 生产安置 养老保险 -->
          <insure v-if="tabVal === 23" :dataInfo="dataInfo" />

          <!-- 生产安置 自谋职业 -->
          <find-self v-if="tabVal === 24" :dataInfo="dataInfo" />

          <!-- 相关手续 -->
          <procedures v-if="tabVal === 25" :dataInfo="dataInfo" @update-data="updateData" />
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { LandlordType } from '@/types/sync'
import { householdSidebarList } from '../../common/config'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { deleteImpLandlordPeopleApi } from '@/service'
import { deepClone } from '@/utils'

import Back from '@/components/Back/Index.vue'
import LeftSidebar from '@/components/LeftSidebar/Index.vue' // 引入左侧边栏组件
import Header from '@/components/Header/ImpIndex.vue' // 引入头部组件
import baseInfoImp from '../baseInfoImp/index.vue' // 引入居民户信息组件

import populationVerfication from '../populationVerfication/index.vue' // 引入资格认定 -- 人口核定组件
import houseProperty from '../houseProperty/index.vue' // 引入资格认定 -- 房屋产权组件

import houseAccessoryEvaReport from '../../common/houseAccessoryEvaReport/index.vue' // 引入资产评估 -- 房屋/附属物评估报告组件
import landAccessoryEvaReport from '../../common/landAccessoryEvaReport/index.vue' // 引入资产评估 -- 土地/附着物评估报告组件
import imitateResettle from '../imitateResettle/index.vue' // 引入资产评估 -- 模拟安置组件

import produceResettleConfirm from '../resettleConfirm/produce.vue' // 引入安置确认 -- 生产安置组件
import relocateResettleConfirm from '../resettleConfirm/relocate.vue' // 引入安置确认 -- 搬迁安置组件
import graveResettleConfirm from '../resettleConfirm/grave.vue' // 引入安置确认 -- 坟墓确认组件

import productLand from '../productLand/index.vue' // 引入择址确认 -- 生产用地组件
import chooseHouse from '../chooseHouse/index.vue' // 引入择址确认 -- 选房择址组件
import graveSiteSel from '../graveSiteSel/index.vue' // 引入择址确认 -- 坟墓择址组件
import migrateCard from '../migrateCard/index.vue' // 引入择址确认 -- 移民建卡组件

import houseVacate from '../../common/vacate/house.vue' // 引入腾空过渡 -- 房屋腾空组件
import landVacate from '../../common/vacate/land.vue' // 引入腾空过渡 -- 土地腾让组件
import transitionVacate from '../../common/vacate/transition.vue' // 引入腾空过渡 -- 过渡安置组件
import agreement from '../agreement/index.vue' // 引入腾空过渡 -- 动迁协议组件

import selfBuildHouse from '../relocatePlacement/selfBuildHouse.vue' // 引入搬迁安置 -- 自建房组件
import apartment from '../relocatePlacement/apartment.vue' // 引入搬迁安置 -- 公寓房组件
import centralizedSupport from '../relocatePlacement/centralizedSupport.vue' // 引入搬迁安置 -- 集中供养组件
import selfFindWay from '../relocatePlacement/selfFindWay.vue' // 引入搬迁安置 -- 自谋出路组件

import procedures from '../procedures/index.vue' // 引入生产安置 -- 相关手续
import farming from '../productionResettle/farming.vue' // 引入生产安置 -- 农业安置组件
import insure from '../productionResettle/insure.vue' // 引入生产安置 -- 养老保险组件
import findSelf from '../productionResettle/findself.vue' // 引入生产安置 -- 自谋职业组件

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const tabVal = ref<number>(1)
const emit = defineEmits(['updateData'])

const tabList = computed(() => {
  const { immigrantFilling } = props.dataInfo
  const arr: any = deepClone(householdSidebarList)

  if (immigrantFilling) {
    // 居民户信息完成状态
    if (immigrantFilling.householdPicStatus === '1') {
      arr[0].list[0].list[0].filled = true
    }

    // 人口核定状态
    if (immigrantFilling.populationStatus === '1') {
      arr[1].list[0].list[0].filled = true
    }

    // 房屋产权状态
    if (immigrantFilling.propertyStatus === '1') {
      arr[1].list[0].list[1].filled = true
    }

    // 房屋/附属物评估状态
    if (immigrantFilling.appendageStatus === '1') {
      arr[1].list[1].list[0].filled = true
    }

    // 土地/附着物评估状态
    if (immigrantFilling.landStatus === '1') {
      arr[1].list[1].list[1].filled = true
    }

    // 生产安置状态
    if (immigrantFilling.productionArrangementStatus === '1') {
      arr[1].list[2].list[0].filled = true
    }

    // 搬迁安置状态
    if (immigrantFilling.relocateArrangementStatus === '1') {
      arr[1].list[2].list[1].filled = true
    }

    // 坟墓确认状态
    if (immigrantFilling.graveArrangementStatus === '1') {
      arr[1].list[2].list[2].filled = true
    }

    // 生产用地状态
    if (immigrantFilling.landUseStatus === '1') {
      arr[1].list[3].list[0].filled = true
    }

    // 选房择址状态
    if (immigrantFilling.chooseHouseStatus === '1') {
      arr[1].list[3].list[1].filled = true
    }

    // 坟墓择址状态
    if (immigrantFilling.chooseGraveStatus === '1') {
      arr[1].list[3].list[2].filled = true
    }

    // 移民建卡状态
    if (immigrantFilling.cardStatus === '1') {
      arr[1].list[4].list[0].filled = true
    }

    // 房屋腾空状态
    if (immigrantFilling.houseSoarStatus === '1') {
      arr[1].list[5].list[0].filled = true
    }

    // 土地腾让状态
    if (immigrantFilling.landSoarStatus === '1') {
      arr[1].list[5].list[1].filled = true
    }

    // 过渡安置状态
    if (immigrantFilling.excessStatus === '1') {
      arr[1].list[5].list[2].filled = true
    }

    // 动迁协议状态
    if (immigrantFilling.agreementStatus === '1') {
      arr[1].list[6].list[0].filled = true
    }

    // 自建房状态
    if (immigrantFilling.buildOneselfStatus === '1') {
      arr[2].list[0].list[0].filled = true
    }

    // 公寓房状态
    if (immigrantFilling.flatsStatus === '1') {
      arr[2].list[0].list[1].filled = true
    }

    // 集中供养状态
    if (immigrantFilling.centralizedSupportStatus === '1') {
      arr[2].list[0].list[2].filled = true
    }

    // 自谋出路状态
    if (immigrantFilling.selfSeekingStatus === '1') {
      arr[2].list[0].list[3].filled = true
    }

    // 农业安置状态
    if (immigrantFilling.agricultureArrangementStatus === '1') {
      arr[2].list[1].list[0].filled = true
    }

    // 养老保险状态
    if (immigrantFilling.retirementStatus === '1') {
      arr[2].list[1].list[1].filled = true
    }

    // 自谋职业状态
    if (immigrantFilling.selfEmploymentStatus === '1') {
      arr[2].list[1].list[2].filled = true
    }

    // 相关手续状态
    if (immigrantFilling.proceduresStatus === '1') {
      arr[2].list[2].list[0].filled = true
    }
  }
  return [...arr]
})

const switchTab = (item: any) => {
  tabVal.value = item.value
}

/**
 * 人口核定 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因
 */
const deletePopulation = (data: any, reason?: string) => {
  deleteImpLandlordPeopleApi(props.dataInfo.uid, data.uid, reason)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        updateData()
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

/**
 * 房屋产权 - 删除
 * @param{Object} data 被删除的行信息
 * @param{Object} reason 删除原因
 */
// const deleteHouseProperty = (data: any, reason?: string) => {
//   deleteImpLandlordHouseApi(props.dataInfo.uid, data.uid, reason)
//     .then((res) => {
//       if (res) {
//         showToast(SUCCESS_MSG)
//         updateData()
//       }
//     })
//     .catch(() => {
//       showToast(ERROR_MSG)
//     })
// }

// 更新整体数据
const updateData = () => {
  emit('updateData', props.dataInfo.uid)
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
