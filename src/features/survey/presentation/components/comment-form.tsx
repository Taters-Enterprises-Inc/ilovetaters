import styled from "@emotion/styled";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";

const WhiteTextFiled = styled((props: OutlinedTextFieldProps) => (
  <TextField
    {...props}
    multiline
    rows={4}
    InputProps={{ style: { fontSize: 14 } }}
  />
))(({ theme }) => ({
  "& input": {
    color: "black !important",
    "-webkit-text-fill-color": "white !important",
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
interface Comment {
  label: string;
}
export function CommentTextInput(props: Comment) {
  return (
    <WhiteTextFiled
      variant="outlined"
      fullWidth
      label={props.label}
      placeholder="Comment here."
    />
  );
}
