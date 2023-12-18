import * as React from "react";
import {createContext, useState} from "react";
import "./App.css";
import {WalphSidebar} from "./components/sidebar";
import MainContent from "./components/main";
import {Box, createTheme, CssBaseline, ThemeProvider, useTheme} from "@mui/material";
import {WalphNavbar} from "./components/navbar";
import {DrawerHeader} from "./components/drawerHeader";
import {BlockchainService} from "./services/blockchainService";
import {WalletService} from "./services/walletService";
import {BrowserRouter} from "react-router-dom";
import {LotteryService} from "./services/lotteryService";

class Services {
    blockchain: BlockchainService;
    wallet: WalletService;
    lottery: LotteryService;


    constructor(blockchain: BlockchainService, wallet: WalletService, lottery: LotteryService) {
        this.blockchain = blockchain;
        this.wallet = wallet;
        this.lottery = lottery;
    }
}

const blockchain = new BlockchainService();
const wallet = new WalletService();
const lottery = new LotteryService(blockchain, wallet);
const services = new Services(blockchain, wallet, lottery);

export const ServiceContext = createContext(services);

function App() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {main: '#7E3FF2'},
            secondary: {main: '#36962f'}
        }
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <ServiceContext.Provider value={services}>
            <BrowserRouter>
                <ThemeProvider theme={darkTheme}>
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
                </ThemeProvider>
            </BrowserRouter>
        </ServiceContext.Provider>
    );
}

export default App;
