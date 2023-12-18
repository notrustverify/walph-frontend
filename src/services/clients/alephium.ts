import {BlockchainClient} from "./interface";
import {Blockchain} from "../../domain/blockchain";
import {Account} from "../../domain/account";
import {Asset} from "../../domain/asset";
import {Contract} from "../../domain/contract";
import {NodeProvider} from "@alephium/web3";
import {ContractState} from "../../domain/contractState";
import {Balance} from "@alephium/web3/dist/src/api/api-alephium";
import {CONTRACTS} from "../../config/contracts/alephium";

export class AlephiumClient implements BlockchainClient {
    private blockchain: Blockchain;
    private provider: NodeProvider

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

        if (contract.symbol === "ALPH") {
            const end = parseInt(state.mutFields[0].value as string);
            const sell = parseInt(state.mutFields[5].value as string);

            const buy = state.mutFields
                .slice(6, 6 + sell)
                .filter((add) => (add.value as string) === account.address)
                .length

            return new ContractState(sell, buy, end);
        } else {
            const end = parseInt(state.mutFields[0].value as string);
            const sell = parseInt(state.mutFields[6].value as string);

            const buy = state.mutFields
                .slice(7, 7 + sell)
                .filter((add) => (add.value as string) === account.address)
                .length

            return new ContractState(sell, buy, end);
        }
    }

    getContracts(symbol: string): Promise<Contract[]> {
        return Promise.resolve(CONTRACTS.filter((c) => c.symbol === symbol));
    }
}
