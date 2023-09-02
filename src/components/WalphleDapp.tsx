import React, { useCallback, useEffect } from 'react'
import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/walphle.service'
import { TxStatus } from './TxStatus'
import { useWallet, useAlephiumConnectContext } from '@alephium/web3-react'
import {
  node,
  groupOfAddress,
  NetworkId
} from '@alephium/web3'
//import { WalphleConfig, walpheConfig } from '@/services/utils'
import { Walphle, WalphleTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'
import { WalphleConfig } from '@/services/utils'
import { loadDeployments } from 'artifacts/ts/deployments'

export const WalphleDapp = () => {
  const context = useAlephiumConnectContext()

  const { account, connectionStatus } = useWallet()

  const [ticketAmount, setBuyAmount] = useState('')
  const [getStateFields, setStateFields] = useState<WalphleTypes.Fields>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()
  const [count, setCount] = React.useState<number>(1)


  function getNetwork(): NetworkId {
    const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as NetworkId
    return network
  }

  function getWalphleConfig(): WalphleConfig {
    const network = getNetwork()

    // TODO find a better way to get deployer addresses
    const deployerAddresses = [
      '1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y',
      '18oy42sSBJ8VThgEfdhBK9EELyG4BXpvzuN2ZiA8ezaNi',
      '19LjHzaohNvgq2tNZXxXZsVEHq5NuTuDS7Kth85Qo8zm1',
      '19YzSyYrwAH7VwVM5KPuAKmK89Chvk9gXup6753VZGUcB'
    ]
    if (account !== undefined && connectionStatus === "connected"){
    const walpheContract = loadDeployments(
      network,
      deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(account.address))
    ).contracts.Walphle.contractInstance

    
    const groupIndex = walpheContract.groupIndex
    const walpheContractAddress = walpheContract.address
    const walpheContractId = walpheContract.contractId
    return { network, groupIndex, walpheContractAddress, walpheContractId }
    }
  }

  const config = getWalphleConfig()

  const handleBuyTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (account !== undefined && connectionStatus === "connected") {

      const result = await buyTicket(context.signerProvider, ticketAmount, config.walpheContractId)
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
    const nodeProvider = context.signerProvider?.nodeProvider

    if (nodeProvider) {
      web3.setCurrentNodeProvider(nodeProvider)
      const walphleState = Walphle.at(config.walpheContractAddress)

      const initialState = await walphleState.fetchState()
      console.log(initialState.fields)
      setStateFields(initialState.fields)
    }
  }, [config?.walpheContractAddress, context.signerProvider?.nodeProvider])

  useEffect(() => {
    if (context.signerProvider?.nodeProvider) {
      getPoolStatus()
    }
  }, [context.signerProvider?.nodeProvider, getPoolStatus])

  getPoolStatus()

  const slotFree = (Number(getStateFields?.poolSize) - Number(getStateFields?.balance)) / 10 ** 18

  const poolSize = Number(getStateFields?.poolSize) / 10 ** 18
  console.log('ongoing..', ongoingTxId)



  const inc = () => {
    if(count < poolSize)
    setCount(count + 1)
}

const dec = () => {
  if(count > 1)
    setCount(count - 1)
}

  const poolFeesAmount = (poolSize * Number(getStateFields?.poolFees)) / 100
 
  return (
    <>
      <div className="columns">
        <form onSubmit={handleBuyTicket}>
          <>
            <h2 className={styles.title}>Walphle lottery on {config?.network}</h2>
            <b> ONLY FOR INTERNAL USE - DO NOT SHARE</b>
            <p>Your address: {account?.address ?? '???'}</p>
            <p>
              Pool status: <b>{getStateFields?.open ? 'open' : 'draw in progress'}</b> - Pool size:{' '}
              <b>{poolSize?.toString()}</b> - Pool fees: <b>{poolFeesAmount} ALPH</b>{' '}
            </p>
            <p>
              Free slots: <b>{slotFree?.toString()}</b>
            </p>
            <p>
              Last Winner:{' '}
              <b>
                {getStateFields?.lastWinner.toString() === 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
                  ? '-'
                  : getStateFields?.lastWinner.toString()}
              </b>
            </p>
            <br />

            {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
            <br />

            <div>
              <button className="button.flat" style={{ display: 'inline-block', marginRight: '1em' }} type="button" onClick={inc}>
                +
              </button>
              <input
                style={{
                  display: 'inline-block',
                  marginRight: '1em',
                  maxWidth: '50%',
                  width: '3em',
                  textAlign: 'center'
                }}
                defaultValue={1}
                value={count}
                min={1}
              />

              <button type="button" onClick={dec}>
                -
              </button>

              <input
                style={{ display: 'inline-block', marginRight: '1em', marginLeft: '1em' }}
                type="submit"
                onClick={() => setBuyAmount(count.toString())}
                disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count}
                value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}
              />
            </div>
          </>
        </form>
      </div>
    </>
  )
}


