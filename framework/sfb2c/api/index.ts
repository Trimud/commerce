import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@commerce/api'
import {
  SFB2C_CHECKOUT_ID_COOKIE,
  SFB2C_CUSTOMER_TOKEN_COOKIE,
  SFB2C_COOKIE_EXPIRE,
} from '../const'

import fetchApi from './utils/fetch-sfb2c-api'
import login from './operations/login'
import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface Sfb2cConfig extends CommerceAPIConfig {
  fetch: any
}

const config: Sfb2cConfig = {
  locale: 'en-US',
  commerceUrl: '',
  apiToken: ''!,
  cartCookie: SFB2C_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: SFB2C_COOKIE_EXPIRE,
  fetch: fetchApi,
  customerCookie: SFB2C_CUSTOMER_TOKEN_COOKIE,
}

const operations = {
  login,
  getAllPages,
  getPage,
  getSiteInfo,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): CommerceAPI<P> {
  return commerceApi(customProvider)
}
