<template>
  <view>
    <button @click="openSQL">打开数据库</button>
    <button @click="createTable">创建表</button>
    <button @click="insertTableData">新增表数据</button>
    <button @click="selectTableData">查询表数据</button>
    <button @click="updateTableData">修改表数据</button>
    <button @click="deleteTableData">按条件删除表数据</button>
    <button @click="closeSQL">关闭数据库</button>

    <view
      style="margin-top: 10px"
      class="uni-divider__content"
      v-for="(item, index) in listData"
      :key="index"
    >
      <view>名字:{{ item.name }}</view>
      <view>内容:{{ item.content }}</view>
      <view>时间:{{ item.time }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { db } from '@/database/db'

const listData = ref<
  Array<{
    [key: string]: any
  }>
>([])

const openSQL = () => {
  // 这个是查询有没有打开数据库
  let open = db.isOpen()
  console.log('数据库状态', open ? '开启' : '关闭')
  if (!open) {
    db.openDB()
      .then((res) => {
        showToast('数据库已打开')
      })
      .catch((error) => {
        console.log('数据库开启失败')
      })
  }
}

// 关闭数据库
const closeSQL = () => {
  // 这个是查询有没有打开数据库
  let open = db.isOpen()
  if (open) {
    db.closeDB()
      .then((res) => {
        showToast('数据库已关闭')
      })
      .catch((error) => {
        showToast('数据库关闭失败')
      })
  }
}

// 创建表
const createTable = () => {
  let open = db.isOpen()
  if (open) {
    openSQL()
    let sql = '"id" INTEGER PRIMARY KEY AUTOINCREMENT,"name" text,"content" text,"time" text'
    // 创建表 db.createTable(表名, 表的列)
    db.createTable('chat', sql)
      .then((res) => {
        showToast('创建chat表成功')
      })
      .catch((error) => {
        showToast('创建表失败')
      })
  } else {
    showToast('数据库未打开')
  }
}

// 新增表数据
const insertTableData = () => {
  let open = db.isOpen()
  if (open) {
    let arr = [
      {
        name: '小明',
        content: '你好呀'
      },
      {
        name: '小红',
        content: 'HI'
      }
    ]
    arr.map((item) => {
      let time = formatDate(new Date().getTime())
      let sql = `'${item.name}','${item.content}','${time}'`
      let condition = "'name','content','time'"
      // 新增 db.insertTableData(表名, 对应表头列的数据)
      db.insertTableData('chat', sql, condition)
        .then((res) => {
          showToast('新增数据成功')
          selectTableData()
        })
        .catch((error) => {
          console.log('失败', error)
        })
    })
  } else {
    showToast('数据库未打开')
  }
}

// 查询表数据
const selectTableData = () => {
  let open = db.isOpen()
  if (open) {
    // 查询表 db.selectTableData(表名,查询条件列名,查询条件列值)
    db.selectTableData('chat')
      .then((res: any) => {
        console.log('contact表数据', res)
        listData.value = res
      })
      .catch((error) => {
        console.log('查询失败', error)
      })
  } else {
    showToast('数据库未打开')
  }
}

// 修改表数据
const updateTableData = () => {
  let open = db.isOpen()
  if (open) {
    let time = formatDate(new Date().getTime())
    let data = `content = '我被修改了',time = '${time}'`
    // 修改表数据 db.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
    db.updateTableData('chat', data, 'name', '小明')
      .then((res) => {
        showToast('更新chat表成功')
        selectTableData()
      })
      .catch((error) => {
        console.log('修改失败', error)
      })
  } else {
    showToast('数据库未打开')
  }
}

// 删除表数据
const deleteTableData = () => {
  let open = db.isOpen()
  if (open) {
    // 删除表 db.deleteTableData(表名,查询条件列名,查询条件列值)
    db.deleteTableData('chat', 'name', '小红')
      .then((res) => {
        showToast('删除表数据成功')
        selectTableData()
      })
      .catch((error) => {
        console.log('删除失败', error)
      })
  } else {
    showToast('数据库未打开')
  }
}

// 提示框
const showToast = (str: string) => {
  uni.showToast({
    icon: 'none',
    title: str,
    mask: true
  })
}

const formatDate = (time: any) => {
  return time
}
</script>
