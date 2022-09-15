import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface SnackbarAlertProps {
  open: boolean;
  severity: "success" | "error";
  message: string | undefined;
}

export function SnackbarAlert(props: SnackbarAlertProps) {
  return (
    <>
      <div className="hidden lg:block">
        <Snackbar
          open={props.open}
          autoHideDuration={10000}
          sx={{ zIndex: 2004 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert severity={props.severity} variant="filled">
            {props.message}
          </MuiAlert>
        </Snackbar>
      </div>
      <div className="lg:hidden">
        <Snackbar
          open={props.open}
          autoHideDuration={10000}
          sx={{ zIndex: 2004, marginBottom: 7 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert severity={props.severity} variant="filled">
            {props.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}
