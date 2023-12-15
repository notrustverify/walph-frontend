import {WalletConnector} from "./interface";
import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";
import {Blockchain} from "../../domain/blockchain";
import {Transaction} from "../../domain/transaction";
import {AlephiumWindowObject, getDefaultAlephiumWallet} from "@alephium/get-extension-wallet";
import {Account as AlephiumAccount} from "@alephium/web3";

export class AlephiumWalletConnector implements WalletConnector {
    private readonly wallet: Wallet;
    private account: AlephiumAccount | undefined;
    private window: AlephiumWindowObject | undefined;
    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    getWallet(): Wallet {
        return this.wallet;
    }

    async connect(): Promise<Account> {
        this.window = await getDefaultAlephiumWallet();
        console.log('WINDOW');
        this.account = await this.window?.enable({networkId: this.wallet.blockchain.type, onDisconnected: () => {}});
        console.log('ACCOUNT');

        if (this.account) {
            return Promise.resolve(new Account(this.account.address, Blockchain.alephium()));
        } else {
            return Promise.reject("Can't connect to wallet")
        }

    }

    async send(number: number, address: string): Promise<Transaction> {
        return Promise.reject();
    }
}
