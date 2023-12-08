import {BlockchainClient} from "./interface";
import {Blockchain} from "../../domain/blockchain";
import {Account} from "../../domain/account";
import {Asset} from "../../domain/asset";
import {Contract} from "../../domain/contract";
import {NodeProvider} from "@alephium/web3";
import {ContractState} from "../../domain/contractState";

export class AlephiumClient implements BlockchainClient {
    private blockchain: Blockchain;
    private provider: NodeProvider
    private static CONTRACTS = [
        new Contract("29Qcr1sH2a74W7z9upaty8pacos6YK2zdsuUknBKMaVZi", 1,"ALPH", 60 * 24, 5),
    ]


    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
        this.provider = new NodeProvider(blockchain.node);
    }

    getBlockchain(): Blockchain {
        return this.blockchain;
    }

    getAssets(account: Account): Promise<Asset[]> {
        if (account.address.length === 0) return Promise.resolve([]);
        return Promise.resolve([
            new Asset("Alephium", 'ALPH', 123.58, "/assets/alephium.png", account),
            new Asset("Scan", "ALF", 6568.58, "/assets/alephium.png", account)
        ])
    }

    async getContractState(contract: Contract, account: Account): Promise<ContractState> {
        // const events: ContractEvents = await this.provider.events.getEventsContractContractaddress(contract.address, {start: 0, limit: 100, group: contract.index})
        const state = await this.provider.contracts.getContractsAddressState(contract.address, {group: contract.index});

        state.mutFields.forEach((e) => console.log(e));
        const end = parseInt(state.mutFields[0].value as string);
        console.log(`END ${end}`);
        const sell = parseInt(state.mutFields[5].value as string);
        console.log(`SELL ${sell}`);

        const buy = state.mutFields
            .slice(6, 6+sell)
            .filter((add) => (add.value as string) === account.address)
            .length
        console.log(`BUY ${buy}`);


        return new ContractState(sell, buy, end);
    }

    getContracts(symbol: string): Promise<Contract[]> {
        return Promise.resolve(AlephiumClient.CONTRACTS.filter((c) => c.symbol === symbol));
    }
}
