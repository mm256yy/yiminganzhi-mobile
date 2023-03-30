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
                  text: '清溪水库 工程建设 征地企业实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [66, 27, 66, 2]
                }
              ]
            },
            '',
            { text: '基本信息', colSpan: 2, alignment: 'center' },
            ''
          ],
          ['', '', '地理位置', ''],
          ['', '', '企业名称', ''],
          ['', '', '企业编码', ''],
          [
            { text: '所属区域：', border: [true, false, false, true], alignment: 'left' },
            { text: '调查时间：', border: [false, false, false, true], alignment: 'left' },
            '联系方式',
            ''
          ]
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [26, 82, 42, 26, 26, 82, 58, 58, 42, '*'],
        body: [
          [{ text: '房屋信息', colSpan: 10 }, '', '', '', '', '', '', '', '', ''],
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
      table: {
        heights: 22,
        widths: [26, 156, 66, 66, 66, '*'],
        body: [
          [{ text: '附属物信息', colSpan: 6 }, '', '', '', '', ''],
          ['序号', '项目', '规格', '单位', '数量', '备注'],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    },
    {
      table: {
        heights: 22,
        widths: [26, 126, 126, 66, 66, '*'],
        body: [
          [{ text: '零星林（果）木信息', colSpan: 6 }, '', '', '', '', ''],
          ['序号', '品种', '用途', '规格', '数量', '备注'],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    }
  ],
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
