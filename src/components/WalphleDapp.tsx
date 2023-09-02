import React, { useCallback, useEffect } from 'react'
import {  useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/walphle.service'
import { TxStatus } from './TxStatus'
import { useWallet, useAlephiumConnectContext, useBalance } from '@alephium/web3-react'
import {
  node,
  groupOfAddress,
  NetworkId,
  SignerProvider,
} from '@alephium/web3'
//import { WalphleConfig, walpheConfig } from '@/services/utils'
import { Walphle, WalphleTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'
import { WalphleConfig, getDeployerAddresses, findToken } from '@/services/utils'
import { loadDeployments } from 'artifacts/ts/deployments'
import { get } from 'http'
import { NotEnougToken } from './NotEnoughToken'

export const WalphleDapp = () => {
  const context = useAlephiumConnectContext()

  const { account, connectionStatus } = useWallet()
  const [ticketAmount, setBuyAmount] = useState('')
  const [getStateFields, setStateFields] = useState<WalphleTypes.Fields>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()
  const [count, setCount] = React.useState<number>(1)
  const { balance, updateBalanceForTx } = useBalance()
  let enoughToken = false

  function getNetwork(): NetworkId {
    const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as NetworkId
    return network
  }

  function getWalphleConfig(): WalphleConfig {
    const network = getNetwork()

    // TODO find a better way to get deployer addresses
    const deployerAddresses = getDeployerAddresses()
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
      setStateFields(initialState.fields)
    }
  }, [config?.walpheContractAddress, context.signerProvider?.nodeProvider])


  const checkTokenBalance = () => {
    

    if (process.env.NEXT_PUBLIC_NO_HODLING === undefined || process.env.NEXT_PUBLIC_NO_HODLING === 'true' ){
      
      if(balance.tokenBalances !== undefined){

      const getTokenObject = findToken("47504df5a7b18dcecdbf1ea00b7e644d0a7c93919f2d2061ba153f241f03b801",balance.tokenBalances)
        if(getTokenObject.amount <= 0){
          enoughToken = true
        }
    }
  }

  }

  useEffect(() => {
    if (context.signerProvider?.nodeProvider) {
      getPoolStatus()

    }
  }, [context.signerProvider?.nodeProvider, getPoolStatus])

  getPoolStatus()


  if(balance !== undefined)
    checkTokenBalance()
  
  
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
            {enoughToken ? 
            <div >
            <input style={{ display: 'inline-block' }} type="button" onClick={dec} value="-" />
              <input
                style={{
                  display: 'inline-block',
                  maxWidth: '50%',
                  width: '3em',
                  textAlign: 'center',
                  border: "0",
          
                }}
                defaultValue={1}
                value={count}
                min={1}
                
              />

              <input style={{ display: 'inline-block', }} type="button" onClick={inc} value="+" defaultValue={"+"}  />
              
              
              <input
                style={{ display: 'inline-block', marginRight: '1em', marginLeft: '1em' }}
                type="submit"
                onClick={() => setBuyAmount(count.toString())}
                disabled={!!ongoingTxId || !getStateFields?.open || slotFree < count}
                value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}
                defaultValue={1}

              />  </div>: NotEnougToken
            }
          </>
        </form>
      </div>
    </>
  )
}


