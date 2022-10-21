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

interface BSCLastNameTextFieldProps {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: string | null;
}

export function BSCLastNameTextField(props: BSCLastNameTextFieldProps) {
  return (
    <WhiteOutLinedTextField
      required
      value={props.value}
      onChange={props.onChange}
      variant="outlined"
      type="text"
      label="Last Name"
      size="small"
      fullWidth
      name="last_name"
    />
  );
}
