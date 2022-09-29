import { useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const WhiteOutLinedTextField = styled((props: OutlinedTextFieldProps) => (
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

export function MobileSignUpFirstName() {
  return (
    <WhiteOutLinedTextField
      variant="outlined"
      name="firstName"
      label="First Name"
      size="small"
      type="text"
      required
      fullWidth
    />
  );
}
