import { alpha, styled } from "@mui/material/styles";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { ChangeEventHandler } from "react";

export interface MaterialInputProps extends StandardTextFieldProps {
  colorTheme: "white" | "black" | "green" | "blue";
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value?: string | null;
  name: string;
}

export const MaterialInput = styled(
  (props: MaterialInputProps) => <TextField {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "colorTheme",
  }
)(({ colorTheme, theme }) => ({
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
    ".MuiSvgIcon-root ": {
      fill: "white !important",
    },
    "& .MuiInputBase-input": {
      color: "white !important",
      WebkitTextFillColor: "white !important",
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
    ".MuiSvgIcon-root ": {
      fill: "#22201A !important",
    },
    "& .MuiInputBase-input": {
      color: "#22201A !important",
      WebkitTextFillColor: "#22201A !important",
    },
  }),

  ...(colorTheme === "green" && {
    "& input": {
      color: "#006600 !important",
      WebkitTextFillColor: "#006600 !important",
    },
    "& label": {
      color: "#006600 !important",
    },
    "& fieldset": {
      borderColor: "#006600 !important",
    },
    "&:hover fieldset": {
      borderColor: "#006600 !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#006600 !important",
    },
    ".MuiSvgIcon-root ": {
      fill: "#006600 !important",
    },
    "& .MuiInputBase-input": {
      color: "#006600 !important",
      WebkitTextFillColor: "#006600 !important",
    },
  }),

  ...(colorTheme === "blue" && {
    "& input": {
      color: "#003399 !important",
      WebkitTextFillColor: "#003399 !important",
    },
    "& label": {
      color: "#003399 !important",
    },
    "& fieldset": {
      borderColor: "#003399 !important",
    },
    "&:hover fieldset": {
      borderColor: "#003399 !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#003399 !important",
    },
    ".MuiSvgIcon-root ": {
      fill: "#003399 !important",
    },
    "& .MuiInputBase-input": {
      color: "#003399 !important",
      WebkitTextFillColor: "#003399 !important",
    },
  }),
}));
