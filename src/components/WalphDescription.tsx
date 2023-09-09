import Link from "next/link"
import React  from 'react';

export const Description = () => {


  return (
    <>
     <div className="container">
            <h2>What is Walph Lottery?</h2>
            <p>
             Walph Lottery is a one-of-a-kind online gaming experience that combines the excitement of traditional lotteries with cutting-edge blockchain technology, guaranteeing transparent, secure and fair draws.
             <br/>
              All in a fun, easy-to-use dApp to make it as accessible as possible.
            </p>

            <h2>How Does it Work?</h2>
            <p>
              Entering the world of Walph Lottery with <Link href="https://alephium.org" prefetch={false} rel="noopener noreferrer" target="_blank">Alephium</Link> is as easy as
              ordering your favorite breakfast treat.
              <br/>
              Here's a quick overview of how the magic unfolds:
            </p>
            <ul>
              <li>
                <strong>Connect your Alephium wallet</strong>: just by clicking on the button "Connect Alephium",
                download it here for{' '}
                <Link href="https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj" prefetch={false} rel="noopener noreferrer" target="_blank">
                  Chrome
                </Link>{' '}
                or <Link href="https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/" prefetch={false} rel="noopener noreferrer" target="_blank">Firefox</Link>{' '}
              </li>
              <li>
                <strong>Buy Walph tickets</strong>
              </li>
              <li>
                <strong>Wait for the pool to be full</strong>: means that all the tickets have been bought
              </li>
              <li>
                <strong>Win Delicious ALPH:</strong> Once the Walph is drawn, if your chosen address is selected,
                you'll be showered with mouthwatering ALPH by getting a notification.
              </li>
            </ul>

            <h2>Why Choose Walph Lottery?</h2>
            <ul>
              <li>
                <strong>Fun and Whimsy:</strong>  We believe that gaming should be an enjoyable experience, and what could be more enjoyable than a good waffle?
                <br/>
                Our game adds a touch of fantasy to your gaming adventures.
              </li>
              <li>
                <strong>Easy to Play:</strong> Whether you're a seasoned gambler or new to the world of lotteries,
                Walph Lottery's straightforward gameplay makes it accessible to all.
              </li>
            </ul>

            <p>
              <strong>Join the Walph Today!</strong>
            </p>
            <p>
              Are you ready to add a dash of sweetness to your gaming routine?
              <br/>
              Dive into the world of Walph and discover the perfect blend of entertainment, anticipation, and delicious reward.
              <br/>
              Don't miss out on your chance to win big while savoring the excitement of every draw. Start playing now, and let the Walph magic begin!
            </p>
          </div>
    </>
  )
}
