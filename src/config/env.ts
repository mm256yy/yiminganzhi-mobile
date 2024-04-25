/**
 * 环境切换
 */

// 默认 dev 环境
const apiEnv: ApiEnv = 'local'

const envMap = {
  local: {
    apiBaseUrl: 'http://192.168.1.119:8880',
    apiBasePath: '/api'
  },
  // local: {
  //   apiBaseUrl: 'http://10.10.1.206:80',
  //   apiBasePath: '/api'
  // },
  locals: {
    apiBaseUrl: 'http://ym.zdwp.local',
    apiBasePath: '/api'
  },
  dev: {
    apiBaseUrl: 'https://r7r-ai.zdwp.net',
    apiBasePath: '/api'
  },
  test: {
    apiBaseUrl: 'https://r7r-ai.zdwp.net',
    apiBasePath: '/api'
  },
  prod: {
    apiBaseUrl: 'https://ym.zhym.net.cn',
    apiBasePath: '/api'
  }
}

type ApiEnv = keyof typeof envMap
type Env<T extends ApiEnv> = {
  apiEnv: T
} & (typeof envMap)[T]

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
  return Object.assign({ apiEnv }, envMap[apiEnv])
}

export const env = createEnv(apiEnv)
