export class Contract {
    id: string;
    address: string;
    index: number;
    symbol: string;
    periodMinute: number;
    unitPrice: number;
    data: any;


    constructor(id: string, address: string, index: number, symbol: string, periodMinute: number, unitPrice: number, data: any) {
        this.id = id;
        this.address = address;
        this.index = index;
        this.symbol = symbol;
        this.periodMinute = periodMinute;
        this.unitPrice = unitPrice;
        this.data = data;
    }
}
