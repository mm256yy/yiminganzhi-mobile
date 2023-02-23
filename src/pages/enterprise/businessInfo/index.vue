<template>
  <view class="business-info-wrapper">
    <view class="title">收入概况</view>

    <uni-row>
      <uni-col class="sub-title" :span="4">收入情况：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(3)"
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
                :class="['txt', focusIndex === 4 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(4)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <uni-row>
      <uni-col class="sub-title" :span="4">主营业务收入：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 5 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(5)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 6 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(6)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 7 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(7)"
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
                :class="['txt', focusIndex === 8 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(8)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <uni-row>
      <uni-col class="sub-title" :span="4">其他业务收入：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 9 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(9)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 10 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(10)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 11 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(11)"
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
                :class="['txt', focusIndex === 12 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(12)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">工资概况</view>

    <uni-row>
      <uni-col class="sub-title" :span="4">员工工资总数：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 13 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(13)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 14 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(14)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 15 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(15)"
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
                :class="['txt', focusIndex === 16 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(16)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <uni-row>
      <uni-col class="sub-title" :span="4">基本工资：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 17 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(17)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 18 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(18)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 19 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(19)"
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
                :class="['txt', focusIndex === 20 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(20)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <uni-row>
      <uni-col class="sub-title" :span="4">政策性补贴：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 21 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(21)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 22 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(22)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 23 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(23)"
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
                :class="['txt', focusIndex === 24 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(24)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <uni-row>
      <uni-col class="sub-title" :span="4">政策性津贴：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 25 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(25)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 26 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(26)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 27 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(27)"
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
                :class="['txt', focusIndex === 28 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(28)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <uni-row>
      <uni-col class="sub-title" :span="4">经常性奖金：</uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 29 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(29)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 30 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(30)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 31 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(31)"
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
                :class="['txt', focusIndex === 32 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(32)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">职工福利基金</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 33 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(33)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 34 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(34)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 35 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(35)"
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
                :class="['txt', focusIndex === 36 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(36)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">工会经费</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 37 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(37)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 38 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(38)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 39 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(39)"
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
                :class="['txt', focusIndex === 40 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(40)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">企业公积金</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 41 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(41)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 42 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(42)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 43 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(43)"
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
                :class="['txt', focusIndex === 44 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(44)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">离休人员费用</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 45 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(45)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 46 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(46)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 47 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(47)"
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
                :class="['txt', focusIndex === 48 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(48)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">上缴税收</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 49 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(49)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 50 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(50)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 51 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(51)"
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
                :class="['txt', focusIndex === 52 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(52)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">企业留利</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 53 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(53)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 54 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(54)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 55 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(55)"
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
                :class="['txt', focusIndex === 56 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(56)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">流动资产贷款</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 57 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(57)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 58 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(58)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 59 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(59)"
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
                :class="['txt', focusIndex === 60 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(60)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">上交管理费</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 61 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(61)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 62 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(62)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 63 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(63)"
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
                :class="['txt', focusIndex === 64 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(64)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">其它财务费用</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 65 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(65)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 66 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(66)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 67 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(67)"
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
                :class="['txt', focusIndex === 68 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(68)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>

    <view class="title">其它</view>

    <uni-row>
      <uni-col class="sub-title" :span="4"></uni-col>
      <uni-col :span="20">
        <uni-row>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近1年：</view>
              <view :class="['input-wrapper', focusIndex === 69 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(69)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近2年：</view>
              <view :class="['input-wrapper', focusIndex === 70 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(70)"
                  @blur="inputBlur"
                />
                <view class="unit">元</view>
              </view>
            </view>
          </uni-col>
          <uni-col :span="8">
            <view class="col">
              <view class="label">近3年：</view>
              <view :class="['input-wrapper', focusIndex === 71 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.plantIncome"
                  @focus="inputFocus(71)"
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
                :class="['txt', focusIndex === 72 ? 'focus' : '']"
                placeholder="请输入"
                type="number"
                v-model="formData.remark"
                @focus="inputFocus(72)"
                @blur="inputBlur"
              ></textarea>
            </view>
          </uni-col>
        </uni-row>
      </uni-col>
    </uni-row>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formData = ref<any>({})

const focusIndex = ref<number>(-1)

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}
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
}
</style>
