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
      const result = await buyTicket(wallet.signer,ticketAmount, config.walpheContractId)
      setOngoingTxId(result.txId)
    }
  }

  const txStatusCallback = (status: node.TxStatus, numberOfChecks: number): Promise<any> => {
    if ((status.type === 'Confirmed' && numberOfChecks > 0) || (status.type === 'TxNotFound' && numberOfChecks > 0)) {
      setOngoingTxId(undefined)
    }

    
      
    return Promise.resolve()
  }


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

  const poolFeesAmount = poolSize * Number(getStateFields?.poolFees)/100

  return (
    
    <>

      <div className="columns">
        <form onSubmit={handleBuyTicket}>
          <>
            <h2 className={styles.title}>Walphle lottery on {config.network}</h2>
            <b> ONLY FOR INTERNAL USE - DO NOT SHARE</b>
            <p>Your address: {wallet?.account?.address ?? '???'}</p>
            {/*<table>
              <thead>
                <tr>
                  <td>Contract id</td>
                  <th>group</th>
                </tr>
              </thead>
              <tbody>
                <tr key={addressGroup} style={{ background: 'red', color: 'white' }}>
                  <td>{config.walpheContractId}</td>
                  <td>{addressGroup}</td>
                </tr>
              </tbody>
  </table> */}
            <p>Pool status: <b>{getStateFields?.open ? "open" : "draw in progress"}</b> - Pool size: <b>{poolSize?.toString()}</b> - Pool fees: <b>{poolFeesAmount} ALPH</b> </p>
            <p>Free slots: <b>{slotFree?.toString()}</b></p>
            <p>Last Winner: <b>{getStateFields?.lastWinner.toString() === 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq' ? "-" : getStateFields?.lastWinner.toString()}</b></p>
            <br />

            {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
          <br/>
            <input type="submit" onClick={() => setBuyAmount("1")} disabled={!!ongoingTxId || !getStateFields?.open || slotFree <= 0n } value="Buy ticket" />
          </>
        </form>
      </div>
    </>
  )
}
function componentDidMount() {
  throw new Error('Function not implemented.')
}

