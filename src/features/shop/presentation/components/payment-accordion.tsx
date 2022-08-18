import { useState } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled  from '@mui/material/styles/styled';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#a21013',
  borderBottom: '1px solid white',
  padding: 0,
  color: 'white',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#a21013',
  color: 'white',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function PaymentAccordion(){
   
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="payment_method"
        >
          
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <div className="flex space-x-4 justify-start items-center flex-1">
                <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BPI</span>
            </div>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel  value="bpi" control={<Radio  color='tertiary' required/>} label="BPI" />
              <ul>
                <li className="text-lg">Account Name: Taters Enterprises, Inc.</li>
                <li className="text-lg">Account #: 0381-0160-99</li>
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white"  />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div className="flex space-x-4 justify-start items-center flex-1">
                  <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BDO</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel  value="bdo" control={<Radio color='tertiary' required/>} label="BDO"/>
              <ul>
                <li className="text-lg">Account Name: Taters Enterprises, Inc.</li>
                <li className="text-lg">Account #: 0006-7804-8382</li>
              </ul>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div className="flex space-x-4 justify-start items-center flex-1">
                  <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with CASH</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel  value="cash" control={<Radio  color='tertiary'/>} label="Cash CASH (additional ₱ 50.00)"  />
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div className="flex space-x-4 justify-start items-center flex-1">
                  <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with GCASH</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel  value="gcash" control={<Radio  color='tertiary' required/>} label="GCash" />
              <img src={`${REACT_APP_UPLOADS_URL}images/shop/payments/gcash_qr.webp`} alt='Taters G-Cash QR' width={230}/>
            </AccordionDetails>
          </Accordion>

          
        </RadioGroup>
      </FormControl>
    );
}