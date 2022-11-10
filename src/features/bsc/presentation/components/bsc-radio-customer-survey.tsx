import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextareaAutosize } from "@mui/material";


import useMediaQuery from "@mui/material/useMediaQuery";

interface BSCRadioCustomerSurveyProps {

  type: string;
} 

export function BSCRadioCustomerSurvey(props: BSCRadioCustomerSurveyProps ) {

  const screenSize = useMediaQuery('(max-width:768px)');
  const near320 = useMediaQuery('(max-width:400px)');

    return (
      <FormControl sx={{ 

          '&.MuiFormControl-root': { 
            
            left: near320 ? "1vw" : props.type == "comment" ? "4.5vw" : "14vw", 
          },
        }} 
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Neither Satisfied nor Dissatisfied"
          name="radio-buttons-group"
          className={`mt-[6%] ${ near320 ? "w-[120%]" : "w-auto"}`}
        >
          {props.type == "satisfaction" ? (
            <>
              <FormControlLabel
                value="Highly Satisfied"
                control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                label="Highly Satisfied"
                sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                }}
              />
              <FormControlLabel
                value="Satisfied"
                control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}} />}
                label="Satisfied"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    
                    fontSize: screenSize ? "12px" : "14px",
                    lineHeight: screenSize ? "16px" : "20px",
                  },
                }}
              />
              <FormControlLabel
                value="Neither Satisfied nor Dissatisfied"
                control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}} />}
                label="Neither Satisfied nor Dissatisfied"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    
                    fontSize: screenSize ? "12px" : "14px",
                    lineHeight: screenSize ? "16px" : "20px",
                  },
                }}
              />
              <FormControlLabel
                value="Dissatisfied"
                control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                label="Dissatisfied"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    
                    fontSize: screenSize ? "12px" : "14px",
                    lineHeight: screenSize ? "16px" : "20px",
                  },
                }}
              />
              <FormControlLabel
                value="Highly Dissatisfied"
                control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                label="Highly Dissatisfied"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    
                    fontSize: screenSize ? "12px" : "14px",
                    lineHeight: screenSize ? "16px" : "20px",
                  },
                }}
              />
              </>
            ) : null}

            {props.type == "order" ? (
              <>
                <FormControlLabel
                  value="Delivery"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Delivery"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Online Order: Pick-up"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Online Order: Pick-up"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Walk-In"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Walk-In"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
              </>
            ) : null }

            {props.type == "close" ? (
              <>
                <FormControlLabel
                  value="Yes"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Yes"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="No"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="No"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
              </>
            ) : null }

            {props.type == "gender" ? (
              <>
                <FormControlLabel
                  value="Male"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Male"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Female"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Non-Binary"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Non-Binary / Third Gender"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Prefer to self-describe"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Prefer to self-describe"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Prefer not to answer"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Prefer not to answer"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
              </>
            ) : null }

            {props.type == "age" ? (
              <>
                <FormControlLabel
                  value="Under 18"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Under 18"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="18 to 24"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="18 to 24"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="25 to 34"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="25 to 34"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="35 to 44"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="35 to 44"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="45 to 49"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="45 to 49"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="50 to 64"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="50 to 64"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="65 or above"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="65 or above"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
              </>
            ) : null }

            {props.type == "background" ? (
              <>
                <FormControlLabel
                  value="Asian"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Asian"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Native Hawaiian or other Native Islander "
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Native Hawaiian or other Native Islander "
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="White or Caucasian"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="White or Caucasian"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="American Indian or Alaska Native"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="American Indian or Alaska Native"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Hispanic or Latino"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Hispanic or Latino"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Black or African American"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Black or African American"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio size="small" sx={{ '&.Mui-checked': { color: "#ffcd17", },}}/>}
                  label="Other"
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      
                      fontSize: screenSize ? "12px" : "14px",
                      lineHeight: screenSize ? "16px" : "20px",
                    },
                  }}
                />
              </>
            ) : null }

            {props.type == "comment" ? (

              <TextareaAutosize 
                minRows={5}
                placeholder="Type your comment here."
                style={{ 
                  width: screenSize ? "60vw": "45vw", backgroundColor: "#F8F8F8", 
                  border: "2px solid black", padding: "10px", borderRadius: "5px"}} 
              />
            ) : null }
        </RadioGroup>
      </FormControl>
  );
}
