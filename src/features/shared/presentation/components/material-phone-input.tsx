import { useState } from "react";
import { MaterialInput, MaterialInputProps } from "./material-input";

export function MaterialPhoneInput(props: MaterialInputProps) {
  const [error, setError] = useState<string | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length < 12) {
      setError(null);
      props.onChange(event);
    } else {
      setError("Invalid phone number");
    }
  };

  return (
    <MaterialInput
      {...props}
      error={error ? true : false}
      helperText={error}
      onChange={handleChange}
      label="Phone Number"
      placeholder="0905XXXXXXX"
      name="phoneNumber"
    />
  );
}
