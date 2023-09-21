import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/walph.service'
import { TxStatus } from './TxStatus'
import { useWallet, useBalance } from '@alephium/web3-react'
import { node, groupOfAddress, NetworkId, SignerProvider, Contract } from '@alephium/web3'
//import { Walph50HodlAlf, Walph50HodlAlfTypes } from 'artifacts/ts'
import { Walph, WalphTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'
import { WalphConfig, getDeployerAddresses, findToken, getTokenNameToHold } from '@/services/utils'
import { loadDeployments } from 'artifacts/ts/deployments'
import { NotEnoughToken } from './NotEnoughToken'
import Link from 'next/link'
import { NumTicket } from './NumTickets'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material/'
import walphTheme from '../services/walphTheme'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import PoolSelector from './PoolSelector'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eec459',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '10px',
}))

const theme = createTheme(walphTheme)

export const WalphDapp = () => {
  const { account, connectionStatus, signer } = useWallet()
  const [ticketAmount, setBuyAmount] = useState(0)
  const [getStateFields, setStateFields] = useState<WalphTypes.Fields>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()
  const [count, setCount] = React.useState<number>(1)
  const { balance, updateBalanceForTx } = useBalance()

  let enoughToken = false

  function getNetwork(): NetworkId {
    const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as NetworkId
    return network
  }

  function getWalphConfig(): WalphConfig {
    const network = getNetwork()

    // TODO find a better way to get deployer addresses
    const deployerAddresses = getDeployerAddresses()
    if (account !== undefined && connectionStatus === 'connected') {
      const walpheContract = loadDeployments(
        network,
        deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(account.address))
      ).contracts.Walph.contractInstance

      const groupIndex = walpheContract.groupIndex
      const walpheContractAddress = walpheContract.address
      const walpheContractId = walpheContract.contractId
      return { network, groupIndex, walpheContractAddress, walpheContractId }
    }
  }

  const config = getWalphConfig()

  const handleBuyTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (account !== undefined && connectionStatus === 'connected') {
      const result = await buyTicket(
        signer,
        (ticketAmount * ticketPriceHint).toString(),
        config.walpheContractId,
        getStateFields?.tokenIdToHold,
        getStateFields?.minTokenAmountToHold
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
    const nodeProvider = signer?.nodeProvider

    if (nodeProvider) {
      web3.setCurrentNodeProvider(nodeProvider)
      const WalphState = Walph.at(config.walpheContractAddress)

      const initialState = await WalphState.fetchState()
      setStateFields(initialState.fields)
    }
  }, [config?.walpheContractAddress, signer?.nodeProvider])

  const checkTokenBalance = () => {
    if (getStateFields?.minTokenAmountToHold > 0n) {
      if (balance.tokenBalances !== undefined) {
        const getTokenToHoldInfo = findToken(getStateFields?.tokenIdToHold, balance.tokenBalances)[0]
        if (getTokenToHoldInfo.amount >= getStateFields?.minTokenAmountToHold) enoughToken = true
      }
    } else {
      enoughToken = true
    }
  }

  useEffect(() => {
    if (signer?.nodeProvider) {
      getPoolStatus()
    }
  }, [signer?.nodeProvider, getPoolStatus])

  getPoolStatus()

  if (balance !== undefined) checkTokenBalance()

  const ticketPriceHint = Number(getStateFields?.ticketPrice) / 10 ** 18

  const slotFree = Number((getStateFields?.poolSize - getStateFields?.balance) / getStateFields?.ticketPrice)

  const poolSize = Number(getStateFields?.poolSize) / 10 ** 18

  const poolFeesAmount = (poolSize * Number(getStateFields?.poolFees)) / 100

  const numAttendees = Number(getStateFields?.numAttendees)

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
      <Box sx={{ paddingTop: 2 }} >
      
        <Grid container spacing={0}
        sx={{ paddingTop: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              maxWidth: "50%",
              marginLeft: "auto",
              marginRight: "auto"
            }} >
              
          <Grid xs>
          
   
            <Item >
           

        <Typography align="left"
        
        sx={{
          fontWeight: 500,
          fontSize: 18,
          paddingLeft: 3,
          paddingBottom: 1,
          paddingTop: 3
        }}
        >
             <NumTicket
                address={account?.address}
                attendees={getStateFields?.attendees.slice(0, numAttendees)}
                ticketPrice={ticketPriceHint}
                tokenTicker={'ALPH'}
              /></Typography>

              <br/>
              <Typography
              sx={{
                fontWeight: 500,
                fontSize: 20,
                paddingLeft: 1,
                paddingRight: 1
              }}
              >
                Pool status: <b>{getStateFields?.open ? 'open' : 'draw in progress'}</b> - Pool fees:{' '}
                <b>{poolFeesAmount} ALPH</b>{' '}
              
              </Typography>
                <Typography
              sx={{
                fontWeight: 500,
                fontSize: 30,
                paddingLeft: 1,
                paddingRight: 1
              }}
              >
              <p>
                Slots remaining: <b>{slotFree?.toString()}</b>
              </p>
              <h3>Prize pot: {Number(getStateFields?.poolSize) / 10 ** 18} ALPH</h3>


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
                {getStateFields?.lastWinner.toString() === 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
                  ? '-'
                  : getStateFields?.lastWinner.toString()}
              </b>
              {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
              <br />
              <p>
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
              {enoughToken ? (
                <div>
                  <Fab
                    variant="extended"
                    size="small"
                    onClick={() => {
                      dec()
                    }}
                    sx={{
                      fontWeight: 500,
                      fontSize: 30,
                      paddingLeft: 1,
                      paddingRight: 1
                    }}
                  >
                    -
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
                    sx={{
                      fontWeight: 500,
                      fontSize: 30,
                      paddingLeft: 1,
                      paddingRight: 1
                    }}
                  >
                    +
                  </Fab>
                  
                  {slotFree - count <1 ? (
                    <Button
                      variant="contained"
                      style={{ 
                      display: 'inline-block', marginRight: '1em', 
                      marginLeft: '1em',
                      backgroundColor: "#8E0CC4", 
                      borderRadius: "10px",
                      fontSize:16
                    }}

                      onClick={() => setBuyAmount(count)}
                      disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                    >
                      <b>{ongoingTxId ? 'Waiting for tx' : 'Buy and draw'}</b>
                    </Button>
                  ) : (
                   
                    <Button
                      variant="contained"
                      style={{ display: 'inline-block', marginRight: '1em', marginLeft: '1em', backgroundColor: "#8E0CC4", borderRadius: "10px", fontSize:16 }}
                      onClick={() => {
                        setBuyAmount(count)
                        
                      }}
                      
                      
                      type='submit'
                      disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                      value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}
                    >
                      <b>{ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}</b>
                    </Button>
                    
                  )}
                 
                </div>

              ) : (
                <NotEnoughToken tokenName={getTokenNameToHold()} />
              )}
               </form>
              <br/>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
