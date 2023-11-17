import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";

export interface WalletConnector {
    getWallet(): Wallet;
    connect(): Promise<Account>;
}
