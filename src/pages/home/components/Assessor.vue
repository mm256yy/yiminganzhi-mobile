<template>
  <view>
    <view class="search">
      <view class="search-input">
        <input type="text" placeholder="请输入户号、名称、联系方式" v-model.trim="seachName" />
      </view>
      <view class="search-btn" @click="onSearch">
        <image class="search-icon" src="@/static/images/icon_search_white.png" mode="aspectFit" />
        <text class="search-txt">查询</text>
      </view>
    </view>
    <!-- 具体内容 -->
    <view class="main-enter">
      <!--居民区-->
      <view class="enter-item" @click="toLink('householdList')">
        <view class="title-field">
          <view class="enter-icon">
            <image class="img" src="@/static/images/icon_resident.png" />
          </view>
          <view class="enter-title">
            <text class="title-txt">居民户</text>
            <view class="flex">
              <text class="count-num"> {{ homeCollect.peasantCount }}</text>
              <text class="count-unit"> 户 </text>
            </view>
          </view>
        </view>
        <view class="row-field">
          <view class="field-box" @click.prevent.stop="toLinkParams('householdList', '1')">
            <view class="line-1">{{ homeCollect.peasantCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot red" />
              <view class="line-2">已评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('householdList', '0')">
            <view class="line-1">{{ homeCollect.peasantUncompletedCount }}</view>
            <view class="flex">
              <view class="common-dot yellow" />
              <view class="line-2">未评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('householdList', '2')">
            <view class="line-1">{{ homeCollect.peasantMyCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot green" />
              <view class="line-2">我的评估</view>
            </view>
          </view>
        </view>
      </view>
      <!--企业-->
      <view class="enter-item" @click="toLink('enterpriseList')">
        <view class="title-field">
          <view class="enter-icon">
            <image class="img" src="@/static/images/company_enter.png" />
          </view>
          <view class="enter-title">
            <text class="title-txt">企（事）业单位</text>
            <view class="flex">
              <text class="count-num"> {{ homeCollect.companyCount }} </text>
              <text class="count-unit"> 家 </text>
            </view>
          </view>
        </view>
        <view class="row-field">
          <view class="field-box" @click.prevent.stop="toLinkParams('enterpriseList', '1')">
            <view class="line-1">{{ homeCollect.companyCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot red" />
              <view class="line-2 red">已评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('enterpriseList', '0')">
            <view class="line-1">{{ homeCollect.companyUncompletedCount }}</view>
            <view class="flex">
              <view class="common-dot yellow" />
              <view class="line-2">未评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('enterpriseList', '2')">
            <view class="line-1">{{ homeCollect.companyMyCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot green" />
              <view class="line-2">我的评估</view>
            </view>
          </view>
        </view>
      </view>
      <!--个体户-->
      <view class="enter-item" @click="toLink('selfPersonList')">
        <view class="title-field">
          <view class="enter-icon">
            <image class="img" src="@/static/images/single_enter.png" />
          </view>
          <view class="enter-title">
            <text class="title-txt">个体工商户</text>
            <view class="flex">
              <text class="count-num">{{ homeCollect.individualCount }}</text>
              <text class="count-unit"> 家 </text>
            </view>
          </view>
        </view>
        <view class="row-field">
          <view class="field-box" @click.prevent.stop="toLinkParams('selfPersonList', '1')">
            <view class="line-1">{{ homeCollect.individualCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot red" />
              <view class="line-2 red">已评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('selfPersonList', '0')">
            <view class="line-1">{{ homeCollect.individualUncompletedCount }}</view>
            <view class="flex">
              <view class="common-dot yellow" />
              <view class="line-2">未评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('selfPersonList', '2')">
            <view class="line-1">{{ homeCollect.individualMyCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot green" />
              <view class="line-2">我的评估</view>
            </view>
          </view>
        </view>
      </view>
      <!--村集体-->
      <view class="enter-item" @click="toLink('collectiveList')">
        <view class="title-field">
          <view class="enter-icon">
            <image class="img" src="@/static/images/icon_village.png" />
          </view>
          <view class="enter-title">
            <text class="title-txt">村集体</text>
            <view class="flex">
              <text class="count-num">{{ homeCollect.villageCount }}</text>
              <text class="count-unit">个</text>
            </view>
          </view>
        </view>
        <view class="row-field">
          <view class="field-box" @click.prevent.stop="toLinkParams('collectiveList', '1')">
            <view class="line-1">{{ homeCollect.villageCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot red" />
              <view class="line-2 red">已评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('collectiveList', '0')">
            <view class="line-1">{{ homeCollect.villageUncompletedCount }}</view>
            <view class="flex">
              <view class="common-dot yellow" />
              <view class="line-2">未评估</view>
            </view>
          </view>
          <view class="field-box" @click.prevent.stop="toLinkParams('collectiveList', '2')">
            <view class="line-1">{{ homeCollect.villageMyCompleteCount }}</view>
            <view class="flex">
              <view class="common-dot green" />
              <view class="line-2">我的评估</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="group">
      <view class="work"><Echart /></view>
      <view class="message"><MessageNotice /></view>
    </view>
    <view class="other-enter">
      <view class="other-item" @click="toLink('sync')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
          <text class="other-tit">数据同步</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>

      <view class="other-item" @click="toLink('mapList')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/map_enter.png" mode="scaleToFill" />
          <text class="other-tit">查看地图</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
      <view class="other-item" @click="toLink('work')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/work_enter.png" mode="scaleToFill" />
          <text class="other-tit">我的工作</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
    </view>

    <!-- <view class="other-enter">
      <view class="other-item" @click="toLink('database')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
          <text class="other-tit">数据库</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
      <view class="other-item" @click="toLink('login')">
        <view class="inner">
          <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
          <text class="other-tit">登录页</text>
        </view>
        <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
      </view>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getStorage, StorageKey, routerForward } from '@/utils'
import Echart from './GroupTopFive.vue'
import MessageNotice from './MessageNoticeFive.vue'
import { getImpHomeCollectDtoApi, getLandEstimateDtoListApi } from '@/service'
const emit = defineEmits(['toLink', 'toParamsLinks', 'loginIn'])
const userInfo = ref<any>(null)
const projectInfo = ref<any>(null)
interface HomeCollectType {
  peasantCount: number
  peasantCompleteCount: number
  peasantMyCompleteCount: number
  peasantUncompletedCount: number
  companyCount: number
  companyCompleteCount: number
  companyMyCompleteCount: number
  companyUncompletedCount: number
  individualCount: number
  individualCompleteCount: number
  individualMyCompleteCount: number
  individualUncompletedCount: number
  villageCount: number
  villageCompleteCount: number
  villageMyCompleteCount: number
  villageUncompletedCount: number
}
const homeCollect = ref<HomeCollectType>({
  peasantCount: 0,
  peasantCompleteCount: 0,
  peasantMyCompleteCount: 0,
  peasantUncompletedCount: 0,
  companyCount: 0,
  companyCompleteCount: 0,
  companyMyCompleteCount: 0,
  companyUncompletedCount: 0,
  individualCount: 0,
  individualCompleteCount: 0,
  individualMyCompleteCount: 0,
  individualUncompletedCount: 0,
  villageCount: 0,
  villageCompleteCount: 0,
  villageMyCompleteCount: 0,
  villageUncompletedCount: 0
})
const seachName = ref<string>('')

const toLinkParams = (name: string, types: string) => {
  emit('toParamsLinks', {
    name,
    types
  })
}

const onSearch = () => {
  if (seachName.value) {
    routerForward('householdList', {
      name: seachName.value
    })
  }
}
const toLink = (name: string) => {
  emit('toLink', name)
}

const loginIn = () => {
  emit('loginIn')
}

onShow(() => {
  const user = getStorage(StorageKey.USERINFO)
  const project = getStorage(StorageKey.PROJECTINFO)
  userInfo.value = user
  projectInfo.value = project
})
onMounted(() => {
  getImpHomeCollectDtoApi().then((res) => {
    if (res) {
      homeCollect.value = { ...homeCollect.value, ...res }
    }
  })
  console.log('===================================')
})
</script>

<style lang="scss" scoped>
.admin-collect {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 24rpx 42rpx;

  .admin {
    display: flex;
    flex-direction: row;
    align-items: center;

    .avater-box {
      display: flex;
      width: 40rpx;
      height: 40rpx;
      margin-right: 6rpx;
      overflow: hidden;

      background: linear-gradient(143deg, #ffffff 0%, #a5bcff 100%);
      border-radius: 50%;
      align-items: center;
      justify-content: center;

      .avater {
        width: 36rpx;
        height: 36rpx;
        background-color: #86a3c4;
        border-radius: 50%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 13rpx;
        font-weight: 600;
        line-height: 18rpx;
        color: #ffffff;
      }

      .desc {
        margin-top: 5rpx;
        font-size: 11rpx;
        line-height: 15rpx;
        color: #ffffff;
      }
    }
  }

  .collect {
    display: flex;
    flex-direction: row;

    .collect-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 53rpx;

      .num {
        font-size: 23rpx;
        font-weight: 600;
        line-height: 33rpx;
        color: #ffffff;
      }

      .tit {
        font-size: 11rpx;
        font-weight: 600;
        line-height: 15rpx;
        color: #ffffff;
      }

      &:last-child {
        margin-right: 0rpx;
      }
    }
  }
}

.search {
  display: flex;
  width: 375rpx;
  height: 28rpx;
  margin: 0 auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 5rpx;
  justify-content: center;

  .search-input {
    width: 315rpx;
    height: 28rpx;
    padding-left: 12rpx;
    line-height: 28rpx;
    text-align: left;
    border-radius: 5rpx 0 0 5rpx;

    input {
      height: 28rpx;
      font-size: 10rpx;
      line-height: 28rpx;
      color: rgba(19, 19, 19, 0.4);
    }
  }

  .search-btn {
    display: flex;
    width: 60rpx;
    height: 28rpx;
    overflow: hidden;
    background: linear-gradient(270deg, #ffb11a 0%, #ff9432 100%);
    border-radius: 0 5rpx 5rpx 0;
    justify-content: center;
    align-items: center;

    .search-icon {
      width: 14rpx;
      height: 14rpx;
    }

    .search-txt {
      margin-left: 5rpx;
      font-size: 9rpx;
      font-weight: 400;
      color: #f7f8fa;
    }
  }
}

.main-enter {
  display: flex;
  width: 750rpx;
  justify-content: space-between;
  padding: 12rpx;
  border-radius: 11rpx;

  .enter-item {
    width: 176rpx;
    height: 96rpx;
    padding: 12rpx 6rpx 7rpx 6rpx;
    background: linear-gradient(180deg, #deebf6 0%, #ffffff 100%);
    border-radius: 11rpx;

    .title-field {
      display: flex;

      .enter-icon {
        width: 48rpx;
        height: 48rpx;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      .enter-title {
        margin-top: -21rpx;
        margin-left: 8rpx;

        .title-txt {
          font-size: 9rpx;
          font-weight: 500;
          color: #333333;
        }

        .count-num {
          margin-bottom: 5rpx;
          font-size: 16rpx;
          font-weight: bold;
          color: #171718;
        }

        .count-unit {
          margin-top: 6rpx;
          margin-left: 6rpx;
          font-size: 9rpx;
          color: #131313;
        }
      }
    }

    .row-field {
      display: flex;
      font-size: 8rpx;
      justify-content: space-between;

      .field-box {
        display: flex;
        width: 50rpx;
        height: 32rpx;
        padding-top: 4rpx;
        background: linear-gradient(180deg, #ffffff 0%, #e9f5ff 100%);
        border-radius: 5rpx;
        flex-direction: column;
        align-items: center;

        .row-field {
          display: flex;
          font-size: 8rpx;

          .field-box {
            display: flex;
            padding-top: 5rpx;
            background: linear-gradient(180deg, #ffffff 0%, #e9f5ff 100%);
            border-radius: 5rpx;
            flex-direction: column;
            align-items: center;

            .line-1 {
              padding-top: 3rpx;
              font-size: 12rpx;
              font-weight: 400;
              line-height: 12rpx;
              color: #171718;
            }

            .flex {
              display: flex;

              .dot-red {
                width: 8rpx;
                height: 8rpx;
                background-color: #e43030;
                border-radius: 50%;
              }

              .dot-yellow {
                width: 8rpx;
                height: 8rpx;
                background-color: #fec44c;
              }

              .dot-green {
                width: 8rpx;
                height: 8rpx;
                background-color: #30a952;
              }
            }

            .line-2 {
              padding-top: 3rpx;
              font-size: 8rpx;
              font-weight: 500;
              color: rgba(23, 23, 24, 0.6);
            }
          }
        }

        .line-1 {
          font-size: 12rpx;
          font-weight: 400;
          color: #171718;
        }

        .line-2 {
          font-size: 8rpx;
          font-weight: 500;
          color: rgba(23, 23, 24, 0.6);
        }
      }
    }

    .top {
      display: flex;
      flex-direction: column;
    }

    &:last-child {
      margin-right: 0rpx;
    }
  }
}

.other-enter {
  display: flex;
  justify-content: center;
  width: 750rpx;
  margin-top: 36rpx;

  &.self {
    display: none;
    margin-top: 10rpx;
  }

  .other-item {
    display: flex;
    width: 117rpx;
    height: 33rpx;
    padding: 0 9rpx 0 4rpx;
    margin-right: 14rpx;
    background-color: #cfdffa;
    border-radius: 9rpx;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .inner {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .other-icon {
      width: 26rpx;
      height: 26rpx;
    }

    .other-tit {
      margin-left: 9rpx;
      font-size: 9rpx;
      font-weight: 600;
      color: #0a54ff;
    }

    .arrow-icon {
      width: 9rpx;
      height: 9rpx;
    }

    &:last-child {
      margin-right: 0rpx;
    }
  }
}

.common-dot {
  width: 4rpx;
  height: 4rpx;
  margin: 3rpx 4rpx 0 0;
  border-radius: 50%;

  &.red {
    background-color: #e43030;
  }

  &.yellow {
    background-color: #fec44c;
  }

  &.green {
    background-color: #30a952;
  }
}

.flex {
  display: flex;
}

.group {
  display: flex;
  height: 155rpx;
  padding: 0 12rpx;
  align-items: center;
  margin-top: 15rpx;

  .work {
    width: 457rpx;
    margin-left: 4rpx;
  }

  .message {
    width: 263rpx;
  }
}
</style>
