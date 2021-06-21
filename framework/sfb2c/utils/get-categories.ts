import * as CommerceSdk from 'commerce-sdk-isomorphic'
import { Sfb2cConfig } from '../api'
import { Category } from '../types/site'

const getCategories = async (config: Sfb2cConfig): Promise<Category[]> => {
  const clientConfig = await config.fetch()
  const catalogProducts = new CommerceSdk.ShopperProducts(clientConfig)

  const rootCategories = await catalogProducts.getCategory({
    parameters: {
      id: 'root',
      levels: 1,
    },
  })

  return (
    rootCategories.categories.map(({ id, name, parentCategoryTree }: any) => {
      const path = parentCategoryTree
        .map((category: any) => category.id)
        .join('/')

      return {
        id,
        name,
        slug: id,
        path: `/${path}`,
      }
    }) ?? []
  )
}

export default getCategories
