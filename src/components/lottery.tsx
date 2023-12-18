import {Lottery} from "../domain/lottery";
import {Box, Button, Card, CardActions, CardContent, Grid, LinearProgress, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useContext, useState} from "react";
import {ServiceContext} from "../App";

type LotteryProps = {
    lottery: Lottery,
    lotteries: Lottery[]
}
export function LotteryComponent({lottery, lotteries}: LotteryProps) {

    const services = useContext(ServiceContext);
    const [buying, setBuying] = useState(1);

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

    const formatPct = (i: number): string =>  {
        return Number(i).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
    };

    const onBuy = () => {
        services.lottery.buyTicket(lottery, buying).then(() => {})
    }

    return <Card sx={{margin: "20px"}}>
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
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item xs={1}>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        type="number"
                        size="small"
                        value={buying}
                        onChange={(event) => setBuying(parseInt(event.target.value))}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={6}>
                    <Button size="small" variant="contained" sx={{width: "150px"}} onClick={onBuy}>Buy tickets</Button>
                </Grid>
            </Grid>
            <Typography sx={{width: "100%", textAlign: 'right'}}>
                {formatCountDown(lottery.end)}
            </Typography>
        </CardActions>
    </Card>
}
