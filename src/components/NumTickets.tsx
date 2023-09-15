import React from 'react'
import Link from 'next/link'
import { Address } from '@alephium/web3'

interface AttendeesArray {
  attendees: Array<string>
  address: Address
  ticketPrice: number
  tokenTicker: string
}

export const NumTicket = ({ attendees, address, ticketPrice, tokenTicker }: AttendeesArray) => {
  const countNumTicket = attendees?.filter((currentElement) => currentElement == address).length ?? 0

  return (
    <>

        You bought <strong>{countNumTicket}</strong> {countNumTicket > 0 ? 'tickets': 'ticket'} <small>( {countNumTicket * ticketPrice ?? 0} {tokenTicker} )</small> in this walph pool
    </>
  )
}
