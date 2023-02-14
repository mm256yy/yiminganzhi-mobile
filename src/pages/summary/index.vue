<template>
  <view>
    <text>汇总</text>
    <button @click="getAllTables">数据同步</button>

    <view class="box">
      <view v-for="item in list" :key="item.id">
        <text>{{ item.uid }}</text>
        <text>{{ item.name }}</text>
        <text>{{ item.content }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PullData } from '@/pull/index'
import { db, ProjectTableName } from '@/database'

const list = ref<any[]>([])
const pullInstance = new PullData()

const getAllTables = () => {
  console.log('迪纳吉')
  db.selectSql(
    `
SELECT name FROM sqlite_master 
WHERE type='table' 
ORDER BY name;`
  )
    .then((res) => {
      console.log(res, 'res')
    })
    .catch((err) => {
      console.log(err, 'err')
    })
}

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
