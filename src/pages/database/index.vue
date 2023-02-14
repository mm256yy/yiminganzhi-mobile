<template>
  <view>
    <view>
      <text>农户表数据展示</text>
      <view class="box">
        <view v-for="item in landlordList" :key="item.id">
          <text>{{ item.uid }}</text>
          <text>{{ item.name }}</text>
          <text>{{ item.content }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { db, LandlordTableName, ProjectTableName } from '@/database'

const landlordList = ref<any[]>([])
const list = ref<any[]>([])

const getLandlord = () => {
  db.selectSql(`select * from ${ProjectTableName}`).then((res: any) => {
    list.value = res
  })
}
getLandlord()
</script>

<style lang="scss">
.box {
  width: 750rpx;
  height: 300rpx;
  background-color: #fafafa;
}
</style>
