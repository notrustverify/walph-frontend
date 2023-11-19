import {Account} from "./account";

export class Asset {
    name: string;
    symbol: string;
    amount: number;
    logo: string;
    account: Account

    constructor(name: string, symbol: string, amount: number, logo: string, account: Account) {
        this.name = name;
        this.symbol = symbol;
        this.amount = amount;
        this.logo = logo;
        this.account = account;
    }
}
