// Sidebar.js
import * as React from 'react';
import {styled, Theme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {DrawerHeader} from "./drawerHeader";
import {useContext, useState} from "react";
import {ServiceContext} from "../App";
import {
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, Icon,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select, SelectChangeEvent
} from "@mui/material";

export  const drawerWidth = 240;

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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    // @ts-ignore
    ({ theme, open }) => ({
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

export const WalphSidebar = ({ open, handleDrawerClose, theme }: WalphSidebarProp) => {

    const [seed, setSeed] = useState(1);
    const services = useContext(ServiceContext);

    const reload = () => setSeed(Math.random());

    const handleBlockchain = (event: SelectChangeEvent<string>) => {
        services.blockchain.select(event.target.value);
        reload();
    };

    return (
        <Drawer variant="permanent" open={open} key={seed}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <FormControl sx={{margin: "30px 10px 0px 10px"}}>
                <InputLabel id="blokchcain">Blockchain</InputLabel>
                <Select
                    id="blockchain"
                    label="Blockchain"
                    value={services.blockchain.selected?.name ?? ""}
                    onChange={handleBlockchain}
                >
                    {services.blockchain.getAll().map(b => (
                        <MenuItem value={b.name} key={b.name}><Icon><img src={b.logo} height={25}/></Icon> {b.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{margin: "30px 10px 10px 10px"}}>
                <InputLabel id="wallet">Wallet</InputLabel>
                <Select
                    id="wallet"
                    label="Wallet"
                    value={services.blockchain.selected?.name ?? ""}
                    onChange={handleBlockchain}
                >
                    {services.blockchain.getAll().map(b => (
                        <MenuItem value={b.name} key={b.name}><Icon><img src={b.logo} height={25}/></Icon> {b.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Drawer>
    );
};
