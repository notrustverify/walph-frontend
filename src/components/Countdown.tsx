import React  from 'react';
import Countdown from 'react-countdown'

interface timeWalph {
    drawTimestamp: number
}


export const WalphCountdown = ( { drawTimestamp }: timeWalph ) => {
    const dateNow = Date.now()
    const Completionist = () => <span>progress</span>;

    const renderer = ({ days ,hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
          } else {
            // Render a countdown
            if (days > 0)
              return <span>{days}d {hours}h {minutes}m {seconds}s</span>;

            return <span>{hours}h {minutes}m {seconds}s</span>; 
          }
        };
    return (
            <Countdown 
            date={dateNow + (drawTimestamp - dateNow)} 
            renderer={renderer} 
            /> 
    )

}