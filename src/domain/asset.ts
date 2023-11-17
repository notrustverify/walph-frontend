export class Asset {
    name: string;
    symbol: string;
    amount: number;
    logo: string;

    constructor(name: string, symbol: string, amount: number, logo: string) {
        this.name = name;
        this.symbol = symbol;
        this.amount = amount;
        this.logo = logo;
    }
}
