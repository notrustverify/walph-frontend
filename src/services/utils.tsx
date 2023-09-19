import { NetworkId , SignerProvider, groupOfAddress } from '@alephium/web3'
import { loadDeployments } from '../../artifacts/ts/deployments'
import { Walph, WalphInstance } from 'artifacts/ts'
import { useWallet, Wallet } from '@alephium/web3-react'
import { Deployments } from '@alephium/cli'
import { time } from 'console'



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
    return getNetwork() == 'mainnet' ? process.env.NEXT_TOKEN_NAME : "ALF"
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
export function getRelativeTimeString(
  date: Date | number,
  lang: string
): string[] {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });

  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));

  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const dateDraw = new Date(date)
    const formattedDate = dateDraw.toLocaleTimeString(lang)
   

  return [rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]), formattedDate];
}


export function getDeployerAddresses(){
  return [
    '1GBvuTs4TosNB9xTCGJL5wABn2xTYCzwa7MnXHphjcj1y',
    '18oy42sSBJ8VThgEfdhBK9EELyG4BXpvzuN2ZiA8ezaNi',
    '19LjHzaohNvgq2tNZXxXZsVEHq5NuTuDS7Kth85Qo8zm1',
    '19YzSyYrwAH7VwVM5KPuAKmK89Chvk9gXup6753VZGUcB'
  ]
}
