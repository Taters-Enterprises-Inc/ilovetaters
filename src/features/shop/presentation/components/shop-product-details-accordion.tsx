import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AiFillInfoCircle } from 'react-icons/ai';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ShopProductDetailsAccordionProps{
    title: {
        prefixIcon : JSX.Element,
        name: string;
    };
    description: string;
}

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} square={false} {...props} />
  ))(({ theme }) => ({
      backgroundColor: 'transparent',
      border: '2px white solid',
      borderRadius: '0.75rem !important',
      color:'white',
  }));
  
const AccordionSummary = styled((props: AccordionSummaryProps) => (
<MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem', color: 'white' }} />}
    {...props}
/>
))(({ theme }) => ({
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
}));
  
export function ShopProductDetailsAccordion(props: ShopProductDetailsAccordionProps){
    const [open, setOpen] = React.useState(true);
    return(
        <Accordion expanded={open} onChange={()=>{
            setOpen(!open);
        }}>
          <AccordionSummary sx={{borderBottom : open ? '1px white solid'  : ''}}>
            <div className="flex space-x-2 items-center">
                {props.title.prefixIcon} <h3 className="font-['Bebas_Neue'] text-lg tracking-[3px] font-light mt-1 flex-1">{props.title.name}</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="p-2 text-sm">
                <div dangerouslySetInnerHTML={{__html:props.description}} />
            </div>
          </AccordionDetails>
        </Accordion>
    )
}