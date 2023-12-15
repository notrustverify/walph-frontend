import {Account} from "./account";
import mainnetJson from "./mainnet.token.json";

interface Token {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
    description: string;
    logoURI: string;
}

interface Network {
    networkId: number;
    tokens: Token[];
}

export class Asset {
    private readonly mainnet: Network = mainnetJson;

    name: string;
    symbol: string;
    amount: number;
    logo: string;
    decimals: number;
    account: Account

    constructor(symbol: string = "", id: string = "", amount: number, account: Account) {
        const token = symbol === ""
        ? this.mainnet.tokens.filter((t) => t.id === id)[0]
            : this.mainnet.tokens.filter((t) => t.symbol === symbol)[0];

        this.name = token.name;
        this.symbol = token.symbol;
        this.amount = amount / Math.pow(10, token.decimals);
        this.logo = token.logoURI;
        this.decimals = token.decimals
        this.account = account;
    }
}
