import styled from "@emotion/styled";
import { RadioGroup, Radio } from '@mui/material';
import { FormControlLabel } from '@mui/material';

import useMediaQuery from "@mui/material/useMediaQuery";

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
        <FormControlLabel value="1" label="It is a long established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
            labelPlacement="end" 
            sx={{ 
              '& .MuiFormControlLabel-label': {
                
                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize ? "16px" : "20px",
              }, 
              
              '&.MuiFormControlLabel-root': { 
                
                marginLeft: 'auto', 
                marginRight: 'auto',
                alignItems: "flex-start",
              } 
            }}
            control={<Radio sx={{
              
              '& .MuiSvgIcon-root': {

                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize ? "16px" : "20px",
              },
              
              '&.Mui-checked': {

                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="2" label="It is a somewhat long established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
            labelPlacement="end" 
            sx={{ 
              '& .MuiFormControlLabel-label': {
                
                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize? "16px" : "20px",
              }, 
              
              '&.MuiFormControlLabel-root': { 
                
                marginLeft: 'auto', 
                marginRight: 'auto',
                alignItems: "flex-start",
              } 
            }}
            control={<Radio sx={{
              
              '& .MuiSvgIcon-root': {

                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize ? "16px" : "20px",
              },
              
              '&.Mui-checked': {

                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="3" label="It is a neutrally established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
            labelPlacement="end" 
            sx={{ 
              '& .MuiFormControlLabel-label': {
                
                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize? "16px" : "20px",
              }, 
              
              '&.MuiFormControlLabel-root': { 
                
                marginLeft: 'auto', 
                marginRight: 'auto',
                alignItems: "flex-start",
              } 
            }}
            control={<Radio sx={{
              
              '& .MuiSvgIcon-root': {

                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize ? "16px" : "20px",
              },
              
              '&.Mui-checked': {

                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="4" label="It is a somewhat short established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
            labelPlacement="end" 
            sx={{ 
              '& .MuiFormControlLabel-label': {
                
                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize? "16px" : "20px",
              }, 
              
              '&.MuiFormControlLabel-root': { 
                
                marginLeft: 'auto', 
                marginRight: 'auto',
                alignItems: "flex-start",
              } 
            }}
            control={<Radio sx={{
              
              '& .MuiSvgIcon-root': {

                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize ? "16px" : "20px",
              },
              
              '&.Mui-checked': {

                color: "#ffcd17",
              },
            }} 
          />} 
        />
        <FormControlLabel value="5" label="It is a short established fact that a reader will be distracted by the 
        readable content of a page when looking at its layout." 
            labelPlacement="end" 
            sx={{ 
              '& .MuiFormControlLabel-label': {
                
                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize? "16px" : "20px",
              }, 
              
              '&.MuiFormControlLabel-root': { 
                
                marginLeft: 'auto', 
                marginRight: 'auto',
                alignItems: "flex-start",
              } 
            }}
            control={<Radio sx={{
              
              '& .MuiSvgIcon-root': {

                fontSize: screenSize ? "12px" : "14px",
                lineHeight: screenSize ? "16px" : "20px",
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