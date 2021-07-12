import getCategories from '../../utils/get-categories'
import getVendors, { Brands } from '../../utils/get-vendors'
import { Provider, Sfb2cConfig } from '..'
import type { OperationContext } from '@commerce/api/operations'
import type { Category } from '@commerce/types/site'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brands
  }
> = T

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo({
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<Sfb2cConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)
    // const categories = await getCategories(config)
    const brands = await getVendors(config)

    return {
      categories: [{id: 'test', name: 'cat_name', slug: 'slug', path: './'}],
      brands,
    }
  }

  return getSiteInfo
}