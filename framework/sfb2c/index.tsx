import * as CommerceSdk from 'commerce-sdk-isomorphic'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { sfb2cProvider, Sfb2cProvider } from './provider'
import {
  COMMERCE_CLIENT_CLIENT_ID,
  COMMERCE_CLIENT_ORGANIZATION_ID,
  COMMERCE_CLIENT_SHORT_CODE,
  COMMERCE_CLIENT_API_SITE_ID
} from './const'

// TODO: Check if needed
// CommerceSdk.init(SWELL_STORE_ID, SWELL_PUBLIC_KEY)

export { sfb2cProvider }
export type { Sfb2cProvider }

const clientConfig: CommerceSdk.ClientConfig = {
  // proxy: 'https://localhost:4444',
  parameters: {
    clientId: COMMERCE_CLIENT_CLIENT_ID,
    organizationId: COMMERCE_CLIENT_ORGANIZATION_ID,
    shortCode: COMMERCE_CLIENT_SHORT_CODE,
    siteId: COMMERCE_CLIENT_API_SITE_ID
  }
}

export const sfb2cConfig: any = {
  locale: 'en-US',
  clientConfig,
}

export type Sfb2cConfig = Partial<CommerceConfig>

export type Sfb2cProps = {
  children?: ReactNode
  locale: string
} & Sfb2cConfig

export function CommerceProvider({ children, ...config }: Sfb2cProps) {
  return (
    <CoreCommerceProvider
      provider={sfb2cProvider as any}
      config={{ ...sfb2cConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
