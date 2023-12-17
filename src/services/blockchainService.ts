import {Blockchain} from "../domain/blockchain";
import {BlockchainClient} from "./clients/interface";
import {Account} from "../domain/account";
import {Asset} from "../domain/asset";
import {Contract} from "../domain/contract";
import {ContractState} from "../domain/contractState";
import {CLIENTS} from "../config/blockchains";

export class BlockchainService {
    private _selected: BlockchainClient | undefined;

    getAll(): Blockchain[] {
        return CLIENTS.map(e => e.getBlockchain());
    }

    async getAssets(account: Account): Promise<Asset[]> {
        if (this._selected === undefined) return Promise.resolve([]);

        const assets: Asset[] = (await this._selected.getAssets(account))
            .filter(a => this._selected?.getBlockchain().availableTokens.includes(a.symbol));

        const emptyAssets = this._selected.getBlockchain().availableTokens
            .filter(symbol => !assets.map(a => a.symbol).includes(symbol))
            .map(symbol => new Asset(symbol, "", 0, account));

        return assets.concat(emptyAssets);
    }

    async getAsset(symbol: string, account: Account): Promise<Asset> {
        const assets =  (await this.getAssets(account)).filter(a => a.symbol === symbol);
        return assets.length === 0 ? Promise.reject() : assets[0];
    }

    async getContractState(contract: Contract, account: Account): Promise<ContractState>  {
        if (this._selected === undefined) return Promise.reject("Blockchain not selected");
        return this._selected.getContractState(contract, account);
    }

    async getContracts(symbol: string): Promise<Contract[]> {
        if (this._selected === undefined) return Promise.reject([]);
        return this._selected.getContracts(symbol);
    }

    select(name: string): void {
        this._selected = CLIENTS.filter(e => e.getBlockchain().name === name)[0];
    }

    get selected(): Blockchain | undefined {
        return this._selected?.getBlockchain();
    }


}
