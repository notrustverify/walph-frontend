import {Blockchain} from "../../domain/blockchain";
import {Account} from "../../domain/account";
import {Asset} from "../../domain/asset";
import {Contract} from "../../domain/contract";
import {Transaction} from "../../domain/transaction";
import {ContractState} from "../../domain/contractState";

export interface BlockchainClient {
    getBlockchain(): Blockchain;
    getAssets(account: Account): Promise<Asset[]>;
    getContractState(contract: Contract, account: Account): Promise<ContractState>;
    getContracts(symbol: string): Promise<Contract[]>;
}
