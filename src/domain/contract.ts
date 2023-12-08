export class Contract {
    address: string;
    index: number;
    symbol: string;
    periodMinute: number;
    unitPrice: number;


    constructor(address: string, index: number, symbol: string, periodMinute: number, unitPrice: number) {
        this.address = address;
        this.index = index;
        this.symbol = symbol;
        this.periodMinute = periodMinute;
        this.unitPrice = unitPrice;
    }
}
