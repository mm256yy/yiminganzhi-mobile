let loadingCount = 0

export function showLoading(options?: UniApp.ShowLoadingOptions) {
  uni.showLoading({
    title: '加载中',
    ...options
  })
  loadingCount = loadingCount + 1
}

export function hideLoading() {
  loadingCount = loadingCount - 1
  if (loadingCount === 0) {
    uni.hideLoading()
  }
}
