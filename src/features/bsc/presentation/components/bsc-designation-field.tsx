import styled from "@emotion/styled";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";

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

export function BSCDesignationField() {
  return (
    <WhiteOutLinedTextField
      required
      variant="outlined"
      type="text"
      label="Designation"
      size="small"
      fullWidth
      name="identity"
    />
  );
}