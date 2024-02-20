import {
  Divider,
  Button,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  ButtonGroup,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  selectGetAdminSession,
  getAdminSession,
  GetAdminSessionState,
} from "../slices/get-admin-session.slice";
import {
  LogoutAdminState,
  logoutAdmin,
  resetLogoutAdmin,
  selectLogoutAdmin,
} from "../slices/logout-admin.slice";
import { IoMdArrowDropdown } from "react-icons/io";
import { AdminChangePasswordModal } from "../modals";

interface Nav {
  [key: string]: boolean;
}

export function AdminLandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getLogoutAdminState = useAppSelector(selectLogoutAdmin);

  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  //If there's a new navigation just add new property here
  const [navAvailability, setNavAvailability] = useState<Nav>({
    shop: false,
    sos: false,
    sales: false,
    ticket: false,
  });

  let nav = [
    {
      url: "/admin/dashboard/customer-feedback",
      label: "Administration",
      availability: navAvailability.shop,
    },
    {
      url: "/admin/stock-order/order",
      label: "stock ordering",
      availability: navAvailability.sos,
    },
    {
      url: "/admin/sales/dashboard",
      label: "Sales",
      availability: navAvailability.sales,
    },
    {
      url: "/admin/ticketing/all-tickets",
      label: "Ticketing",
      availability: navAvailability.ticket,
    },
  ];

  const { first_name, last_name } =
    getAdminSessionState.data?.admin.user_details ?? {};

  const payableEnable =
    getAdminSessionState.data?.admin.user_details.sos_groups.some(
      (group) => group.id === 7 || group.id === 8 || group.id === 9
    );

  //handle the new property here
  useEffect(() => {
    if (getAdminSessionState.data) {
      const userAdmin = getAdminSessionState.data?.admin?.user_details;

      setNavAvailability((prevState) => ({
        ...prevState,
        shop: userAdmin?.groups?.length !== 0,
        sos: userAdmin?.sos_groups?.length !== 0,
        sales: userAdmin?.sales_groups?.length !== 0 || Boolean(payableEnable),
        ticket: true, // Need to change/update
      }));
    }
  }, [getAdminSessionState.data]);

  useEffect(() => {
    if (getLogoutAdminState.status === LogoutAdminState.success) {
      dispatch(getAdminSession());
      dispatch(resetLogoutAdmin());
      navigate("/admin");
    }
  }, [getLogoutAdminState, dispatch, navigate]);

  return (
    <>
      {GetAdminSessionState.success === getAdminSessionState.status && (
        <div className="flex flex-col bg-paper h-screen">
          <div className="px-5 space-y-10 my-16 ">
            <h1 className="flex justify-center item-end text-3xl font-bold font-serif text-center">
              Taters Group Webwork Ecosystem
            </h1>

            <div className="px-16">
              <Divider sx={{ borderBottomWidth: 2 }} />
            </div>

            <div className="flex justify-center">
              <span className="z-10 border border-secondary rounded-l-md bg-button text-white px-5 ">
                You are logged in as {first_name + " " + last_name}
              </span>
              <button onClick={handleClick("bottom-end")}>
                <IoMdArrowDropdown
                  size={26}
                  className="rounded-r-md border border-secondary text-white bg-button"
                />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {nav.map((button, index) => {
                const { label, url, availability } = button;

                return (
                  <>
                    {availability && (
                      <Button
                        key={index}
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="secondary"
                        sx={{ maxWidth: { sm: "full", md: "fit-content" } }}
                        onClick={() => navigate(url)}
                      >
                        <span className="text-2xl text-black">{label}</span>
                      </Button>
                    )}
                  </>
                );
              })}
            </div>
          </div>

          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper variant="outlined">
                  <ButtonGroup orientation="vertical">
                    <Button
                      variant="text"
                      onClick={() => setOpenChangePasswordModal(true)}
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => dispatch(logoutAdmin())}
                    >
                      Logout
                    </Button>
                  </ButtonGroup>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
      <AdminChangePasswordModal
        open={openChangePasswordModal}
        onClose={() => setOpenChangePasswordModal(false)}
      />
    </>
  );
}
