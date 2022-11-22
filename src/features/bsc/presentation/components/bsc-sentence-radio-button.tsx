import { RadioGroup, Radio, RadioProps } from '@mui/material';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';

import { styled } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

  const StyledRadio = styled(Radio)<RadioProps>(({ theme }) => ({
    
    '& .MuiSvgIcon-root': {

      fontSize: "14px",
      lineHeight: "20px",
    },

    '@media (max-width: 768px)' : {

      '& .MuiSvgIcon-root': {
            
        fontSize: "12px",
        lineHeight: "16px",      
      },
    },

    '&.Mui-checked': { 

      color: "#ffcd17", 
    },
  }));

  const StyledFormControlLabel = styled(FormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    
    '& .MuiFormControlLabel-label': {
        
      fontSize: "14px",
      lineHeight: "20px",
      
    },

    '@media (max-width: 768px)' : {

      '& .MuiFormControlLabel-label': {
            
        fontSize: "12px",
        lineHeight: "16px",      
      },
    },
    
    '&.MuiFormControlLabel-root': { 
                
      marginLeft: 'auto', 
      marginRight: 'auto',
      alignItems: "flex-start",
    }
  }));

export function BSCSentenceRadioButton() {

  const screenSize = useMediaQuery('(max-width:768px)');
  const near320 = useMediaQuery('(max-width:400px)');

  return (
    <div className="py-2">
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="3"
        name="rating"
        className="mx-auto md:w-[90%] sm:w-[95%] flex justify-evenly items-center md:h-[350px] h-[400px]"
        style={{ height: near320 ? "450px" : "400px"}}
      >
        <StyledFormControlLabel value="1" label="It is a long established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
          labelPlacement="end" 
          control={<StyledRadio />} 
        />
        
        <StyledFormControlLabel value="2" label="It is a somewhat long established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
          labelPlacement="end" 
          control={<StyledRadio />} 
        />
        
        <StyledFormControlLabel value="3" label="It is a neutrally established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
          labelPlacement="end" 
          control={<StyledRadio />} 
        />
        
        <StyledFormControlLabel value="4" label="It is a somewhat short established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
          labelPlacement="end" 
          control={<StyledRadio />} 
        />
        
        <StyledFormControlLabel value="5" label="It is a short established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
          labelPlacement="end" 
          control={<StyledRadio />} 
        />
      </RadioGroup>
    </div>
  );
}