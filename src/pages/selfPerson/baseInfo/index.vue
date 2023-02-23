<template>
  <view class="base-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户基本信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">法人姓名：</view>
                <view class="content">徐汉超</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">法人身份证号：</view>
                <view class="content">33252196701305515</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">15788987689</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">个体工商户名称：</view>
                <view class="content">徐汉超个体户</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">个体工商户编码：</view>
                <view class="content">G1030004</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">淹没区</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">个体工商户联系方式：</view>
                <view class="content">400-88888888</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所属区域：</view>
                <view class="content">武义县熟溪街道佐溪村 </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户证照信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证类型：</view>
                <view class="content">工商证</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证编号：</view>
                <view class="content">332521967015</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证有效期：</view>
                <view class="content">2059年1月10日</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证颁布单位：</view>
                <view class="content">境玲镇工商局</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">税务许可证编号：</view>
                <view class="content">330101MG213456754</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">税务许可证有效期：</view>
                <view class="content">2060年1月1日</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">税务许可证颁布单位：</view>
                <view class="content">浙江省工商税务局</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户工商信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">登记注册类型：</view>
                <view class="content">私营独资企业（个人独资企业）</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">成立日期：</view>
                <view class="content">2021年4月30号</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所属行业：</view>
                <view class="content">软件和信息技术服务业</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">注册资金：</view>
                <view class="content">100（万元）</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">个体工商户地址：</view>
                <view class="content">浙江省绍兴市新昌县镜岭镇</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所属分类：</view>
                <view class="content">电力、热力、燃气及水的生产和供应业</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">经济性质：</view>
                <view class="content">有限责任公司、股份有限责任公司</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">其他权证情况：</view>
                <view class="content">房屋产权的证明文件</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">经营范围：</view>
                <view class="content"
                  >企业生产和经营的商品类别、品种及服务项目，反映企业业务活动的内容和生产经营方向</view
                >
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户资产信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">固定资产原值：</view>
                <view class="content">100（万元）</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">固定资产净值：</view>
                <view class="content">100（万元）</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">正式工人数：</view>
                <view class="content">1000（人）</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">临时工人数：</view>
                <view class="content">100（人）</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">年工资总金额：</view>
                <view class="content">1000（万元）</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">近三年平均年产值：</view>
                <view class="content">1000（万元）</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">近三年平均年利润：</view>
                <view class="content">100（万元）</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label w-100">近三年平均年缴税金额：</view>
                <view class="content">1000（万元）</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户其他信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">生产经营状况：</view>
                <view class="content">营业</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">主要产品种类：</view>
                <view class="content">设备、农资设备</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">个体户涉及情况：</view>
                <view class="content">不涉及主要生产设施</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">个体户初步处理方案：</view>
                <view class="content">无需搬迁、改造，需补偿实物</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">
                  企业生产和经营的商品类别、品种及服务项目，反映企业业务活动的内容和生产经营方向
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">个体工商户附件信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="list-img"> 图片列表 </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>
    <image
      class="edit-btn"
      src="@/static/images/icon_edit.png"
      mode="scaleToFill"
      @click="toLink"
    />
  </view>
</template>

<script lang="ts" setup>
import { routerForward } from '@/utils'

const toLink = () => {
  routerForward('selfBaseInfoEdit')
}
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      border-radius: 5rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .icon {
          width: 10rpx;
          height: 10rpx;
          margin-left: 10rpx;
        }

        .title {
          margin-left: 5rpx;
          font-size: 9rpx;
          font-weight: 600;
          color: #171718;
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 90rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);

            &.w-100 {
              width: 100rpx;
            }
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }

          .list-img {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .edit-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 66rpx;
    height: 66rpx;
  }
}
</style>
