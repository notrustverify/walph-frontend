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

      <div style={{ paddingLeft: '2em', overflowX: "hidden" }}>
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
              marginTop: -20,
              backgroundColor: '#8E0CC4'
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
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          Alephium walph
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Pot size: <strong>210 ALPH</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>10 ALPH</strong>
              </Typography>
              <p>No token required</p>
              <WalphButton
                onClick={() => {
                  window.location.href = '/walph'
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
                Pot size: <strong>500 ALPH</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>10 ALPH</strong>
              </Typography>
              <p>1 ALF required</p>
              <WalphButton
                onClick={() => {
                  window.location.href = '/walph50'
                }}
                variant="contained"
                disabled={connectionStatus != 'connected'}
              >
                Join
              </WalphButton>
            </Item>
          </Grid>
        </Grid>

        {
          //blitz pool
        }
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          Blitz walph
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Draw every <strong>6 hours</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>10 ALPH</strong>
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
                Draw every <strong>12 days</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>5 ALPH</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton variant="contained" disabled={true}>
                Soon
              </WalphButton>
            </Item>
          </Grid>
        </Grid>

        {
          //token pool
        }
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>
          Token walph
        </Typography>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Pot size: <strong>210 ALF</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>10 ALF</strong>
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
                Pot size: <strong>2.1 ETH</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>0.01 ETH</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton variant="contained" disabled={true}>
                Soon
              </WalphButton>
            </Item>
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Pot size: <strong>210 PACA</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>10 PACA</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton variant="contained" disabled={true}>
                Soon
              </WalphButton>
            </Item>
          </Grid>

          <Grid xs={12} md={6}>
            <Item>
              <Typography variant="h5">
                Pot size: <strong>210 AYIN</strong>
              </Typography>
              <Typography variant="h5">
                Ticket price: <strong>10 AYIN</strong>
              </Typography>
              <p>&nbsp;</p>
              <WalphButton variant="contained" disabled={true}>
                Soon
              </WalphButton>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
