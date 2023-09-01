import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AlephiumWalletProvider } from '@alephium/web3-react'
import { NetworkId, networkIds } from '@alephium/web3'
import { Network } from '@alephium/cli'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlephiumWalletProvider
      useTheme="minimal"
      network={
        process.env.NEXT_PUBLIC_NETWORK === undefined
          ? "mainnet" as NetworkId
          : process.env.NEXT_PUBLIC_NETWORK as NetworkId
      }
    >
      <br />
      <Component {...pageProps} />
    </AlephiumWalletProvider>
  )
}
