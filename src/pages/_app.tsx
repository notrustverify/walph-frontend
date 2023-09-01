import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AlephiumWalletProvider } from '@alephium/web3-react'
import { networkIds } from '@alephium/web3'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlephiumWalletProvider
      useTheme="minimal"
      network={
        process.env.NEXT_PUBLIC_NETWORK === undefined
          ? 'mainnet'
          : process.env.NEXT_PUBLIC_NETWORK
      }
    >
      <br />
      <Component {...pageProps} />
    </AlephiumWalletProvider>
  )
}
