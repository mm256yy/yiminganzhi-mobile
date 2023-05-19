import { layout } from '../../config'
import { getHead, getCompanyBaseTableHead } from '../../common'
import { LandlordType } from '@/types/sync'
import { ProjectType } from '@/types/common'

export const companyBaseDefinition = {
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
              rowSpan: 4,
              colSpan: 2,
              border: [true, true, false, false],
              stack: [
                {
                  text: '3 工程建设 征地企业实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [60, 27, 60, 2]
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
            { text: '所属区域：3', border: [true, false, false, true], alignment: 'left' },
            { text: '调查时间：3', border: [false, false, false, true], alignment: 'left' },
            { text: '联系方式', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },

    {
      layout,
      table: {
        widths: [86, 91, 86, 91, 86, '*'],
        body: [
          [{ text: '工商、税务登记信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '营业执照编号', style: 'td' },
            { text: '3', style: 'td' },
            { text: '注册资金', style: 'td' },
            { text: '3', style: 'td' },
            { text: '成立日期', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '税务登记编号', style: 'td' },
            { text: '3', style: 'td' },
            { text: '登记注册类型', style: 'td' },
            { text: '3', style: 'td' },
            { text: '住所', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '营业范围', rowSpan: 5, margin: [0, 46, 0, 0] },
            { text: '3', colSpan: 5, rowSpan: 5, style: 'td' },
            '',
            '',
            '',
            ''
          ],

          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    },

    {
      layout,
      table: {
        widths: [86, 91, 86, 91, 86, '*'],
        body: [
          [{ text: ' 财务、经营状况及初步处理意向', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '固定资产原值', style: 'td' },
            { text: '3', style: 'td' },
            { text: '年工资总额', style: 'td' },
            { text: '3', style: 'td' },
            { text: '正式工', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '临时工', style: 'td' },
            { text: '3', style: 'td' },
            { text: '近3年平均产值', style: 'td' },
            { text: '3', style: 'td' },
            { text: '近3年平均利润', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '近3年平均缴税额', style: 'td' },
            { text: '3', style: 'td' },
            { text: '涉及情况', style: 'td' },
            { text: '3', style: 'td' },
            { text: '初步处理方案', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },

    {
      layout,
      table: {
        widths: [40, 42, 90, 40, 42, 90, 40, 42, '*'],
        body: [
          [{ text: '土地使用情况', colSpan: 9, style: 'td' }, '', '', '', '', '', '', '', ''],
          [
            { text: '序号', rowSpan: 2, style: 'td_2' },
            { text: '权属面积', style: 'td' },
            { text: '3', style: 'td' },
            { text: '划拨', rowSpan: 2, style: 'td_2' },
            { text: '权属面积', style: 'td' },
            { text: '3', style: 'td' },
            { text: '租用', rowSpan: 2, style: 'td_2' },
            { text: '权属面积', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            '',
            { text: '占用面积', style: 'td' },
            { text: '3', style: 'td' },
            '',
            { text: '占用面积', style: 'td' },
            { text: '3', style: 'td' },
            '',
            { text: '占用面积', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },
    {
      layout,
      table: {
        widths: [545],
        body: [[{ text: '备注', style: 'td' }], [{ text: '', rowSpan: 3, style: 'td' }], [''], ['']]
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
            text: '',
            width: 55
          }
        ]
      }
    ]
  }
}

const getCompanyInfo1 = (landlord: LandlordType) => {
  const { company } = landlord
  return {
    layout,
    table: {
      widths: [80, 87, 80, 87, 80, 86],
      body: [
        [
          { text: '工商、税务登记信息', bold: true, fontSize: 12, colSpan: 6, style: 'td' },
          '',
          '',
          '',
          '',
          ''
        ],
        [
          { text: '营业执照编号', style: 'td' },
          { text: company.licenceNo || '', style: 'td' },
          { text: '注册资金', style: 'td' },
          { text: company.registeredAmount || '', style: 'td' },
          { text: '成立日期', style: 'td' },
          { text: company.establishDateText || '', style: 'td' }
        ],
        [
          { text: '税务登记编号', style: 'td' },
          { text: company.taxLicenceNo || '', style: 'td' },
          { text: '登记注册类型', style: 'td' },
          { text: company.registerTypeText || '', style: 'td' },
          { text: '住所', style: 'td' },
          { text: company.companyAddress || '', style: 'td' }
        ],
        [
          { text: '营业范围', rowSpan: 5, style: 'td_3' },
          { text: company.natureBusiness || '', colSpan: 5, rowSpan: 5, style: 'td' },
          '',
          '',
          '',
          ''
        ],

        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
      ]
    }
  }
}

const getCompanyInfo2 = (landlord: LandlordType) => {
  const { company } = landlord
  return {
    layout,
    table: {
      widths: [80, 87, 80, 87, 80, 86],
      body: [
        [
          {
            text: '财务、经营状况及初步处理意向',
            bold: true,
            fontSize: 12,
            colSpan: 6,
            style: 'td'
          },
          '',
          '',
          '',
          '',
          ''
        ],
        [
          { text: '固定资产原值', style: 'td' },
          { text: company.fixedAssetsOriginalValue || '', style: 'td' },
          { text: '年工资总额', style: 'td' },
          { text: company.annualPayroll || '', style: 'td' },
          { text: '正式工', style: 'td' },
          { text: company.regularWorkerNum || '', style: 'td' }
        ],
        [
          { text: '临时工', style: 'td' },
          { text: company.temporaryWorkerNum || '', style: 'td' },
          { text: '近3年平均产值', style: 'td' },
          { text: company.averageAnnualOutputValue || '', style: 'td' },
          { text: '近3年平均利润', style: 'td' },
          { text: company.averageAnnualProfit || '', style: 'td' }
        ],
        [
          { text: '近3年平均缴税额', style: 'td' },
          { text: company.averageAnnualTaxPaid || '', style: 'td' },
          { text: '涉及情况', style: 'td' },
          { text: company.informationInvolvedText || '', style: 'td' },
          { text: '初步处理方案', style: 'td' },
          { text: company.treatmentSchemeText || '', style: 'td' }
        ]
      ]
    }
  }
}

const getCompanyInfo3 = (landlord: LandlordType) => {
  const { company } = landlord
  return {
    layout,
    table: {
      widths: [35, 36, 86, 35, 36, 86, 35, 36, 88],
      body: [
        [
          { text: '土地使用情况', bold: true, fontSize: 12, colSpan: 9, style: 'td' },
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
          { text: '出让', rowSpan: 2, style: 'td_2' },
          { text: '权属面积', style: 'td' },
          { text: company.sellOwnershipArea || '', style: 'td' },
          { text: '划拨', rowSpan: 2, style: 'td_2' },
          { text: '权属面积', style: 'td' },
          { text: company.transferOwnershipArea || '', style: 'td' },
          { text: '租用', rowSpan: 2, style: 'td_2' },
          { text: '权属面积', style: 'td' },
          { text: company.rentOwnershipArea || '', style: 'td' }
        ],
        [
          '',
          { text: '占用面积', style: 'td' },
          { text: company.sellOccupiedArea || '', style: 'td' },
          '',
          { text: '占用面积', style: 'td' },
          { text: company.transferOccupiedArea || '', style: 'td' },
          '',
          { text: '占用面积', style: 'td' },
          { text: company.rentOccupiedArea || '', style: 'td' }
        ]
      ]
    }
  }
}

const getCompanyInfo4 = (landlord: LandlordType) => {
  const { company } = landlord
  return {
    layout,
    table: {
      widths: [545],
      headerRows: 2,
      body: [
        [{ text: '备注', bold: true, fontSize: 12, style: 'td' }],
        [{ text: company.remark || '', rowSpan: 3, style: 'td' }],
        [''],
        ['']
      ]
    }
  }
}

const getFooter = () => {
  return [
    {
      fontSize: 10,
      margin: [20, 0, 20, 15],
      alignment: 'justify',
      columns: [
        {
          text: '权属人签字（盖章）：',
          alignment: 'left'
        },
        {
          text: '调查员签字：',
          alignment: 'left'
        },
        {
          alignment: 'right',
          text: '',
          width: 55
        }
      ]
    }
  ]
}

export const getCompanyBaseDefinition = (landlord: LandlordType, projectInfo: ProjectType) => {
  if (!landlord) {
    return companyBaseDefinition
  }
  return {
    content: [
      getHead(landlord, projectInfo),
      getCompanyBaseTableHead(landlord, projectInfo),
      getCompanyInfo1(landlord),
      getCompanyInfo2(landlord),
      getCompanyInfo3(landlord),
      getCompanyInfo4(landlord)
    ],
    footer: getFooter
  }
}
