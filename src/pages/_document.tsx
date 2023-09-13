import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <meta name="description" content="Try your chance to win some ALPH on a dApp running Alephium, powered by No Trust Verify" />

      <meta property="og:type" content="website" />
          <meta property="og:url" content="https://walph.io/" />
          <meta property="og:title" content="Luck-based dApp powered by No Trust Verify" />
          <meta property="og:description" content="Try your chance to win some ALPH on a decentralized application running on Alephium" />
          <meta property="og:image" content="https://walph.io/images/android-chrome-192x192.png" />
          
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://walph.io/" />
          <meta property="twitter:title" content="Luck-based dApp powered by No Trust Verify" />
          <meta property="twitter:description" content="Try your chance to win some ALPH on a decentralized application running on Alephium" />
          <meta property="twitter:image" content="https://walph.io/images/android-chrome-192x192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
