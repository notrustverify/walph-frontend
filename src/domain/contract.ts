export class Contract {
    address: string;
    symbol: string;
    periodMinute: number;
    unitPrice: number;


    constructor(address: string, symbol: string, periodMinute: number, unitPrice: number) {
        this.address = address;
        this.symbol = symbol;
        this.periodMinute = periodMinute;
        this.unitPrice = unitPrice;
    }
}
