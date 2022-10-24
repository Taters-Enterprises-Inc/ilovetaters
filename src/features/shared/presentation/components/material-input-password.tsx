import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { MaterialInput, MaterialInputProps } from "./material-input";

export function MaterialInputPassword(props: MaterialInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const color = props.colorTheme === "black" ? "#22201A" : "white";

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <MaterialInput
      {...props}
      inputProps={{
        className: showPassword ? "" : "password-mask",
        autoComplete: "current-password",
      }}
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
                <VisibilityOff sx={{ color }} />
              ) : (
                <Visibility sx={{ color }} />
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
