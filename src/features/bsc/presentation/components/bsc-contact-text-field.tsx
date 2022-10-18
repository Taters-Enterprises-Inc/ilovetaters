import styled from "@emotion/styled";
import { useStepContext } from "@mui/material";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { useState } from "react";

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

export function BSCContactField() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length < 12) {
      setError(null);
      setPhoneNumber(value);
    } else {
      setError("Invalid phone number");
    }
  };
  return (
    <WhiteOutLinedTextField
      size="small"
      required
      error={error ? true : false}
      helperText={error}
      value={phoneNumber}
      onChange={handleChange}
      label="Phone Number"
      variant="outlined"
      className="w-full"
      name="phoneNumber"
      placeholder="0905XXXXXXX"
    />
  );
}
