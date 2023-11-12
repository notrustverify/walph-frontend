import './App.css';
import { WalphSidebar} from "./components/sidebar";
import MainContent from "./components/main";
import {Box, CssBaseline, useTheme} from "@mui/material";
import {WalphNavbar} from "./components/navbar";
import {DrawerHeader} from "./components/drawerHeader";
import {useState} from "react";

function App() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <WalphNavbar open={open} handleDrawerOpen={handleDrawerOpen}/>
            <WalphSidebar open={open} handleDrawerClose={handleDrawerClose} theme={theme} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <MainContent/>
            </Box>
        </Box>
    );
};

export default App;
