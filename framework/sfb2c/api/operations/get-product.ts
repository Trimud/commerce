import { normalizeProduct } from '../../utils'

import { Product } from '@commerce/types/product'
import { OperationContext } from '@commerce/api/operations'
import { Provider, Sfb2cConfig } from '..'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct({
    variables,
    config: cfg,
  }: {
    query?: string
    variables: { slug: string }
    config?: Partial<Sfb2cConfig>
    preview?: boolean
  }): Promise<Product | {} | any> {
    const config = commerce.getConfig(cfg)

    const product = await config.fetch('products', 'get', [variables.slug])

    if (product && product.variants) {
      product.variants = product.variants?.results
    }

    return {
      product: product ? normalizeProduct(product) : null,
    }
  }

  return getProduct
}
