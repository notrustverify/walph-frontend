import { DUST_AMOUNT, ExecuteScriptResult, SignerProvider } from '@alephium/web3'
import { Buy, BuyWithoutToken } from '../../artifacts/ts/scripts'

export const buyTicket = async (
  signerProvider: SignerProvider,
  amount: string,
  walpheContractId: string
): Promise<ExecuteScriptResult> => {


  if (process.env.NEXT_PUBLIC_NO_HODLING !== undefined || process.env.NEXT_PUBLIC_NO_HODLING !== 'false' ) {

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
      tokenId: '3f52b6bdb8678b8931d683bbae1bd7c5296f70a2ab87bbd1792cb24f9b1d1500',
      tokenIdAmount: 0n
    },
    attoAlphAmount: BigInt(amount) * 10n ** 18n + 3n * DUST_AMOUNT,
    tokens: [{ id: '3f52b6bdb8678b8931d683bbae1bd7c5296f70a2ab87bbd1792cb24f9b1d1500', amount: 1n }]
  })
}
