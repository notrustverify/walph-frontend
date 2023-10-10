import { Typography } from '@mui/material'
import React from 'react'

interface AttendeesArray {
  attendees: Array<string>
}

export const ParticipantsList = ({ attendees }: AttendeesArray) => {
  return (
    <div style={{
        marginTop: "-1.5em"
      }} >
    <details>
    <summary><Typography display="inline">Attendees</Typography></summary>
      {attendees?.map((ele, index) => (
        <p key={index}>{ele.toString().slice(0, 6) + '...' + ele.toString().slice(-6)}</p>
      ))}
    
</details>
</div>

  )
}
