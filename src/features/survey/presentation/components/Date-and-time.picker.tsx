import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { styled } from "@mui/material/styles";

export function RecieptDateTime() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const DateTimeTextField = styled((props: TextFieldProps) => (
    <TextField {...props} />
  ))(({ theme }) => ({
    "& input": {
      color: "white !important",
      "-webkit-text-fill-color": "white !important",
    },
    "& label": {
      color: "white !important",
    },
    "& fieldset": {
      borderColor: "white !important",
    },
    "&:hover fieldset": {
      borderColor: "white !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white !important",
    },
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Date & Time of Purchase"
        value={value}
        onChange={handleChange}
        renderInput={(props) => (
          <DateTimeTextField
            {...props}
            sx={{
              svg: { color: "white" },
              input: { color: "white" },
              label: { color: "white" },
              borderColor: "white !important",
            }}
            autoComplete="off"
          />
        )}
      />
    </LocalizationProvider>
  );
}
