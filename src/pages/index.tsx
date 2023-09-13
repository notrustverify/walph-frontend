import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { WalphDapp } from '@/components/WalphleDapp'
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import Link from 'next/link'
import { Description } from '@/components/WalphDescription'

export default function Home() {
  const { account, connectionStatus } = useWallet()

  return (
    <>
      <div className={styles.container}>
        <AlephiumConnectButton />
        
        <Head>
          <title>wALPH dApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>

          <meta name="title" content="Decentralized application to win ALPH, powered by No Trust Verify" />
          <meta name="description" content="Try your chance to win some ALPH by participating on the walph decentralized lottery, running on Alephium" />
          

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://walph.io/" />
          <meta property="og:title" content="Decentralized application to win ALPH, powered by No Trust Verify" />
          <meta property="og:description" content="Try your chance to win some ALPH by participating on the walph decentralized lottery, running on Alephium" />
          <meta property="og:image" content="/images/apple-touch-icon.png" />
          
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://walph.io/" />
          <meta property="twitter:title" content="Decentralized application to win ALPH, powered by No Trust Verify" />
          <meta property="twitter:description" content="Try your chance to win some ALPH by participating on the walph decentralized lottery, running on Alephium" />
          <meta property="twitter:image" content="/images/apple-touch-icon.png" />
          
        </Head>
        
        {connectionStatus == "connected" ? (
          ''
        ) : (
          <Description />
        )}
        {connectionStatus == "connected" && <WalphDapp />}
        <p className={styles.center} >Proudly Powered by&nbsp;<Link href="https://notrustverify.ch">No Trust Verify</Link></p>
      </div>
    </>
  )
}
