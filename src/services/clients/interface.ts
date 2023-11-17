import {Blockchain} from "../../domain/blockchain";

export interface BlockchainClient {
    getBlockchain(): Blockchain;
}
