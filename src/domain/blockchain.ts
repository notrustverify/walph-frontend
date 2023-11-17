import {type} from "os";

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
}
