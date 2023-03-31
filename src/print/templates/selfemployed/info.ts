export const selfemployedInfoDefinition = {
  content: [
    {
      alignment: 'left',
      margin: [0, 8],
      columns: [
        {
          text: '分类目录：',
          width: 170
        },
        {
          text: '所属阶段：',
          width: 170
        }
      ]
    },
    {
      table: {
        widths: [135, 135, 100, '*'],
        heights: 22,

        body: [
          [
            {
              rowSpan: 4,
              colSpan: 2,
              border: [true, true, false, false],
              stack: [
                {
                  text: '3 工程建设 征地企业实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [66, 27, 66, 2]
                }
              ]
            },
            '',
            { text: '基本信息', colSpan: 2, alignment: 'center', style: 'td' },
            ''
          ],
          ['', '', { text: '地理位置', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '企业名称', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '企业编码', style: 'td' }, { text: '3', style: 'td' }],
          [
            {
              text: '所属区域：3',
              border: [true, false, false, true],
              alignment: 'left',
              style: 'td'
            },
            {
              text: '调查时间：3',
              border: [false, false, false, true],
              alignment: 'left',
              style: 'td'
            },
            { text: '联系方式', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [26, 82, 42, 26, 26, 82, 58, 58, 42, '*'],
        body: [
          [{ text: '房屋信息', colSpan: 10, style: 'td' }, '', '', '', '', '', '', '', '', ''],
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
      table: {
        heights: 22,
        widths: [26, 156, 66, 66, 66, '*'],
        body: [
          [{ text: '附属物信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '序号', style: 'td' },
            { text: '项目', style: 'td' },
            { text: '规格', style: 'td' },
            { text: '单位', style: 'td' },
            { text: '数量', style: 'td' },
            { text: '备注', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '']
        ]
      }
    },
    {
      table: {
        heights: 22,
        widths: [26, 126, 126, 66, 66, '*'],
        body: [
          [{ text: '零星林（果）木信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '序号', style: 'td' },
            { text: '品种', style: 'td' },
            { text: '用途', style: 'td' },
            { text: '规格', style: 'td' },
            { text: '数量', style: 'td' },
            { text: '备注', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '']
        ]
      }
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
          { text: '法人代表签字（公章）：', decoration: 'underline', decorationStyle: 'dashed' },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            alignment: 'left',
            decoration: 'underline',
            decorationColor: '#000000'
          },
          {
            text: '调查员签字：',
            margin: [58, 0, 0, 0],
            alignment: 'left',
            decoration: 'underline',
            decorationStyle: 'dashed'
          },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            alignment: 'left',
            decoration: 'underline',
            decorationColor: '#000000'
          },
          {
            text: '调查时间：',
            margin: [58, 0, 0, 0],
            alignment: 'left',
            decoration: 'underline',
            decorationStyle: 'dashed'
          },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            alignment: 'left',
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
