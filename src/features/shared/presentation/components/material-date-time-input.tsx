import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";

const MaterialInput = styled((props: any) => <TextField {...props} />, {
  shouldForwardProp: (prop) => prop !== "colorTheme",
})(({ colorTheme, theme }) => ({
  ...(colorTheme === "white" && {
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
  }),

  ...(colorTheme === "black" && {
    "& input": {
      color: "#22201A !important",
      "-webkit-text-fill-color": "#22201A !important",
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
      <div className="space-y-4 lg:space-y-0 lg:space-x-4">
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
              sx={{
                svg: { color: "white" },
                input: { color: "white" },
                label: { color: "white" },
                borderColor: "white !important",
              }}
              autoComplete="off"
              onClick={() => {
                props.setOpenCalendar(true);
              }}
              className="w-full lg:w-fit"
            />
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
