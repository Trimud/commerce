import { ClientConfig, Customer, helpers } from 'commerce-sdk'
import {
  getObjectFromResponse,
  ResponseError,
  ShopperToken,
  stripBearer,
} from '@commerce-apps/core'

import {
  COMMERCE_CLIENT_CLIENT_ID,
  COMMERCE_CLIENT_ORGANIZATION_ID,
  COMMERCE_CLIENT_SHORT_CODE,
  COMMERCE_CLIENT_API_SITE_ID
} from '../../const'

const clientConfig: ClientConfig = {
  // proxy: 'https://localhost:4444',
  parameters: {
    clientId: COMMERCE_CLIENT_CLIENT_ID,
    organizationId: COMMERCE_CLIENT_ORGANIZATION_ID,
    shortCode: COMMERCE_CLIENT_SHORT_CODE,
    siteId: COMMERCE_CLIENT_API_SITE_ID
  }
}

const ShopperCustomers = Customer.ShopperCustomers

/**
 * Get a refresh token
 *
 * @param shopperToken - Valid authorization token
 * @returns New token with updated expiry time
 */
const getRefreshToken = async (
  shopperToken: ShopperToken<Customer.ShopperCustomers.Customer>
): Promise<ShopperToken<Customer.ShopperCustomers.Customer>> => {
  const headers = { Authorization: shopperToken.getBearerHeader() }

  const client = new ShopperCustomers(clientConfig)

  const response: Response = await client.authorizeCustomer(
    { headers: headers, body: { type: 'refresh' } },
    true
  )

  if (!response.ok) {
    throw new ResponseError(response)
  }

  const customerInfo: Customer.ShopperCustomers.Customer =
    await getObjectFromResponse(response)

  return new ShopperToken(
    customerInfo,
    stripBearer(response.headers.get('Authorization') as string)
  )
}

const fetchApi = async () => {
  /**
   * Get auth token and then use it to get a refresh token
   */
  await helpers
    .getShopperToken(clientConfig, { type: 'guest' })
    .then((authToken) => {
      // console.log(`Authorization Token: ${authToken.getAuthToken()}`)
      // if (
      //   authToken.decodedToken &&
      //   typeof authToken.decodedToken === 'object'
      // ) {
      //   console.log(
      //     `Expiry Time: ${new Date(authToken.decodedToken.exp * 1000)}`
      //   )
      // }

      return getRefreshToken(authToken)
    })
    .then((refreshToken) => {
      // console.log(`Refresh Token: ${refreshToken.getAuthToken()}`)
      // if (
      //   refreshToken.decodedToken &&
      //   typeof refreshToken.decodedToken === 'object'
      // ) {
      //   console.log(
      //     `Expiry Time: ${new Date(refreshToken.decodedToken.exp * 1000)}`
      //   )
      // }

      clientConfig.headers = { authorization: refreshToken.getBearerHeader() }
    })
    .catch((error) => {
      console.log(`Error fetching token: ${error}`)
    })

  return clientConfig
}

export default fetchApi

// const fetchApi = async (query: string, method: string, variables: [] = []) => {
//   const { clientConfig } = sfb2cConfig

//   console.log({ clientConfig })
//   const token = await helpers.getShopperToken(clientConfig, {
//     type: 'guest',
//   })
//   clientConfig.headers = { authorization: token.getBearerHeader() }

//   console.log('Bearer Header', token.getBearerHeader())

//   return

//   // return sfb2c[query][method](...variables)
// }
// export default fetchApi
