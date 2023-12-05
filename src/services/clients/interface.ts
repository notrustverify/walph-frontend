import {Blockchain} from "../../domain/blockchain";
import {Account} from "../../domain/account";
import {Asset} from "../../domain/asset";
import {Contract} from "../../domain/contract";
import {Transaction} from "../../domain/transaction";

export interface BlockchainClient {
    getBlockchain(): Blockchain;
    getAssets(account: Account): Promise<Asset[]>;
    getTransactions(contract: Contract, after: number): Promise<Transaction[]>;
    getContracts(symbol: string): Promise<Contract[]>;
}
