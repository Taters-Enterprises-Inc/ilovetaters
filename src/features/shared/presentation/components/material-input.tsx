import { alpha, styled } from "@mui/material/styles";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { ChangeEventHandler } from "react";

export interface MaterialInputProps extends StandardTextFieldProps {
  colorTheme: "white" | "black" | "green" | "blue";
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value?: string | null;
  name: string;
  is_required?: boolean;
}

export const MaterialInput = styled(
  (props: MaterialInputProps) => <TextField {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "colorTheme",
  }
)(({ colorTheme, is_required, theme }) => ({
  "& input": {
    color: getColor(colorTheme) + " !important",
    WebkitTextFillColor: getColor(colorTheme) + " !important",
  },
  "& label": {
    color: getColor(colorTheme) + " !important",
  },
  "& fieldset": {
    borderColor: getColor(colorTheme) + " !important",
  },
  "&:hover fieldset": {
    borderColor: getColor(colorTheme) + " !important",
  },
  "&.Mui-focused fieldset": {
    borderColor: getColor(colorTheme) + " !important",
  },
  ".MuiSvgIcon-root ": {
    fill: getIconColor(colorTheme, is_required) + " !important",
  },
  "& .MuiInputBase-input": {
    color: getColor(colorTheme) + " !important",
    WebkitTextFillColor: getColor(colorTheme) + " !important",
  },
}));

const getColor = (colorTheme: string) => {
  switch (colorTheme) {
    case "white":
      return "white";
    case "black":
      return "#22201A";
    case "green":
      return "#006600";
    case "blue":
      return "#003399";
    default:
      return "";
  }
};

const getIconColor = (colorTheme: string, is_required?: boolean) => {
  return is_required === undefined
    ? getColor(colorTheme)
    : is_required
    ? "#f44336"
    : getColor(colorTheme);
};
