<template>
  <Container title="生产安置">
    <view class="common-wrap">
      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>安置信息</text>
      </view>

      <PeopleList :isEdit="true" :demographic-list="demographicList" @submit="produceSubmit" :immigrantSettle="immigrantSettle"/>
    </view>
  </Container>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Container from '@/components/Container/index.vue'
import PeopleList from '../imitateResettle/components/people.vue'
import { PopulationType } from '@/types/datafill'
import { updateImpLandlordPeopleBatchApi, getImpLandlordItemApi } from '@/service'
import { routerBack } from '@/utils'

const demographicList = ref<PopulationType[]>([])
const uid = ref<string>('')
const immigrantSettle=ref<any>()

onLoad((option) => {
  if (option && option.uid) {
    uid.value = option.uid
    immigrantSettle.value=JSON.parse(option.immigrantSettle)
    console.log(option.immigrantSettle,'测试编辑数据')
    getLandlordDetail()
  }
})

// 获取调查对象详情的档案数据
const getLandlordDetail = async () => {
  if (uid.value) {
    const res = await getImpLandlordItemApi(uid.value)
    if (res) {
      demographicList.value = res.demographicList
      // .filter((item) => item.name !== '增计人口')
    }
  }
}

const produceSubmit = async (data: PopulationType[]) => {
  const res = await updateImpLandlordPeopleBatchApi(uid.value, data)
  if (res) {
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    routerBack()
  }
}
</script>

<style lang="scss" scoped>
.common-wrap {
  height: 100%;
  padding: 6rpx;
  overflow-y: scroll;
  background-color: #fff;
}

.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
  border-radius: 5rpx 5rpx 0px 0px;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 10rpx;
    height: 10rpx;
    margin-right: 6rpx;
  }
}
</style>
