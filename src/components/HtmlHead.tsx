import React from 'react'
import Head from 'next/head'
import PoolSelector from './PoolSelector'
import { AlephiumConnectButton } from '@alephium/web3-react'

export const HtmlHead = () => {
  return (
    <>
      <Head>
        <title>walph dApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="./manifest.json" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png" />
      </Head>

      <div
        style={{
          display: 'inline-flex',
          paddingLeft: "2em"
        }}
      >
        <AlephiumConnectButton /> { location.pathname == "/" ?  '' :  <PoolSelector /> }
      </div>
    </>
  )
}