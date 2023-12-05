import {Blockchain} from "../domain/blockchain";
import {AlephiumClient} from "./clients/alephium";
import {BlockchainClient} from "./clients/interface";
import {Account} from "../domain/account";
import {Asset} from "../domain/asset";
import {Contract} from "../domain/contract";
import {Transaction} from "../domain/transaction";

export class BlockchainService {
    private readonly clients: BlockchainClient[] = [
        new AlephiumClient(Blockchain.alephium()),

    ];
    private _selected: BlockchainClient | undefined;

    getAll(): Blockchain[] {
        return this.clients.map(e => e.getBlockchain());
    }

    async getAssets(account: Account): Promise<Asset[]> {
        if (this._selected === undefined) return Promise.resolve([]);

        return (await this._selected.getAssets(account))
            .filter(a => this._selected?.getBlockchain().availableTokens.includes(a.symbol));
    }

    async getAsset(symbol: string, account: Account): Promise<Asset> {
        const assets =  (await this.getAssets(account)).filter(a => a.symbol === symbol);
        return assets.length === 0 ? Promise.reject() : assets[0];
    }

    async getTransactions(contract: Contract, after: number): Promise<Transaction[]> {
        if (this._selected === undefined) return Promise.reject([]);
        return this._selected.getTransactions(contract, after);
    }

    async getContracts(symbol: string): Promise<Contract[]> {
        if (this._selected === undefined) return Promise.reject([]);
        return this._selected.getContracts(symbol);
    }

    select(name: string): void {
        this._selected = this.clients.filter(e => e.getBlockchain().name === name)[0];
    }

    get selected(): Blockchain | undefined {
        return this._selected?.getBlockchain();
    }


}
