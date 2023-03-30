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
            '序号',
            '名称',
            '规格型号',
            '单位',
            '数量',
            '用途',
            '建造/购置年份',
            '原价（万元）',
            '搬迁方式',
            '备注'
          ],
          ['', '', '', '', '', '', '', '', '', ''],
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
