import { useState } from "react";
import TextField from "@mui/material/TextField";

export interface AdminPhoneInputProps {
  name: string;
  label: string;
  defaultValue?: string;
}

export function AdminPhoneInput(props: AdminPhoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length < 12) {
      setPhoneNumber(value);
    } else {
    }
  };
  return (
    <TextField
      type="text"
      name={props.name}
      label={props.label}
      value={phoneNumber}
      placeholder={"0905XXXXXXX"}
      onChange={handleChange}
      defaultValue={props.defaultValue}
      required
    />
  );
}
