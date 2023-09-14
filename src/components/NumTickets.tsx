import React from 'react'
import Link from 'next/link'
import { Address } from '@alephium/web3'

interface AttendeesArray {
  attendees: Array<string>
  address: Address
}

export const NumTicket = ({ attendees, address }: AttendeesArray) => {
  const countNumTicket = attendees?.filter((currentElement) => currentElement == address).length

  return (
    <>

        You bought <strong>{countNumTicket ?? 0}</strong> {countNumTicket > 0 ? 'tickets': 'ticket'} in this walph pool
    </>
  )
}
