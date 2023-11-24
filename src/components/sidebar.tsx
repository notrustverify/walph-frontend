// Sidebar.js
import * as React from 'react';
import {styled, Theme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {DrawerHeader} from "./drawerHeader";
import {useContext, useState} from "react";
import {ServiceContext} from "../App";
import {
    Avatar,
    Box, Button,
    FormControl, Icon,
    InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
    MenuItem,
    Select, SelectChangeEvent
} from "@mui/material";
import {Address} from "./address";
import Typography from "@mui/material/Typography";
import {Asset} from "../domain/asset";
import {Link, useNavigate} from "react-router-dom";

export const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `0`,
    [theme.breakpoints.up('sm')]: {
        width: `0`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    // @ts-ignore
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

type WalphSidebarProp = {
    open: boolean,
    handleDrawerClose: () => void,
    theme: Theme
}

export const WalphSidebar = ({open, handleDrawerClose, theme}: WalphSidebarProp) => {

    const [seed, setSeed] = useState(1);
    const [assets, setAssets] = useState(new Array<Asset>());
    const services = useContext(ServiceContext);
    const navigate = useNavigate();

    const reload = () => setSeed(Math.random());

    const handleBlockchain = (event: SelectChangeEvent<string>) => {
        services.blockchain.select(event.target.value);
        reload();
    };

    const handleWallet = (event: SelectChangeEvent<string>): void => {
        services.wallet.select(event.target.value);
        reload();
    }

    const connect = async (): Promise<void> => {
        const account = await services.wallet.connect();
        const myassets = await services.blockchain.getAssets(account);
        setAssets(myassets);
        reload();
    }

    return (
        <Drawer variant="permanent" open={open} key={seed}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <Box sx={{margin: "10px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center'}}>

                <Box sx={{marginTop: "10px"}}/>
                <FormControl>
                    <InputLabel id="blokchcain">Blockchain</InputLabel>
                    <Select
                        id="blockchain"
                        label="Blockchain"
                        value={services.blockchain.selected?.name ?? ""}
                        onChange={handleBlockchain}
                    >
                        {services.blockchain.getAll().map(b => (
                            <MenuItem value={b.name} key={b.name}><Icon><img alt={b.name} src={b.logo} height={25}/></Icon> {b.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{marginTop: "10px"}}/>
                <FormControl>
                    <InputLabel id="wallet">Wallet</InputLabel>
                    <Select
                        id="wallet"
                        label="Wallet"
                        value={services.wallet.selected?.name ?? ""}
                        onChange={handleWallet}
                    >
                        {services.wallet.getAll(services.blockchain.selected).map(b => (
                            <MenuItem value={b.name} key={b.name}><Icon><img alt={b.name} src={b.logo} height={25}/></Icon> {b.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{marginTop: "10px"}}/>
                {services.wallet.account === undefined
                    ? (<Button
                        variant="contained"
                        disabled={services.wallet.selected === undefined}
                        onClick={connect}
                    >Connected</Button>)
                    : (<Button
                        variant="outlined"
                        color="warning"
                        disabled={services.wallet.selected === undefined}
                        onClick={connect}
                    >Disconnect</Button>)
                }



                {services.wallet.account === undefined ? <Box/> : (
                    <>
                        <Box sx={{marginTop: "30px"}}/>
                        <Divider/>
                        <Box sx={{marginTop: "10px"}}/>
                        <Address account={services.wallet.account} size={9}/>
                        <Box sx={{marginTop: "10px"}}/>
                        <List>
                            {assets.map((asset) => (
                                <ListItem sx={{width: "100%"}} key={asset.symbol}>
                                    <ListItemButton onClick={() => navigate(`/lotteries/${asset.symbol}`)}>
                                    <ListItemAvatar>
                                        <Avatar alt={asset.symbol} src={asset.logo} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={asset.symbol}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline', fontFamily: "Courier" }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {asset.amount}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}

            </Box>
        </Drawer>
    );
};
