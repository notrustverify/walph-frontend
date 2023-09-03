import React, { useCallback, useEffect, useRef } from 'react'
import {  useState } from 'react'
import styles from '../styles/Home.module.css'
import { buyTicket } from '@/services/walphle.service'
import { TxStatus } from './TxStatus'
import { useWallet, useBalance } from '@alephium/web3-react'
import {
  node,
  groupOfAddress,
  NetworkId,
  Contract,
} from '@alephium/web3'
//import { WalphleConfig, walpheConfig } from '@/services/utils'
import { Walphle, WalphleTypes, Walphle50HodlAlf, Walphle50HodlAlfTypes } from 'artifacts/ts'
import { web3 } from '@alephium/web3'
import { WalphleConfig, getDeployerAddresses, findToken, getTokenIdToHold } from '@/services/utils'
import { loadDeployments } from 'artifacts/ts/deployments'
import { NotEnoughToken } from './NotEnoughToken'
import { Configuration } from '@alephium/cli'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const WalphleDapp = () => {

  const [ticketAmount, setBuyAmount] = useState('')
  const [getStateFields, setStateFields] = useState<WalphleTypes.State>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()
  const [count, setCount] = React.useState<number>(1)
  const [walphleInfo, setWalphleInfo] = useState<WalphleConfig>()

  const { account, connectionStatus, signer } = useWallet()
  const { balance, updateBalanceForTx } = useBalance()
  const [poolState, setPoolState] = useState<boolean>(true)
  const [loadingContract, setLoadingContract] = useState(false)
  const router = useRouter()

  let enoughToken = false
  const rendered = useRef(0)

  function getNetwork(): NetworkId {
    const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as NetworkId
    return network
  }

  

  const getWalphleConfig = useCallback( () => {
    const network = getNetwork()

    // TODO find a better way to get deployer addresses
    const deployerAddresses = getDeployerAddresses()


    if (account !== undefined && connectionStatus === "connected"){
      if(poolState){
    const walpheContract = loadDeployments(
      network,
      deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(account.address))
    ).contracts.Walphle.contractInstance
      

    const groupIndex = walpheContract.groupIndex
    const walpheContractAddress = walpheContract.address
    const walpheContractId = walpheContract.contractId

    return { network, groupIndex, walpheContractAddress, walpheContractId }
      }

      const walpheContract = loadDeployments(
        network,
        deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(account.address))
      ).contracts.Walphle50HodlAlf.contractInstance
        
  
      const groupIndex = walpheContract.groupIndex
      const walpheContractAddress = walpheContract.address
      const walpheContractId = walpheContract.contractId
      return { network, groupIndex, walpheContractAddress, walpheContractId }
  }
  },[account, connectionStatus, poolState])

  const getConfig = useCallback( () => {

    setWalphleInfo(getWalphleConfig())

  },[getWalphleConfig]) 
  //getConfig()

  /*
  if(rendered.current <= 0){
    setWalphleInfo(getWalphleConfig())
    rendered.current = rendered.current + 1
  }*/

  const changePool = (() => {
    setPoolState(!poolState)
    setWalphleInfo(getWalphleConfig())
    console.log(poolState)

  })


  if(walphleInfo !== undefined)
  console.log("config "+ walphleInfo.walpheContractId)

  const handleBuyTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (account !== undefined && connectionStatus === "connected") {
      
      const result = await buyTicket(signer, ticketAmount, walphleInfo?.walpheContractId, getStateFields?.fields?.tokenIdToHold, getStateFields?.fields?.minTokenAmountToHold)
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
    
    if (nodeProvider && walphleInfo !== undefined) {
      web3.setCurrentNodeProvider(nodeProvider)
      const walphleState = Walphle.at(walphleInfo.walpheContractAddress)

      const initialState = await walphleState.fetchState()
      console.log(initialState)
      setStateFields(initialState)

    }
  }, [signer?.nodeProvider, walphleInfo])


  const checkTokenBalance = () => {
    
  
    if (getStateFields?.fields?.minTokenAmountToHold > 0){
      
      if(balance.tokenBalances !== undefined){
      const getTokenToHoldInfo = findToken(getTokenIdToHold().tokenId,balance.tokenBalances)[0]
        if(getTokenToHoldInfo.amount >= getTokenIdToHold().minAmount)
          enoughToken = true
        
    }
  } else {
    enoughToken = true
  }
  }

  useEffect(() => {
    if (signer?.nodeProvider) {
      getWalphleConfig()
      getConfig()

    }
  }, [signer?.nodeProvider, getConfig, getWalphleConfig])
 
  getPoolStatus()


  if(balance !== undefined)
    checkTokenBalance()
  
  
  const slotFree = (Number(getStateFields?.fields?.poolSize) - Number(getStateFields?.fields?.balance)) / 10 ** 18
  const ticketPrice = Number(getStateFields?.fields?.ticketPrice) / 10 ** 18
  const poolSize = Number(getStateFields?.fields?.poolSize) / 10 ** 18 * ticketPrice
  console.log('ongoing..', ongoingTxId)



  const inc = () => {
    if(count < poolSize)
    setCount(count + 1)
}

const dec = () => {
  if(count > 1)
    setCount(count - 1)
}

  const poolFeesAmount = (poolSize * Number(getStateFields?.fields.poolFees)) / 100
 
  return (
    <>
   
      <div className="columns">
        <form onSubmit={handleBuyTicket}>
          <>
          <input
                style={{ display: 'inline-block', marginTop: "1em" }}
                type="button"
                value={getStateFields?.contractId == walphleInfo?.walpheContractId ? "Switch Pool - 50 tickets" : " Switch Pool - 21 tickets"}
                onClick={changePool}
                disabled={getStateFields?.contractId !== walphleInfo?.walpheContractId}

              />
            <h2 className={styles.title}>Walphle lottery on {walphleInfo?.network}</h2>
            <b> ONLY FOR INTERNAL USE - DO NOT SHARE</b>
            <p>Your address: {account?.address ?? '???'}</p>
            {getStateFields?.contractId == walphleInfo?.walpheContractId ?  <p>
              Pool status: <b>{getStateFields?.fields?.open ? 'open' : 'draw in progress'}</b> - Pool size:{' '}
              <b>{poolSize?.toString()}</b> - Ticket Price: <b>{ticketPrice} ALPH</b> - Pool fees: <b>{poolFeesAmount} ALPH</b>{' '}
            </p> : <p><h3>Loading new pool. Please wait</h3></p>
            }
            
              {getStateFields?.contractId == walphleInfo?.walpheContractId ? <p>Free slot: <b>{slotFree?.toString()}</b></p>: ""}
           
            <p>
              Last Winner:{' '}
              <b>
                {getStateFields?.fields?.lastWinner.toString() === 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
                  ? '-'
                  : getStateFields?.fields?.lastWinner.toString()}
              </b>
            </p>
            <br />

            {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
            <br />
            { enoughToken  ? 
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
                disabled={!!ongoingTxId || !getStateFields?.fields?.open || slotFree < count || getStateFields?.contractId !== walphleInfo?.walpheContractId}
                value={ongoingTxId ? 'Waiting for tx' : 'Buy ' + count + ' ' + 'tickets'}
                defaultValue={1}


              />  </div>: <NotEnoughToken tokenName={getTokenIdToHold().tokenName}/>
            }
          </>
        </form>
      </div>
    </>
  )
}
