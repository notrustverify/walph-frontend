import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/walph.service'
import { TxStatus } from './TxStatus'
import { useWallet, useBalance } from '@alephium/web3-react'
import { node, groupOfAddress, NetworkId, SignerProvider, Contract } from '@alephium/web3'
//import { WalphConfig, walpheConfig } from '@/services/utils'
import { Walph50HodlAlf, Walph50HodlAlfTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'
import { WalphConfig, getDeployerAddresses, findToken, getTokenNameToHold } from '@/services/utils'
import { loadDeployments } from 'artifacts/ts/deployments'
import { NotEnoughToken } from './NotEnoughToken'
import Link from 'next/link'
import { NumTicket } from './NumTickets'
import Countdown from 'react-countdown'
export const WalphDapp50 = () => {
  const { account, connectionStatus, signer } = useWallet()
  const [ticketAmount, setBuyAmount] = useState(0)
  const [getStateFields, setStateFields] = useState<Walph50HodlAlfTypes.Fields>()
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
      ).contracts.Walph50HodlAlf.contractInstance

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
      if ((status.type === 'Confirmed' && numberOfChecks > 2) || (status.type === 'TxNotFound' && numberOfChecks > 3)) {
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
      const WalphState = Walph50HodlAlf.at(config.walpheContractAddress)

      const initialState = await WalphState.fetchState()
      setStateFields(initialState.fields)
      console.log(initialState)
    }
  }, [config?.walpheContractAddress, signer?.nodeProvider])

  const checkTokenBalance = () => {
    if (getStateFields?.minTokenAmountToHold > 0n) {
      if (balance.tokenBalances !== undefined) {
        const getTokenToHoldInfo = findToken(getStateFields?.tokenIdToHold, balance.tokenBalances)
        if (getTokenToHoldInfo.length > 0 && getTokenToHoldInfo[0].amount >= getStateFields?.minTokenAmountToHold)
          enoughToken = true
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
  console.log('ongoing..', ongoingTxId)

  const inc = () => {
    if (count < poolSize) setCount(count + 1)
  }

  const dec = () => {
    if (count > 1) setCount(count - 1)
  }

  const poolFeesAmount = (poolSize * Number(getStateFields?.poolFees)) / 100
  const numAttendees = Number(getStateFields?.numAttendees)

  return (
    <>
      <div className="columns">
        <form onSubmit={handleBuyTicket}>
          <a href={'/'}>Switch to a smaller pool (no {getTokenNameToHold()} needed) </a>
          &nbsp; - &nbsp;
          <a href={'/walf'}>Switch to a ALF pool</a>
          <>
            <h2 className={styles.title}>Walph lottery on {config?.network}</h2>

            <p>Your address: {account?.address ?? '???'}</p>

            <NumTicket
              address={account?.address}
              attendees={getStateFields?.attendees.slice(0, numAttendees)}
              ticketPrice={ticketPriceHint}
              tokenTicker='ALPH'
            />

            <p>
              Pool status: <b>{getStateFields?.open ? 'open' : 'draw in progress'}</b> - Pool size:{' '}
              <b>{poolSize?.toString()}</b> - Pool fees: <b>{poolFeesAmount} ALPH</b>{' '}
            </p>
            <p>
              Free slots: <b>{slotFree?.toString()}</b>
            </p>
            <h3>Pool prize: {Number(getStateFields?.poolSize) / 10 ** 18} ALPH</h3>

            <p>
              Last Winner:{' '}
              <b>
                {getStateFields?.lastWinner.toString() === 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
                  ? '-'
                  : getStateFields?.lastWinner.toString()}
              </b>
            </p>
            <p>
              Ticket price: <strong>{Number(getStateFields?.ticketPrice) / 10 ** 18} ALPH</strong>
            </p>

            {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
            <br />
            {enoughToken ? (
              <div>
                <input style={{ display: 'inline-block' }} type="button" onClick={dec} value="-" />
                <input
                  style={{
                    display: 'inline-block',
                    maxWidth: '50%',
                    width: '3em',
                    textAlign: 'center',
                    border: '0'
                  }}
                  defaultValue={1}
                  value={count.toString()}
                  min={1}
                  max={1}
                />
                <input style={{ display: 'inline-block' }} type="button" onClick={inc} value="+" defaultValue={'+'} />

                {slotFree - count < 1 ? (
                  <input
                    style={{ display: 'inline-block', marginRight: '1em', marginLeft: '1em' }}
                    type="submit"
                    onClick={() => setBuyAmount(count)}
                    disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                    value={ongoingTxId ? 'Waiting for tx' : 'Buy and draw'}
                    defaultValue={1}
                  />
                ) : (
                  <input
                    style={{ display: 'inline-block', marginRight: '1em', marginLeft: '1em' }}
                    type="submit"
                    onClick={() => {
                      setBuyAmount(count)
                    }}
                    disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count || count > poolSize}
                    value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}
                    defaultValue={1}
                  />
                )}
              </div>
            ) : (
              <NotEnoughToken tokenName={getTokenNameToHold()} />
            )}
          </>
        </form>
      </div>
    </>
  )
}
