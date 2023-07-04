/**
 * 环境切换
 */

// 默认 dev 环境
const apiEnv: ApiEnv = 'prod'

const envMap = {
  local: {
    apiBaseUrl: '127.0.0.1:8080',
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
