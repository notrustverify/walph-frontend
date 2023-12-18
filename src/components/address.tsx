import * as React from 'react';
import {Account} from "../domain/account";
import Typography from "@mui/material/Typography";

type AddressProps = {
    account: Account,
    size: number
}
export function Address({account, size}: AddressProps) {
    const a = account.address;
    const text = `${a.substring(0, size)}...${a.substring(a.length-size, a.length)}`;
    return (
        <Typography style={{fontFamily: "Courier"}}>{text}</Typography>
    )
}
