import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

export default function PoolSelector() {

  return (
    <div>
      <Button
        variant='contained'
        style={{ 
            display: 'inline-block', 
            marginLeft: '1em',
            backgroundColor: "#ffffff", 
            borderRadius: "10px",
            fontSize:16,
            color: "color(display-p3 0.2549019607843137 0.26666666666666666 0.3176470588235294)"
          }}
        onClick={() => {window.location.href ='/'}}
      >
        Home
      </Button>
    </div>
  );
}