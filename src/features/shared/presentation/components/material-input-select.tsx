import Select, { SelectProps } from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";

interface InputProps extends SelectProps {
  colorTheme: "white" | "black";
}

export const MaterialInputSelect = styled(
  (props: InputProps) => <Select {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "colorTheme",
  }
)(({ colorTheme, theme }) => ({
  ...(colorTheme === "white" && {
    "& iconOutlined": {
      color: "white",
    },
  }),

  ...(colorTheme === "black" && {
    "& iconOutlined": {
      color: "#22201A",
    },
    "& fieldset": {
      borderColor: "#22201A",
    },
    "&:hover fieldset": {
      borderColor: "#22201A",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#22201A",
    },
    ".Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#22201A",
    },
  }),
}));
