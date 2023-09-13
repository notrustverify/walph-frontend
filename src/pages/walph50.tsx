import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import Link from 'next/link'
import { WalphDapp50 } from '@/components/WalphleDapp50'
import { Description } from '@/components/WalphDescription'
import { Walph50HodlAlf } from 'artifacts/ts'

export default function Home() {
  const { account, connectionStatus } = useWallet()

  return (
    <>
      <div className={styles.container}>
        <AlephiumConnectButton />
        
        <Head>
          <title>walph dApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
        </Head>
        {connectionStatus == "connected" ? (
          ''
        ) : (
         <Description />
        )}

        {connectionStatus == "connected" && <WalphDapp50 />}
        <p className={styles.center} >Proudly Powered by&nbsp;<Link href="https://notrustverify.ch">No Trust Verify</Link></p>
      </div>
    </>
  )
}
