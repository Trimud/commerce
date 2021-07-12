import Cookies from 'js-cookie'
import { SFB2C_CHECKOUT_ID_COOKIE } from '../const'

const getCheckoutId = (id?: string) => {
  return id ?? Cookies.get(SFB2C_CHECKOUT_ID_COOKIE)
}

export default getCheckoutId