import {Asset} from "./asset";
import {Contract} from "./contract";

export class Lottery {
    unitPrice: number;
    nbTicketsBuy: number;
    nbTicketsSell: number;
    end: number;
    asset: Asset;
    contract: Contract;


    constructor(unitPrice: number, nbTicketsBuy: number, nbTicketsSell: number, end: number, asset: Asset, contract: Contract) {
        this.unitPrice = unitPrice;
        this.nbTicketsBuy = nbTicketsBuy;
        this.nbTicketsSell = nbTicketsSell;
        this.end = end;
        this.asset = asset;
        this.contract = contract;
    }

    get winningPoll() {
        return this.unitPrice * this.nbTicketsSell;
    }

    get chance() {
        return this.nbTicketsBuy / this.nbTicketsSell;
    }
}
