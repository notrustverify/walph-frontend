import {AlephiumConnectButton, useWallet} from "@alephium/web3-react";
import * as React from "react";
import {useContext, useEffect} from "react";
import {ServiceContext} from "../App";
import {SignerProvider} from "@alephium/web3";


interface ConnectButtonProp {
    onConnect: (signer: SignerProvider) => void;
}
export function ConnectButton({onConnect}: ConnectButtonProp) {
    const { account, signer } = useWallet();
    const services = useContext(ServiceContext);
    let already = false;

    if (signer !== undefined && !already) {
        onConnect(signer as unknown as SignerProvider);
        already = true;
    }

    return <AlephiumConnectButton />
}
