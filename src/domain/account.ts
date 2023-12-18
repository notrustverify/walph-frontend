import {Blockchain} from "./blockchain";

export class Account {
    address: string;
    blockchain: Blockchain;

    constructor(address: string, blockchain: Blockchain) {
        this.address = address;
        this.blockchain = blockchain;
    }
}
