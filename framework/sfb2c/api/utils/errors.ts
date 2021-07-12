import type { Response } from '@vercel/fetch'

export class Sfb2cCommerceAPIError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'Sfb2cCommerceApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class Sfb2cCommerceNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'Sfb2cCommerceNetworkError'
  }
}
