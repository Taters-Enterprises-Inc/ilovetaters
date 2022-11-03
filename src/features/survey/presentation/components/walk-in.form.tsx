import styled from "@emotion/styled";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";

const WhiteTextFiled = styled((props: OutlinedTextFieldProps) => (
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
interface RecieptNumber {
  label: string;
}
export function TextInputWalkIn(props: RecieptNumber) {
  return <WhiteTextFiled variant="outlined" fullWidth label={props.label} />;
}
