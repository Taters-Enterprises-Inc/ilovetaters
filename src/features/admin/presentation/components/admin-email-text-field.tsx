import styled from "@emotion/styled";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";

const WhiteOutLinedTextField = styled((props: OutlinedTextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& input": {
    color: "white !important",
    "-webkit-text-fill-color": "white !important",
  },
  "& label": {},
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

export function AdminEmailTextField() {
  return (
    <WhiteOutLinedTextField
      variant="outlined"
      type="email"
      label="Email"
      size="small"
      fullWidth
      name="identity"
    />
  );
}
