import Radio, { RadioProps} from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { TextareaAutosize } from "@mui/material";
import { styled } from '@mui/material/styles';

import useMediaQuery from "@mui/material/useMediaQuery";

  interface BSCRadioCustomerSurveyProps {

    type: string;
  } 

  const StyledRadio = styled(Radio)<RadioProps>(({ theme }) => ({
    
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
    }      
  }));


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
              <StyledFormControlLabel
                value="Highly Satisfied"
                control={<StyledRadio size="small" />}
                label="Highly Satisfied"
              />

              <StyledFormControlLabel
                value="Satisfied"
                control={<StyledRadio size="small" />}
                label="Satisfied"                
              />

              <StyledFormControlLabel
                value="Neither Satisfied nor Dissatisfied"
                control={<StyledRadio size="small" />}
                label="Neither Satisfied nor Dissatisfied"                
              />

              <StyledFormControlLabel
                value="Dissatisfied"
                control={<StyledRadio size="small" />}
                label="Dissatisfied"                
              />

              <StyledFormControlLabel
                value="Highly Dissatisfied"
                control={<StyledRadio size="small" />}
                label="Highly Dissatisfied"                
              />
            </>
          ) : null}

            {props.type == "order" ? (
              <>
                <StyledFormControlLabel
                  value="Delivery"
                  control={<StyledRadio size="small" />}
                  label="Delivery"
                />

                <StyledFormControlLabel
                  value="Online Order: Pick-up"
                  control={<StyledRadio size="small" />}
                  label="Online Order: Pick-up"                  
                />

                <StyledFormControlLabel
                  value="Walk-In"
                  control={<StyledRadio size="small" />}
                  label="Walk-In"                  
                />
              </>
            ) : null }

            {props.type == "close" ? (
              <>
                <StyledFormControlLabel
                  value="Yes"
                  control={<StyledRadio size="small" />}
                  label="Yes"                  
                />

                <StyledFormControlLabel
                  value="No"
                  control={<StyledRadio size="small" />}
                  label="No"                  
                />
              </>
            ) : null }

            {props.type == "gender" ? (
              <>
                <StyledFormControlLabel
                  value="Male"
                  control={<StyledRadio size="small" />}
                  label="Male"                  
                />

                <StyledFormControlLabel
                  value="Female"
                  control={<StyledRadio size="small" />}
                  label="Female"                  
                />

                <StyledFormControlLabel
                  value="Non-Binary"
                  control={<StyledRadio size="small" />}
                  label="Non-Binary / Third Gender"                  
                />

                <StyledFormControlLabel
                  value="Prefer to self-describe"
                  control={<StyledRadio size="small" />}
                  label="Prefer to self-describe"                  
                />

                <StyledFormControlLabel
                  value="Prefer not to answer"
                  control={<StyledRadio size="small" />}
                  label="Prefer not to answer"                  
                />
              </>
            ) : null }

            {props.type == "age" ? (
              <>
                <StyledFormControlLabel
                  value="Under 18"
                  control={<StyledRadio size="small" />}
                  label="Under 18"                  
                />

                <StyledFormControlLabel
                  value="18 to 24"
                  control={<StyledRadio size="small" />}
                  label="18 to 24"                  
                />

                <StyledFormControlLabel
                  value="25 to 34"
                  control={<StyledRadio size="small" />}
                  label="25 to 34"                  
                />

                <StyledFormControlLabel
                  value="35 to 44"
                  control={<StyledRadio size="small" />}
                  label="35 to 44"                  
                />

                <StyledFormControlLabel
                  value="45 to 49"
                  control={<StyledRadio size="small" />}
                  label="45 to 49"                  
                />

                <StyledFormControlLabel
                  value="50 to 64"
                  control={<StyledRadio size="small" />}
                  label="50 to 64"                  
                />

                <StyledFormControlLabel
                  value="65 or above"
                  control={<StyledRadio size="small" />}
                  label="65 or above"                  
                />
              </>
            ) : null }

            {props.type == "background" ? (
              <>
                <StyledFormControlLabel
                  value="Asian"
                  control={<StyledRadio size="small" />}
                  label="Asian"                  
                />

                <StyledFormControlLabel
                  value="Native Hawaiian or other Native Islander"
                  control={<StyledRadio size="small" />}
                  label="Native Hawaiian or other Native Islander"                  
                />

                <StyledFormControlLabel
                  value="White or Caucasian"
                  control={<StyledRadio size="small" />}
                  label="White or Caucasian"                  
                />

                <StyledFormControlLabel
                  value="American Indian or Alaska Native"
                  control={<StyledRadio size="small" />}
                  label="American Indian or Alaska Native"                  
                />

                <StyledFormControlLabel
                  value="Hispanic or Latino"
                  control={<StyledRadio size="small" />}
                  label="Hispanic or Latino"                  
                />

                <StyledFormControlLabel
                  value="Black or African American"
                  control={<StyledRadio size="small" />}
                  label="Black or African American"                  
                />

                <StyledFormControlLabel
                  value="Other"
                  control={<StyledRadio size="small" />}
                  label="Other"                  
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
