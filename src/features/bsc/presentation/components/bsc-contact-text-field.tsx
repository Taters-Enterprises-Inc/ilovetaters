import styled from "@emotion/styled";
import { useStepContext } from "@mui/material";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { ChangeEventHandler, useState } from "react";

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

interface BSCContactFieldProps {
  onChange: (value: string) => void;
  value: string | null;
}

export function BSCContactField(props: BSCContactFieldProps) {
  const [error, setError] = useState<string | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length < 12) {
      setError(null);
      props.onChange(value);
    } else {
      setError("Invalid phone number");
    }
  };

  return (
    <WhiteOutLinedTextField
      required
      size="small"
      error={error ? true : false}
      helperText={error}
      value={props.value}
      onChange={handleChange}
      label="Phone Number"
      variant="outlined"
      className="w-full"
      name="phoneNumber"
      placeholder="0905XXXXXXX"
    />
  );
}
