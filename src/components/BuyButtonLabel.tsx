import { WalphButton } from '@/services/walphTheme'
import React from 'react'
import Countdown from 'react-countdown'

interface buyButtonLabel {
  slotFree: number
  count: number
}

export const BuyButtonLabel = ({ slotFree, count }: buyButtonLabel) => {
  
    if(slotFree <= 0) return 'Walph full'
    if (slotFree - count < 1) return 'Buy ' + count + ' ' + 'tickets'

  
  return 'Buy ' + count + ' ' + 'tickets'
}
