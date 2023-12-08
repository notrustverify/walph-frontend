import {WalletConnector} from "./interface";
import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";
import {Blockchain} from "../../domain/blockchain";
import {Transaction} from "../../domain/transaction";

export class AlephiumWalletConnector implements WalletConnector {
    private readonly wallet: Wallet;
    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    getWallet(): Wallet {
        return this.wallet;
    }

    connect(): Promise<Account> {
        return Promise.resolve(new Account("1JDi2dx4gYVde7K9YFsvSva8Md2tt4BeRBHvpueJ5FsjX", Blockchain.alephium()));
    }

    async send(number: number, address: string): Promise<Transaction> {
        return Promise.reject();
    }
}
