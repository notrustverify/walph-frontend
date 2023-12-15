import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../App";
import {Box, Button, Card, CardActions, CardContent, Grid, LinearProgress, TextField} from "@mui/material";
import {Lottery} from "../domain/lottery";
import Divider from "@mui/material/Divider";
import {LotteryComponent} from "../components/lottery";


export function Lotteries() {
    let { symbol } = useParams();
    const services = useContext(ServiceContext);
    const [seed, setSeed] = useState(1);

    const [lotteries, setLotteries] = useState(new Array<Lottery>());

    const reload = () => setSeed(Math.random());

    useEffect(() => {
        console.log(`EFFECT ${symbol}`);
        const intervalId = setInterval(() => {
            console.log(`INTERVAL ${symbol}`);

            const fetchLotteries = async () => {
                try {
                    const res = await services.lottery.getLotteries(symbol || '');
                    console.log(res);
                    setLotteries(res);
                } catch (error) {
                    // Handle error
                    console.error(error);
                }
            };

            fetchLotteries();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [symbol]);


    return (
        <Box key={symbol}>
            {
                lotteries.map(lottery => <LotteryComponent
                    key={lottery.contract.address}
                    lottery={lottery}
                    lotteries={lotteries}/>)
            }
        </Box>
    )
}
