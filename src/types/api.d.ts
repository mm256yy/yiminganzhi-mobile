declare namespace Http {
  type Result = {
    code: number
    data: any
    message: string
    [key: string]: any
  }
  type Response = Promise<Result>
}
