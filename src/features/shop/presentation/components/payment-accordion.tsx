import { Fragment, useState } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
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



function Icon({ id , open } : any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
}


export function PaymentAccordion(){
    const [open, setOpen] = useState(0);
 
    const handleOpen = (value : any) => {
      setOpen(open === value ? 0 : value);
    };
   
    return (
      <Fragment>
        
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <div className="flex space-x-4 justify-start items-center flex-1">
            <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BPI</span>
        </div>
        </AccordionSummary>
        <AccordionDetails>
          <Radio id="bpi" name="payment_method" />
          <label>BPI</label>
          <ul>
            <li className="text-lg">Account Name: Taters Enterprises, Inc.</li>
            <li className="text-lg">Account #: 0381-0160-99</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BDO</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Radio id="bdo" name="payment_method" />
          <label>BDO</label>
          <ul>
            <li className="text-lg">Account Name: Taters Enterprises, Inc.</li>
            <li className="text-lg">Account #: 0006-7804-8382</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with CASH</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
            <Radio id="cash" name="payment_method" />
            <label>CASH (additional ₱ 50.00)"</label>
        </AccordionDetails>
      </Accordion>

      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with GCASH</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Radio id="gcash" name="payment_method" />
          <label>GCASH</label>
          <img src={`${REACT_APP_UPLOADS_URL}images/shop/payments/gcash_qr.webp`} alt='Taters G-Cash QR' width={230}/>
        </AccordionDetails>
      </Accordion>


        {/* <Accordion
          open={open === 1}
          icon={<Icon id={1} open={open} />}
        >
        <AccordionHeader onClick={() => handleOpen(1)}>
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BPI</span>
          </div>
        </AccordionHeader>
          <AccordionBody>
            <Radio id="bpi" name="payment_method" label="BPI" />
            <ul>
              <li className="text-lg">Account Name: Taters Enterprises, Inc.</li>
              <li className="text-lg">Account #: 0381-0160-99</li>
            </ul>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
          icon={<Icon id={2} open={open} />}
        >
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BDO</span>
          </div>
        </AccordionHeader>
          <AccordionBody>
            <Radio id="bdo" name="payment_method" label="BDO" />
            <ul>
              <li className="text-lg">Account Name: Taters Enterprises, Inc.</li>
              <li className="text-lg">Account #: 0006-7804-8382</li>
            </ul>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 3}
          icon={<Icon id={3} open={open} />}
        >
          <AccordionHeader onClick={() => handleOpen(3)}>
            <div className="flex space-x-4 justify-start items-center flex-1">
                <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with CASH</span>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <Radio id="cash" name="payment_method" label="CASH (additional ₱ 50.00)" />
          </AccordionBody>
        </Accordion>
        
        <Accordion
          open={open === 4}
          icon={<Icon id={4} open={open} />}
        >
            <AccordionHeader onClick={() => handleOpen(4)}>
            <div className="flex space-x-4 justify-start items-center flex-1">
                <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with GCASH</span>
            </div>
            </AccordionHeader>
          <AccordionBody>
            <Radio id="gcash" name="payment_method" label="GCASH " />
            <img src={`${REACT_APP_UPLOADS_URL}images/shop/payments/gcash_qr.webp`} alt='Taters G-Cash QR' width={230}/>
          </AccordionBody>
        </Accordion> */}

      </Fragment>
    );
}