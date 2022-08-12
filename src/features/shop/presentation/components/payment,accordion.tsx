import { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Radio,
} from "@material-tailwind/react";  
import { AiFillCreditCard } from "react-icons/ai";


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
          onClick={() => handleOpen(1)}
        >
        <AccordionHeader>
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BPI</span>
          </div>
        </AccordionHeader>
          <AccordionBody>
            <Radio id="bpi" color="orange" name="payment_method" label="BPI" />
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
          icon={<Icon id={2} open={open} />}
          onClick={() => handleOpen(2)}
        >
        <AccordionHeader>
          <div className="flex space-x-4 justify-start items-center flex-1">
              <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with BDO</span>
          </div>
        </AccordionHeader>
          <AccordionBody>
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're constantly
            trying to express ourselves and actualize our dreams.
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 3}
          icon={<Icon id={3} open={open} />}
          onClick={() => handleOpen(3)}
        >
          <AccordionHeader>
            <div className="flex space-x-4 justify-start items-center flex-1">
                <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with CASH</span>
            </div>
          </AccordionHeader>
          <AccordionBody>
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're constantly
            trying to express ourselves and actualize our dreams.
          </AccordionBody>
        </Accordion>
        
        <Accordion
          open={open === 4}
          icon={<Icon id={4} open={open} />}
          onClick={() => handleOpen(4)}
        >
            <AccordionHeader>
            <div className="flex space-x-4 justify-start items-center flex-1">
                <AiFillCreditCard className='text-tertiary text-2xl'/> <span>Pay with GCASH</span>
            </div>
            </AccordionHeader>
          <AccordionBody>
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're constantly
            trying to express ourselves and actualize our dreams.
          </AccordionBody>
        </Accordion>

      </Fragment>
    );
}