import { NetworkId , SignerProvider, groupOfAddress } from '@alephium/web3'
import { loadDeployments } from '../../artifacts/ts/deployments'
import { Walphle, WalphleInstance } from 'artifacts/ts'
import { useWallet, useAlephiumConnectContext, Wallet } from '@alephium/web3-react'
import { Deployments } from '@alephium/cli'



export interface WalphleConfig {
  network: NetworkId
  groupIndex: number
  walpheContractAddress: string
  walpheContractId: string
}

function getNetwork(): NetworkId {
  const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as NetworkId
  return network
}

function getGroup(): number {
  //TODO find a way to know the wallet group selected from the extension
  return 0
}
export function getDeployerAddresses(){
  return [
    '1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y',
    '18oy42sSBJ8VThgEfdhBK9EELyG4BXpvzuN2ZiA8ezaNi',
    '19LjHzaohNvgq2tNZXxXZsVEHq5NuTuDS7Kth85Qo8zm1',
    '19YzSyYrwAH7VwVM5KPuAKmK89Chvk9gXup6753VZGUcB'
  ]
}

/*
function getWalphleConfig(): WalphleConfig {
  const network = getNetwork()
  

  // TODO find a better way to get deployer addresses
const deployerAddresses = ["18vsJ3xDBnSt2aXRSQ7QRTPrVVkjZuTXtxvV1x8mvm3Nz","159UkjK8iDU9vxkwV7qt2B3HB2SdwntUA2RyjCYrh96Dh","19LjHzaohNvgq2tNZXxXZsVEHq5NuTuDS7Kth85Qo8zm1","19YzSyYrwAH7VwVM5KPuAKmK89Chvk9gXup6753VZGUcB"]

  const walpheContract = loadDeployments(network,deployerAddresses.find((addr) => groupOfAddress(addr) === groupOfAddress(userAddress))).contracts.Walphle.contractInstance 
  
  const groupIndex = walpheContract.groupIndex
  const walpheContractAddress = walpheContract.address
  const walpheContractId = walpheContract.contractId
  return { network, groupIndex, walpheContractAddress, walpheContractId }
}


export const walpheConfig = getWalphleConfig()
*/