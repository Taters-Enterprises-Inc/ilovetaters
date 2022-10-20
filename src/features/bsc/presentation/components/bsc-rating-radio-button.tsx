import styled from "@emotion/styled";
import { RadioGroup, Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';

export function BSCRatingRadioButton() {
  return (
    <div className="py-2">
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="3"
        name="rating"
        row
        className="mx-auto w-[350px]"
      >
        <FormControlLabel value="1" label="1" labelPlacement="bottom" sx={{ '.MuiFormControlLabel-label': {fontSize: 14,} }}
            control={<Radio sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 20,
              },
              '&.Mui-checked': {
                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="2" label="2" labelPlacement="bottom"  sx={{ '.MuiFormControlLabel-label': {fontSize: 14,} }}
            control={<Radio sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 20,
              },
              '&.Mui-checked': {
                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="3" label="3" labelPlacement="bottom" sx={{ '.MuiFormControlLabel-label': {fontSize: 14,} }} 
            control={<Radio sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 20,
              },
              '&.Mui-checked': {
                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="4" label="4" labelPlacement="bottom" sx={{ '.MuiFormControlLabel-label': {fontSize: 14,} }}
            control={<Radio sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 20,
              },
              '&.Mui-checked': {
                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="5" label="5" labelPlacement="bottom" sx={{ '.MuiFormControlLabel-label': {fontSize: 14,} }}
            control={<Radio sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 20,
              },
              '&.Mui-checked': {
                color: "#ffcd17",
              },
            }} 
          />} 
        />
      </RadioGroup>
    </div>
  );
}