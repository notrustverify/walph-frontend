import { Configuration } from '@alephium/cli'

// Settings are usually for configuring
const configuration: Configuration = {
  networks: {
    devnet: {
      nodeUrl: 'http://127.0.0.1:22973',
      privateKeys: [],
      //privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.NEXT_PRIVKEY_DEVNET!.split(','),
      settings: {}
    },
    testnet: {
      nodeUrl: (process.env.NODE_URL as string) ?? 'https://wallet.testnet.alephium.org',
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVKEY_TESTNET!.split(","),
      settings: {

      }
    },

    mainnet: {
      nodeUrl: (process.env.NODE_URL as string) ?? 'https://node-alephium.ono.re',
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
      settings: {
        addressesDeploy: ["13grYjTToaSNbARwUyWeve8uR3p3XhVAwRktYdNrVyBWC","1EqytGSxzUkytUFKuqdAeWjLBg9WQvE4DhHZ6bffcdUX6","1G4BfFumrHAA363LTLSXb23GjLbRNoG6vHD64qeAMRpz7","1AUH1Ten8NjGcGVDgk8jXjA8Wj2pijhSa7haiJRK6LLeJ"]
      }

    }
    }
}

export default configuration
