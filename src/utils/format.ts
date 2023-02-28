export const dictOption = (arr: any, val: any) => {
  let str = ''
  arr.map((item: any) => {
    if (item.value === 'true') {
      if (item.value === val.tostring()) {
        str = item.text
      }
    } else {
      if (item.value === val) {
        str = item.text
      }
    }
  })
  return str
}
