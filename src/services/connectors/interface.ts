import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";
import {Transaction} from "../../domain/transaction";
import {Lottery} from "../../domain/lottery";
import {SignerProvider} from "@alephium/web3";

export interface WalletConnector {
    getWallet(): Wallet;
    connect(signer: SignerProvider): Promise<Account>;
    send(amount: number, account: Account, lottery: Lottery): Promise<Transaction>;
}
