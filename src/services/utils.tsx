import { NetworkId } from '@alephium/web3'
import { loadDeployments } from '../../artifacts/ts/deployments'

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

function getWalphleConfig(): WalphleConfig {
  const network = getNetwork()
  const walpheContract = loadDeployments(network).contracts.Walphle.contractInstance
  const groupIndex = walpheContract.groupIndex
  const walpheContractAddress = walpheContract.address
  const walpheContractId = walpheContract.contractId
  return { network, groupIndex, walpheContractAddress, walpheContractId }
}

export const walpheConfig = getWalphleConfig()
