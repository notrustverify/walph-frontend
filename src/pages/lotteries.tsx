import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../App";
import {Box, Button, Card, CardActions, CardContent, Grid, LinearProgress, Slider} from "@mui/material";
import {Lottery} from "../domain/lottery";


export function Lotteries() {
    let { symbol } = useParams();
    const services = useContext(ServiceContext);
    const [seed, setSeed] = useState(1);

    const [lotteries, setLotteries] = useState(new Array<Lottery>());

    const reload = () => setSeed(Math.random());

    useEffect(() => {
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
        }, [symbol]
    )


    return (
        <Box key={seed}>
            {lotteries.map((lottery => (
                <Card sx={{margin: "20px"}}>
                    <CardContent>
                        <Grid
                            container
                            spacing={0}
                            columns={12}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid xs={1}>
                                <Typography fontSize="h5">
                                    {lottery.unitPrice}
                                </Typography>
                                <Typography fontSize="h5">
                                    {lottery.asset.symbol}
                                </Typography>

                            </Grid>
                            <Grid xs={3} sx={{padding: "5px"}}>
                            </Grid>
                            <Grid xs={4} sx={{padding: "5px"}}>
                                <Typography>Estimate Gain ({lottery.estimateGain}) </Typography>
                                <LinearProgress
                                    sx={{transform: "rotate(180deg)"}}
                                    variant="determinate"
                                    value={10}
                                    valueBuffer={20}
                                />
                            </Grid>
                            <Grid xs={4} sx={{padding: "5px"}}>
                                <Typography>Tickets bought ({lottery.nbTicketsBuy}) </Typography>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={lottery.nbTicketsBuy}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={15}
                                />
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            )))}
        </Box>
    )
}
