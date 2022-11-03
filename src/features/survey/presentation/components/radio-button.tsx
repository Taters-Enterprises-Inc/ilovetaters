import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export function RatingRadioButton() {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Niether Satisfied nor Disatisfied"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="Highly Satisfied"
          control={<Radio size="small" />}
          label="Highly Satisfied"
        />
        <FormControlLabel
          value="Satisfied"
          control={<Radio size="small" />}
          label="Satisfied"
        />
        <FormControlLabel
          value="Niether Satisfied nor Dissatisfied"
          control={<Radio size="small" />}
          label="Niether Satisfied nor Dissatisfied"
        />
        <FormControlLabel
          value="Dissatisfied"
          control={<Radio size="small" />}
          label="Dissatisfied"
        />
        <FormControlLabel
          value="Highly Dissatisfied"
          control={<Radio size="small" />}
          label="Highly Dissatisfied"
        />
      </RadioGroup>
    </FormControl>
  );
}
