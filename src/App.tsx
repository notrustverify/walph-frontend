import {createContext, useState} from "react";
import "./App.css";
import {WalphSidebar} from "./components/sidebar";
import MainContent from "./components/main";
import {Box, CssBaseline, useTheme} from "@mui/material";
import {WalphNavbar} from "./components/navbar";
import {DrawerHeader} from "./components/drawerHeader";
import {BlockchainService} from "./services/blockchainService";
import * as React from 'react';
import {WalletService} from "./services/walletService";

class Services {
    blockchain: BlockchainService;
    wallet: WalletService;


    constructor(blockchain: BlockchainService, wallet: WalletService) {
        this.blockchain = blockchain;
        this.wallet = wallet;
    }
}

const blockchain = new BlockchainService();
const wallet = new WalletService();
const services = new Services(blockchain, wallet);

export const ServiceContext = createContext(services);

function App() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <ServiceContext.Provider value={services}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <WalphNavbar open={open} handleDrawerOpen={handleDrawerOpen}/>
                <WalphSidebar
                    open={open}
                    handleDrawerClose={handleDrawerClose}
                    theme={theme}
                />
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader/>
                    <MainContent/>
                </Box>
            </Box>
        </ServiceContext.Provider>
    );
}

export default App;
