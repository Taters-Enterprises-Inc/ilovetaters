import React from 'react'
import { Button } from '@mui/material'
import {AiOutlineFilePpt} from 'react-icons/ai'
import { REACT_APP_DOMAIN_URL } from 'features/shared/constants';
export const ExtractButton = () => {


  return (
    <Button 
    href={`${REACT_APP_DOMAIN_URL}api/admin/export_csv`}
    variant="contained" color='success' size='small'>
      <span className='mr-2'><AiOutlineFilePpt/></span>
        <span className='capitalize'> Extract Data</span>
    </Button>
   
  )
}
