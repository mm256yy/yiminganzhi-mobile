<template>
  <Container :title="uid ? '编辑自然村' : '添加自然村'">
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData" :rules="rules">
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="所属区域"
              :label-width="170"
              label-align="right"
              name="formData.parentCode"
            >
              <VillageSelectFormItem v-model="formData.parentCode" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item
              required
              label="自然村名称"
              :label-width="170"
              label-align="right"
              name="formData.name"
            >
              <uni-easyinput v-model="formData.name" type="text" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row>
          <uni-col :span="24">
            <uni-forms-item label="中心经纬度" :label-width="170" label-align="right">
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
                <!-- <template v-else-if="check === 2">
                  <uni-easyinput
                    class="m-t-5"
                    type="digit"
                    v-model="formData.longitude"
                    placeholder="输入经度"
                  />
                  <uni-easyinput
                    class="m-t-5"
                    type="digit"
                    v-model="formData.latitude"
                    placeholder="输入纬度"
                  />
                </template> -->
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>
      </uni-forms>

      <TreeSelect
        v-if="showVillageSelect"
        :tree-data="districtTree"
        :value="codes"
        :title="villageTitle"
        @on-close="villageClose"
        @on-confirm="villageConfirm"
      />

      <image
        class="submit-btn"
        src="@/static/images/icon_submit.png"
        mode="scaleToFill"
        @click="submit"
      />
    </view>
  </Container>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Container from '@/components/Container/index.vue'
import TreeSelect from '@/components/VillageTreeSelect/index.vue'
import VillageSelectFormItem from '@/components/VillageSelectFormItem/index.vue'
import { getOtherItemApi, addVillageApi, updateVillageApi, getVillageItemApi } from '@/service'
import { OtherDataType } from '@/database'
import { onLoad } from '@dcloudio/uni-app'
import { guidFour, setStorage, getStorage, StorageKey, routerBack, routerForward } from '@/utils'

// 表单数据
const formData = ref<any>({
  parentCode: '',
  name: '',
  longitude: '',
  latitude: '',
  address: ''
})

// 表单校验规则
const rules = ref<any>({})

const districtTree = ref<any[]>([])
const codes = ref<string[]>([])
const villageTitle = ref<string[]>([])
const showVillageSelect = ref<boolean>(false)
const uid = ref<string>('')
const type = ref<'add' | 'edit'>('add')
const detail = ref<any>(null)

const districtMap = getStorage(StorageKey.DISTRICTMAP)

onLoad((option: any) => {
  if (option) {
    uid.value = option.uid
    type.value = option.type

    getDetail()
  }
})

const gotoMap = () => {
  routerForward('map', {
    longitude: formData.value.longitude,
    latitude: formData.value.latitude
  })
}

const getDetail = () => {
  if (uid.value) {
    getVillageItemApi(uid.value).then((res) => {
      if (res) {
        detail.value = res
        formData.value.parentCode = res.parentCode
        formData.value.name = res.name
        formData.value.longitude = res.longitude
        formData.value.latitude = res.latitude
        formData.value.address = res.address
      }
    })
  }
}

// 表单提交
const submit = () => {
  const subData = {
    name: formData.value.name,
    parentCode: formData.value.parentCode,
    longitude: formData.value.longitude,
    latitude: formData.value.latitude,
    address: formData.value.address
  }
  if (!subData.name || !subData.parentCode) {
    return uni.showToast({
      title: '存在必填项未填写',
      icon: 'none'
    })
  }
  console.log('表单提交', subData)
  if (uid.value) {
    updateVillageApi({ ...detail.value, ...subData, uid: uid.value }).then((res) => {
      if (res) {
        uni.showToast({
          title: '更新成功',
          icon: 'success'
        })
        routerBack()
      }
    })
  } else {
    const code = `${subData.parentCode}${guidFour()}`
    addVillageApi({ ...subData, code }).then((res) => {
      if (res) {
        uni.showToast({
          title: '添加成功',
          icon: 'success'
        })
        districtMap[code] = subData.name
        setStorage(StorageKey.DISTRICTMAP, districtMap)
        routerBack()
      }
    })
  }
}

const getDistrictTree = async () => {
  const res = await getOtherItemApi(OtherDataType.DistrictTree)
  if (res) {
    districtTree.value = res
  }
}

getDistrictTree()

const villageConfirm = (code: string[], tit: string[]) => {
  codes.value = code
  villageTitle.value = tit
  formData.value.parentCode = code[2]
  showVillageSelect.value = false
}

const villageClose = () => {
  showVillageSelect.value = false
}

const mapChooseCallBack = (data: any) => {
  console.log(data, 'map 推送的消息')
  if (data && data.longitude && data.latitude) {
    formData.value.longitude = data.longitude
    formData.value.latitude = data.latitude
  }
}

onMounted(() => {
  uni.$on('chooseMap', mapChooseCallBack)
})

onBeforeUnmount(() => {
  uni.$off('chooseMap', mapChooseCallBack)
})
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  padding: 6rpx;
  overflow-y: scroll;
  background-color: #e7edfd;
  border-radius: 2rpx;
  box-sizing: border-box;

  .form {
    height: 100%;
    padding: 9rpx 0;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;

    ::v-deep.uni-forms-item__label {
      font-size: 9rpx !important;
      color: rgba(23, 23, 24, 0.6) !important;
    }

    ::v-deep.uni-easyinput__content {
      width: 211rpx !important;
      height: 23rpx;
      background: #ffffff;
      border: 1rpx solid #e6e6e6;
      border-radius: 1rpx;

      .uni-easyinput__placeholder-class,
      .uni-input-input {
        font-size: 9rpx !important;
      }
    }

    ::v-deep.uni-data-tree,
    ::v-deep.uni-stat__select {
      flex: 0 auto !important;
      width: 211rpx !important;
    }

    ::v-deep.uni-select__input-text {
      width: 90% !important;
      font-size: 9rpx !important;
    }

    ::v-deep.uni-date,
    ::v-deep.uni-date-editor {
      width: 211rpx !important;
    }

    ::v-deep.uni-input-input,
    ::v-deep.uni-input-placeholder {
      font-size: 9rpx !important;
    }

    .code-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 211rpx;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &.focus {
        border-color: rgb(41, 121, 255);
      }

      .pre-txt {
        width: 104rpx;
        height: 35px;
        padding-left: 7rpx;
        font-size: 9rpx;
        line-height: 35px;
        color: #171718;
        background-color: #f5f7fa;
        border-right: 1px solid #d9d9d9;
      }

      .input-txt {
        width: 84rpx;
        height: 35px;
        padding-left: 11rpx;
        font-size: 9rpx;
        line-height: 35px;
        color: #171718;
      }
    }

    .lg-txt-wrapper {
      display: flex;
      flex-direction: column;
    }
  }

  .position {
    display: flex;
    width: 211rpx;
    height: 23rpx;
    margin-top: 5rpx;
    background: #ffffff;
    border: 1rpx solid #d9d9d9;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;

    .txt {
      margin-left: 6rpx;
      font-size: 9rpx;
      color: #171718;
    }
  }

  .submit-btn {
    position: fixed;
    right: 25rpx;
    bottom: 20rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;
  }
}
</style>
