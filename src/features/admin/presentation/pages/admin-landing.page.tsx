import styled from "@emotion/styled";
import {
  ButtonBase,
  Box,
  Typography,
  createTheme,
  Button,
  ButtonGroup,
  IconButton,
  Divider,
  Stack,
  Container,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminSession,
  selectGetAdminSession,
} from "../slices/get-admin-session.slice";

const nav = [
  {
    url: "/admin/dashboard/customer-feedback",
    label: "shop",
  },
  {
    url: "/admin/stock-order/dashboard",
    label: "stock ordering",
  },
];

export function AdminLandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  useEffect(() => {
    dispatch(getAdminSession());
  }, [dispatch]);

  console.log(
    getAdminSessionState.data?.admin?.user_details?.sos_groups?.length !== 0
  );

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
          <>
            {(getAdminSessionState.data?.admin?.user_details?.sos_groups
              ?.length !== 0 ||
              index === 0) && (
              <Button
                key={index}
                onClick={() => navigate(navItem.url)}
                variant="contained"
              >
                {navItem.label}
              </Button>
            )}
          </>
        ))}
      </Stack>
    </Container>
  );
}
