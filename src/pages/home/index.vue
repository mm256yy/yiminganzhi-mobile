<template>
  <View class="home-wrap">
    <image class="common-bg" src="@/static/images/common_bg.png" mode="widthFix" />

    <View class="home-content" :style="{ paddingTop: `${statusBarHeight}px` }">
      <View class="home-header">
        <View class="header-lt">
          <image class="logo" src="@/static/images/logo.png" />
          <View class="project">移民安置综合管理服务平台</View>
          <View class="status">（实物采集）</View>
        </View>

        <View class="header-rt">
          <View class="btn-item" @click="toLink('project')">
            <View class="name">项目切换</View>
            <image class="icon" src="@/static/images/project_enter.png" mode="scaleToFill" />
          </View>
        </View>
      </View>

      <View class="admin-collect">
        <View class="admin">
          <View class="avater-box">
            <image class="avater" src="@/static/images/logo.png" mode="scaleToFill" />
          </View>

          <View class="info">
            <View class="name">章三</View>
            <View class="desc">风刀霜剑垃圾焚烧大</View>
          </View>
        </View>
        <View class="collect">
          <View class="collect-item">
            <View class="num">4444</View>
            <View class="tit">以上吧</View>
          </View>
          <View class="collect-item">
            <View class="num">4444</View>
            <View class="tit">以上吧</View>
          </View>
          <View class="collect-item">
            <View class="num">4444</View>
            <View class="tit">以上吧</View>
          </View>
        </View>
      </View>

      <View class="main-enter">
        <View class="enter-item" @click="toLink('household')">
          <View class="inner">
            <View class="top">
              <image class="enter-icon" src="@/static/images/peple_enter.png" mode="scaleToFill" />
              <View class="enter-name">居民户</View>
            </View>

            <View class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </View>
          </View>
        </View>

        <View class="enter-item" @click="toLink('enterprise')">
          <View class="inner">
            <View class="top">
              <image
                class="enter-icon"
                src="@/static/images/company_enter.png"
                mode="scaleToFill"
              />
              <View class="enter-name">企业</View>
            </View>

            <View class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </View>
          </View>
        </View>

        <View class="enter-item" @click="toLink('selfPerson')">
          <View class="inner">
            <View class="top">
              <image class="enter-icon" src="@/static/images/single_enter.png" mode="scaleToFill" />
              <View class="enter-name">个体户</View>
            </View>

            <View class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </View>
          </View>
        </View>

        <View class="enter-item" @click="toLink('collective')">
          <View class="inner">
            <View class="top">
              <image class="enter-icon" src="@/static/images/jt_enter.png" mode="scaleToFill" />
              <View class="enter-name">村集体</View>
            </View>

            <View class="enter-common">
              <text class="txt">数据填报</text>
              <image class="arrow" src="@/static/images/home_arrow_lite.png" mode="scaleToFill" />
            </View>
          </View>
        </View>
      </View>

      <View class="other-enter">
        <View class="other-item" @click="toLink('sync')">
          <View class="inner">
            <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
            <text class="other-tit">数据同步</text>
          </View>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </View>

        <View class="other-item" @click="toLink('respondents')">
          <View class="inner">
            <image class="other-icon" src="@/static/images/yimin_enter.png" mode="scaleToFill" />
            <text class="other-tit">移民管理</text>
          </View>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </View>

        <View class="other-item" @click="toLink('work')">
          <View class="inner">
            <image class="other-icon" src="@/static/images/work_enter.png" mode="scaleToFill" />
            <text class="other-tit">我的工作</text>
          </View>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </View>

        <View class="other-item" @click="toLink('map')">
          <View class="inner">
            <image class="other-icon" src="@/static/images/map_enter.png" mode="scaleToFill" />
            <text class="other-tit">查看地图</text>
          </View>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </View>
      </View>

      <View class="other-enter self">
        <View class="other-item" @click="toLink('database')">
          <View class="inner">
            <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
            <text class="other-tit">数据库</text>
          </View>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </View>
        <View class="other-item" @click="toLink('login')">
          <View class="inner">
            <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
            <text class="other-tit">登录页</text>
          </View>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </View>
        <View class="other-item" @click="toLink('people')">
          <View class="inner">
            <image class="other-icon" src="@/static/images/sync_enter.png" mode="scaleToFill" />
            <text class="other-tit">居民户清单</text>
          </View>
          <image class="arrow-icon" src="@/static/images/home_arrow.png" mode="scaleToFill" />
        </View>
      </View>
    </View>
  </View>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'
import { onMounted } from 'vue'
import { getDictObjApi } from '@/service'

const sysInfo = uni.getSystemInfoSync()
const statusBarHeight = sysInfo.statusBarHeight || 0

const toLink = (name: string) => {
  console.log(name, 'name')
  routerForward(name)
}

// 获取所有的字典表，存储为缓存变量 dict
const getDictObj = async () => {
  const result = await getDictObjApi()
  console.log('result:', result)
  uni.setStorageSync('dict', result)
}

onMounted(() => {
  getDictObj()
})
</script>

<style lang="scss" scoped>
.home-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 750rpx;
  height: 100vh;
  overflow: hidden;

  .common-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 750rpx;
    min-height: 100%;
  }

  .home-content {
    position: relative;
    z-index: 1;
  }

  .home-header {
    display: flex;
    flex-direction: row;
    height: 43rpx;
    padding: 0 9rpx;
    overflow: hidden;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;

    .header-lt {
      display: flex;
      align-items: center;
      height: 33rpx;

      .logo {
        width: 22rpx;
        height: 22rpx;
        margin-right: 6rpx;
      }

      .project {
        font-size: 14rpx;
        font-weight: 600;
        color: #fff;
      }

      .status {
        font-size: 11rpx;
        font-weight: normal;
        color: #fff;
      }
    }

    .header-rt {
      display: flex;
      align-items: center;
      height: 33rpx;

      .btn-item {
        display: flex;
        height: 23rpx;
        padding: 0 6rpx 0 10rpx;
        border: 1rpx solid #ffffff;
        border-radius: 11rpx;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .icon {
          width: 16rpx;
          height: 16rpx;
          margin-left: 6rpx;
        }

        .name {
          font-size: 12rpx;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }

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

  .main-enter {
    display: flex;
    flex-direction: row;
    width: 750rpx;
    justify-content: center;

    .enter-item {
      display: flex;
      width: 117rpx;
      height: 141rpx;
      margin-right: 14rpx;
      background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      border-radius: 11rpx;
      box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
      align-items: center;
      justify-content: center;

      .inner {
        display: flex;
        width: 115rpx;
        height: 139rpx;
        padding: 28rpx 12rpx 12rpx 22rpx;
        background: linear-gradient(180deg, #deebf6 0%, #ffffff 100%);
        border-radius: 11rpx;
        flex-direction: column;
        justify-content: space-between;
      }

      .top {
        display: flex;
        flex-direction: column;
      }

      .enter-icon {
        width: 33rpx;
        height: 33rpx;
        transform: scale(1.2);
      }

      .enter-name {
        margin-top: 5rpx;
        font-size: 13rpx;
        font-weight: 600;
        line-height: 18rpx;
        color: #171718;
      }

      .enter-common {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .txt {
          margin-right: 2rpx;
          font-size: 8rpx;
          line-height: 12rpx;
          color: #171718;
        }

        .arrow {
          width: 9rpx;
          height: 9rpx;
        }
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
        font-size: 11rpx;
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
}
</style>
