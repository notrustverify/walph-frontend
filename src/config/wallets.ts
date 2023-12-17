import {AlephiumWalletConnector} from "../services/connectors/alephium";
import {Wallet} from "../domain/wallet";
import {ALEPHIUM} from "./blockchains";

export const ALEPHIUM_CONNECTOR = new Wallet("Official", "/assets/alephium.png", ALEPHIUM);

export const CONNECTORS = [
    new AlephiumWalletConnector(ALEPHIUM_CONNECTOR),
];
