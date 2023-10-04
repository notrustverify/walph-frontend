import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/timedWalph'
import { TxStatus } from './TxStatus'
import { useWallet, useBalance } from '@alephium/web3-react'
import { node, groupOfAddress, NetworkId, SignerProvider, Contract, NodeProvider } from '@alephium/web3'
//import { Walph50HodlAlf, Walph50HodlAlfTypes } from 'artifacts/ts'
import { WalphTimed, WalphTimedTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'
import { WalphConfig, getDeployerAddresses, findToken, getTokenNameToHold, getRelativeTimeString } from '@/services/utils'
import { loadDeployments } from 'artifacts/ts/deployments'
import { NotEnoughToken } from './NotEnoughToken'
import Link from 'next/link'
import { NumTicket } from './NumTickets'
import { walphTheme, Item, WalphButton } from '../services/walphTheme'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material/'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import ConfettiExplosion from 'react-confetti-explosion'
import { WalphCountdown } from './Countdown'
import * as fetchRetry from 'fetch-retry'
import configuration from 'alephium.config'

interface data {
durationDay : number 

}


const theme = createTheme(walphTheme)

const retryFetch = fetchRetry.default(fetch, {
  retries: 10,
  retryDelay: 1000
})
const nodeProvider = new NodeProvider(configuration.networks[process.env.NEXT_PUBLIC_NETWORK].nodeUrl, undefined, retryFetch)

export const TimedWalph = ({ durationDay }: data) => {
  const { account, connectionStatus, signer } = useWallet()
  const [ticketAmount, setBuyAmount] = useState(0)
  const [getStateFields, setStateFields] = useState<WalphTimedTypes.Fields>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()
  const [count, setCount] = React.useState<number>(1)
  const { balance, updateBalanceForTx } = useBalance()
  const [nextDraw, setNextDraw] = useState<string>('')
  const [fullDrawDate, setFullDrawDate] = useState<string>('')

  function getNetwork(): NetworkId {
    const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as NetworkId
    return network
  }

  function getWalphConfig(): WalphConfig {
    const network = getNetwork()

    let walpheContract = undefined
    // TODO find a better way to get deployer addresses
    const deployerAddresses = getDeployerAddresses()
    if (account !== undefined && connectionStatus === 'connected') {
      console.log(durationDay)
      if( durationDay == 1) {
      walpheContract = loadDeployments(
        network,
        deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(account.address))
      ).contracts.WalphTimed_BlitzOneDay.contractInstance
    }

    if( durationDay == 3) {
      walpheContract = loadDeployments(
        network,
        deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(account.address))
      ).contracts.WalphTimed_BlitzThreeDays.contractInstance
    }
    console.log(walpheContract)
      const groupIndex = walpheContract.groupIndex
      const walpheContractAddress = walpheContract.address
      const walpheContractId = walpheContract.contractId
      return { network, groupIndex, walpheContractAddress, walpheContractId }
    
  } }

  const config = getWalphConfig()

  const handleBuyTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (account !== undefined && connectionStatus === 'connected') {
      const result = await buyTicket(
        signer,
        (ticketAmount * ticketPriceHint).toString(),
        config.walpheContractId,
        "",0n
      )
      setOngoingTxId(result.txId)
    }
  }

  const txStatusCallback = useCallback(
    async (status: node.TxStatus, numberOfChecks: number): Promise<any> => {
      if ((status.type === 'Confirmed' && numberOfChecks > 1) || (status.type === 'TxNotFound' && numberOfChecks > 1)) {
        setOngoingTxId(undefined)
      }

      return Promise.resolve()
    },
    [setOngoingTxId]
  )

  const getPoolStatus = useCallback(async () => {

    if (config !== undefined && connectionStatus == "connected") {
      web3.setCurrentNodeProvider(nodeProvider)
      const WalphState = WalphTimed.at(config.walpheContractAddress)

      const initialState = await WalphState.fetchState()
      setStateFields(initialState.fields)
    }
  }, [config, connectionStatus])

  useEffect(() => {
    if (signer?.nodeProvider) {
      getPoolStatus()
    }
  }, [signer?.nodeProvider, getPoolStatus])

  getPoolStatus()

  const ticketPriceHint = Number(getStateFields?.ticketPrice) / 10 ** 18

  const slotFree = Number((getStateFields?.poolSize - getStateFields?.balance) / getStateFields?.ticketPrice)

  const poolSize = Number(getStateFields?.poolSize) / 10 ** 18

  const poolFeesPercent = Number(getStateFields?.poolFees*getStateFields?.balance)/10 ** 18/100 //TODO correct this shit

  const numAttendees = Number(getStateFields?.numAttendees)

  const lastWinner = getStateFields?.lastWinner.toString()
  let lastWinnerTrunc = getStateFields?.lastWinner.toString().slice(0,6)+"..."+getStateFields?.lastWinner.toString().slice(-6)
  if (lastWinner == "tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq")
      lastWinnerTrunc = '-'

  const inc = () => {
    if (count < poolSize) setCount(count + 1)
  }

  const dec = () => {
    if (count > 1) setCount(count - 1)
  }

  if (count > slotFree) setCount(slotFree)

  console.log('ongoing..', ongoingTxId)

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <br/>
      <Box >
      <Grid container spacing={0}
        sx={{ marginTop: -2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              margin: "auto",
              width: "min(100%,max(600px, 60vw))",
            }} >
              
          <Grid xs>
          
   
            <Item >
           
     
        <Typography align="left"
        
        sx={{
          fontWeight: 500,
          fontSize: 18,
          paddingLeft: 3,
          paddingBottom: 1,
          paddingTop: 1,
        }}
        >
             <NumTicket
                address={account?.address}
                attendees={getStateFields?.attendees.slice(0, numAttendees)}
                ticketPrice={ticketPriceHint}
                tokenTicker={'ALPH'}
                poolSeat={numAttendees}
              /></Typography>

              <br/>
              <Typography
              sx={{
                fontWeight: 500,
                fontSize: 20,
                paddingLeft: 1,
                paddingRight: 1,
                marginBottom: 2
              }}
              >
                Pool status: <b>{getStateFields?.open ? 'open' : 'in progress'}</b> - Pool fees:{' '}
                <b>{poolFeesPercent} ALPH</b> - group: <b>{config?.groupIndex}</b>{' '}
              
              </Typography>

                <Typography
              sx={{
                fontWeight: 500,
                fontSize: 30,
                paddingLeft: 1,
                paddingRight: 1,
                marginTop: -6
              }}
              >
              <h4>Draw in&nbsp; 
                {
                  getStateFields?.drawTimestamp ? 
                <WalphCountdown drawTimestamp={Number(getStateFields?.drawTimestamp)} />
                : ''
                }
                </h4>
              <h3 style={{ marginTop: -40 }}>Prize pot: {Number(getStateFields?.numAttendees) * ticketPriceHint} ALPH</h3>

              </Typography>
              

              <Typography 
              sx={{
                fontWeight: 500,
                fontSize: 25,
                paddingLeft: 1,
                paddingRight: 1
              }}>

              Last Winner:{' '}
              <b>
                {  lastWinner === account?.address ? 
                  "You 🫵": lastWinnerTrunc }
              </b>
              <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      maxWidth: '50%',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  >
                    { ( lastWinner === account?.address && connectionStatus == "connected" ) && (
                      <ConfettiExplosion force={0.6} duration={3000} particleCount={250} width={1600} />
                    )}
                  </div>
              {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
              <br />
              <p >
                Ticket price: <strong>{Number(getStateFields?.ticketPrice) / 10 ** 18} ALPH</strong>
              </p>
              </Typography>
              <br />
              <form onSubmit={handleBuyTicket} 
                  
                  style={{
                      border: "none",
                      display: "inline-block",
                      boxShadow: "none",
                      margin: "auto",
                      padding: "auto"
                  }}  
                  
                  >
             
                <div>
                  <Fab
                    variant="extended"
                    size="small"
                    onClick={() => {
                      dec()
                    }}
                    
                  >
                   <div style={{ paddingBottom: 7, fontSize: 20 }}>-</div> 
                  </Fab>
                  
                  <Typography
                    align="center"
                    display="inline"
                    sx={{
                      fontWeight: 500,
                      fontSize: 24,
                      paddingLeft: 1,
                      paddingRight: 1
                    }}
                  >

                  {count.toString()}
                  </Typography>

                  <Fab
                    variant="extended"
                    size="small"
                    onClick={() => {
                      inc()
                    }}
                    
                  >
                    <div style={{ paddingBottom: 3, fontSize: 20 }} >+</div>
                  </Fab>
                  
                  {slotFree - count < 1 ? (
                    <WalphButton
                      variant="contained"
                      style={{ 
                      display: 'inline-block', marginRight: '1em', 
                      marginLeft: '1em',
                      borderRadius: "10px",
                      fontSize:16
                    }}
                      type='submit'
                      onClick={() => setBuyAmount(count)}
                      disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                    >
                      <b>{ongoingTxId ? 'Waiting for tx' : 'Buy and draw'}</b>
                    </WalphButton>
                  ) : (
                   
                    <WalphButton
                      variant="contained"
                      style={{ display: 'inline-block', marginRight: '1em', marginLeft: '1em', borderRadius: "10px", fontSize:16 }}
                      onClick={() => {
                        setBuyAmount(count)
                        
                      }}
                      
                      
                      type='submit'
                      disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                      value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}
                    >
                      <b>{ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}</b>
                    </WalphButton>
                    
                  )}
                 
                </div>
               </form>
              <br/>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
