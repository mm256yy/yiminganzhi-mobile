import { LandlordType } from '@/types/sync'
import { layout } from '../../config'
import { getBottom } from '../../common'
import { ProjectType } from '@/types/common'

// 个体户配置模版
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
        [{ text: '县（市/区）：' }, { text: '个体工商户名称：', style: 'td' }],
        [{ text: '行政村：' }, { text: '所在位置：', style: 'td' }],
        [{ text: '村编码：' }, { text: '联系方式：', style: 'td' }],
        [{ text: '表号：QY_02_02_01' }, { text: '企业编码：', style: 'td' }]
      ]
    },
    {
      layout,
      table: {
        widths: [40, 40, '*', 40, 40, '*', 40, 40, '*'],

        body: [
          [
            { text: '法人代表姓名', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },
            { text: '身份证', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },
            { text: '联系方式', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' }
          ],
          [
            { text: '所属分类', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },
            { text: '个体工商户住所', colSpan: 2, style: 'td' },
            '',
            { colSpan: 4, text: '3', style: 'td' },
            '',
            '',
            ''
          ],
          [
            { text: '许可证类型', colSpan: 2, rowSpan: 3, style: 'td_3' },
            '',
            { text: '3', rowSpan: 3, style: 'td_3' },
            { text: '有效期', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },
            { text: '税务证', rowSpan: 3, style: 'td_3' },
            { text: '有效期2', style: 'td' },
            { text: '3', style: 'td' }
          ],

          [
            '',
            '',
            '',
            { text: '编号', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },
            '',
            { text: '编号', style: 'td' },
            { text: '3', style: 'td' }
          ],

          [
            '',
            '',
            '',
            { text: '颁证单位', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },
            '',
            { text: '颁证单位', style: 'td' },
            { text: '3', style: 'td' }
          ],

          [
            { text: '其他权证情况1', colSpan: 2, style: 'td' },

            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '经济性质2', colSpan: 2, style: 'td' },
            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '登记注册类型', colSpan: 2, style: 'td' },
            '',
            { text: '', style: 'td' },
            { text: '成立日期', colSpan: 2, style: 'td' },
            '',
            { text: '', style: 'td' },

            { text: '经营范围a', colSpan: 2, style: 'td' },
            '',
            { text: '', style: 'td' }
          ],

          [
            { text: '所属行业', colSpan: 2, style: 'td' },
            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '注册资金', colSpan: 2, style: 'td' },
            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          [
            { text: '固定资产', rowSpan: 2, style: 'td_2' },
            { text: '原值 (万元)', style: 'td' },
            { text: '3', style: 'td' },
            { text: '固定资产', rowSpan: 2, style: 'td_2' },
            { text: '原值 (万元)', style: 'td' },
            { text: '3', style: 'td' },
            { text: '注册资金', rowSpan: 2, colSpan: 2, style: 'td_2' },
            '',
            { text: '3', rowSpan: 2, style: 'td_2' }
          ],
          [
            '',
            { text: '净值 (万元)', style: 'td' },
            { text: '3', style: 'td' },
            '',
            { text: '净值 (万元)', style: 'td' },
            { text: '3', style: 'td' },
            '',
            '',
            ''
          ],

          [
            { text: '平均年产值 (近3年)', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },
            { text: '平均年利润 (近3年)', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' },

            { text: '平均年缴税额 (近3年)', colSpan: 2, style: 'td' },
            '',
            { text: '3', style: 'td' }
          ],

          [
            { text: '生产经营状况 (可多选)', colSpan: 2, style: 'td' },

            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '主要产品种类', colSpan: 2, style: 'td' },
            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          [
            { text: '涉及情况 (可多选)', colSpan: 2, style: 'td' },
            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          [
            { text: '初步处理方案 (可多选)', colSpan: 2, style: 'td' },
            '',
            { text: '3', colSpan: 7, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            ''
          ],

          [
            { text: '备注', colSpan: 2, rowSpan: 3, style: 'td_3' },
            '',
            { text: '3', colSpan: 7, rowSpan: 3, style: 'td' },
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
      columns: ['分类目录：企业', '所属阶段：', '']
    }
  ],
  footer: function () {
    return [
      {
        margin: [20, 10, 20, 0],
        alignment: 'justify',
        columns: [
          {
            text: '法人代表签字(公章)：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            text: '调查员签字：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            text: '调查时间：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          }
        ]
      }
    ]
  }
}

// 头部
const getTop = () => {
  return {
    text: '基本情况调查表',
    fontSize: 16,
    bold: true,
    margin: [0, 0, 0, 29]
  }
}

// 信息栏
const getInfo = (landlord: LandlordType) => {
  const { company } = landlord
  return {
    alignment: 'left',
    fontSize: 9,
    margin: [0, 0, 0, 18],
    columns: [
      [
        { text: `县（市/区）：${landlord.areaCodeText}/${landlord.townCodeText}` },
        { text: `个体工商户名称：${landlord.name || ''}`, style: 'td' }
      ],
      [
        { text: `行政村：${landlord.villageCodeText}` },
        { text: `所在位置：${landlord.locationTypeText}`, style: 'td' }
      ],
      [
        { text: `村编码：${landlord.villageCode}` },
        { text: `联系方式：${landlord.phone}`, style: 'td' }
      ],
      [{ text: `表号：QY_02_02_01` }, { text: `企业编码：${company.doorNo}`, style: 'td' }]
    ]
  }
}

// 个体户其他信息
const getMainInfo = (landlord: LandlordType) => {
  const { company } = landlord
  return {
    layout,
    table: {
      widths: [40, 40, '*', 40, 40, '*', 40, 40, '*'],
      body: [
        [
          { text: '法人代表姓名', colSpan: 2, style: 'td' },
          '',
          { text: company.legalPersonName || '', style: 'td' },
          { text: '身份证', colSpan: 2, style: 'td' },
          '',
          { text: company.legalPersonCard || '', style: 'td' },
          { text: '联系方式', colSpan: 2, style: 'td' },
          '',
          { text: company.legalPersonPhone || '', style: 'td' }
        ],
        [
          { text: '所属分类', colSpan: 2, style: 'td' },
          '',
          { text: company.companyTypeText || '', style: 'td' },
          { text: '个体工商户住所', colSpan: 2, style: 'td' },
          '',
          { colSpan: 4, text: company.companyAddress || '', style: 'td' },
          '',
          '',
          ''
        ],
        [
          { text: '许可证类型', colSpan: 2, rowSpan: 3, style: 'td_3' },
          '',
          { text: company.licenceTypeText || '', rowSpan: 3, style: 'td_3' },
          { text: '有效期', colSpan: 2, style: 'td' },
          '',
          { text: company.periodValidity || '', style: 'td' },
          { text: '税务证', rowSpan: 3, style: 'td_3' },
          { text: '有效期', style: 'td' },
          { text: company.taxPeriodValidity || '', style: 'td' }
        ],

        [
          '',
          '',
          '',
          { text: '编号', colSpan: 2, style: 'td' },
          '',
          { text: company.licenceNo || '', style: 'td' },
          '',
          { text: '编号', style: 'td' },
          { text: company.taxLicenceNo || '', style: 'td' }
        ],

        [
          '',
          '',
          '',
          { text: '颁证单位', colSpan: 2, style: 'td' },
          '',
          { text: company.issuingCompany || '', style: 'td' },
          '',
          { text: '颁证单位', style: 'td' },
          { text: company.taxLicenceCompany || '', style: 'td' }
        ],

        [
          { text: '其他权证情况', colSpan: 2, style: 'td' },

          '',
          { text: company.ohterLicence || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        [
          { text: '经济性质', colSpan: 2, style: 'td' },
          '',
          { text: company.economicNature || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        [
          { text: '登记注册类型', colSpan: 2, style: 'td' },
          '',
          { text: company.registerTypeText || '', style: 'td' },
          { text: '成立日期', colSpan: 2, style: 'td' },
          '',
          { text: company.establishDateText || '', style: 'td' },

          { text: '经营范围', colSpan: 2, style: 'td' },
          '',
          { text: company.natureBusiness || '', style: 'td' }
        ],

        [
          { text: '所属行业', colSpan: 2, style: 'td' },
          '',
          { text: company.industryTypeText || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        [
          { text: '注册资金', colSpan: 2, style: 'td' },
          '',
          { text: company.registeredAmount || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],

        [
          { text: '固定资产', rowSpan: 2, style: 'td_2' },
          { text: '原值 (万元)', style: 'td' },
          { text: company.fixedAssetsOriginalValue || '', style: 'td' },
          { text: '职工人数', rowSpan: 2, style: 'td_2' },
          { text: '正式工（人）', style: 'td' },
          { text: company.regularWorkerNum || '', style: 'td' },
          { text: '注册资金', rowSpan: 2, colSpan: 2, style: 'td_2' },
          '',
          { text: company.registeredAmount || '', rowSpan: 2, style: 'td_2' }
        ],
        [
          '',
          { text: '净值 (万元)', style: 'td' },
          { text: company.fixedAssetsNetValue || '', style: 'td' },
          '',
          { text: '临时工（人）', style: 'td' },
          { text: company.temporaryWorkerNum || '', style: 'td' },
          '',
          '',
          ''
        ],

        [
          { text: '平均年产值 (近3年)', colSpan: 2, style: 'td' },
          '',
          { text: company.averageAnnualOutputValue || '', style: 'td' },
          { text: '平均年利润 (近3年)', colSpan: 2, style: 'td' },
          '',
          { text: company.averageAnnualProfit || '', style: 'td' },

          { text: '平均年缴税额 (近3年)', colSpan: 2, style: 'td' },
          '',
          { text: company.averageAnnualTaxPaid || '', style: 'td' }
        ],

        [
          { text: '生产经营状况 (可多选)', colSpan: 2, style: 'td' },

          '',
          { text: company.managementStatusText || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        [
          { text: '主要产品种类', colSpan: 2, style: 'td' },
          '',
          { text: company.productCategory || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],

        [
          { text: '涉及情况 (可多选)', colSpan: 2, style: 'td' },
          '',
          { text: company.informationInvolvedText || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],

        [
          { text: '初步处理方案 (可多选)', colSpan: 2, style: 'td' },
          '',
          { text: company.treatmentSchemeText || '', colSpan: 7, style: 'td' },
          '',
          '',
          '',
          '',
          '',
          ''
        ],

        [
          { text: '备注', colSpan: 2, rowSpan: 3, style: 'td_3' },
          '',
          { text: company.remark || '', colSpan: 7, rowSpan: 3, style: 'td' },
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
          text: '法人代表签字(公章)：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        },
        {
          text: '调查员签字：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        },
        {
          text: '调查时间：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        }
      ]
    }
  ]
}

// 获取 个体户基本信息配置
export const getSelfemployedBaseDefinition = (landlord: LandlordType, projectInfo: ProjectType) => {
  if (!landlord) {
    return selfemployedBaseDefinition
  }
  return {
    content: [getTop(), getInfo(landlord), getMainInfo(landlord), getBottom(landlord, projectInfo)],
    footer: getFooter
  }
}
