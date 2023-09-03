import { NetworkId , SignerProvider, groupOfAddress } from '@alephium/web3'
import { loadDeployments } from '../../artifacts/ts/deployments'
import { Walph, WalphInstance } from 'artifacts/ts'
import { useWallet, Wallet } from '@alephium/web3-react'
import { Deployments } from '@alephium/cli'



export interface WalphConfig {
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

export function getTokenNameToHold(): string {
    return getNetwork() == 'mainnet' ? process.env.NEXT_TOKEN_NAME : "TEST TOKEN"
}

export function getExplorerUrl(): string {
  return getNetwork() == 'mainnet' ? "https://explorer.alephium.org" : "https://testnet.alephium.org" 
}

export function findToken(tokenId: string, tokenBalances){
  return tokenBalances.filter(
    function(data){ 
      const tokenBalance = data.id == tokenId
      return tokenBalance
     }
)

}

export function getDeployerAddresses(){
  return [
    '1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y',
    '18oy42sSBJ8VThgEfdhBK9EELyG4BXpvzuN2ZiA8ezaNi',
    '19LjHzaohNvgq2tNZXxXZsVEHq5NuTuDS7Kth85Qo8zm1',
    '19YzSyYrwAH7VwVM5KPuAKmK89Chvk9gXup6753VZGUcB'
  ]
}
