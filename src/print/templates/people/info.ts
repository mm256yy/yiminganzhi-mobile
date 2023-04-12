import { LandlordType } from '@/types/sync'
import { ProjectType } from '@/types/common'
import { ewm, layout } from '../../config'
import {
  getHead,
  getPeopleTableHead,
  getPopulation,
  getHouseInfo,
  getFushuwu,
  getTree,
  getGrave
} from '../../common'

// 居民户基本信息 模版
export const peopleInfoDefinition = {
  content: [
    {
      alignment: 'left',
      margin: [0, 8],
      columns: [
        {
          text: '分类目录：移民',
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
        alignment: 'center',
        body: [
          [
            {
              rowSpan: 4,
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
            { text: '基本信息', colSpan: 2, alignment: 'center', style: 'td' },
            ''
          ],
          ['', '', { text: '地理位置', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '户主姓名', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '联系方式', style: 'td' }, { text: '3', style: 'td' }],
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
            { text: '户籍册编号', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },
    {
      layout,
      table: {
        widths: [58, 58, 40, 58, 58, 58, 110, '*'],
        headerRows: 2,
        body: [
          [{ text: '人口信息', bold: true, colSpan: 8, style: 'td' }, '', '', '', '', '', '', ''],
          [
            { text: '姓名', style: 'td' },
            { text: '与户主关系', style: 'td' },
            { text: '性别', style: 'td' },
            { text: '民族', style: 'td' },
            { text: '婚姻状况', style: 'td' },
            { text: '户籍所在地', style: 'td' },
            { text: '身份证号码', style: 'td' },
            { text: '人口类型', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          [{ text: 'fdsafds', colSpan: 8, style: 'td' }, '', '', '', '', '', '', '']
        ]
      }
    },

    {
      layout,
      table: {
        widths: [26, 46, 46, 26, 46, 50, 50, 66, 66, '*'],
        headerRows: 2,
        body: [
          [
            { text: '房屋信息', bold: true, colSpan: 10, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '幢号', style: 'td' },
            { text: '类别', style: 'td' },
            { text: '房屋高程', style: 'td' },
            { text: '层数', style: 'td' },
            { text: '建筑面积', style: 'td' },
            { text: '结构类型', style: 'td' },
            { text: '竣工年月', style: 'td' },
            { text: '房屋所有权证', style: 'td' },
            { text: '土地所有权证', style: 'td' },
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
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],

          [{ text: '3', colSpan: 10, style: 'td' }, '', '', '', '', '', '', '', '', '']
        ]
      }
    },

    {
      layout,
      table: {
        widths: [26, 156, 60, 60, 60, '*'],
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
      layout,
      table: {
        widths: [26, 126, 126, 60, 60, '*'],
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
    },

    {
      layout,
      table: {
        widths: [26, 100, 100, 100, 100, '*'],
        headerRows: 2,
        body: [
          [{ text: '坟墓信息', bold: true, colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '序号', style: 'td' },
            { text: '穴位', style: 'td' },
            { text: '材料', style: 'td' },
            { text: '立墓年份', style: 'td' },
            { text: '数量（座）', style: 'td' },
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
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    }
  ],
  footer: function () {
    return [
      {
        fontSize: 10,
        margin: [20, 10, 20, 0],
        alignment: 'justify',
        columns: [
          {
            text: '权属人签字（盖章）：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            text: '调查员签字：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            alignment: 'right',
            // image: ewm,
            text: '',
            width: 55
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
      margin: [20, 10, 20, 0],
      alignment: 'justify',
      columns: [
        {
          text: '权属人签字（盖章）：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        },
        {
          text: '调查员签字：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        },
        {
          alignment: 'right',
          // image: ewm,
          text: '',
          width: 55
        }
      ]
    }
  ]
}

// 获取 居民户基本信息 配置
export const getPeopleInfoDefinition = (landlord: LandlordType, projectInfo: ProjectType) => {
  if (!landlord) {
    return peopleInfoDefinition
  }
  return {
    content: [
      getHead(landlord, projectInfo),
      getPeopleTableHead(landlord, projectInfo),
      getPopulation(landlord),
      getHouseInfo(landlord),
      getFushuwu(landlord),
      getTree(landlord),
      getGrave(landlord)
    ],
    footer: getFooter
  }
}
