import {BlockchainClient} from "./interface";
import {Blockchain} from "../../domain/blockchain";
import {Account} from "../../domain/account";
import {Asset} from "../../domain/asset";
import {Contract} from "../../domain/contract";
import {NodeProvider} from "@alephium/web3";
import {ContractState} from "../../domain/contractState";
import {Balance} from "@alephium/web3/dist/src/api/api-alephium";

export class AlephiumClient implements BlockchainClient {
    private blockchain: Blockchain;
    private provider: NodeProvider
    private static CONTRACTS = [
        new Contract(
            "dab039d59282b573fc9badb7f936fb868a16313c01667b63fa41fd15d3b6a101",
            "29Qcr1sH2a74W7z9upaty8pacos6YK2zdsuUknBKMaVZi",
            1,"ALPH", 60 * 24, 5
        ),
    ]
    /*
              "address": "29Qcr1sH2a74W7z9upaty8pacos6YK2zdsuUknBKMaVZi",
          "contractId": "dab039d59282b573fc9badb7f936fb868a16313c01667b63fa41fd15d3b6a101",
     */


    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
        this.provider = new NodeProvider(blockchain.node);
    }

    getBlockchain(): Blockchain {
        return this.blockchain;
    }

    async getAssets(account: Account): Promise<Asset[]> {
        if (account.address.length === 0) return Promise.resolve([]);

        const balance: Balance = await this.provider.addresses.getAddressesAddressBalance(account.address);
        const assets: Asset[] = (balance.tokenBalances ?? []).map((token) =>
            new Asset("", token.id, parseFloat(token.amount), account)
        );

        if (balance.balance) {
            assets.push(new Asset("ALPH", "", parseFloat(balance.balance), account))
        }

        return assets;
    }

    async getContractState(contract: Contract, account: Account): Promise<ContractState> {
        const state = await this.provider.contracts.getContractsAddressState(contract.address, {group: contract.index});

        const end = parseInt(state.mutFields[0].value as string);
        const sell = parseInt(state.mutFields[5].value as string);

        const buy = state.mutFields
            .slice(6, 6+sell)
            .filter((add) => (add.value as string) === account.address)
            .length

        return new ContractState(sell, buy, end);
    }

    getContracts(symbol: string): Promise<Contract[]> {
        return Promise.resolve(AlephiumClient.CONTRACTS.filter((c) => c.symbol === symbol));
    }
}
