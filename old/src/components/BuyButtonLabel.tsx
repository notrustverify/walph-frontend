import React from 'react'

interface buyButtonLabel {
  slotFree: number
  count: number
}

export const BuyButtonLabel = ({ slotFree, count }: buyButtonLabel) => {
  
    if(slotFree <= 0) return <>Walph full</>
  
  return <>Buy {count} tickets</>
}
