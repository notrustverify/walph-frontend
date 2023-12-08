export class ContractState {
    attendees: number;
    buy: number;
    end: number;


    constructor(attendees: number, buy: number, end: number) {
        this.attendees = attendees;
        this.buy = buy;
        this.end = end;
    }
}
