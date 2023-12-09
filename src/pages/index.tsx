import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import React from 'react'
import Box from '@mui/material/Box'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import Button from '@mui/material/Button'
import Head from 'next/head'
import Link from 'next/link'
import { CssBaseline } from '@mui/material/'
import Typography from '@mui/material/Typography'
import { walphTheme, Item, WalphButton } from '../services/walphTheme'
import { Image } from 'mui-image'
import { Footer } from '@/components/Footer'
import { HtmlHead } from '@/components/HtmlHead'
import { getDeployerAddresses } from '@/services/utils'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const theme = createTheme(walphTheme)
export default function Home() {
  const { account, connectionStatus } = useWallet()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HtmlHead />

      <div style={{ paddingLeft: '2em', overflowX: 'hidden' }}>
        <br />
        <div style={{ display: 'inline-flex' }}>
          <Typography variant="h2" gutterBottom sx={{ color: '#FEC26C', fontWeight: 900 }}>
            Welcome to Walph
          </Typography>
          <Image
            src="./images/waffle_nobg.png"
            width={150}
            alt="waffle icon"
            shift="right"
            duration={0}
            style={{
              borderRadius: '60%',
              margin: '28px',
              marginTop: -20
            }}
          />
        </div>
        <Typography variant="h4">
          Experience a decentralized lottery powered by Alephium, <br /> offering transparent fair and secure draw
        </Typography>{' '}
        &nbsp;
      </div>
      <div
        style={{
          width: 'min(94%,max(300px, 94vw))',
          margin: 'auto',
          borderRadius: '10px'
        }}
      >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>How it works</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Walph is an exciting luck-based game running on <a href="https://alephium.org">Alephium</a> blockchain. In
              this game, you can participate in various pools, known as "Walphs", for a chance to win token like $ALPH,
              $ALF, $AYIN, or even $ETH. Simply purchase a ticket and wait your opportunity to win.
              <br />
              <br />
              There are three types of pools in Walph:
              <ul>
                <li>
                  Alephium pools: These Walphs use ALPH token. The draw takes place when all tickets have been sold.
                </li>
                <li>Blitz Pools: Blitz Walphs are drawn at regular intervals.</li>
                <li>Token Pools: These Walphs involve tokens on the Alephium chain, such as ALF, PACA, or AYIN.</li>
              </ul>
              <br />
              To be notified of the draws, join this <a href="https://t.me/walphLottery">Telegram Group</a>
              <br />
              To get started, connect your wallet (
              <Link
                href="https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/"
                prefetch={false}
                rel="noopener noreferrer"
                target="_blank"
              >
                Firefox
              </Link>{' '}
              or{' '}
              <Link
                href="https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj"
                prefetch={false}
                rel="noopener noreferrer"
                target="_blank"
              >
                Chrome
              </Link>
              ), choose a pool, and purchase your tickets. It's that easy!
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      {
        //ALPH pool
      }

      <Box sx={{ width: '100%' }} padding={5}>
        {/*
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          Featured walph
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12} md={12}>
            <Item>
              <Typography variant="h5">
                Draw in 30 days
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>1000 ALPH</strong>
              </Typography>
              <p>MEXC Donation</p>
              <WalphButton
                onClick={() => {
                  window.location.href = '/blitzMexc'
                }}
                variant="contained"
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>

          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw in 5 days
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>50 ALPH</strong>
              </Typography>
              <p>MEXC Donation</p>
              <WalphButton
                onClick={() => {
                  window.location.href = '/blitzMexc50'
                }}
                variant="contained"
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
             

          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw in 10 days
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>100 ALPH</strong>
              </Typography>
              <p>MEXC Donation</p>
              <WalphButton
                onClick={() => {
                  window.location.href = '/blitzMexc100'
                }}
                variant="contained"
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>

          <Grid xs={12} md={12}>
            <Item>
              <Typography variant="h5">
                Draw in 20 days
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>200 ALPH</strong>
              </Typography>
              <p>MEXC Donation</p>
              <WalphButton
                onClick={() => {
                  window.location.href = '/blitzMexc200'
                }}
                variant="contained"
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>

        </Grid>
       */}
        


        {
          //blitz pool
        }
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          Blitz Alephium walph
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} md={12}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>1 day</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>1 ALPH</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/blitz1'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>

          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>1 day</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>5 ALPH</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/blitz'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>3 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>10 ALPH</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/blitz3'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
        </Grid>


        {
          //token pool
        }
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          Blitz Stable walph
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>3 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>1 USDT</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/blitzUsdt'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>3 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>1 USDC</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/blitzUsdc'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
        </Grid>


        {
          //token pool
        }
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          Blitz Token walph
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>3 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>500 NGU</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/wngu'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>5 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>1000 NGU</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/wngu5'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>3 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>1 ALF</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/walf'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>3 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>1 AYIN</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton
                variant="contained"
                onClick={() => {
                  window.location.href = '/wayin'
                }}
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
