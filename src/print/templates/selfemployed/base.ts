export const selfemployedBaseDefinition = {
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
      margin: [0, 0, 0, 18],
      columns: [
        [{ text: '县（市/区）：' }, { text: '个体工商户名称：', margin: [0, 8, 0, 0] }],
        [{ text: '行政村：' }, { text: '所在位置：', margin: [0, 8, 0, 0] }],
        [{ text: '村编码：' }, { text: '联系方式：', margin: [0, 8, 0, 0] }],
        [{ text: '表号：QY_02_02_01' }, { text: '企业编码：', margin: [0, 8, 0, 0] }]
      ]
    },
    {
      table: {
        widths: [40, 40, '*', 40, 40, '*', 40, 40, '*'],
        heights: 22,
        fontSize: 8,
        body: [
          [
            { text: '法人代表姓名', colSpan: 2 },
            '',
            '',
            { text: '身份证', colSpan: 2 },
            '',
            '',
            { text: '联系方式', colSpan: 2 },
            '',
            ''
          ],
          [
            { text: '所属分类', colSpan: 2 },
            '',
            '',
            { text: '个体工商户住所', colSpan: 2 },
            '',
            { colSpan: 4, text: '' },
            '',
            '',
            ''
          ],
          [
            { text: '许可证类型', colSpan: 2, rowSpan: 3 },
            '',
            { text: '', rowSpan: 3 },
            { text: '有效期', colSpan: 2 },
            '',
            '',
            { text: '税务证', rowSpan: 3 },
            '有效期',
            ''
          ],

          ['', '', '', { text: '编号', colSpan: 2 }, '', '', '', '编号', ''],

          ['', '', '', { text: '颁证单位', colSpan: 2 }, '', '', '', '颁证单位', ''],

          [
            { text: '其他权证情况1', colSpan: 2 },

            '',
            { text: 's', colSpan: 7 },
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '经济性质2', colSpan: 2 },
            '',
            { text: 'a', colSpan: 7 },
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '登记注册类型', colSpan: 2 },
            '',
            '',
            { text: '成立日期', colSpan: 2 },
            '',
            '',

            { text: '经营范围a', colSpan: 2 },
            '',
            ''
          ],

          [{ text: '所属行业', colSpan: 2 }, '', { text: 's', colSpan: 7 }, '', '', '', '', '', ''],
          [{ text: '注册资金', colSpan: 2 }, '', { text: 'a', colSpan: 7 }, '', '', '', '', '', ''],

          [
            { text: '固定资产', rowSpan: 2 },
            '原值 (万元)',
            '',
            { text: '固定资产', rowSpan: 2 },
            '原值 (万元)',
            '',
            { text: '注册资金', rowSpan: 2, colSpan: 2 },
            '',
            { text: '', rowSpan: 2 }
          ],
          ['', '净值 (万元)', '', '', '净值 (万元)', '', '', '', ''],

          [
            { text: '平均年产值 (近3年)', colSpan: 2 },
            '',
            '',
            { text: '平均年利润 (近3年)', colSpan: 2 },
            '',
            '',

            { text: '平均年缴税额 (近3年)', colSpan: 2 },
            '',
            ''
          ],

          [
            { text: '生产经营状况 (可多选)', colSpan: 2 },

            '',
            { text: 's', colSpan: 7 },
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '主要产品种类', colSpan: 2 },
            '',
            { text: 'a', colSpan: 7 },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          [
            { text: '涉及情况 (可多选)', colSpan: 2 },
            '',
            { text: 'a', colSpan: 7 },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          [
            { text: '初步处理方案 (可多选)', colSpan: 2 },
            '',
            { text: 'a', colSpan: 7 },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          [
            { text: '备注', colSpan: 2, rowSpan: 3 },
            '',
            { text: 'a', colSpan: 7, rowSpan: 3 },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          ['', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '']
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
            text: '法人代表签字(公章)：',
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
