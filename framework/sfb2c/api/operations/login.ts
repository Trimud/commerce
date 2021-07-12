import type { ServerResponse } from 'http'
import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { LoginOperation } from '../../types/login'
import { Provider, Sfb2cConfig } from '..'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: Partial<Sfb2cConfig>
    res: ServerResponse
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<Sfb2cConfig>
      res: ServerResponse
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    variables,
    res: response,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    res: ServerResponse
    config?: Partial<Sfb2cConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data } = await config.fetch('account', 'login', [variables])

    return {
      result: data,
    }
  }

  return login
}
