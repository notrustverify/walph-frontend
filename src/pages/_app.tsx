import React, { useEffect, useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AlephiumWalletProvider } from '@alephium/web3-react'
import { NetworkId } from '@alephium/web3'

export default function App({ Component, pageProps }: AppProps) {
  function useWalletProvider() {
    const [walletProvider, setWalletProvider] = useState(null)

    useEffect(() => {
      setWalletProvider(
        <AlephiumWalletProvider
          theme="soft"
          network={
            process.env.NEXT_PUBLIC_NETWORK === undefined
              ? ('mainnet' as NetworkId)
              : (process.env.NEXT_PUBLIC_NETWORK as NetworkId)
          }
        >
          <br />
          <Component {...pageProps} />
        </AlephiumWalletProvider>
      )
    }, [])

    return walletProvider
  }

  const walletProviderComp = useWalletProvider()
  return walletProviderComp
}
