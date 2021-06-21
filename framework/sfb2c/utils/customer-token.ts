import Cookies, { CookieAttributes } from 'js-cookie'
import { SFB2C_COOKIE_EXPIRE, SFB2C_CUSTOMER_TOKEN_COOKIE } from '../const'

export const getCustomerToken = () => Cookies.get(SFB2C_CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(SFB2C_CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(
      SFB2C_CUSTOMER_TOKEN_COOKIE,
      token,
      options ?? {
        expires: SFB2C_COOKIE_EXPIRE,
      }
    )
  }
}
