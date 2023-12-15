export class Blockchain {
    name: string;
    type: 'devnet' | 'mainnet' | 'testnet';
    logo: string;
    availableTokens: string[];
    node: string;

    constructor(name: string, type: "devnet" | "mainnet" | "testnet", logo: string, availableTokens: string[], node: string) {
        this.name = name;
        this.type = type;
        this.logo = logo;
        this.availableTokens = availableTokens;
        this.node = node;
    }

    static alephium(): Blockchain {
        return new Blockchain("Alephium", "mainnet", "/assets/alephium.png", ["ALPH", "ALF"], "https://lb.notrustverify.ch")
    }

    equals(other: Blockchain): boolean {
        return other.name === this.name &&
            other.type === this.type;
    }
}
