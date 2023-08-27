import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AlephiumWalletProvider } from '@alephium/web3-react'
import { walpheConfig } from '@/services/utils'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlephiumWalletProvider
      useTheme="minimal"
      network={walpheConfig.network}
      addressGroup={walpheConfig.groupIndex}
    >
          <br/><Component {...pageProps} />
    </AlephiumWalletProvider>
  )
}
