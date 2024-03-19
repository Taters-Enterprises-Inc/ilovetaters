import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

const MaterialInput = styled((props: any) => <TextField {...props} />, {
  shouldForwardProp: (prop) => prop !== "colorTheme",
})(({ colorTheme, theme }) => ({
  ...(colorTheme === "white" && {
    "& input": {
      color: "white !important",
      WebkitTextFillColor: "white !important",
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
  }),

  ...(colorTheme === "black" && {
    "& input": {
      color: "#22201A !important",
      WebkitTextFillColor: "#22201A !important",
    },
    "& label": {
      color: "#22201A !important",
    },
    "& fieldset": {
      borderColor: "#22201A !important",
    },
    "&:hover fieldset": {
      borderColor: "#22201A !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22201A !important",
    },
  }),
}));

interface MaterialDateTimeInputProps {
  colorTheme: "black" | "white";
  label?: React.ReactNode;
  shouldDisableDate?: ((day: Date) => boolean) | undefined;
  defaultCalendarMonth?: Date | undefined;
  value: any;
  fullWidth?: boolean;
  required?: boolean;
  openCalendar: boolean;
  setOpenCalendar: (newValue: boolean) => void;
  onChange: (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
}

export function MaterialDateTimeInput(props: MaterialDateTimeInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={props.label}
        shouldDisableDate={props.shouldDisableDate}
        open={props.openCalendar}
        defaultCalendarMonth={props.defaultCalendarMonth}
        onOpen={() => props.setOpenCalendar(true)}
        onClose={() => props.setOpenCalendar(false)}
        value={props.value}
        onChange={props.onChange}
        renderInput={(params) => (
          <MaterialInput
            colorTheme={props.colorTheme}
            {...params}
            fullWidth={props.fullWidth}
            sx={{
              svg: { color: "white" },
              input: { color: "white" },
              label: { color: "white" },
              borderColor: "white !important",
            }}
            required={props.required}
            autoComplete="off"
            onClick={() => {
              props.setOpenCalendar(true);
            }}
            className="w-full lg:w-fit hide"
          />
        )}
      />
    </LocalizationProvider>
  );
}
