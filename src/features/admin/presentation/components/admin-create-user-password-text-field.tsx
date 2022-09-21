import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface AdminCreateUserPasswordTextFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

interface State {
  password: string;
  showPassword: boolean;
}

export function AdminCreateUserPasswordTextField(
  props: AdminCreateUserPasswordTextFieldProps
) {
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      type={values.showPassword ? "text" : "password"}
      value={values.password}
      onChange={handleChange("password")}
      name={props.name}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? (
                <VisibilityOff sx={{ color: "#22201A" }} />
              ) : (
                <Visibility sx={{ color: "#22201A" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      label={props.label}
      required={props.required}
      fullWidth
    />
  );
}
