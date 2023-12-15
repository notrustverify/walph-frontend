import {WalletConnector} from "./interface";
import {Wallet} from "../../domain/wallet";
import {Account} from "../../domain/account";
import {Blockchain} from "../../domain/blockchain";
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

// 0101030001000ab417001600{13c44563918244f40000}a2{13c44563918244f40000}0d0c144020{dab039d59282b573fc9badb7f936fb868a16313c01667b63fa41fd15d3b6a101}0108
const json = {
    "version": "v2.5.9",
    "name": "BuyTimedWithoutToken",
    "bytecodeTemplate": "0101030001000ab417001600{1}a2{1}0d0c{0}0108",
    "fieldsSig": {
        "names": [
            "walphContract",
            "amount"
        ],
        "types": [
            "ByteVec",
            "U256"
        ],
        "isMutable": [
            false,
            false
        ]
    },
    "functions": [
        {
            "name": "main",
            "usePreapprovedAssets": true,
            "useAssetsInContract": false,
            "isPublic": true,
            "paramNames": [],
            "paramTypes": [],
            "paramIsMutable": [],
            "returnTypes": []
        }
    ]
}

export const BuyWithoutToken = new ExecutableScript<{
    walphContract: HexString;
    amount: bigint;
}>(Script.fromJson(json));

export class AlephiumWalletConnector implements WalletConnector {
    private readonly wallet: Wallet;
    private account: AlephiumAccount | undefined;
    private window: AlephiumWindowObject | undefined;
    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    getWallet(): Wallet {
        return this.wallet;
    }

    async connect(): Promise<Account> {
        this.window = await getDefaultAlephiumWallet();
        console.log('WINDOW');
        this.account = await this.window?.enable({networkId: this.wallet.blockchain.type, onDisconnected: () => {}});
        console.log('ACCOUNT');

        if (this.account) {
            return Promise.resolve(new Account(this.account.address, Blockchain.alephium()));
        } else {
            return Promise.reject("Can't connect to wallet")
        }

    }

    async send(amount: number, account: Account, lottery: Lottery): Promise<Transaction> {
        if (this.window === undefined) return Promise.reject("not connected")

        /*
        const res = await this.window.signAndSubmitExecuteScriptTx({
            signerAddress: account.address,
            bytecode: "0101030001000ab41700160013c44563918244f40000a213c44563918244f400000d0c144020dab039d59282b573fc9badb7f936fb868a16313c01667b63fa41fd15d3b6a1010108",

        })

        return new Transaction(res.txId, [], [])


         */

        console.log(amount);
        const res = await BuyWithoutToken.execute(
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


    }
}
