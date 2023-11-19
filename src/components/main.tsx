import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import {Lotteries} from "../pages/lotteries";

const MainContent = () => {
    return (
            <Routes>
                <Route path="lotteries/:symbol" element={<Lotteries />} />
                <Route path="/" element={<Home />}/>
            </Routes>
    );
};

export default MainContent;
