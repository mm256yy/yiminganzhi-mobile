declare namespace Http {
  type Result = {
    code: string
    data: any
    message: string
    [key: string]: any
  }
  type Response = Promise<Result>
}
