import {BlockchainService} from "./blockchainService";
import {WalletService} from "./walletService";
import {Lottery} from "../domain/lottery";
import {Asset} from "../domain/asset";
import {Contract} from "../domain/contract";
import {Spent, Transaction} from "../domain/transaction";
import {Account} from "../domain/account";

export class LotteryService {
    private readonly blockchain: BlockchainService;
    private readonly wallet: WalletService;
    private readonly now: number;


    constructor(blockchain: BlockchainService, wallet: WalletService) {
        this.blockchain = blockchain;
        this.wallet = wallet;
        this.now = Date.now();
    }

    _extractTicket(tx: Transaction[], contract: Contract): number {
        const extractSpentAmount = (spents: Spent[], contract: Contract): number => {
            return spents
                .filter((s) => s.address === contract.address)
                .map((s) => s.amount)
                .reduce((a, b) => a + b);
        }

        const from: number = tx
            .map((t) => extractSpentAmount(t.inputs, contract))
            .reduce((a, b) => a+b);
        const to: number = tx
            .map((t) => extractSpentAmount(t.output, contract))
            .reduce((a, b) => a + b);

        return Math.floor((to-from) / contract.unitPrice);
    }

    isFromAccount(tx: Transaction, account?: Account): boolean {
        if (account === undefined) return false;
        return tx.inputs.some((i) => i.address === account.address);
    }

    async getLotteries(symbol: string): Promise<Lottery[]> {
        if (this.wallet.account === undefined) return [];
        try {
            const asset: Asset = await this.blockchain.getAsset(symbol, this.wallet.account);
            const contracts: Contract[] = await this.blockchain.getContracts(symbol);
            const lotteries: Lottery[] = [];

            for(let contract of contracts) {
                const start = Math.floor(Date.now() / 1000) % (contract.periodMinute * 60)
                const end = start + contract.periodMinute * 60;
                const tx: Transaction[] = await this.blockchain.getTransactions(contract, start)

                const sell: number = this._extractTicket(tx, contract);
                const buy: number = this._extractTicket(
                    tx.filter((t) => this.isFromAccount(t, this.wallet.account)),
                    contract);

                lotteries.push(new Lottery(contract.unitPrice, buy, sell, end, asset, contract));
            }

            return lotteries;
        } catch (e) {
            return Promise.reject();
        }
    }

    async buyTicket(lottery: Lottery, nb: number): Promise<Transaction> {
        return this.wallet.send(nb * lottery.unitPrice, lottery.contract.address);
    }
}
