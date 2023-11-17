import {Blockchain} from "../../domain/blockchain";
import {Account} from "../../domain/account";
import {Asset} from "../../domain/asset";

export interface BlockchainClient {
    getBlockchain(): Blockchain;
    getAssets(account: Account): Promise<Asset[]>;
}
