import { RadioGroup, Radio, RadioProps } from '@mui/material';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';
import { styled } from '@mui/material/styles';

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
      
      fontSize: 12,
    }, 
    
    '&.MuiFormControlLabel-root': { 
      
      marginLeft: 'auto', 
      marginRight: 'auto',
    },      
  }));

export function BSCRatingRadioButton() {
  return (
    <div className="py-2">
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="3"
        name="rating"
        row
        className="mx-auto md:w-[85%] sm:w-[90%] sm:flex sm:justify-evenly sm:items-center"
      >
        <StyledFormControlLabel value="1" label="1" labelPlacement="bottom" control={<StyledRadio />} />
        <StyledFormControlLabel value="2" label="2" labelPlacement="bottom" control={<StyledRadio />} />
        <StyledFormControlLabel value="3" label="3" labelPlacement="bottom" control={<StyledRadio />} />
        <StyledFormControlLabel value="4" label="4" labelPlacement="bottom" control={<StyledRadio />} />
        <StyledFormControlLabel value="5" label="5" labelPlacement="bottom" control={<StyledRadio />} />      
      </RadioGroup>
    </div>
  );
}