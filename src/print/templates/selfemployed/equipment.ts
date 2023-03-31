export const selfemployedEquipmentDefinition = {
  content: [
    {
      text: '基本情况调查表',
      fontSize: 16,
      bold: true,
      margin: [0, 0, 0, 29]
    },
    {
      alignment: 'left',
      fontSize: 9,
      margin: [0, 0, 0, 8],
      columns: [[{ text: '个体工商户名称：' }], [{ text: '所在位置：' }], [{ text: '联系方式：' }]]
    },

    {
      table: {
        heights: 22,
        widths: [26, 82, 42, 26, 26, 82, 58, 58, 42, '*'],
        body: [
          [
            { text: '序号', style: 'td' },
            { text: '名称', style: 'td' },
            { text: '规格型号', style: 'td' },
            { text: '单位', style: 'td' },
            { text: '数量', style: 'td' },
            { text: '用途', style: 'td' },
            { text: '建造/购置年份', style: 'td' },
            { text: '原价（万元）', style: 'td' },
            { text: '搬迁方式', style: 'td' },
            { text: '备注', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '', '', '', '', '']
        ]
      }
    },
    {
      alignment: 'left',
      margin: [0, 10, 0, 0],
      columns: ['分类目录：', '所属阶段：', '']
    }
  ],
  styles: {
    // td垂直居中
    td: {
      margin: [0, 7, 0, 0]
    },
    td_2: {
      margin: [0, 21, 0, 0]
    },
    td_3: {
      margin: [0, 28, 0, 0]
    },

    // table样式
    table: {
      heights: 22
    }
  },
  footer: function (currentPage: number, pageSize: any) {
    return [
      {
        margin: [20, 0, 20, 50],
        alignment: 'left',
        columns: [
          {
            text: '法人代表签字：',
            decoration: 'underline',
            decorationStyle: 'dashed'
          },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            decoration: 'underline',
            decorationColor: '#000000'
          },
          {
            text: '调查员签字：',
            margin: [58, 0, 0, 0],
            decoration: 'underline',
            decorationStyle: 'dashed'
          },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            decoration: 'underline',
            decorationColor: '#000000'
          },
          {
            text: '调查时间：',
            margin: [58, 0, 0, 0],
            decoration: 'underline',
            decorationStyle: 'dashed'
          },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            decoration: 'underline',
            decorationColor: '#000000'
          }
        ]
      },

      {
        text: `${currentPage}/${pageSize}`
      }
    ]
  }
}
