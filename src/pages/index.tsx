import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React from 'react'
import Item from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import Button from '@mui/material/Button';
import Head from 'next/head';
import Link from 'next/link';
import { CssBaseline } from '@mui/material/';
import Typography from '@mui/material/Typography';
import walphTheme from "../services/walphTheme";
import { Image } from 'mui-image'

export default function Home() {
    const { account, connectionStatus } = useWallet()
   
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eec459',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: "10px"
      }));
      
    const theme = createTheme(walphTheme)
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

            <Typography variant="h2" gutterBottom  >Welcome to Walph</Typography><Image src="./images/waffle_nobg.png" width={150} alt="waffle icon" shift="right" duration="0" style={{ marginTop: -50 }}/> 
            </div>
            <Typography variant="h5">Experience a decentralized lottery powered by Alephium, <br/> offering transparent
            fair and secure draw</Typography> &nbsp; 
            
    </div>
    {
    //ALPH pool
    }
    <Box sx={{ width: '100%' }} padding={5}>

    <h2>ALPH walph</h2>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <big>Pot size: <strong>210 ALPH</strong></big>
            <br/>
            <big>Ticket price: <strong>10 ALPH</strong></big>
            <p>No token required</p>
            <Button onClick={ () => {window.location.href ='/walph'} } variant="contained" disabled={ connectionStatus != "connected" } >Participate</Button>

          </Item>
        </Grid>
        <Grid xs={6}>
       <Item> 
            <big>Pot size: <strong>500 ALPH</strong></big>
            <br/>
            <big>Ticket price: <strong>10 ALPH</strong></big>
            <p>ALF needed</p>
            <Button variant="contained"  disabled={ connectionStatus != "connected" }>Participate</Button>
        </Item>
        </Grid>
      </Grid>


      <h2>Blitz walph</h2>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <big>Pot size: <strong>210 ALPH</strong></big>
            <br/>
            <big>Ticket price: <strong>10 ALPH</strong></big>
            <p>Draw every <strong>6 hours</strong></p>
            <Button variant="contained"  disabled={ connectionStatus != "connected" }>Participate</Button>

          </Item>
        </Grid>
        <Grid xs={6}>
       <Item> 
            <big>Pot size: <strong>500 ALPH</strong></big>
            <br/>
            <big>Ticket price: <strong>10 ALPH</strong></big>
            <p>Draw every <strong>6 hours</strong></p>
            <Button variant="contained"  disabled={ true }>Coming Soon</Button>
        </Item>
        </Grid>
      </Grid>



        <h2>Token walph</h2>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <big>Pot size: <strong>210 ALF</strong></big>
            <br/>
            <big>Ticket price: <strong>10 ALF</strong></big>
            <p>No token required</p>
            <Button variant="contained"  disabled={ connectionStatus != "connected" }>Participate</Button>
          </Item>
        </Grid>
        <Grid xs={6}>
       <Item> 
            <big>Pot size: <strong>210 PACA</strong></big>
            <br/>
            <big>Ticket price: <strong>10 PACA</strong></big>
            <p>ALF needed</p>
            <Button variant="contained" disabled={true} >Coming Soon</Button>
        </Item>
        </Grid>
      </Grid>
    </Box>


    <div style={{ textAlign: "center" }} >
    <p>Proudly Powered by&nbsp;<Link href="https://notrustverify.ch">No Trust Verify</Link></p>
    </div>
    </ThemeProvider>
    )
  }