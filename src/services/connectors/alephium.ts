import {WalletConnector} from "./interface";
import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";
import {Transaction} from "../../domain/transaction";
import {AlephiumWindowObject, getDefaultAlephiumWallet} from "@alephium/get-extension-wallet";
import {
    Account as AlephiumAccount,
    DUST_AMOUNT,
    ExecutableScript,
    HexString,
    Script,
    SignerProvider
} from "@alephium/web3";
import {Lottery} from "../../domain/lottery";
import {ALEPHIUM} from "../../config/blockchains";
import {getLastConnectedAccount} from "@alephium/web3-react/build/utils/storage";

export class AlephiumWalletConnector implements WalletConnector {
    private readonly wallet: Wallet;
    private account: AlephiumAccount | undefined;
    private window: SignerProvider | undefined;
    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    getWallet(): Wallet {
        return this.wallet;
    }

    async connect(signer: SignerProvider): Promise<Account> {

        this.window = signer
        this.account = await this.window?.getSelectedAccount();

        if (this.account) {
            return Promise.resolve(new Account(this.account.address, ALEPHIUM));
        } else {
            return Promise.reject("Can't connect to wallet")
        }
        return Promise.reject("Can't connect to wallet")
    }

    async send(amount: number, account: Account, lottery: Lottery): Promise<Transaction> {
        if (this.window === undefined) return Promise.reject("not connected")

        if (lottery.contract.symbol === "ALPH") {
            const exucutable = new ExecutableScript<{
                walphContract: HexString;
                amount: bigint;
            }>(Script.fromJson(lottery.contract.data));

            const res = await exucutable.execute(
                this.window as unknown as SignerProvider,
                {
                    initialFields: {
                        walphContract: lottery.contract.id,
                        amount: BigInt(amount),
                    },
                    attoAlphAmount: BigInt(amount) + BigInt(5) * DUST_AMOUNT,
                }
            )

            return new Transaction(res.txId, [], []);
        } else {
            const exucutable = new ExecutableScript<{
                walphContract: HexString;
                amount: bigint;
                tokenId: HexString;
                tokenIdAmount: bigint;
            }>(Script.fromJson(lottery.contract.data));

            const res = await exucutable.execute(
                this.window as unknown as SignerProvider,
                {
                    initialFields: {
                        walphContract: lottery.contract.id,
                        amount: BigInt(amount),
                        tokenId: lottery.asset.id,
                        tokenIdAmount: BigInt(amount)
                    },
                    attoAlphAmount: BigInt(2) * DUST_AMOUNT,
                    tokens: [{id: lottery.asset.id, amount: BigInt(amount)}],
                }
            )

            return new Transaction(res.txId, [], []);
        }
    }
}
