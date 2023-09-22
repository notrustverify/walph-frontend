import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React from 'react'
import Box from '@mui/material/Box'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import Button from '@mui/material/Button';
import Head from 'next/head';
import Link from 'next/link';
import { CssBaseline } from '@mui/material/';
import Typography from '@mui/material/Typography';
import { walphTheme, Item, WalphButton } from "../services/walphTheme";
import { Image } from 'mui-image'
import { Footer } from '@/components/Footer';
const theme = createTheme(walphTheme)

export default function Home() {
    const { account, connectionStatus } = useWallet()
  
      
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <Head>
          <title>walph dApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
        </Head>

    <div style={{ paddingLeft: "2em"  }} >
            <AlephiumConnectButton />
            <br/>
            <div style={{ display: "inline-flex"  }} >

            <Typography variant="h2" gutterBottom  >Welcome to Walph</Typography><Image src="./images/waffle_nobg.png" width={150} alt="waffle icon" shift="right" duration="0" style={{
                  borderRadius: '60%',
                  margin: '28px' ,
                  marginTop: -40, backgroundColor: "#8E0CC4" }}/> 
            </div>
            <Typography variant="h4">Experience a decentralized lottery powered by Alephium, <br/> offering transparent
            fair and secure draw</Typography> &nbsp; 
            
    </div>
    {
    //ALPH pool
    }
    <Box sx={{ width: '100%' }} padding={5}>

    <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>ALPH walph</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <Typography variant='h5'>Pot size: <strong>210 ALPH</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>10 ALPH</strong></Typography>
            <p>No token required</p>
            <WalphButton onClick={ () => {window.location.href ='/walph'} } variant="contained"  disabled={ connectionStatus != "connected" } >Join</WalphButton>

          </Item>
        </Grid>
        <Grid xs={6}>
       <Item> 
            <Typography variant='h5'>Pot size: <strong>500 ALPH</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>10 ALPH</strong></Typography>
            <p>ALF needed</p>
            <WalphButton variant="contained"  disabled={ connectionStatus != "connected" }>Join</WalphButton>
        </Item>
        </Grid>
      </Grid>

      {
    //blitz pool
    }
      <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>Blitz walph</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <Typography variant='h5'>Pot size: <strong>210 ALPH</strong></Typography>
            <br/>
            <Typography variant='h5'>Ticket price: <strong>10 ALPH</strong></Typography>
            <p>Draw every <strong>6 hours</strong></p>
            <WalphButton variant="contained" 
           
           onClick={ () => {window.location.href ='/blitz'}}
            disabled={ connectionStatus != "connected" }>Join</WalphButton>

          </Item>
        </Grid>
        <Grid xs={6}>
       <Item> 
            <Typography variant='h5'>Pot size: <strong>500 ALPH</strong></Typography>
            <br/>
            <Typography variant='h5'>Ticket price: <strong>10 ALPH</strong></Typography>
            <p>Draw every <strong>6 hours</strong></p>
            <WalphButton variant="contained"   disabled={ true }>Coming Soon</WalphButton>
        </Item>
        </Grid>
      </Grid>


      {
    //token pool
    }
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>Token walph</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={4}>
          <Item>
            <Typography variant='h5'>Pot size: <strong>210 ALF</strong></Typography>
            <br/>
            <Typography variant='h5'>Ticket price: <strong>10 ALF</strong></Typography>
            <p>No token required</p>
            <WalphButton variant="contained"  disabled={ connectionStatus != "connected" }>Join</WalphButton>
          </Item>
        </Grid>
        <Grid xs={4}>
       <Item> 
            <Typography variant='h5'>Pot size: <strong>2.1 ETH</strong></Typography>
            <br/>
            <Typography variant='h5'>Ticket price: <strong>0.01 ETH</strong></Typography>
            <p>No token required</p>
            <WalphButton variant="contained" disabled={true} >Coming Soon</WalphButton>
        </Item>
        </Grid>

        <Grid xs={4}>
          <Item>
            <Typography variant='h5'>Pot size: <strong>210 PACA</strong></Typography>
            <br/>
            <Typography variant='h5'>Ticket price: <strong>10 PACA</strong></Typography>
            <p>No token required</p>
            <WalphButton variant="contained"  disabled={ true }>Coming soon</WalphButton>
          </Item>
        </Grid>
      </Grid>
    </Box>


   <Footer />
    </ThemeProvider>
    )
  }