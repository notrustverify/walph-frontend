import React, { useCallback, useEffect } from 'react'
import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/walphle.service'
import { TxStatus } from './TxStatus'
import { useWallet, useAlephiumConnectContext } from '@alephium/web3-react'
import { node, binToHex, addressFromContractId, contractIdFromAddress, NodeProvider } from '@alephium/web3'
import { WalphleConfig, walpheConfig } from '@/services/utils'
import { Walphle, WalphleTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'

export const WalphleDapp: FC<{
  config: WalphleConfig
}> = ({ config }) => {
  const context = useAlephiumConnectContext()
  const wallet = useWallet()
  const addressGroup = config.groupIndex
  const [ticketAmount, setBuyAmount] = useState('')
  const [getStateFields, setStateFields] = useState<WalphleTypes.Fields>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()

  const handleBuyTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (wallet?.signer) {
      const result = await buyTicket(wallet.signer, ticketAmount, config.walpheContractId)
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
      const walphleState = Walphle.at(walpheConfig.walpheContractAddress)

      const initialState = await walphleState.fetchState()
      console.log(initialState.fields)
      setStateFields(initialState.fields)
    }
  }, [context])

  useEffect(() => {
    if (context.signerProvider?.nodeProvider) {
      getPoolStatus()
    }
  }, [context.signerProvider?.nodeProvider, getPoolStatus])

  getPoolStatus()

  const slotFree = (Number(getStateFields?.poolSize) - Number(getStateFields?.balance)) / 10 ** 18

  const poolSize = Number(getStateFields?.poolSize) / 10 ** 18
  console.log('ongoing..', ongoingTxId)

  const poolFeesAmount = (poolSize * Number(getStateFields?.poolFees)) / 100

  const buyTicketsButton = [1, 5, 10].map(function (amount) {
    let message = 'tickets'
    if (amount <= 1) {
      message = 'ticket'
    }
    return (
      // eslint-disable-next-line react/jsx-key
      slotFree >= amount && !ongoingTxId ? <input
        style={{ display: 'inline-block', marginRight: '1em' }}
        type="submit"
        onClick={() => setBuyAmount(amount.toString())}
        disabled={!!ongoingTxId || !getStateFields?.open || slotFree < amount}
        value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + amount + ' ' + message}
      /> : ''
  
    )
  })
  return (
    <>
      <div className="columns">
        <form onSubmit={handleBuyTicket}>
          <>
            <h2 className={styles.title}>Walphle lottery on {config.network}</h2>
            <b> ONLY FOR INTERNAL USE - DO NOT SHARE</b>
            <p>Your address: {wallet?.account?.address ?? '???'}</p>
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

            <div style={{ width: '100%', textAlign: 'center' }}>{buyTicketsButton}</div>
          </>
        </form>
      </div>
    </>
  )
}
function componentDidMount() {
  throw new Error('Function not implemented.')
}
