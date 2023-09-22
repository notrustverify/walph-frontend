import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import Link from 'next/link'
import { TimedWalph } from '@/components/TimedWalph'
import { Walph50HodlAlf } from 'artifacts/ts'
import { walphTheme } from "../services/walphTheme";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import PoolSelector from '@/components/PoolSelector'
import { CssBaseline } from '@mui/material/';
import { Footer } from '@/components/Footer'
import { HtmlHead } from '@/components/HtmlHead'

export default function Home() {
  const { account, connectionStatus } = useWallet()
  const theme = createTheme(walphTheme)

  return (
    <>
      <ThemeProvider theme={theme}>
            <CssBaseline />
            <HtmlHead />

            <div className={styles.container}>
        <div style={{
          display:"inline-flex"
        }}>
       <AlephiumConnectButton /> &nbsp; <PoolSelector/>     
        </div>
        
        <Head>
          <title>walph dApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
        </Head>

        {connectionStatus == "connected" && <TimedWalph />}
        <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}
