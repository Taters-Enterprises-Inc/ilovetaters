import styled from "@emotion/styled";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { ChangeEventHandler } from "react";

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

interface BSCFirstNameTextFieldProps {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: string | null;
}

export function BSCFirstNameTextField(props: BSCFirstNameTextFieldProps) {
  return (
    <WhiteOutLinedTextField
      required
      onChange={props.onChange}
      value={props.value}
      variant="outlined"
      type="text"
      label="First Name"
      size="small"
      fullWidth
      name="first_name"
    />
  );
}
