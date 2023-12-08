import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../App";
import {Box, Button, Card, CardActions, CardContent, Grid, LinearProgress} from "@mui/material";
import {Lottery} from "../domain/lottery";
import Divider from "@mui/material/Divider";


export function Lotteries() {
    let { symbol } = useParams();
    const services = useContext(ServiceContext);
    const [seed, setSeed] = useState(1);

    const [lotteries, setLotteries] = useState(new Array<Lottery>());

    const reload = () => setSeed(Math.random());

    const formatPct = (i: number): string =>  {
        return Number(i).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
    };

    const formatCountDown = (end: number): string => {
        const delta =  Math.floor((end - Date.now()) / 1000);
        const hours = Math.floor(delta / 3600);
        const minutes = Math.floor((delta % 3600) / 60);
        const seconds = delta % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    const getChanceBar = (lottery: Lottery): number => {
        return 90 * lottery.chance / lotteries.map(l => l.chance).reduce((a, b) => Math.max(a, b));
    }

    const getWiningBar = (lottery: Lottery): number => {
        return 90 * lottery.winningPoll / lotteries.map(l => l.winningPoll).reduce((a, b) => Math.max(a, b));
    }

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
            {lotteries.map((lottery => (
                <Card sx={{margin: "20px"}}>
                    <CardContent>
                        <Grid
                            container
                            spacing={0}
                            columns={12}
                            sx={{height: "100%"}}
                        >
                            <Grid xs={1}  sx={{height: "100%"}}>
                                <Typography
                                    fontSize="30px" fontFamily="Courier" lineHeight="50%" sx={{textAlign: "center", marginTop: "8%"}}>
                                    {lottery.unitPrice}
                                </Typography>
                                <Typography fontSize="h5" fontFamily="Courier"  sx={{textAlign: "center"}}>
                                    {lottery.asset.symbol}
                                </Typography>

                            </Grid>
                            <Grid xs={3} sx={{padding: "5px", height: "100%"}}>
                                {[...Array(lottery.nbTicketsBuy).keys()].map(i =>
                                    (<Box sx={{display: "inline"}}><img height="30px" src="/assets/ticket.svg"/></Box>)
                                )}
                            </Grid>
                            <Grid xs={4} sx={{padding: "5px"}}>
                                <Typography>Chance ({formatPct(lottery.chance)})</Typography>
                                <LinearProgress
                                    sx={{transform: "rotate(180deg)"}}
                                    variant="determinate"
                                    value={getChanceBar(lottery)}
                                    valueBuffer={20}
                                />
                            </Grid>
                            <Grid xs={4} sx={{padding: "5px"}}>
                                <Typography>Gain ({lottery.winningPoll} {lottery.asset.symbol}) </Typography>
                                <LinearProgress
                                    color="secondary"
                                    variant="determinate"
                                    value={getWiningBar(lottery)}
                                    valueBuffer={20}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <CardActions sx={{margin: '10px'}}>
                        <Button size="small" variant="contained" sx={{width: "150px"}}>Buy a ticket</Button>
                        <Typography sx={{width: "100%", textAlign: 'right'}}>
                            {formatCountDown(lottery.end)}
                        </Typography>
                    </CardActions>
                </Card>
            )))}
        </Box>
    )
}
