import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../App";
import {Box} from "@mui/material";
import {Lottery} from "../domain/lottery";
import {LotteryComponent} from "../components/lottery";


export function Lotteries() {
    let { symbol } = useParams();
    const services = useContext(ServiceContext);

    const [lotteries, setLotteries] = useState(new Array<Lottery>());


    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log(`INTERVAL ${symbol}`);

            const fetchLotteries = async () => {
                try {
                    const res = await services.lottery.getLotteries(symbol || '');
                    setLotteries(res);
                } catch (error) {
                    // Handle error
                    console.error(error);
                }
            };

            fetchLotteries();
        }, 1000);
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
