import { DUST_AMOUNT, ExecuteScriptResult, ONE_ALPH, SignerProvider } from '@alephium/web3'
import { BuyTicketToken } from '../../artifacts/ts/scripts'

export const buyTicket = async (
  signerProvider: SignerProvider,
  amount: string,
  walfContractId: string,
  tokenId: string,
): Promise<ExecuteScriptResult> => {
  
  return await BuyTicketToken.execute(signerProvider, {
    initialFields: {
      walfContract: walfContractId,
      amount: BigInt(amount) * 10n ** 18n,
      tokenId: tokenId,
    },
    attoAlphAmount: 2n*DUST_AMOUNT,
    tokens: [{ id: tokenId, amount: BigInt(amount) * 10n ** 18n }]
  })
}
