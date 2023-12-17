import {AlephiumClient} from "../services/clients/alephium";
import {Blockchain} from "../domain/blockchain";


export const ALEPHIUM = new Blockchain("Alephium", "mainnet", "/assets/alephium.png", ["ALPH", "ALF", "USDC", "USDT", "NGU", "AYIN"], "https://lb.notrustverify.ch");

export const CLIENTS = [
    new AlephiumClient(ALEPHIUM),
];
