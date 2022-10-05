import React from 'react'
import { Button } from '@mui/material'
import {AiOutlineFilePpt} from 'react-icons/ai'

export const ExtractButton = () => {
  return (
    <Button variant="contained" color='success'>
      <span className='mr-2'><AiOutlineFilePpt/></span>
        <span className='capitalize'> Extract Data</span>
    </Button>
   
  )
}
