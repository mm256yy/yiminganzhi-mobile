import { LandlordType } from '@/types/sync'
import { getHead, getCompanyTableHead, getHousePic } from '../../common'
import { imgHeight, layout } from '../../config'
import { ProjectType } from '@/types/common'

// 企业/个体户 房屋配置模版
export const selfemployedHouseDefinition = {
  content: [
    {
      alignment: 'left',
      margin: [0, 8],
      columns: [
        {
          text: '分类目录：企业',
          width: 170
        },
        {
          text: '所属阶段：',
          width: 170
        }
      ]
    },
    {
      layout,
      table: {
        widths: [135, 135, 100, '*'],
        body: [
          [
            {
              rowSpan: 3,
              colSpan: 2,
              border: [true, true, false, false],
              stack: [
                {
                  text: '3 工程建设 征地移民实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [60, 9, 60, 2]
                },
                {
                  text: '（个体户 3 3 号）',
                  alignment: 'center',
                  margin: [60, 0, 60, 0]
                }
              ]
            },
            '',
            { text: '联系方式', colSpan: 2, alignment: 'center', style: 'td' },
            ''
          ],
          ['', '', { text: '地理位置', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '权属人姓名', style: 'td' }, { text: '3', style: 'td' }],
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
        widths: ['*'],
        heights: function (row: number) {
          return row > 0 ? imgHeight : 18
        },
        headerRows: 2,
        body: [
          [{ text: '房屋示意图', bold: true, style: 'td' }],
          [''],
          [''],
          [''],
          [{ text: '', pageBreak: 'after' }],
          [''],
          [''],
          [''],
          [''],
          [''],
          ['']
        ]
      }
    }
  ],
  footer: function () {
    return [
      {
        fontSize: 10,
        margin: [20, 0, 20, 0],
        alignment: 'justify',
        columns: [
          {
            text: '权属人签字（盖章）：',
            margin: [0, 35, 0, 0],
            alignment: 'left'
          },

          {
            text: '调查员签字：',
            margin: [0, 35, 0, 0],
            alignment: 'left'
          },
          {
            text: ''
          }
        ]
      }
    ]
  }
}

const getFooter = () => {
  return [
    {
      fontSize: 10,
      margin: [20, 0, 20, 0],
      alignment: 'justify',
      columns: [
        {
          text: '权属人签字（盖章）：',
          margin: [0, 35, 0, 0],
          alignment: 'left'
        },

        {
          text: '调查员签字：',
          margin: [0, 35, 0, 0],
          alignment: 'left'
        },
        {
          text: ''
        }
      ]
    }
  ]
}

// 获取 企业/个体户 房屋配置
export const getSelfemployedHouseDefinition = (
  landlord: LandlordType,
  projectInfo: ProjectType
) => {
  if (!landlord) {
    return selfemployedHouseDefinition
  }
  return {
    content: [
      getHead(landlord, projectInfo),
      getCompanyTableHead(landlord, projectInfo),
      getHousePic(landlord)
    ],
    footer: getFooter
  }
}
