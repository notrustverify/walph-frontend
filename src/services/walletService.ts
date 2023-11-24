import {WalletConnector} from "./connectors/interface";
import {AlephiumWalletConnector} from "./connectors/alephium";
import {Wallet} from "../domain/wallet";
import {Blockchain} from "../domain/blockchain";
import {Account} from "../domain/account";

export class WalletService {
    private readonly connectors: WalletConnector[] = [
        new AlephiumWalletConnector(Wallet.alephium()),
    ];
    private _selected: WalletConnector | undefined;
    private _account: Account | undefined;

    getAll(blockchain: Blockchain | undefined): Wallet[] {
        if (blockchain === undefined) return [];

        return this.connectors
            .map(c => c.getWallet())
            .filter(w => w.blockchain.equals(blockchain));
    }

    select(name: string): void {
        this._selected = this.connectors.filter(e => e.getWallet().name === name)[0];
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

}