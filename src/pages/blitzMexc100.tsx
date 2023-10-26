import React from 'react'
import styles from '@/styles/Home.module.css'
import { useWallet } from '@alephium/web3-react'
import { TimedWalph } from '@/components/TimedWalph'
import { walphTheme } from "../services/walphTheme";
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

  
        { (connectionStatus == "connected" || connectionStatus == "connecting") ? <TimedWalph durationDay={10} price={100} featuredWalph={true} contractName='WalphTimed_BlitzMexcTwentyDays' /> : ''}

        <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}
