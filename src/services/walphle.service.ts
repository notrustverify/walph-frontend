import { DUST_AMOUNT, ExecuteScriptResult, SignerProvider } from '@alephium/web3'
import { Buy, BuyWithoutToken } from '../../artifacts/ts/scripts'
import { getTokenIdToHold } from './utils'

export const buyTicket = async (
  signerProvider: SignerProvider,
  amount: string,
  walpheContractId: string
): Promise<ExecuteScriptResult> => {
  
  if (process.env.NEXT_PUBLIC_HAVE_HODL === undefined || process.env.NEXT_PUBLIC_HAVE_HODL === 'false') {
    return await BuyWithoutToken.execute(signerProvider, {
      initialFields: {
        walpheContract: walpheContractId,
        amount: BigInt(amount) * 10n ** 18n
      },
      attoAlphAmount: BigInt(amount) * 10n ** 18n + 3n * DUST_AMOUNT
    })
  }

  const tokenIdToHoldInfo = getTokenIdToHold()
  return await Buy.execute(signerProvider, {
    initialFields: {
      walpheContract: walpheContractId,
      amount: BigInt(amount) * 10n ** 18n,
      tokenId: tokenIdToHoldInfo.tokenId,
      tokenIdAmount: BigInt(tokenIdToHoldInfo.minAmount)
    },
    attoAlphAmount: BigInt(amount) * 10n ** 18n + 3n * DUST_AMOUNT,
    tokens: [{ id: tokenIdToHoldInfo.tokenId, amount: BigInt(tokenIdToHoldInfo.minAmount) }]
  })
}
