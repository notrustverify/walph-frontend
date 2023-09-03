import Link from "next/link"
import React  from 'react';

export const Description = () => {


  return (
    <>
     <div className="container">
            <h2>What is Walph Lottery?</h2>
            <p>
              Walph Lottery is a one-of-a-kind online gaming experience that combines the thrill of traditional
              lotteries with the irresistible charm of Walph. It's the ultimate fusion of luck and indulgence,
              designed to captivate players of all backgrounds and preferences.
            </p>

            <h2>How Does it Work?</h2>
            <p>
              Entering the world of Walph Lottery with <Link href="https://alephium.org" prefetch={false}>Alephium</Link> is as easy as
              ordering your favorite breakfast treat. Here's a quick overview of how the magic unfolds:
            </p>
            <ul>
              <li>
                <strong>Connect your Alephium wallet</strong>: just by clicking on the button "Connect Alephium",
                download it here for{' '}
                <Link href="https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj" prefetch={false}>
                  Chrome
                </Link>{' '}
                or <Link href="https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/" prefetch={false}>Firefox</Link>{' '}
              </li>
              <li>
                <strong>Buy a certain number of Walph ticket</strong>: 1 ticket in 1 ALPH{' '}
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
                <strong>Fun and Whimsy:</strong> We believe that gaming should be a delightful experience, and what's
                more delightful than Walphs? Our game adds a touch of whimsy to your gaming adventures.
              </li>
              <li>
                <strong>Easy to Play:</strong> Whether you're a seasoned gambler or new to the world of lotteries,
                Walph Lottery's straightforward gameplay makes it accessible to all.
              </li>
              <li>
                <strong>Community and Engagement:</strong> Join a vibrant community of players who share your passion
                for Walphs and the thrill of winning. Our chat rooms and forums are buzzing with excitement around the
                clock.
              </li>
            </ul>

            <p>
              <strong>Join the Walph Lottery Community Today!</strong>
            </p>
            <p>
              Are you ready to add a dash of sweetness to your gaming routine? Dive into the world of Walph Lottery
              and discover the perfect blend of entertainment, anticipation, and delicious reward. Don't miss out on
              your chance to win big while savoring the excitement of every draw. Start playing now, and let the Walph
              magic begin!
            </p>
          </div>
    </>
  )
}