import { DUST_AMOUNT, ExecuteScriptResult, ONE_ALPH, SignerProvider } from '@alephium/web3'
import { Buy, BuyTimedWithToken, BuyTimedWithoutToken, BuyWithoutToken } from '../../artifacts/ts/scripts'

export const buyTicket = async (
  signerProvider: SignerProvider,
  amount: string,
  walpheContractId: string,
  tokenId: string,
): Promise<ExecuteScriptResult> => {
  
  if (tokenId === undefined) {
    return await BuyTimedWithoutToken.execute(signerProvider, {
      initialFields: {
        walphContract: walpheContractId,
        amount: BigInt(amount) * 10n ** 18n
      },
      attoAlphAmount: BigInt(amount) * 10n ** 18n + 5n * DUST_AMOUNT
    })
  }

  return await BuyTimedWithToken.execute(signerProvider, {
    initialFields: {
      walphContract: walpheContractId,
      amount: BigInt(amount),
      tokenId: tokenId,
    },
    attoAlphAmount: 5n * DUST_AMOUNT,
    tokens: [{ id: tokenId, amount: BigInt(amount) }]
  })
}
