// import * as CommerceSdk from 'commerce-sdk'
import { Sfb2cConfig } from '../api'
import { Category } from '../types/site'

const getCategories = async (config: Sfb2cConfig): Promise<Category[]> => {
  const clientConfig = await config.fetch()
  // const catalogsClient = new CommerceSdk.Product.Catalogs(clientConfig)

  // const rootCategories = await catalogsClient.getCategoriesFromCatalog({
  //   parameters: {
  //     catalogId: 'root',
  //     limit: 1,
  //   },
  // })
  const rootCategories = {
    categories: [{
      id: '',
      name: '',
      slug: '',
      path: ''
    }]
  }

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
