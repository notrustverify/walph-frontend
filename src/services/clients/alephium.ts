import {BlockchainClient} from "./interface";
import {Blockchain} from "../../domain/blockchain";

export class AlephiumClient implements BlockchainClient {
    private blockchain: Blockchain;


    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
    }

    getBlockchain(): Blockchain {
        return this.blockchain;
    }
}
