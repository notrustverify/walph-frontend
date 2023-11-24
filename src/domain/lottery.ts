import {Asset} from "./asset";

export class Lottery {
    unitPrice: number;
    nbTicketsBuy: number;
    nbTicketsSell: number;
    end: number;
    asset: Asset;


    constructor(unitPrice: number, nbTicketsBuy: number, nbTicketsSell: number, end: number, asset: Asset) {
        this.unitPrice = unitPrice;
        this.nbTicketsBuy = nbTicketsBuy;
        this.nbTicketsSell = nbTicketsSell;
        this.end = end;
        this.asset = asset;
    }

    get winningPoll() {
        return this.unitPrice * this.nbTicketsSell;
    }

    get chance() {
        return this.nbTicketsBuy / this.nbTicketsSell;
    }
}
