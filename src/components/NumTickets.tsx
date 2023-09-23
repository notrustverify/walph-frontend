import React from 'react'
import Link from 'next/link'
import { Address } from '@alephium/web3'

interface AttendeesArray {
  attendees: Array<string>
  address: Address
  ticketPrice: number
  tokenTicker: string
  poolSeat: number
}

export const NumTicket = ({ attendees, address, ticketPrice, tokenTicker, poolSeat }: AttendeesArray) => {
  const countNumTicket = attendees?.filter((currentElement) => currentElement == address).length ?? 0

  return (
    <>

        You have <strong>{countNumTicket}</strong> {countNumTicket > 0 ? 'tickets': 'ticket'} ( {countNumTicket * ticketPrice ?? 0} {tokenTicker} )
        <br/>
        Chance to win: <strong>{countNumTicket > 0 ? ((countNumTicket / poolSeat)*100).toFixed(2)+"%" : '-'}</strong>
    </>
  )
}
