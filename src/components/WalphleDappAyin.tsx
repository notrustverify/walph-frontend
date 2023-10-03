import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/walf.service'
import { TxStatus } from './TxStatus'
import { useWallet, useBalance } from '@alephium/web3-react'
import { node, groupOfAddress, NetworkId, SignerProvider, Contract, NodeProvider } from '@alephium/web3'
//import { Walf50HodlAlf, Walf50HodlAlfTypes } from 'artifacts/ts'
import { Wayin, WayinTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'
import { WalphConfig, getDeployerAddresses, findToken, getTokenNameToHold } from '@/services/utils'
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
import * as fetchRetry from 'fetch-retry'
import configuration from 'alephium.config'

interface tokenMetadata {
  tokenName: string
}

const theme = createTheme(walphTheme)
const retryFetch = fetchRetry.default(fetch, {
  retries: 10,
  retryDelay: 1000
})
const nodeProvider = new NodeProvider(configuration.networks[process.env.NEXT_PUBLIC_NETWORK].nodeUrl, undefined, retryFetch)

export const WayinDapp = ({ tokenName }: tokenMetadata) => {
  const { account, connectionStatus, signer } = useWallet()
  const [ticketAmount, setBuyAmount] = useState(0)
  const [getStateFields, setStateFields] = useState<WayinTypes.Fields>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()
  const [count, setCount] = React.useState<number>(1)
  const { balance, updateBalanceForTx } = useBalance()

  let enoughToken = false

  function getNetwork(): NetworkId {
    const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as NetworkId
    return network
  }

  function getWalfConfig(): WalphConfig {
    const network = getNetwork()

    // TODO find a better way to get deployer addresses
    const deployerAddresses = getDeployerAddresses()
    if (account !== undefined && connectionStatus === 'connected') {
      const walpheContract = loadDeployments(
        network,
        deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(account.address))
      ).contracts.Wayin.contractInstance

      const groupIndex = walpheContract.groupIndex
      const walpheContractAddress = walpheContract.address
      const walpheContractId = walpheContract.contractId
      return { network, groupIndex, walpheContractAddress, walpheContractId }
    }
  }

  const config = getWalfConfig()

  const handleBuyTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (account !== undefined && connectionStatus === 'connected') {
      const result = await buyTicket(
        signer,
        (ticketAmount * ticketPriceHint * 10 ** 18).toString(),
        config.walpheContractId,
        getStateFields?.tokenId
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
      const WalphState = Wayin.at(config.walpheContractAddress)

      const initialState = await WalphState.fetchState()
      setStateFields(initialState.fields)
    }
  }, [config, connectionStatus])

  const checkTokenBalance = () => {
    if (balance.tokenBalances !== undefined) {
      const getTokenToHoldInfo = findToken(getStateFields?.tokenId, balance.tokenBalances)[0]
      if (getTokenToHoldInfo?.amount >= 0) enoughToken = true
    }
  }

  useEffect(() => {
    if (signer?.nodeProvider) {
      getPoolStatus()
    }
  }, [signer?.nodeProvider, getPoolStatus])

  getPoolStatus()

  if (balance !== undefined) checkTokenBalance()
  const decimal = Number(getStateFields?.decimal)

  const ticketPriceHint = Number(getStateFields?.ticketPrice) / 10 ** decimal

  const slotFree = Number((getStateFields?.poolSize - getStateFields?.balance) / getStateFields?.ticketPrice)

  const poolSize = Number(getStateFields?.poolSize) / 10 ** decimal
  console.log('ongoing..', ongoingTxId)

  const inc = () => {
    if (count < poolSize) setCount(count + 1)
  }

  const dec = () => {
    if (count > 1) setCount(count - 1)
  }

  const poolFeesAmount = (poolSize * Number(getStateFields?.poolFees)) / 100
  const lastWinner = getStateFields?.lastWinner.toString()
  let lastWinnerTrunc = getStateFields?.lastWinner.toString().slice(0,6)+"..."+getStateFields?.lastWinner.toString().slice(-6)
  if (lastWinner == "tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq")
      lastWinnerTrunc = '-'
  if (count > slotFree) setCount(slotFree)
  const numAttendees = Number(getStateFields?.numAttendees)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <br />
      <Box>
        <Grid
          container
          spacing={0}
          sx={{ marginTop: -2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            margin: "auto",
            width: "min(100%,max(600px, 60vw))",
          }} >
          <Grid xs>
            <Item>
              <Typography
                align="left"
                sx={{
                  fontWeight: 500,
                  fontSize: 18,
                  paddingLeft: 3,
                  paddingBottom: 1,
                  paddingTop: 1
                }}
              >
                <NumTicket
                  address={account?.address}
                  attendees={getStateFields?.attendees.slice(0, numAttendees)}
                  ticketPrice={ticketPriceHint}
                  tokenTicker={tokenName}
                  poolSeat={Number((getStateFields?.poolSize) / getStateFields?.ticketPrice)}
                />
              </Typography>

              <br />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 20,
                  paddingLeft: 1,
                  paddingRight: 1,
                  marginBottom: 2

                }}
              >
                Pool status: <b>{getStateFields?.open ? 'open' : 'draw in progress'}</b> - Pool fees:{' '}
                <b>{poolFeesAmount} {tokenName}</b> - group: <b>{config?.groupIndex}</b>{' '}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 30,
                  paddingLeft: 1,
                  paddingRight: 1,
                  marginTop: -3

                }}
              >
                <p>
                  Slots remaining: <b>{slotFree?.toString()}</b>
                </p>
                <h3 style={{ marginTop: -20 }}>Prize pot: {Number(getStateFields?.poolSize) / 10 ** decimal} {tokenName}</h3>
              </Typography>

              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 25,
                  paddingLeft: 1,
                  paddingRight: 1
                }}
              >
                Last Winner:{' '}
                <b>
                  {getStateFields?.lastWinner.toString() === 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
                    ? '-'
                    : getStateFields?.lastWinner.toString() == account?.address
                    ? 'You 🫵'
                    : lastWinnerTrunc}

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
                    { ( getStateFields?.lastWinner.toString() === account?.address && connectionStatus == "connected" ) && (
                      <ConfettiExplosion force={0.6} duration={3000} particleCount={250} width={1600} />
                    )}
                  </div>
                </b>
                {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
                <br />
                <p style={{ paddingBottom: 1 }}>
                  Ticket price: <strong>{Number(getStateFields?.ticketPrice) / 10 ** decimal} {tokenName}</strong>
                </p>
              </Typography>
              <br />
              <form
                onSubmit={handleBuyTicket}
                style={{
                  border: 'none',
                  display: 'inline-block',
                  boxShadow: 'none',
                  margin: 'auto',
                  padding: 'auto'
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
                      <div style={{ paddingBottom: 3, fontSize: 20 }}>+</div>
                    </Fab>

                    {slotFree - count < 1 ? (
                      <WalphButton
                        variant="contained"
                        style={{
                          display: 'inline-block',
                          marginRight: '1em',
                          marginLeft: '1em',
                          borderRadius: '10px',
                          fontSize: 16
                        }}
                        type="submit"
                        onClick={() => setBuyAmount(count)}
                        disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                      >
                        <b>{ongoingTxId ? 'Waiting for tx' : 'Buy and draw'}</b>
                      </WalphButton>
                    ) : (
                      <WalphButton
                        variant="contained"
                        style={{
                          display: 'inline-block',
                          marginRight: '1em',
                          marginLeft: '1em',
                          borderRadius: '10px',
                          fontSize: 16
                        }}
                        onClick={() => {
                          setBuyAmount(count)
                        }}
                        type="submit"
                        disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                        value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}
                      >
                        <b>{ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}</b>
                      </WalphButton>
                    )}
                  </div>
                ) : (
                  <NotEnoughToken tokenName={tokenName} />
                )}
              </form>
              <br />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
