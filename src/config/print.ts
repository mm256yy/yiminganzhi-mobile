// 模版列表
// 0-99居民户相关模版id
// 100-199 企业相关
// 200-299 个体户相关
// 300-399 村集体相关
export const templates = [
  {
    uid: 1,
    id: 1,
    templateModule: '实物采集',
    templateName: '农户信息表打印',
    templateType: 'print'
  },
  {
    uid: 2,
    id: 2,
    templateModule: '实物采集',
    templateName: '房屋示意图信息',
    templateType: 'print'
  },
  {
    uid: 100,
    id: 100,
    templateModule: '实物采集',
    templateName: '企业信息打印',
    templateType: 'printCompany'
  },
  {
    uid: 101,
    id: 101,
    templateModule: '实物采集',
    templateName: '企业实物调查表',
    templateType: 'printCompany'
  },
  {
    uid: 102,
    id: 102,
    templateModule: '实物采集',
    templateName: '企业房屋示意图打印',
    templateType: 'printCompany'
  },
  {
    uid: 103,
    id: 103,
    templateModule: '实物采集',
    templateName: '企业设施设备打印',
    templateType: 'printCompany'
  },

  {
    uid: 200,
    id: 200,
    templateModule: '实物采集',
    templateName: '个体户信息打印',
    templateType: 'printIndividualHousehold'
  },
  {
    uid: 201,
    id: 201,
    templateModule: '实物采集',
    templateName: '个体户实物调查表',
    templateType: 'printIndividualHousehold'
  },
  {
    uid: 202,
    id: 202,
    templateModule: '实物采集',
    templateName: '个体户房屋示意图打印',
    templateType: 'printIndividualHousehold'
  },
  {
    uid: 203,
    id: 203,
    templateModule: '实物采集',
    templateName: '个体户设施设备打印',
    templateType: 'printIndividualHousehold'
  },
  {
    uid: 300,
    id: 300,
    templateModule: '实物采集',
    templateName: '村集体信息表打印',
    templateType: 'printCollective'
  },
  {
    uid: 301,
    id: 301,
    templateModule: '实物采集',
    templateName: '村集体房屋示意图打印',
    templateType: 'printCollective'
  }
]
