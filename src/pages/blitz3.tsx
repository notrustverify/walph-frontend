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

  
        { (connectionStatus == "connected" || connectionStatus == "connecting") ? <TimedWalph durationDay={3} price={10}/> : ''}
        <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}
