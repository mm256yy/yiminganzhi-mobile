<template>
  <view class="base-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业基本信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业名称：</view>
                <view class="content">{{ formatStr(props.baseInfo.name) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业编码：</view>
                <view class="content">{{ formatStr(props.baseInfo.doorNo) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ dictOption(locationTypes, props.baseInfo.locationType) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业联系方式：</view>
                <view class="content">{{ formatStr(props.baseInfo.phone) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">所属区域：</view>
                <view class="content">
                  {{
                    props.baseInfo.areaCodeText +
                    props.baseInfo.townCodeText +
                    props.baseInfo.villageCodeText
                  }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业法人信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">法人姓名：</view>
                <view class="content">{{ formatStr(props.dataInfo.legalPersonName) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">法人身份证号：</view>
                <view class="content">{{ formatStr(props.dataInfo.legalPersonCard) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">法人联系方式：</view>
                <view class="content">{{ formatStr(props.dataInfo.legalPersonPhone) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业证照信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证类型：</view>
                <view class="content">{{ formatDict(props.dataInfo.licenceType, 217) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证编号：</view>
                <view class="content">{{ formatStr(props.dataInfo.licenceNo) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证有效期：</view>
                <view class="content">{{ fmtDate(props.dataInfo.periodValidity, 7) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">许可证颁布单位：</view>
                <view class="content">{{ formatStr(props.dataInfo.issuingCompany) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">税务许可证编号：</view>
                <view class="content">{{ formatStr(props.dataInfo.taxLicenceNo) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">税务许可证有效期：</view>
                <view class="content">{{ fmtDate(props.dataInfo.taxPeriodValidity, 7) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">税务许可证颁布单位：</view>
                <view class="content">{{ formatStr(props.dataInfo.taxLicenceCompany) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业工商信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">登记注册类型：</view>
                <view class="content">{{ formatDict(props.dataInfo.registerType, 219) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">成立日期：</view>
                <view class="content">{{ fmtDate(props.dataInfo.establishDate, 7) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所属行业：</view>
                <view class="content">{{ formatDict(props.dataInfo.industryType, 215) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">注册资金：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.registeredAmount, '（万元）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业地址：</view>
                <view class="content">{{ formatStr(props.baseInfo.address) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所属分类：</view>
                <view class="content">{{ formatDict(props.dataInfo.companyType, 216) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">经济性质：</view>
                <view class="content">{{ formatStr(props.dataInfo.economicNature) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">其他权证情况：</view>
                <view class="content">{{ formatStr(props.dataInfo.ohterLicence) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">经营范围：</view>
                <view class="content">{{ formatStr(props.dataInfo.natureBusiness) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业资产信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">固定资产原值：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.fixedAssetsOriginalValue, '（万元）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">固定资产净值：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.fixedAssetsNetValue, '（万元）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">正式工人数：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.regularWorkerNum, '（人）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">临时工人数：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.temporaryWorkerNum, '（人）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">年工资总金额：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.annualPayroll, '（万元）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">近三年平均年产值：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.averageAnnualOutputValue, '（万元）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">近三年平均年利润：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.averageAnnualProfit, '（万元）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label w-100">近三年平均年缴税金额：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.averageAnnualTaxPaid, '（万元）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">企业其他信息</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">生产经营状况：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.managementStatus, 213) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">主要产品种类：</view>
                <view class="content">{{ formatStr(props.dataInfo.productCategory) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业涉及情况：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.informationInvolved, 209) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">企业初步处理方案：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.treatmentScheme, 210) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">{{ formatStr(props.dataInfo.otherRemark) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">土地使用情况</view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">出让权属面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.sellOwnershipArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">出让占用面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.sellOccupiedArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">划拨权属面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.transferOwnershipArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">划拨占用面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.transferOccupiedArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">租用权属面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.rentOwnershipArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">租用占用面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.rentOccupiedArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">其他权属面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.otherOwnershipArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">其他占用面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.otherOccupiedArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">合计权属面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.totalOwnershipArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">合计占用面积：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.totalOccupiedArea, '（亩）') }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">{{ formatStr(props.dataInfo.remark) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>

      <view class="list-item">
        <view class="list-1">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <view class="title">营业执照</view>
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
import { fmtDate, dictOption, formatStr, formatDict, splitStr } from '@/utils'
import { locationTypes } from '@/config/common'

const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  baseInfo: {
    type: Object as any,
    default: () => {}
  }
})

const toLink = () => {
  const {
    name,
    doorNo,
    locationType,
    phone,
    parentCode,
    periodValidity,
    establishDate,
    taxPeriodValidity
  } = props.baseInfo

  const params = {
    ...props.dataInfo,
    name,
    locationType,
    phone,
    parentCode,
    preNo: splitStr(doorNo, 0, 8),
    suffixNo: splitStr(doorNo, 8, 12),
    periodValidity: fmtDate(periodValidity),
    establishDate: fmtDate(establishDate),
    taxPeriodValidity: fmtDate(taxPeriodValidity)
  }

  uni.navigateTo({
    url: '/pages/enterprise/baseInfo/edit?params' + JSON.stringify(params)
  })
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
