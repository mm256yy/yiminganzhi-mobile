export const ERROR_MSG = '操作失败'
export const SUCCESS_MSG = '操作成功'

export const showToast = (msg: string) => {
  uni.showToast({
    title: msg
  })
}
