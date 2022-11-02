import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { ChangeEventHandler } from "react";

export interface MaterialInputProps extends StandardTextFieldProps {
  colorTheme: "white" | "black";
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value: string | null;
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
    ".MuiSvgIcon-root ": {
      fill: "white !important",
    },
    "& .MuiInputBase-input": {
      color: "white !important",
      "-webkit-text-fill-color": "white !important",
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
    ".MuiSvgIcon-root ": {
      fill: "#22201A !important",
    },
    "& .MuiInputBase-input": {
      color: "#22201A !important",
      "-webkit-text-fill-color": "#22201A !important",
    },
  }),
}));
