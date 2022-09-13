import { TextField } from "@mui/material";
import { useState } from "react";

export function PhoneInput() {
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
    <TextField
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
