import { DUST_AMOUNT, ExecuteScriptResult, SignerProvider } from '@alephium/web3'
import { Buy } from '../../artifacts/ts/scripts'

export const buyTicket = async (
  signerProvider: SignerProvider,
  amount: string,
  walpheContractId: string
): Promise<ExecuteScriptResult> => {
  return await Buy.execute(signerProvider, {
    initialFields: {
      walpheContract: walpheContractId,
      amount: BigInt(amount)* 10n ** 18n
    },
    attoAlphAmount: 10n ** 18n + 3n * DUST_AMOUNT
  })
}
