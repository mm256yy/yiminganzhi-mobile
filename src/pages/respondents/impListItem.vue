<template>
  <view class="company-item">
    <view class="head">
      <view class="head-lt">
        <image class="user-icon" src="@/static/images/respondents_tit.png" mode="scaleToFill" />
        <view class="name">{{ props.data.name }}</view>
        <view class="number">{{ props.data.showDoorNo }}</view>
      </view>
      <view :class="typeColor(props.data.warnStatus)" v-if="props.showStatus">
        {{ filterCurrentProgress(props.data.currentProgress) }}
        {{ filterWarnStatus(props.data.warnStatus) }}
      </view>

      <template v-else>
        <view class="head-rt">
          {{
            props.data.type == 'PeasantHousehold'
              ? getProgressText(props.data)
              : fillNumber + '/' + totalStage
          }}
        </view>
      </template>
    </view>

    <view class="cont">
      <view class="cont-item">
        <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
        <view class="label">联系方式:</view>
        <view class="value">{{ props.data.phone }}</view>
      </view>

      <template v-if="props.data.type !== MainType.PeasantHousehold">
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">所属区域:</view>
          <view class="value">{{ props.data.areaCodeText }}/{{ props.data.townCodeText }}</view>
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">行政村名称:</view>
          <view class="value">{{ props.data.villageCodeText }}</view>
        </view>
        <view class="cont-item" v-if="props.data.type == MainType.LandNoMove">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">移民类型:</view>
          <view class="value">只征地不搬迁</view>
        </view>
        <!-- <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">填报人:</view>
          <view class="value">{{ props.data.reportUserName }}</view>
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">填报时间:</view>
          <view class="value">{{ props.data.reportUserDate }}</view>
        </view> -->
      </template>
      <template v-else>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">是否财产户:</view>
          <view class="value">
            {{ dictOption(yesAndNoEnums, props.data.hasPropertyAccount) }}
          </view>
        </view>
        <!-- <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">户籍地址:</view>
          <view class="value">{{ props.data.address }}</view>
        </view> -->
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">所属区域:</view>
          <view class="value"
            >{{ props.data.areaCodeText }}/{{ props.data.townCodeText }}/{{
              props.data.villageCodeText
            }}</view
          >
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">移民类型:</view>
          <view class="value">居民户</view>
        </view>
        <!-- <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">填报人:</view>
          <view class="value">{{ props.data.reportUserName }}</view>
        </view>
        <view class="cont-item">
          <image class="icon" src="@/static/images/people_circle.png" mode="scaleToFill" />
          <view class="label">填报时间:</view>
          <view class="value">{{
            props.data.reportUserDate ? dayjs(props.data.reportUserDate).format('YYYY-MM-DD HH:mm:ss') : '-'
          }}</view>
        </view> -->
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { dictOption } from '@/utils'
import { LandlordType } from '@/types/sync'
import { yesAndNoEnums } from '@/config/common'
import { MainType } from '@/types/common'
import dayjs from 'dayjs'
import { computed } from 'vue'

// import {getLandlordListBySearchApi,getImpLandlordItemApi} from '@/service'
// const getTables =  () => {
//     getLandlordListBySearchApi({type:MainType.LandNoMove}).then((res:any) => {
//       console.log(res,'查看数据');
//     }).catch((err:any) => {
//       console.log(err,'报错数据');
//     })
// }

// getTables()
// /**
//  * 获取业主详情
//  * @param(object) uid
//  */
// const getLandlordDetail = (uid: string) => {
//   getImpLandlordItemApi(uid).then((res: any) => {
//     dataInfo.value = { ...res }
//     console.log(res,'测试数据')
//   })
// }
// getLandlordDetail()
interface PropsType {
  data: LandlordType
  showStatus: boolean // 是否展示状态
}

const props = defineProps<PropsType>()

const progressMaps = [
  {
    label: '资格认定',
    value: '1'
  },
  {
    label: '资产评估',
    value: '2'
  },
  {
    label: '安置确认',
    value: '3'
  },
  {
    label: '择址确认',
    value: '4'
  },
  {
    label: '腾空过渡',
    value: '5'
  },
  {
    label: '动迁协议',
    value: '6'
  },
  {
    label: '搬迁安置',
    value: '7'
  },
  {
    label: '生产安置',
    value: '8'
  },
  {
    label: '已完成',
    value: '9'
  }
]

const filterCurrentProgress = (type: string) => {
  // 当前进度 1资格认定 2资产评估 3安置确认 4择址确认 5腾空过度 6动迁协议 7搬迁安置 8生产安置 9已完
  const item = progressMaps.find((item) => item.value === type)
  return item?.label || ''
}
// 根据类型获取标签文本颜色
const typeColor = (type: string | null) => {
  return type === '0' || type === null || type === '' || type === 'null' ? 'head-rtg' : 'head-rt'
}
const filterWarnStatus = (type: string) => {
  // 预警状态 否则正常 1预警 2滞后
  // return type === '0' || type === null || type === '' || type === 'null' ? '正常' : type === '1' ? '预警' : '滞后'
  return type === '1' ? '预警' : type === '2' ? '滞后' : '正常'
}

const getProgressText = (data: LandlordType) => {
  if (!data) return ''
  const { type, immigrantFilling } = data
  let count = 0
  let total = 0
  console.log(immigrantFilling, 'immigrantFilling')
  if (type === MainType.PeasantHousehold) {
    // 居民户信息
    if (immigrantFilling) {
      if (immigrantFilling.householdPicStatus === '1') {
        count++
      }
      // 资格认定
      if (immigrantFilling.qualificationStatus === '1') {
        count++
      }
      // 资产评估
      if (immigrantFilling.estimateeStatus === '1') {
        count++
      }
      // 安置确认
      if (immigrantFilling.arrangementStatus === '1') {
        count++
      }
      // 择址确认
      if (immigrantFilling.chooseStatus === '1') {
        count++
      }
      // 协议
      if (immigrantFilling.agreementStatus === '1') {
        count++
      }
      // 移民剪卡
      if (immigrantFilling.cardStatus === '1') {
        count++
      }
      // 腾空
      if (immigrantFilling.excessSoarStatus === '1') {
        count++
      }
      // 搬迁安置
      if (immigrantFilling.relocateArrangementAllStatus === '1') {
        count++
      }
      // 生产安置
      if (immigrantFilling.productionArrangementAllStatus === '1') {
        count++
      }
      // 相关手续
      if (immigrantFilling.proceduresStatus === '1') {
        count++
      }
    }

    total = 11
  } else if (type === MainType.Company) {
    // 资产评估
    if (immigrantFilling) {
      if (immigrantFilling.estimateeStatus === '1') {
        count++
      }
      // 协议
      if (immigrantFilling.agreementStatus === '1') {
        count++
      }
      // 移民剪卡
      if (immigrantFilling.cardStatus === '1') {
        count++
      }
      // 腾空
      if (immigrantFilling.houseSoarStatus === '1' && immigrantFilling.landSoarStatus === '1') {
        count++
      }
      // 相关手续
      if (immigrantFilling.proceduresStatus === '1') {
        count++
      }
    }
    total = 5
  } else if (type === MainType.IndividualHousehold) {
    // 资产评估
    if (immigrantFilling) {
      if (immigrantFilling.estimateeStatus === '1') {
        count++
      }
      // 协议
      if (immigrantFilling.agreementStatus === '1') {
        count++
      }
      // 移民剪卡
      if (immigrantFilling.cardStatus === '1') {
        count++
      }
      // 腾空
      if (immigrantFilling.houseSoarStatus === '1' && immigrantFilling.landSoarStatus === '1') {
        count++
      }
      // 相关手续
      if (immigrantFilling.proceduresStatus === '1') {
        count++
      }
    }
    total = 5
  } else if (type === MainType.Village) {
    // 资产评估
    if (immigrantFilling) {
      if (immigrantFilling.estimateeStatus === '1') {
        count++
      }
      // 协议
      if (immigrantFilling.agreementStatus === '1') {
        count++
      }
      // 移民剪卡
      if (immigrantFilling.cardStatus === '1') {
        count++
      }
      // 腾空
      if (immigrantFilling.houseSoarStatus === '1') {
        count++
      }
      // 集体资产
      if (immigrantFilling.disposalMeasuresStatus === '1') {
        count++
      }
    }
    total = 5
  }
  return `${count} / ${total}`
}
const totalStage = computed(() => {
  // 类别为农户时7个阶段，其他4个阶段
  return props.data.landUserType === 'PeasantHousehold' ? 7 : 4
})
const fillNumber = computed(() => {
  const { immigrantFilling, landUserType, landEstimateDtoList } = props.data || {}

  let fillCount = 0
  if (!immigrantFilling) {
    return 0
  }

  const {
    productionArrangementStatus, // 生产安置
    cardStatus, //补偿卡
    agreementStatus, // 动迁协议
    landSoarStatus, // 土地腾让
    selfEmploymentStatus, // 自谋职业
    retirementStatus // 养老保险
  } = immigrantFilling || {}

  if (landUserType === 'PeasantHousehold') {
    // 农户
    //生产安置确认
    if (productionArrangementStatus === '1') {
      fillCount++
    }
    // 自谋职业
    if (selfEmploymentStatus === '1') {
      fillCount++
    }
    // 养老保险
    if (retirementStatus === '1') {
      fillCount++
    }
  }

  // 补偿卡
  if (cardStatus === '1') {
    fillCount++
  }
  // 征地协议
  if (agreementStatus === '1') {
    fillCount++
  }
  // 土地腾让
  if (landSoarStatus === '1') {
    fillCount++
  }

  // 资产评估
  if (landEstimateDtoList && landEstimateDtoList.length > 0) {
    fillCount++
  }

  return fillCount
})
</script>

<style lang="scss" scoped>
.company-item {
  position: relative;
  width: 346rpx;
  height: 110rpx;
  padding: 12rpx;
  margin: 0 7rpx 7rpx 0;
  background-color: #ffffff;
  border-radius: 7rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);

  &:nth-child(2n) {
    margin-right: 0rpx;
  }

  .bg {
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    width: 30rpx;
    height: 30rpx;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-bottom: 6rpx;

    .head-lt {
      display: flex;
      align-items: center;

      .user-icon {
        width: 19rpx;
        height: 19rpx;
        margin-right: 6rpx;
      }

      .name {
        margin-right: 6rpx;
        overflow: hidden;
        font-size: 12rpx;
        font-weight: 600;
        color: #171718;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
      }

      .number {
        font-size: 10rpx;
        font-weight: 500;
        color: #0a54ff;
      }
    }

    .head-rt {
      width: 54rpx;
      height: 14rpx;
      font-size: 7rpx;
      font-weight: 400;
      line-height: 14rpx;
      color: #ff2d2d;
      text-align: center;
      background: #fff1f1;
      border-radius: 14rpx;
    }

    .head-rtg {
      width: 54rpx;
      height: 14rpx;
      font-size: 7rpx;
      font-weight: 400;
      line-height: 14rpx;
      color: #ffffff;
      text-align: center;
      background: #00a400;
      border-radius: 14rpx;
    }
  }

  .cont {
    display: flex;
    flex-wrap: wrap;
    .cont-item {
      display: flex;
      height: 16rpx;
      min-width: 50%;
      margin-top: 6rpx;
      align-items: center;
      flex-direction: row;

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 6rpx;
      }

      .label {
        width: 56rpx;
        overflow: hidden;
        font-size: 9rpx;
        color: #171718;
        word-break: keep-all;
      }

      .value {
        font-size: 9rpx;
        color: #171718;
      }
    }
  }
}
</style>
