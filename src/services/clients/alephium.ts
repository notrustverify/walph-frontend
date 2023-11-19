import {BlockchainClient} from "./interface";
import {Blockchain} from "../../domain/blockchain";
import {Account} from "../../domain/account";
import {Asset} from "../../domain/asset";

export class AlephiumClient implements BlockchainClient {
    private blockchain: Blockchain;


    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
    }

    getBlockchain(): Blockchain {
        return this.blockchain;
    }

    getAssets(account: Account): Promise<Asset[]> {
        if (account.address.length === 0) return Promise.resolve([]);
        return Promise.resolve([
            new Asset("Alephium", 'ALPH', 123.58, "/assets/alephium.png", account),
            new Asset("Scan", "ALF", 6568.58, "/assets/alephium.png", account)
        ])
    }
}
