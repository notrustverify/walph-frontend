export class Transaction {
    id: string;
    inputs: Spent[];
    output: Spent[];


    constructor(id: string, inputs: Spent[], output: Spent[]) {
        this.id = id;
        this.inputs = inputs;
        this.output = output;
    }
}

export class Spent {
    address: string;
    amount: number;

    constructor(address: string, amount: number) {
        this.address = address;
        this.amount = amount;
    }
}
