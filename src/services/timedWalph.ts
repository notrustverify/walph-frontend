import { DUST_AMOUNT, ExecuteScriptResult, ONE_ALPH, SignerProvider } from '@alephium/web3'
import { Buy, BuyTimedWithoutToken, BuyWithoutToken } from '../../artifacts/ts/scripts'

export const buyTicket = async (
  signerProvider: SignerProvider,
  amount: string,
  walpheContractId: string,
  tokenId: string,
  tokenIdAmount:  bigint
): Promise<ExecuteScriptResult> => {
  
  if (tokenIdAmount <= 0n) {
    return await BuyTimedWithoutToken.execute(signerProvider, {
      initialFields: {
        walphContract: walpheContractId,
        amount: BigInt(amount) * 10n ** 18n
      },
      attoAlphAmount: BigInt(amount) * 10n ** 18n + 5n * DUST_AMOUNT
    })
  }

  return await Buy.execute(signerProvider, {
    initialFields: {
      walphContract: walpheContractId,
      amount: BigInt(amount) * 10n ** 18n,
      tokenId: tokenId,
      tokenIdAmount: BigInt(tokenIdAmount)
    },
    attoAlphAmount: BigInt(amount) * 10n ** 18n + 5n * DUST_AMOUNT,
    tokens: [{ id: tokenId, amount: BigInt(tokenIdAmount) }]
  })
}
