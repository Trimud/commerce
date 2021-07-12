import * as CommerceSdk from 'commerce-sdk'
import { normalizeProduct } from '../../utils/normalize'
import { Product } from '@commerce/types/product'
import { Provider, Sfb2cConfig } from '..'
import { OperationContext } from '@commerce/api/operations'

export type ProductVariables = { q?: string; limit?: number }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts(opts?: {
    variables?: ProductVariables
    config?: Partial<Sfb2cConfig>
    preview?: boolean
  }): Promise<{ products: Product[] }>

  async function getAllProducts({
    config: cfg,
    variables = { q: 'dress', limit: 5 },
  }: {
    query?: string
    variables?: ProductVariables
    config?: Partial<Sfb2cConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    debugger
    const config = commerce.getConfig(cfg)
    const clientConfig = await config.fetch()

    const catalogProducts = new CommerceSdk.Search.ShopperSearch(clientConfig)

    const productsResponse = await catalogProducts.productSearch({
      parameters: variables,
    })

    console.log(
      'YB Product response hits',
      JSON.stringify(productsResponse.hits)
    )

    const products = productsResponse.hits.map((product) => {
      return normalizeProduct(product)
    })

    return {
      products,
    }
  }

  return getAllProducts
}
