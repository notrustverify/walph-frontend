import {BlockchainService} from "./blockchainService";
import {WalletService} from "./walletService";
import {Lottery} from "../domain/lottery";
import {Asset} from "../domain/asset";
import {Contract} from "../domain/contract";
import {Transaction} from "../domain/transaction";
import {ContractState} from "../domain/contractState";

export class LotteryService {
    private readonly blockchain: BlockchainService;
    private readonly wallet: WalletService;
    private readonly now: number;


    constructor(blockchain: BlockchainService, wallet: WalletService) {
        this.blockchain = blockchain;
        this.wallet = wallet;
        this.now = Date.now();
    }

    async getLotteries(symbol: string): Promise<Lottery[]> {
        if (this.wallet.account === undefined) return [];
        try {
            const asset: Asset = await this.blockchain.getAsset(symbol, this.wallet.account);
            const contracts: Contract[] = await this.blockchain.getContracts(symbol);
            const lotteries: Lottery[] = [];

            for(let contract of contracts) {
                const state: ContractState = await this.blockchain.getContractState(contract, this.wallet.account)
                lotteries.push(new Lottery(contract.unitPrice, state.buy, state.attendees, state.end, asset, contract));
            }

            return lotteries;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async buyTicket(lottery: Lottery, nb: number): Promise<Transaction> {
        return this.wallet.send(nb * lottery.unitPrice, lottery);
    }
}
