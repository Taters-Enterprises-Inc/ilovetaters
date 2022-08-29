import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface BackdropLoadingProps {
  open: boolean;
}

export function BackdropLoading(props: BackdropLoadingProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <CircularProgress color="tertiary" />
      </Backdrop>
    </div>
  );
}
