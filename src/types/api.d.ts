declare namespace Http {
  type Result = {
    code: number
    data: any
    message: string
  }
  type Response = Promise<Result>

  enum MethodType {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
  }
}
