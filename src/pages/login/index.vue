<template>
  <view class="login-wrap">
    <view class="logo">
      <image webp src="" class="img" />
    </view>
    <view class="form">
      <view class="form-cont">
        <view class="title">
          <image webp src="" class="img" />
          <view class="tit">移民安置综合管理服务平台</view>
        </view>
        <view class="tab">
          <view class="tab-item">账号密码登录</view>
        </view>
        <input class="ipt" type="text" placeholder="请输入账号" />
        <input class="ipt" type="text" placeholder="请输入密码" />
        <label class="auto-login">
          <checkbox class="checkbox" value="cb" :checked="true" />自动登录
        </label>
        <button class="btn" hover-class="button-hover" @click="() => {}">登录</button>
      </view>
      <view class="copy-right">Copyright©浙江省水利水电勘测设计院有限公司</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-wrap {
  display: flex;
  height: 100vh;
  justify-content: space-between;
  align-items: stretch;

  .logo {
    width: 434rpx;
    background-color: #295ee6;

    .img {
      width: 300rpx;
      height: 300rpx;
    }
  }

  .form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 84rpx 0 25rpx;
    background-color: #fff;

    .form-cont {
      width: 216rpx;
    }

    .title {
      display: flex;
      align-items: center;

      .img {
        width: 22rpx;
        height: 28rpx;
      }

      .tit {
        font-size: 15rpx;
        font-weight: 600;
        line-height: 22rpx;
        color: #333333;
      }
    }

    .tab {
      display: flex;
      margin-top: 15rpx;
      align-items: center;
      justify-content: center;

      .tab-item {
        padding: 5rpx 0;
        font-size: 9rpx;
        color: #295ee6;
        text-align: center;
        border-bottom: 1rpx solid #295ee6;
      }
    }

    .ipt {
      width: 216rpx;
      height: 28rpx;
      margin-top: 14rpx;
      background: #ffffff;
      border: 1rpx solid #d9d9d9;
      border-radius: 5rpx;
    }

    .auto-login {
      display: block;
      margin-top: 14rpx;
      font-size: 8rpx;
      color: rgba(0, 0, 0, 0.65);

      .checkbox {
        margin-right: 6rpx;
      }
    }

    .btn {
      margin-top: 14rpx;
    }
  }
}
</style>
