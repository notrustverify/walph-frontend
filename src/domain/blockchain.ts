export class Blockchain {
    name: string;
    type: 'dev' | 'main' | 'test';
    logo: string;
    availableTokens: string[];

    constructor(name: string, type: "dev" | "main" | "test", logo: string, availableTokens: string[]) {
        this.name = name;
        this.type = type;
        this.logo = logo;
        this.availableTokens = availableTokens;
    }

    static alephium(): Blockchain {
        return new Blockchain("Alephium", "main", "/assets/alephium.png", ["ALPH", "ALF"])
    }

    equals(other: Blockchain): boolean {
        return other.name === this.name &&
            other.type === this.type;
    }
}
