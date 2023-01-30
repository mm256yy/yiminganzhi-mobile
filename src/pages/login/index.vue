<template>
  <view class="login-wrap">
    <view class="logo">
      <image webp src="" class="img" />
    </view>
    <view class="form">
      <view class="title">移民安置综合管理服务平台</view>
      <view>账号密码登录</view>
      <input type="text" placeholder="请输入账号" />
      <input type="text" placeholder="请输入密码" />
      <label> <checkbox value="cb" checked="true" />自动登录 </label>
      <text>忘记密码</text>
      <button>登录</button>
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
    background-color: #fff;
  }
}
</style>
