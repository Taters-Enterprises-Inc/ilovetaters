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
    <Snackbar
      open={props.open}
      autoHideDuration={10000}
      sx={{ zIndex: 2004 }}
      className="lg:!mb-[0px] !mb-[7px] "
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
    >
      <MuiAlert severity={props.severity}>{props.message}</MuiAlert>
    </Snackbar>
  );
}
