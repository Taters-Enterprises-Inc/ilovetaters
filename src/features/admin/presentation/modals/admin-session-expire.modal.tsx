import { Button } from "@mui/material";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  LogoutAdminState,
  logoutAdmin,
  resetLogoutAdmin,
  selectLogoutAdmin,
} from "../slices/logout-admin.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
import { getAdminSession } from "../slices/get-admin-session.slice";

interface AdminSessionExpireModalProps {
  open: boolean;
  onClose: () => void;
}
export default function AdminSessionExpireModal(
  props: AdminSessionExpireModalProps
) {
  const dispatch = useAppDispatch();
  const logoutAdminState = useAppSelector(selectLogoutAdmin);

  const navigate = useNavigate();

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(logoutAdmin());
  };

  useEffect(() => {
    if (logoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
      navigate("/admin");
    }
  }, [logoutAdminState, navigate]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-[50%] lg:w-[400px] my-32 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-sm text-white font-semibold">
              Session Expire Notice
            </span>
          </div>
          <div className="flex flex-col bg-paper p-3 rounded-b-md space-y-8">
            <div className="flex space-x-3">
              <AiFillWarning className="text-2xl text-tertiary" />
              <span>Another device has logged in into your account</span>
            </div>
            <div className="flex space-x-3">
              <Button
                fullWidth
                size="small"
                onClick={handleLogout}
                variant="contained"
                sx={{ color: "white", backgroundColor: "#CC5801" }}
              >
                Ok
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
