import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import {
  CalendarPickerView,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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

export interface MaterialDateInputProps {
  value: string | null;
  label: string;
  colorTheme: "white" | "black";
  openTo?: CalendarPickerView;
  required?: boolean;
  views?: readonly CalendarPickerView[];
  shouldDisableYear?: (year: Date) => boolean;
  onChange: (value: Date | null, keyboardInputValue?: string) => void;
  size?: string;
}

export function MaterialDateInput(props: MaterialDateInputProps) {
  const [openBirthDateCalendar, setOpenBirthDateCalendar] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} className="flex-1">
      <DesktopDatePicker
        label={props.label}
        openTo={props.openTo}
        views={props.views}
        value={props.value}
        shouldDisableYear={props.shouldDisableYear}
        onChange={props.onChange}
        open={openBirthDateCalendar}
        onOpen={() => setOpenBirthDateCalendar(true)}
        onClose={() => setOpenBirthDateCalendar(false)}
        renderInput={(params) => (
          <MaterialInput
            colorTheme={props.colorTheme}
            size={props.size}
            onClick={() => {
              setOpenBirthDateCalendar(true);
            }}
            required={props.required}
            fullWidth
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}
