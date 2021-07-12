import { Customer } from '../types/customer'
import { Product, ProductOption } from '../types/product'
import { MoneyV2 } from '../schema'

import type {
  Cart,
  CartLineItem,
  Sfb2cCustomer,
  Sfb2cImage,
  Sfb2cImageGroups,
  Sfb2cVariant,
  ProductOptionValue,
  Sfb2cProductOptionValue,
  Sfb2cCart,
  LineItem,
} from '../types'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

type Sfb2cProductOption = {
  id: string
  name: string
  values: any[]
}

type normalizedProductOption = {
  id: string
  displayName: string
  values: ProductOptionValue[]
}

const normalizeProductOption = ({
  id,
  name: displayName = '',
  values = [],
}: Sfb2cProductOption): ProductOption => {
  let returnValues = values.map((value) => {
    let output: any = {
      label: value.name,
      // id: value?.id || id,
    }
    if (displayName.match(/colou?r/gi)) {
      output = {
        ...output,
        hexColors: [value.name],
      }
    }
    return output
  })
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: returnValues,
  }
}

const normalizeProductImages = (image: Sfb2cImage) => {
  if (!image) {
    return [{ url: '/' }]
  }

  return [{ url: image.disBaseLink }]
}

const normalizeProductVariants = (
  variants: Sfb2cVariant[],
  productOptions: Sfb2cProductOption[]
) => {
  return variants?.map(({ productId, orderable, price, variationValues }) => {
    // const values = name
    //   .split(',')
    //   .map((i) => ({ name: i.trim(), label: i.trim() }))

    // const options = optionValueIds.map((id) => {
    //   const matchingOption = productOptions.find((option) => {
    //     return option.values.find(
    //       (value: Sfb2cProductOptionValue) => value.id == id
    //     )
    //   })
    //   return normalizeProductOption({
    //     id,
    //     name: matchingOption?.name ?? '',
    //     values,
    //   })
    // })

    return {
      productId,
      orderable,
      price,
      variationValues,
      // name,
      // sku: sku ?? id,
      // price: price ?? null,
      // listPrice: price ?? null,
      // requiresShipping: true,
      // options,
    }
  })
}

export function normalizeProduct(sfb2cProduct: any): Product {
  const {
    productId,
    productName,
    image,
    options,
    primaryCategoryId,
    variants,
    price: value,
    currency: currencyCode,
  } = sfb2cProduct

  // ProductView accesses variants for each product
  const emptyVariants = [{ options: [], productId, productName }]

  const productOptions = options
    ? options.map((o: any) => normalizeProductOption(o))
    : []
  const productVariants = variants
    ? normalizeProductVariants(variants, options)
    : []

  const productImage = normalizeProductImages(image)

  console.log({ productImage })

  return {
    ...sfb2cProduct,
    description: null, // TODO: YB
    id: productId,
    vendor: '',
    path: `/${productId}`,
    images: productImage,
    variants:
      productVariants && productVariants.length
        ? productVariants
        : emptyVariants,
    options: productOptions,
    name: productName,
    price: {
      value: value as number,
      currencyCode,
    },
  }
  // return product
}

export function normalizeCart({
  id,
  account_id,
  date_created,
  currency,
  tax_included_total,
  items,
  sub_total,
  grand_total,
  discounts,
}: Sfb2cCart) {
  const cart: Cart = {
    id: id,
    customerId: account_id + '',
    email: '',
    createdAt: date_created,
    currency: { code: currency },
    taxesIncluded: tax_included_total > 0,
    lineItems: items?.map(normalizeLineItem) ?? [],
    lineItemsSubtotalPrice: +sub_total,
    subtotalPrice: +sub_total,
    totalPrice: grand_total,
    discounts: discounts?.map((discount) => ({ value: discount.amount })),
  }
  return cart
}

export function normalizeCustomer(customer: Sfb2cCustomer): Customer {
  const { first_name: firstName, last_name: lastName } = customer
  return {
    ...customer,
    firstName,
    lastName,
  }
}

function normalizeLineItem({
  id,
  product,
  price,
  variant,
  quantity,
}: CartLineItem): LineItem {
  const item = {
    id,
    variantId: variant?.id,
    productId: product.id ?? '',
    name: product?.name ?? '',
    quantity,
    variant: {
      id: variant?.id ?? '',
      sku: variant?.sku ?? '',
      name: variant?.name!,
      image: {
        url:
          product?.images && product.images.length > 0
            ? product?.images[0].file.url
            : '/',
      },
      requiresShipping: false,
      price: price,
      listPrice: price,
    },
    path: '',
    discounts: [],
    options: [
      {
        value: variant?.name,
      },
    ],
  }
  return item
}
