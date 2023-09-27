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
import { HtmlHead } from '@/components/HtmlHead'
import { getDeployerAddresses } from '@/services/utils';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const theme = createTheme(walphTheme)
export default function Home() {
    const { account, connectionStatus } = useWallet()
  
      
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HtmlHead />


    <div style={{ paddingLeft: "2em"  }} >
            <br/>
            <div style={{ display: "inline-flex"  }} >

            <Typography variant="h2" gutterBottom sx={{ color: "#FEC26C", fontWeight: 900  }} >Welcome to Walph</Typography><Image src="./images/waffle_nobg.png" width={150} alt="waffle icon" shift="right" duration={0} style={{
                  borderRadius: '60%',
                  margin: '28px' ,
                  marginTop: -40, backgroundColor: "#8E0CC4" }}/> 
            </div>
            <Typography variant="h4">Experience a decentralized lottery powered by Alephium, <br/> offering transparent
            fair and secure draw</Typography> &nbsp; 
            
    </div>
    <div 
        style={{
          maxWidth: "50%",
          marginLeft: "2em",
          borderRadius: "10px"
        }}
    >
    <Accordion

    >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How it works</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Walph is a lucky based game running on <a href="https://alephium.org">Alephium</a> blockchain. There are multiple pools, called walph that can give you the chance to win <i>$ALPH</i>, <i>$ALF</i>, <i>$AYIN</i> or even <i>$ETH</i>. Just buy a ticket and wait for your chance to come
            <br/>
            <br/>
            Pools Type:
            <li>
              <ol>Alephium: walphs with native tokens. The draw happen when all the tickets have been bought</ol>
              <ol>Blitz: walphs that are drawn every x time</ol>
              <ol>Token: walphs with token on Alephium chain, like ALF, PACA or AYIN</ol>
            </li>
            <br/>
            To start playing, connect your wallet (<Link href="https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/" prefetch={false} rel="noopener noreferrer" target="_blank">Firefox</Link> or <Link href="https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj" prefetch={false} rel="noopener noreferrer" target="_blank">
                  Chrome</Link>), select a pool and buy tickets 
            
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
    {
    //ALPH pool
    }
    <Box sx={{ width: '100%' }} padding={5}>

    <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>Alephium walph</Typography>
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
            <WalphButton  onClick={ () => {window.location.href ='/walph50'} }variant="contained"  disabled={ connectionStatus != "connected" }>Join</WalphButton>
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
            <Typography variant='h5'>Draw every <strong>6 hours</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>10 ALPH</strong></Typography>
            <p></p>
            <WalphButton variant="contained" 
           
           onClick={ () => {window.location.href ='/blitz'}}
            disabled={ connectionStatus != "connected" }>Join</WalphButton>

          </Item>
        </Grid>
        <Grid xs={6}>
       <Item> 
            <Typography variant='h5'>Draw every <strong>12 days</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>5 ALPH</strong></Typography>
            <p></p>
            <WalphButton variant="contained"   disabled={ true }>Soon</WalphButton>
        </Item>
        </Grid>
      </Grid>


      {
    //token pool
    }
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 1 }}>Token walph</Typography>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <Typography variant='h5'>Pot size: <strong>210 ALF</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>10 ALF</strong></Typography>
            <p>No token required</p>
            <WalphButton variant="contained" onClick={ () => {window.location.href ='/walf'}}  disabled={ connectionStatus != "connected" }>Join</WalphButton>
          </Item>
        </Grid>
        <Grid xs={6}>
       <Item> 
            <Typography variant='h5'>Pot size: <strong>2.1 ETH</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>0.01 ETH</strong></Typography>
            <p>No token required</p>
            <WalphButton variant="contained" disabled={true} >Soon</WalphButton>
        </Item>
        </Grid>

        <Grid xs={6}>
          <Item>
            <Typography variant='h5'>Pot size: <strong>210 PACA</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>10 PACA</strong></Typography>
            <p>No token required</p>
            <WalphButton variant="contained"  disabled={ true }>Soon</WalphButton>
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>
            <Typography variant='h5'>Pot size: <strong>210 AYIN</strong></Typography>
            <Typography variant='h5'>Ticket price: <strong>10 AYIN</strong></Typography>
            <p>&nbsp;</p>
            <WalphButton variant="contained"  disabled={ true }>Soon</WalphButton>
          </Item>
        </Grid>

      </Grid>
    </Box>


   <Footer />
    </ThemeProvider>
    )
  }
