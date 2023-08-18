import { Button, TextField } from "@mui/material";
import { error } from "console";
import { id } from "date-fns/locale";
import { MaterialInputPassword } from "features/shared/presentation/components";
import { ChangeEventHandler, useState } from "react";

interface passwordStateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface errorState {
  isError: boolean;
  errorMessage: string;
}

interface passwordErrorState {
  currentPassword: errorState;
  newPassword: errorState;
  confirmPassword: errorState;
}

export function ChangePassword() {
  const [passwordState, setPasswordState] = useState<passwordStateData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorState, setErrorMessage] = useState<passwordErrorState>({
    currentPassword: {
      isError: false,
      errorMessage: "",
    },
    newPassword: {
      isError: false,
      errorMessage: "",
    },
    confirmPassword: {
      isError: false,
      errorMessage: "",
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleError = (name: string, isError: boolean, message: string) => {
    setErrorMessage({
      ...errorState,
      [name]: {
        isError: isError,
        errorMessage: message,
      },
    });
  };

  const handleOnPasswordChange = (event: {
    target: { value: string; name: string };
  }) => {
    const value = event.target.value;
    const name = event.target.name;

    if (value.length < 8) {
      handleError(name, true, "Password must contain at least 8 characters");
    } else {
      handleError(name, false, "");

      const hasLowercase = /[a-z]/.test(value);
      const hasUppercase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(value);

      if (value.length > 32) {
        return "Password is too long.";
      }

      if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecialChar) {
        handleError(
          name,
          true,
          "password must at least contain uppercase character, lowercase character, number, and symbol"
        );
      } else {
        handleError(name, false, "");

        setPasswordState({
          ...passwordState,
          [event.target.name]: event.target.value,
        });
      }
    }
  };

  console.log(passwordState);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <div className="space-y-2">
            <span>Current password: </span>
            <MaterialInputPassword
              onChange={handleOnPasswordChange}
              size="small"
              error={errorState.currentPassword.isError}
              helperText={
                <span className="text-red">
                  {errorState.currentPassword.errorMessage}
                </span>
              }
              name={"currentPassword"}
              colorTheme={"black"}
            />
          </div>
          <div className="space-y-2">
            <span>New Password:</span>
            <MaterialInputPassword
              onChange={handleOnPasswordChange}
              size="small"
              error={errorState.newPassword.isError}
              helperText={
                <span className="text-red">
                  {errorState.newPassword.errorMessage}
                </span>
              }
              name={"newPassword"}
              colorTheme={"black"}
            />
          </div>
          <div className="space-y-2">
            <span>Confirm Password:</span>
            <MaterialInputPassword
              onChange={handleOnPasswordChange}
              size="small"
              error={errorState.confirmPassword.isError}
              helperText={
                <span className="text-red">
                  {errorState.confirmPassword.errorMessage}
                </span>
              }
              name={"confirmPassword"}
              colorTheme={"black"}
            />
          </div>
        </div>

        <Button
          type="submit"
          size="small"
          variant="contained"
          fullWidth
          sx={{ color: "white", backgroundColor: "#CC5801", marginTop: 2 }}
          disabled={
            errorState.confirmPassword.isError ||
            errorState.currentPassword.isError ||
            errorState.newPassword.isError
          }
        >
          Change password
        </Button>
      </form>
    </>
  );
}
