import * as Core from '@commerce/types/cart'
// import { Customer } from '@commerce/types'
import { CheckoutLineItem } from './schema'

export type Sfb2cImageGroups = {
  images: Sfb2cImage[]
}

export type Sfb2cImage = {
  alt: string
  disBaseLink: string
  link: string
  title: string
}

export type CartLineItem = {
  id: string
  product: Sfb2cProduct
  price: number
  variant: {
    name: string | null
    sku: string | null
    id: string
  }
  quantity: number
}

export type Sfb2cCart = {
  id: string
  account_id: number
  currency: string
  tax_included_total: number
  sub_total: number
  grand_total: number
  discount_total: number
  quantity: number
  items: CartLineItem[]
  date_created: string
  discounts?: { id: number; amount: number }[] | null
  // TODO: add missing fields
}

export type Sfb2cVariant = {
  orderable: boolean
  productId: string
  price?: number
  // option_value_ids: string[]
  variationValues: {
    color?: string
    size?: string
  }
  __type?: 'MultipleChoiceOption'
}

export interface Sfb2cProductOptionValue {
  id: string
  label: string
  hexColors?: string[]
}

export interface ProductOptionValue {
  label: string
  hexColors?: string[]
}

export type ProductOptions = {
  id: string
  name: string
  variant: boolean
  values: ProductOptionValue[]
  required: boolean
  active: boolean
  attribute_id: string
}

export interface Sfb2cProduct {
  id: string
  description: string
  name: string
  slug: string
  currency: string
  price: number
  images: any[]
  options: any[]
  variants: any[]
}

export type Sfb2cCustomer = any

export type Sfb2cCheckout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

export interface Cart extends Core.Cart {
  id: string
  lineItems: LineItem[]
}

export interface LineItem extends Core.LineItem {
  options?: any[]
}

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = Core.CartItemBody & {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}
