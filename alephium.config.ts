import { Configuration } from '@alephium/cli'
import { Number256 } from '@alephium/web3'
import * as dotenv from 'dotenv'

// Settings are usually for configuring
dotenv.config()

export type Settings = {
  issueTokenAmount: Number256
}
const defaultSettings: Settings = { issueTokenAmount: 100n }

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      nodeUrl: 'http://127.0.0.1:22973',
      privateKeys: [process.env.PRIVKEY_TESTNET],
      settings: defaultSettings
    },

    testnet: {
      nodeUrl: (process.env.NODE_URL as string) ?? 'https://wallet.testnet.alephium.org',
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVKEY_TESTNET.split(","),
      settings: defaultSettings
    },

    mainnet: {
      nodeUrl: (process.env.NODE_URL as string) ?? 'https://wallet-v20.mainnet.alephium.org',
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
      settings: defaultSettings
    }
  }
}

export default configuration
