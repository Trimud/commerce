import { Fetcher } from '@commerce/utils/types'
import { handleFetchResponse } from './utils'
import { sfb2cConfig } from './index'
import { CommerceError } from '@commerce/utils/errors'

const fetcher: Fetcher = async ({ method = 'get', variables, query }) => {
  // TODO: YB Change swell here
  const { swell } = sfb2cConfig

  async function callSfb2c() {
    if (Array.isArray(variables)) {
      const arg1 = variables[0]
      const arg2 = variables[1]
      const response = await swell[query!][method](arg1, arg2)
      return handleFetchResponse(response)
    } else {
      const response = await swell[query!][method](variables)
      return handleFetchResponse(response)
    }
  }

  if (query && query in swell) {
    return callSfb2c()
  } else {
    throw new CommerceError({ message: 'Invalid query argument!' })
  }
}

export default fetcher
