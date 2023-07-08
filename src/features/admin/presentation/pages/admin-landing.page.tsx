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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const nav = [
  {
    url: "/admin/dashboard",
    label: "shop",
  },
  {
    url: "/admin/stock-order/dashboard",
    label: "stock ordering",
  },
];

export function AdminLandingPage() {
  const navigate = useNavigate();
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
        {nav.map((nav) => (
          <Button onClick={() => navigate(nav.url)} variant="contained">
            {nav.label}
          </Button>
        ))}
      </Stack>
    </Container>
  );
}
