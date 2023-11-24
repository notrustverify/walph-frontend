import {BlockchainService} from "./blockchainService";
import {WalletService} from "./walletService";
import {Lottery} from "../domain/lottery";

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
            const asset = await this.blockchain.getAsset(symbol, this.wallet.account);
            return Promise.resolve([
                new Lottery(50, 3, 2658, this.now + 2000000, asset),
                new Lottery(5, 10, 45853, this.now + 1000000, asset),
            ])
        } catch (e) {
            return Promise.reject();
        }
    }
}
