import { DUST_AMOUNT, ExecuteScriptResult, SignerProvider } from '@alephium/web3'
import { Buy, BuyWithoutToken } from '../../artifacts/ts/scripts'
import { getTokenIdToHold } from './utils'

export const buyTicket = async (
  signerProvider: SignerProvider,
  amount: string,
  walpheContractId: string,
  tokenId: string,
  tokenIdAmount:  bigint
): Promise<ExecuteScriptResult> => {
  
  if (tokenIdAmount <= 0n) {
    return await BuyWithoutToken.execute(signerProvider, {
      initialFields: {
        walpheContract: walpheContractId,
        amount: BigInt(amount) * 10n ** 18n
      },
      attoAlphAmount: BigInt(amount) * 10n ** 18n + 3n * DUST_AMOUNT
    })
  }

  return await Buy.execute(signerProvider, {
    initialFields: {
      walpheContract: walpheContractId,
      amount: BigInt(amount) * 10n ** 18n,
      tokenId: tokenId,
      tokenIdAmount: BigInt(tokenIdAmount)
    },
    attoAlphAmount: BigInt(amount) * 10n ** 18n + 3n * DUST_AMOUNT,
    tokens: [{ id: tokenId, amount: BigInt(tokenIdAmount) }]
  })
}
