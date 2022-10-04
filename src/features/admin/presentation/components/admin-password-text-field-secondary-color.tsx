import { useState } from "react";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SecondaryOutLinedTextField = styled((props: OutlinedTextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& input": {
    color: "#22201A !important",
    "-webkit-text-fill-color": "#22201A !important",
  },
  "& label": {
    color: "#22201A !important",
  },
  "& fieldset": {
    borderColor: "#22201A !important",
  },
  "&:hover fieldset": {
    borderColor: "#22201A !important",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#22201A !important",
  },
}));

interface State {
  password: string;
  showPassword: boolean;
}

export interface AdminPasswordTextFieldSecondaryColorProps {
  onChange: (password: string) => void;
}
export function AdminPasswordTextFieldSecondaryColor(
  props: AdminPasswordTextFieldSecondaryColorProps
) {
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      props.onChange(event.target.value);
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
    <SecondaryOutLinedTextField
      variant="outlined"
      type="text"
      inputProps={{
        className: values.showPassword ? "" : "password-mask",
        autoComplete: "current-password",
      }}
      value={values.password}
      onChange={handleChange("password")}
      name="password"
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
      label="Password"
      size="small"
      fullWidth
    />
  );
}
