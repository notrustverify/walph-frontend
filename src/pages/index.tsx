import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { WalphleDapp } from '@/components/WalphleDapp'
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import { walpheConfig } from '@/services/utils'

export default function Home() {
  const wallet = useWallet()

  return (
    <>
      <div className={styles.container}>
        <AlephiumConnectButton />
        <Head>
          <title>Walphle dApp</title>
          <meta name="description" content="Powered by No Trust Verify" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        {!!wallet && <WalphleDapp config={walpheConfig} />}
      </div>
    </>
  )
}
