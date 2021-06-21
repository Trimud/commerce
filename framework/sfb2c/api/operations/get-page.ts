import { Page } from '../../schema'
import { Sfb2cConfig, Provider } from '..'
import { OperationContext, OperationOptions } from '@commerce/api/operations'
import { GetPageOperation } from '../../types/page'

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: number
}

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetPageOperation>(opts: {
    variables: T['variables']
    config?: Partial<Sfb2cConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getPage<T extends GetPageOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<Sfb2cConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getPage<T extends GetPageOperation>({
    variables,
    config,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<Sfb2cConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const { fetch, locale = 'en-US' } = commerce.getConfig(config)
    const id = variables.id
    const result = await fetch('content', 'get', ['pages', id])
    const page = result

    return {
      page: page
        ? {
            ...page,
            url: `/${locale}/${page.slug}`,
          }
        : null,
    }
  }

  return getPage
}
