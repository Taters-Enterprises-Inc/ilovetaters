import { ChangeEventHandler, useState } from "react";
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

interface State {
  password: string;
  showPassword: boolean;
}

interface BSCPasswordTextFieldProps {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: string | null;
}

export function BSCPasswordTextField(props: BSCPasswordTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <WhiteOutLinedTextField
      required
      variant="outlined"
      type="text"
      inputProps={{
        className: showPassword ? "" : "password-mask",
        autoComplete: "current-password",
      }}
      value={props.value}
      onChange={props.onChange}
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
              {showPassword ? (
                <VisibilityOff sx={{ color: "white" }} />
              ) : (
                <Visibility sx={{ color: "white" }} />
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
