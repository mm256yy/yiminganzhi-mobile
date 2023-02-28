export const dictOption = (arr: any, val: any) => {
  let str = ''
  arr.map((item: any) => {
    if (item.value.tostring() === val.tostring()) {
      str = item.text
    }
  })
  return str
}
