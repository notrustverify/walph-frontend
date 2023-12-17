import {Blockchain} from "./blockchain";

export class Wallet {
    name: string;
    logo: string;
    blockchain: Blockchain;

    constructor(name: string, logo: string, blockchain: Blockchain) {
        this.name = name;
        this.logo = logo;
        this.blockchain = blockchain;
    }
}
