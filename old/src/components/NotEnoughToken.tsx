import React  from 'react';
import Link from 'next/link'


interface Token {
  tokenName: string
}

export const NotEnoughToken = ({ tokenName }: Token) => {


  return (
    <>
    <h3>
    You cannot access this pool.
      <br/>
      Hodling <strong>{tokenName}</strong> is necessary to buy tickets. Consider getting some on <Link href="https://ayin.app" rel="noopener noreferrer" target="_blank">Ayin DEX</Link>
      </h3>
    </>
  )
}
