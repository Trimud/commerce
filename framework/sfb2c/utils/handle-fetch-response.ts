import { CommerceError } from '@commerce/utils/errors'

type Sfb2cFetchResponse = {
  error: {
    message: string
    code?: string
  }
}

const handleFetchResponse = async (res: Sfb2cFetchResponse) => {
  if (res) {
    if (res.error) {
      throw new CommerceError(res.error)
    }
    return res
  }
}

export default handleFetchResponse
