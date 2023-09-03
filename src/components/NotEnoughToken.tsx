import Link from 'next/link'


interface Token {
  tokenName: string
}

export const NotEnoughToken = ({ tokenName }: Token) => {


  return (
    <>
    You cannot access this pool.
      <br/>
      Hodling <strong>{tokenName}</strong> is necessary to buy tickets. Consider getting some on <Link href="https://ayin.app">Ayin DEX</Link>
    </>
  )
}