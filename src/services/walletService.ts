import {WalletConnector} from "./connectors/interface";
import {Wallet} from "../domain/wallet";
import {Blockchain} from "../domain/blockchain";
import {Account} from "../domain/account";
import {Transaction} from "../domain/transaction";
import {Lottery} from "../domain/lottery";
import {CONNECTORS} from "../config/wallets";

export class WalletService {
    private _selected: WalletConnector | undefined;
    private _account: Account | undefined;

    getAll(blockchain: Blockchain | undefined): Wallet[] {
        if (blockchain === undefined) return [];

        return CONNECTORS
            .map(c => c.getWallet())
            .filter(w => w.blockchain.equals(blockchain));
    }

    select(name: string): void {
        this._selected = CONNECTORS.filter(e => e.getWallet().name === name)[0];
    }

    async connect(): Promise<Account> {
        if (this._selected === undefined) return Promise.reject();

        this._account = await this._selected.connect();
        return this._account;
    }

    get selected(): Wallet | undefined {
        return this._selected?.getWallet();
    }

    get account(): Account | undefined {
        return this._account;
    }

    async send(amount: number, lottery: Lottery): Promise<Transaction> {
        if (this._selected === undefined || this._account === undefined) return Promise.reject();

        return this._selected.send(amount * 10 ** lottery.asset.decimals, this._account, lottery);
    }
}
