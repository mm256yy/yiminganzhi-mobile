<template>
  <view class="business-info-wrapper">
    <view class="title" v-if="pevenueData && pevenueData.length > 0">收入情况</view>

    <uni-row v-for="item in pevenueData" :key="item.id">
      <uni-col class="sub-title" :span="4">{{ item.name }}：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="salaryData && salaryData.length > 0">工资情况</view>

    <uni-row v-for="item in salaryData" :key="item.id">
      <uni-col class="sub-title" :span="4">{{ item.name }}</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="welfareFundData && welfareFundData.length > 0">职工福利基金</view>

    <uni-row v-for="item in welfareFundData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="laborUnionFundsData && laborUnionFundsData.length > 0">工会经费</view>

    <uni-row v-for="item in laborUnionFundsData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="accumulationFundData && accumulationFundData.length > 0">
      企业公积金
    </view>

    <uni-row v-for="item in accumulationFundData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="leaveExpensesData && leaveExpensesData.length > 0">离休人员费用</view>

    <uni-row v-for="item in leaveExpensesData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="taxPaidData && taxPaidData.length > 0">上缴税收</view>

    <uni-row v-for="item in taxPaidData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="entProfitData && entProfitData.length > 0">企业留利</view>

    <uni-row v-for="item in entProfitData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="currentAssetLoans && currentAssetLoans.length > 0">流动资产贷款</view>

    <uni-row v-for="item in currentAssetLoans" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="mngFeePaidData && mngFeePaidData.length > 0">上交管理费</view>

    <uni-row v-for="item in mngFeePaidData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="otherExpenseData && otherExpenseData.length > 0">其他财务费用</view>

    <uni-row v-for="item in otherExpenseData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title" v-if="otherData && otherData.length > 0">其他</view>

    <uni-row v-for="item in otherData" :key="item.id">
      <uni-col class="sub-title" :span="4" />
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === item.id ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastYearAmount"
                  @focus="inputFocus(item.id)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastTwoYearAmount"
                  @focus="inputFocus(item.id * 2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === item.id * 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  disabled
                  type="number"
                  v-model="item.lastThreeYearAmount"
                  @focus="inputFocus(item.id * 3)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col class="m-t-10 m-b-10" :span="24">
            <view class="txtarea-wrapper">
              <view class="label">备注：</view>
              <textarea
                :class="['txt', focusIndex === item.id * 4 ? 'focus' : '']"
                disabled
                v-model="item.remark"
                @focus="inputFocus(item.id * 4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <image class="btn" src="@/static/images/icon_edit.png" mode="scaleToFill" @click="toEdit" />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getFamilyIncomeListApi } from '@/service'
import { MainType } from '@/types/common'
import { routerForward } from '@/utils'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const focusIndex = ref<number>(-1)

// 公共的参数
const commonParams = {
  doorNo: props.dataInfo.doorNo,
  lastYearAmount: '', // 近一年收入
  lastTwoYearAmount: '', // 近两年收入
  lastThreeYearAmount: '', // 近三年收入
  remark: '' // 备注
}

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

// 收入概况
const pevenueData = ref<any>([])

// 工资概况
const salaryData = ref<any>([])

// 职工福利基金
const welfareFundData = ref<any>([])

// 工会经费
const laborUnionFundsData = ref<any>([])

// 企业公积金
const accumulationFundData = ref<any>([])

// 离休人员费用
const leaveExpensesData = ref<any>([])

// 上缴税收
const taxPaidData = ref<any>([])

// 企业留利
const entProfitData = ref<any>([])

// 流动资产贷款
const currentAssetLoans = ref<any>([])

// 上交管理费
const mngFeePaidData = ref<any>([])

// 其他财务费用
const otherExpenseData = ref<any>([])

// 其他
const otherData = ref<any>([])

const emit = defineEmits(['updateData'])

onShow(() => {
  // 接收来自编辑页派发的 updateData 事件
  uni.$on('updateData', (data: any) => {
    let arr: any = [...JSON.parse(data)]
    resetData()
    if (arr && arr.length) {
      genNewArr(arr)
    }
    emit('updateData')
  })
})

// 数据重置
const resetData = () => {
  // 收入概况
  pevenueData.value = []

  // 工资概况
  salaryData.value = []

  // 职工福利基金
  welfareFundData.value = []

  // 工会经费
  laborUnionFundsData.value = []

  // 企业公积金
  accumulationFundData.value = []

  // 离休人员费用
  leaveExpensesData.value = []

  // 上缴税收
  taxPaidData.value = []

  // 企业留利
  entProfitData.value = []

  // 流动资产贷款
  currentAssetLoans.value = []

  // 上交管理费
  mngFeePaidData.value = []

  // 其他财务费用
  otherExpenseData.value = []

  // 其他
  otherData.value = []
}

// 编辑
const toEdit = () => {
  const { doorNo, uid } = props.dataInfo
  routerForward('businessInfoEdit', { doorNo, uid })
}

/**
 * 初始化生成新的数组
 * @param {Object} arr 数组
 */
const genArr = (arr?: any[]) => {
  if (arr && arr.length > 0) {
    arr.map((item: any) => {
      if (item.configType === MainType.Company) {
        if (item.type === '1') {
          pevenueData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '2') {
          salaryData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '3') {
          welfareFundData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '4') {
          laborUnionFundsData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '5') {
          accumulationFundData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '6') {
          leaveExpensesData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '7') {
          taxPaidData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '8') {
          entProfitData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '9') {
          currentAssetLoans.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '10') {
          mngFeePaidData.value.push({
            ...item,
            ...commonParams
          })
        } else if (item.type === '11') {
          otherExpenseData.value.push({
            ...item,
            ...commonParams
          })
        } else {
          otherData.value.push({
            ...item,
            ...commonParams
          })
        }
      }
    })
  }
}

/**
 * 回显时生成新的数组
 * @param {Object} arr 数组
 */
const genNewArr = (arr?: any[]) => {
  if (arr && arr.length > 0) {
    arr.map((item: any) => {
      if (item.type === '1') {
        pevenueData.value.push({
          ...item
        })
      } else if (item.type === '2') {
        salaryData.value.push({
          ...item
        })
      } else if (item.type === '3') {
        welfareFundData.value.push({
          ...item
        })
      } else if (item.type === '4') {
        laborUnionFundsData.value.push({
          ...item
        })
      } else if (item.type === '5') {
        accumulationFundData.value.push({
          ...item
        })
      } else if (item.type === '6') {
        leaveExpensesData.value.push({
          ...item
        })
      } else if (item.type === '7') {
        taxPaidData.value.push({
          ...item
        })
      } else if (item.type === '8') {
        entProfitData.value.push({
          ...item
        })
      } else if (item.type === '9') {
        currentAssetLoans.value.push({
          ...item
        })
      } else if (item.type === '10') {
        mngFeePaidData.value.push({
          ...item
        })
      } else if (item.type === '11') {
        otherExpenseData.value.push({
          ...item
        })
      } else {
        otherData.value.push({
          ...item
        })
      }
    })
  }
}

// 获取经营现状信息配置列表
const getBusinessList = async () => {
  const result = await getFamilyIncomeListApi()
  console.error(result)

  genArr(result)
}

onMounted(() => {
  if (props.dataList && props.dataList.length > 0) {
    genNewArr(props.dataList)
  } else {
    getBusinessList()
  }
})
</script>

<style lang="scss" scoped>
.business-info-wrapper {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  border: 1px solid #f0f0f0;

  .title {
    width: 100%;
    height: 28rpx;
    padding-left: 9rpx;
    font-size: 9rpx;
    font-weight: 600;
    line-height: 28rpx;
    color: #171718;
    background: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    &:first-child {
      border-top: none;
    }
  }

  .sub-title {
    padding-left: 10rpx !important;
    margin-top: 16rpx;
    font-size: 9rpx;
    color: #171718;
  }

  .col {
    display: flex;
    align-items: center;
    margin-top: 10rpx;

    .label {
      width: 40rpx;
      font-size: 9rpx;
      color: rgba(23, 23, 24, 0.6);
      text-align: right;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      height: 23rpx;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &.focus {
        border-color: rgb(41, 121, 255);
      }

      .input-txt {
        width: 60rpx;
        height: 23rpx;
        padding-left: 9rpx;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #171718;
      }

      .unit {
        width: 20rpx;
        height: 22rpx;
        font-size: 9rpx;
        line-height: 22rpx;
        color: #171718;
        text-align: center;
        background-color: #f5f7fa;
        border-left: 1px solid #d9d9d9;
        border-top-right-radius: 3rpx;
        border-bottom-right-radius: 3rpx;
      }
    }
  }

  .txtarea-wrapper {
    display: flex;
    align-items: center;

    .label {
      width: 40rpx;
      font-size: 9rpx;
      color: rgba(23, 23, 24, 0.6);
      text-align: right;
    }

    .txt {
      width: 85%;
      height: 40rpx;
      padding: 5rpx;
      font-size: 9rpx;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &.focus {
        border-color: rgb(41, 121, 255);
      }
    }
  }

  .txt-wrapper {
    display: flex;
    align-items: center;

    .label {
      width: 80rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .amount {
      width: 124rpx;
      height: 23rpx;
      padding-left: 9rpx;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
    }

    .unit {
      width: 40rpx;
      height: 23rpx;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
      text-align: center;
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    bottom: 16rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;
  }
}
</style>
