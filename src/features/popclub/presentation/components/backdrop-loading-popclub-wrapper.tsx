import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface BackdropLoadingPopClubProps {
  open: boolean;
}

export function BackdropLoadingPopClub(props: BackdropLoadingPopClubProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <img
          src={require("assets/poppy_dancing_30.gif")}
          alt="Poppy Dancing"
          width={300}
        />
      </Backdrop>
    </div>
  );
}
