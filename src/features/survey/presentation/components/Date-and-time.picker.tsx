import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


import { styled } from "@mui/material/styles";

export function RecieptDateTime() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const DateTimeTextField = styled((props: TextFieldProps) => (
    <TextField {...props} />
  ))(({ theme }) => ({
    "& input": {
      color: "black !important",
      "-webkit-text-fill-color": "black !important",
    },
    "& label": {
      color: "black !important",
    },
    "& fieldset": {
      borderColor: "black !important",
    },
    "&:hover fieldset": {
      borderColor: "black !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black !important",
    },
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Date & Time of Purchase"
        value={value}
        onChange={handleChange}
        renderInput={(props) => (
          <DateTimeTextField
            {...props}
            sx={{
              svg: { color: "black" },
              input: { color: "black" },
              label: { color: "black" },
              borderColor: "black !important",
            }}
            autoComplete="off"
          />
        )}
      />
    </LocalizationProvider>
  );
}
