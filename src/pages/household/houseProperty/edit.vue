<template>
  <view class="form-wrapper">
    <!-- 房屋产权编辑 -->
    <Back :title="title" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row v-if="commonParams.type === 'add'">
          <uni-col :span="24">
            <uni-forms-item
              required
              label="新增原因"
              :label-width="150"
              label-align="right"
              name="formData.addReason"
            >
              <uni-data-select v-model="formData.addReason" :localdata="dict[370]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <!-- <uni-col :span="12">
            <uni-forms-item
              label="建筑面积"
              :label-width="150"
              label-align="right"
              name="formData.landArea"
            >
              {{ formData.landArea}}
            </uni-forms-item>
          </uni-col> -->
          <uni-col :span="12">
              <view class="col">
                <view class="label">建筑面积（m²）：</view>
                <view class="content">{{ formData.landArea}}</view>
              </view>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="合法面积(m²)"
              :label-width="150"
              label-align="right"
              name="formData.landLegalArea"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landLegalArea"
                  @input="changeArea"
                />
                <view class="unit">㎡</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <!-- <uni-col :span="12">
            <uni-forms-item
              label="不合法面积(m²)"
              :label-width="150"
              label-align="right"
              name="formData.landIllegalArea"
            >
              {{ formData.landIllegalArea}}
            </uni-forms-item>
          </uni-col> -->
          <uni-col :span="12">
              <view class="col">
                <view class="label">不合法面积(m²)：</view>
                <view class="content"> {{ formData.landIllegalArea}}</view>
              </view>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="房屋编号"
              :label-width="150"
              label-align="right"
              name="formData.houseNo"
            >
              <uni-easyinput v-model="formData.houseNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <!-- <uni-col :span="12">
            <uni-forms-item
              label="共有人"
              :label-width="150"
              label-align="right"
              name="formData.ownersSituation"
            >
              <view class="flex-center">
                <view
                  :class="['name-wrapper', formData.ownersName ? 'isSelected' : '']"
                  @click="selectName"
                >
                  {{ formData.ownersName ? formData.ownersName : '请选择' }}
                </view>
                <view @click="resetOwnersName">
                  <image
                    class="icon_img"
                    src="@/static/images/icon_delete_mini.png"
                    mode="scaleToFill"
                  />
                </view>
              </view>
            </uni-forms-item>
          </uni-col> -->
          <!-- <uni-col :span="12">
            <uni-forms-item
              label="是否分权"
              :label-width="150"
              label-align="right"
              name="formData.separateFlag"
            >
               {{ formData.separateFlag == '1' ? '是' : '否' }} 
            </uni-forms-item>
          </uni-col> -->
          <uni-col :span="12">
              <view class="col">
                <view class="label">是否分权：</view>
                <view class="content"> {{ formData.separateFlag == '1' ? '是' : '否' }} </view>
              </view>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="房屋来源"
              :label-width="150"
              label-align="right"
              name="formData.houseNature"
            >
              <uni-data-select v-model="formData.houseNature" :localdata="dict[304]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <!-- <uni-col :span="12">
            <uni-forms-item
              label="其他共有人"
              :label-width="150"
              label-align="right"
              name="formData.outdoorOwners"
            >
              <uni-easyinput
                v-model="formData.outdoorOwners"
                maxlength="200"
                type="textarea"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col> -->
           <!-- <uni-col :span="12" v-if="formData.separateFlag == '1' ">
            <uni-forms-item
              required
              label="分权原因"
              :label-width="150"
              label-align="right"
              name="formData.separateReason"            
            >
               {{ formData.separateReason  }} 
            </uni-forms-item>
          </uni-col> -->
          <uni-col :span="12" v-if="formData.separateFlag == '1' ">
              <view class="col">
                <view class="label">分权原因：</view>
                <view class="content">{{ dict[435].filter((item:any) => item.value == formData.separateReason)[0]?.text }}</view>
              </view>
          </uni-col>
          <!-- <uni-col :span="12" v-if="formData.separateFlag == '1' ">
            <uni-forms-item
              required
              label="分权备注"
              :label-width="150"
              label-align="right"
              name="formData.separateRemark"
            >
                由{{ formData.demographicIdName }}户，{{ formData.houseNo }}幢房屋分权{{ formData.separateRemark }}
            </uni-forms-item>
          </uni-col> -->
          <uni-col :span="12" v-if="formData.separateFlag == '1' ">
              <view class="col">
                <view class="label">分权备注：</view>
                <!-- 由{{ formData.demographicIdName }}户，{{ formData.houseNo }}幢房屋分权 -->
                <view class="content">{{ formData.separateRemark }}</view>
              </view>
          </uni-col>
        </uni-row>
        <uni-row>
                    <uni-col :span="12">
            <uni-forms-item
              label="地理位置"
              name="formData.longitude"
              required
              :label-width="150"
              label-align="right"
            >
              <view class="lg-txt-wrapper">
                <!-- <uni-data-checkbox v-model="check" :localdata="lgTagList" /> -->
                <view class="position" @click="gotoMap">
                  <uni-icons type="map" color="#5D8CF7" size="14rpx" />
                  <text class="txt">{{
                    formData.longitude && formData.latitude
                      ? `${formData.longitude},${formData.latitude}`
                      : '获取定位'
                  }}</text>
                </view>
              </view>
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="层数"
              :label-width="150"
              label-align="right"
              name="formData.storeyNumber"
            >
              <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.storeyNumber"
                  @focus="inputFocus(1)"
                  @blur="inputBlur"
                />
                <view class="unit">层</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <!-- <uni-col :span="12">
            <uni-forms-item
              required
              label="建筑面积（m²）"
              :label-width="150"
              label-align="right"
              name="formData.landArea"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landArea"
                  @focus="inputFocus(2)"
                  @blur="inputBlur"
                  disabled
                  style="background-color: #f5f7fa;"
                />
                <view class="unit">㎡</view>
              </view>
            </uni-forms-item>
          </uni-col> -->
          <uni-col :span="12">
            <uni-forms-item
              required
              label="房屋结构"
              :label-width="150"
              label-align="right"
              name="formData.constructionType"
            >
              <uni-data-select v-model="formData.constructionType" :localdata="dict[252]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="集体土地使用权证"
              :label-width="150"
              label-align="right"
              name="formData.landNo"
            >
              <uni-easyinput v-model="formData.landNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="土地使用权证面积(m²)"
              :label-width="150"
              label-align="right"
              name="formData.landCardArea"
            >
              <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
                <input
                  class="input-txt"
                  placeholder="请输入"
                  type="number"
                  v-model="formData.landCardArea"
                />
                <view class="unit">㎡</view>
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="房屋所有权证"
              :label-width="150"
              label-align="right"
              name="formData.propertyNo"
            >
              <uni-easyinput v-model="formData.propertyNo" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="备注"
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput
                v-model="formData.remark"
                maxlength="200"
                type="textarea"
                placeholder="请输入"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              label="房屋平面示意图"
              :label-width="150"
              label-align="right"
              name="formData.housePic"
            >
              <upload-file
                v-model="formData.housePic"
                :file-list="formData.housePic"
                :limit="20"
                show-type="list"
                notCompress
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="土地证/房屋产权证照片"
              :label-width="150"
              label-align="right"
              name="formData.landPic"
            >
              <upload-file
                v-model="formData.landPic"
                :file-list="formData.landPic"
                :limit="20"
                show-type="list"
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="房屋照片"
              :label-width="150"
              label-align="right"
              name="formData.homePic"
            >
              <upload-file
                v-model="formData.homePic"
                :file-list="formData.homePic"
                :limit="20"
                show-type="list"
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="24">
            <uni-forms-item
              label="房屋其他附件照片"
              :label-width="150"
              label-align="right"
              name="formData.otherPic"
            >
              <upload-file
                v-model="formData.otherPic"
                :file-list="formData.otherPic"
                :limit="20"
                show-type="list"
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              :required="flag"
              label="不合法建筑佐证材料："
              :label-width="150"
              label-align="right"
              name="formData.otherProofPic"
            >
              <upload-file
                v-model="formData.otherProofPic"
                :file-list="formData.otherProofPic"
                :limit="20"
                show-type="list"
                :accepts="['.jpg', '.png']"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>
      </uni-forms>

      <image
        class="submit-btn"
        src="@/static/images/icon_submit.png"
        mode="scaleToFill"
        @click="submit"
      />
    </view>

    <!-- 搜索选择户号 -->
    <search-list
      v-show="showSearch"
      :mainType="MainType.PeasantHousehold"
      type="multiple"
      stage="implementation"
      @close="close"
      @confirm-select="confirmSelect"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { MainType } from '@/types/common'
import { routerBack, getStorage, StorageKey, fmtPicUrl, routerForward } from '@/utils'
import { addImpLandlordHouseApi, updateImpLandlordHouseApi, getImpLandlordItemApi } from '@/service'
import Back from '@/components/Back/Index.vue'
import UploadFile from '@/components/UploadFile/index.vue'
import SearchList from '@/components/SearchList/Index.vue'

const title = ref<string>('')
const commonParams = ref<any>({})

// 获取数据字典
const dict = getStorage(StorageKey.DICT)

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)
const demographicList = ref<any[]>([]) // 产权人列表
const showSearch = ref<boolean>(false)
const flag = ref<boolean>(false)

onLoad((option: any) => {
  if (option) {
    commonParams.value = JSON.parse(option.params)
    const { type } = commonParams.value
    if (type === 'edit') {
      title.value = '房屋产权编辑'
      getLandlordDetail()
    } else if (type === 'add') {
      title.value = '新增房屋产权'
    }
  }
})

// 表单数据
const formData = ref<any>({
  doorNo: commonParams.value.doorNo,
  status: 'implementation',
  addReason: '', // 新增原因
  houseNo: '', // 房屋编号
  storeyNumber: '', // 层数
  landArea: '', // 建筑面积
  constructionType: '', // 房屋结构
  houseNature: '', // 房屋性质
  demographicId: '', // 房屋产权人
  ownersSituation: '', // 共有人 ID
  ownersName: '', // 共有人姓名
  housePic: '[]', // 房屋平面示意图
  landPic: '[]', // 土地证/房屋产权证照片
  homePic: '[]', // 房屋照片
  otherPic: '[]', // 房屋其他附件照片
  isCompliance: '', // 是否合法
  landNo: '', // 集体土地使用权证
  propertyNo: '', // 房屋所有权证
  otherProofPic: '[]', // 其他佐证材料
  homesteadArea: '' //宅基地面积
})

/**
 * 获取业主详情
 * @param(object) uid
 */
const getLandlordDetail = () => {
  const { uid, itemUid } = commonParams.value
  getImpLandlordItemApi(uid).then((res: any) => {
    let houseArr: any = res && res.immigrantHouseList ? res.immigrantHouseList : []
    let demographicArr: any = res && res.demographicList ? res.demographicList : []

    if (houseArr && houseArr.length) {
      let obj: any = houseArr.filter((item: any) => item.uid === itemUid)[0]
      formData.value = {
        ...obj,
        housePic: fmtPicUrl(obj.housePic),
        landPic: fmtPicUrl(obj.landPic),
        homePic: fmtPicUrl(obj.homePic),
        otherPic: fmtPicUrl(obj.otherPic),
        otherProofPic: fmtPicUrl(obj.otherProofPic)
      }
    }

    if (demographicArr && demographicArr.length) {
      let arr: any = []
      demographicArr.map((item: any) => {
        if (item.name != '增计人口'&& item.isDelete != '1') {
          arr.push({
            text: item.name,
            value: item.id
          })
        }
      })
      demographicList.value = [...arr]
    }
  })
}

const changeArea = (val: any) => {
  console.log(val.detail.value,'合法面积数值')
  formData.value.landIllegalArea = formData.value.landArea - val.detail.value
  formData.value.landIllegalArea > 0 ? (flag.value = true) : (flag.value = false)
}

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

// 选择户主姓名/户号
const selectName = () => {
  showSearch.value = true
}

// 关闭搜索组件
const close = () => {
  showSearch.value = false
}

/**
 * 确认搜索户主姓名/户号
 * @param{Object} data
 */
const confirmSelect = (data: any) => {
  let idArr: any = []
  let nameArr: any = []
  if (data && data.length) {
    data.map((item: any) => {
      idArr.push(item.id)
      nameArr.push(item.label)
    })
    formData.value.ownersSituation = idArr.toString()
    formData.value.ownersName = nameArr.toString()
  }
  close()
}

const resetOwnersName = () => {
  formData.value.ownersSituation = ''
  formData.value.ownersName = ''
}
const gotoMap = () => {
  routerForward('map', {
    longitude: formData.value.longitude,
    latitude: formData.value.latitude
  })
}
const mapChooseCallBack = (data: any) => {
  console.log(data, '地理位置')

  if (data && data.longitude && data.latitude) {
    formData.value.longitude = data.longitude.toFixed(6)
    formData.value.latitude = data.latitude.toFixed(6)
  }
}

onMounted(() => {
  uni.$on('chooseMap', mapChooseCallBack)
  console.log(dict[435],'测试数据')
})

onBeforeUnmount(() => {
  uni.$off('chooseMap', mapChooseCallBack)
})
// 表单提交
const submit = () => {
  const { uid, doorNo, type } = commonParams.value
  const params = {
    doorNo,
    ...formData.value,
    housePic: fmtPicUrl(formData.value.housePic), // 房屋平面示意图
    landPic: fmtPicUrl(formData.value.landPic), // 土地证/房屋产权证照片
    homePic: fmtPicUrl(formData.value.homePic), // 房屋照片
    otherPic: fmtPicUrl(formData.value.otherPic), // 其他附件
    otherProofPic: fmtPicUrl(formData.value.otherProofPic) // 其他佐证材料
  }

  console.log('params:', params)

  if (!formData.value.addReason && type === 'add') {
    showToast('请输入新增原因')
    return
  } else if (!formData.value.houseNo) {
    showToast('请输入房屋编号')
    return
  } else if (!formData.value.storeyNumber) {
    showToast('请输入层数')
    return
  } else if (!formData.value.constructionType) {
    showToast('请选择房屋结构')
    return
  } else if (!formData.value.houseNature) {
    showToast('请输入房屋性质')
    return
  } else if (!formData.value.longitude) {
    showToast('请选择中心经纬度')
    return
  } else if ((!formData.value.otherProofPic || formData.value.otherProofPic === '[]') && flag.value) {
    showToast('请上传不合法建筑佐证材料')
    return
  }else {
    if (type === 'add') {
      addImpLandlordHouseApi(uid, params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    } else if (type === 'edit') {
      updateImpLandlordHouseApi(uid, params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            routerBack()
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .main {
    height: calc(100vh - 33rpx);
    padding: 6rpx;
    background-color: #e7edfd;
    border-radius: 2rpx;
    box-sizing: border-box;

    .form {
      height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
      padding: 9rpx 0;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      ::v-deep.uni-forms-item__label {
        font-size: 9rpx !important;
        color: rgba(23, 23, 24, 0.6) !important;
      }

      ::v-deep.uni-easyinput__content {
        width: 200rpx !important;

        .uni-easyinput__placeholder-class,
        .uni-input-input {
          font-size: 9rpx !important;
        }
      }

      ::v-deep.uni-data-tree,
      ::v-deep.uni-stat__select {
        flex: 0 auto !important;
        width: 200rpx !important;
      }

      ::v-deep.uni-select__input-text {
        width: 90% !important;
        font-size: 9rpx !important;
      }

      ::v-deep.uni-date,
      ::v-deep.uni-date-editor {
        width: 200rpx !important;
      }

      ::v-deep.uni-input-input,
      ::v-deep.uni-input-placeholder {
        font-size: 9rpx !important;
      }

      .flex-center {
        display: flex;
        align-items: center;
      }

      .name-wrapper {
        width: 200rpx;
        height: 23rpx;
        padding-left: 7rpx;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #999;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.isSelected {
          color: #171718;
        }
      }

      .icon_img {
        width: 23rpx;
        height: 23rpx;
        margin-left: 4rpx;
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 200rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        &.disabled {
          background-color: #f5f7fa;
        }

        .input-txt {
          width: 168rpx;
          height: 35px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
        }

        .unit {
          width: 23rpx;
          height: 35px;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
          text-align: center;
          background-color: #f5f7fa;
          border-left: 1px solid #d9d9d9;
        }
      }

      .input-txtarea-wrapper {
        display: flex;
        align-items: center;
        width: 570rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txtarea {
          width: 570rpx;
          height: 70px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
        }
      }

      .picker-wrapper {
        display: flex;
        width: 200rpx;
        height: 23rpx;
        padding-left: 7rpx;
        overflow: hidden;
        font-size: 9rpx;
        line-height: 23rpx;
        color: #171718;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        .uni-input {
          width: 180rpx;

          &.select {
            color: #999;
          }
        }
      }
    }

    .submit-btn {
      position: fixed;
      right: 25rpx;
      bottom: 20rpx;
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
    }
  }
}
.lg-txt-wrapper {
  display: flex;
  flex-direction: column;

  .position {
    display: flex;
    width: 200rpx;
    height: 23rpx;
    margin-top: 5rpx;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;

    .txt {
      margin-left: 6rpx;
      font-size: 9rpx;
      color: #171718;
    }
  }
}
.col {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 23rpx;

      .label {
        width: 120rpx;
        height: 23rpx;
        margin-right: 9rpx;
        font-size: 10rpx;
        color: rgba(23, 23, 24, 0.6);
        text-align: right;
      }

      .content {
        height: 23rpx;
        font-size: 10rpx;
        color: #171718;
      }
    }
</style>
