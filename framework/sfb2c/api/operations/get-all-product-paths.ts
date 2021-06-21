import { Sfb2cProduct } from '../../types'
import { Sfb2cConfig, Provider } from '..'
import { OperationContext, OperationOptions } from '@commerce/api/operations'
import { GetAllProductPathsOperation } from '@commerce/types/product'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<
    T extends GetAllProductPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: Sfb2cConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: Sfb2cConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: Sfb2cConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { results } = await config.fetch('products', 'list', [
      {
        limit: variables?.first,
      },
    ])

    return {
      products: results?.map(({ slug: handle }: Sfb2cProduct) => ({
        path: `/${handle}`,
      })),
    }
  }

  return getAllProductPaths
}
