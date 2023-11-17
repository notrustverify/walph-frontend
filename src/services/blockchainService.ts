import {Blockchain} from "../domain/blockchain";
import {AlephiumClient} from "./clients/alephium";
import {BlockchainClient} from "./clients/interface";

export class BlockchainService {
    private readonly clients: BlockchainClient[] = [
        new AlephiumClient(new Blockchain("Alephium", "main", "assets/alephium.png", ["ALPH"])),

    ];
    private _selected: BlockchainClient | undefined;

    getAll(): Blockchain[] {
        return this.clients.map(e => e.getBlockchain());
    }

    select(name: string): void {
        this._selected = this.clients.filter(e => e.getBlockchain().name === name)[0];
    }

    get selected(): Blockchain | undefined {
        return this._selected?.getBlockchain();
    }


}
