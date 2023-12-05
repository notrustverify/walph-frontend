import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";
import {Transaction} from "../../domain/transaction";

export interface WalletConnector {
    getWallet(): Wallet;
    connect(): Promise<Account>;
    send(number: number, address: string): Promise<Transaction>;
}
