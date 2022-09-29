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

export function MobileLoginPhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length < 12) {
      setPhoneNumber(value);
    } else {
      //   setError("Invalid phone number");
    }
  };
  return (
    <WhiteOutLinedTextField
      variant="outlined"
      value={phoneNumber}
      onChange={handleChange}
      name="phoneNumber"
      label="Phone"
      size="small"
      type="text"
      required
      fullWidth
    />
  );
}
