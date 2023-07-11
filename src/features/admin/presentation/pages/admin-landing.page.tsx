import { Divider, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  selectGetAdminSession,
  getAdminSession,
  GetAdminSessionState,
} from "../slices/get-admin-session.slice";

interface Nav {
  [key: string]: boolean;
}

export function AdminLandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const [navAvailability, setNavAvailability] = useState<Nav>({
    shop: false,
    sos: false,
  });

  let nav = [
    {
      url: "/admin/dashboard/customer-feedback",
      label: "shop",
      availability: navAvailability.shop,
    },
    {
      url: "/admin/stock-order/dashboard",
      label: "stock ordering",
      availability: navAvailability.sos,
    },
  ];

  useEffect(() => {
    dispatch(getAdminSession());
  }, [dispatch]);

  useEffect(() => {
    if (getAdminSessionState.data) {
      const userAdmin = getAdminSessionState.data?.admin?.user_details;

      setNavAvailability((prevState) => ({
        ...prevState,
        shop: userAdmin?.groups?.length !== 0,
        sos: userAdmin?.sos_groups?.length !== 0,
      }));
    }
  }, [getAdminSessionState.data]);

  const handleModalToggle = (nav: string) => {
    setNavAvailability((prevState: Nav) => ({
      ...prevState,
      [nav]: !prevState[nav],
    }));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Stack
        direction="column"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        {nav.map((navItem, index) => (
          <div key={index}>
            {navItem.availability && (
              <Button
                fullWidth
                onClick={() => navigate(navItem.url)}
                variant="contained"
              >
                {navItem.label}
              </Button>
            )}
          </div>
        ))}
      </Stack>
    </Container>
  );
}
