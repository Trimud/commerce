import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { sfb2cProvider, Sfb2cProvider } from './provider'

// TODO: Check if needed
// CommerceSdk.init(SWELL_STORE_ID, SWELL_PUBLIC_KEY)

export { sfb2cProvider }
export type { Sfb2cProvider }

export const sfb2cConfig: CommerceConfig = {
  locale: 'en-US',
  cartCookie: '',
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
