import { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Radio,
} from "@material-tailwind/react";  
import { AiFillCreditCard } from "react-icons/ai";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";


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
        <Accordion
          open={open === 1}
          icon={<Icon id={1} open={open} />}
        >
        <AccordionHeader onClick={() => handleOpen(1)}>
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BPI</span>
          </div>
        </AccordionHeader>
          <AccordionBody>
            <Radio id="bpi" color="orange" name="payment_method" label="BPI" />
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
            <Radio id="bdo" color="orange" name="payment_method" label="BDO" />
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
            <Radio id="cash" color="orange" name="payment_method" label="CASH (additional ₱ 50.00)" />
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
            <Radio id="gcash" color="orange" name="payment_method" label="GCASH " />
            <img src={`${REACT_APP_UPLOADS_URL}images/shop/payments/gcash_qr.webp`} alt='Taters G-Cash QR' width={230}/>
          </AccordionBody>
        </Accordion>

      </Fragment>
    );
}