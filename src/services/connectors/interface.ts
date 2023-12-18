import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";
import {Transaction} from "../../domain/transaction";
import {Lottery} from "../../domain/lottery";

export interface WalletConnector {
    getWallet(): Wallet;
    connect(): Promise<Account>;
    send(amount: number, account: Account, lottery: Lottery): Promise<Transaction>;
}
