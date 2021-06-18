import * as React from 'react'
import { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { sfccProvider } from './provider'

export const sfccConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: 'session',
}

export type SfccConfig = Partial<CommerceConfig>

export type SfccProps = {
  children?: ReactNode
  locale: string
} & SfccConfig

export function CommerceProvider({ children, ...config }: SfccProps) {
  return (
    <CoreCommerceProvider
      provider={sfccProvider}
      config={{ ...sfccConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
