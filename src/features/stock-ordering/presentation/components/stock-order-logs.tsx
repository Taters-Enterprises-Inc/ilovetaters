import { Stack, Divider, Paper, styled, Grid, Button } from "@mui/material";
import { UploadDeliveryRecieptModal } from "../modals";
import { useState } from "react";
import { left } from "@popperjs/core";

export function StockOrderLogs() {
  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <div className=" p-4 space-y-2">
        <div className="border-2 border-t-8 border-secondary rounded-t-lg">
          <div className="bg-secondary">
            <span className="text-white px-5">Order Tracking Logs</span>
          </div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ padding: 2 }}
          >
            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order Number:</span>
                <span>1</span>
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Store Name:</span>
                <span>Taters Store Name</span>
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Requested Delivery Date:</span>
                <span>Test1 1, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Commited Delivery Date:</span>
                <span>Test2 2, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order Review Date:</span>
                <span>Test2 2, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item sx={{ padding: 0 }}>
                <Button
                  fullWidth
                  size="medium"
                  onClick={() => setOpenUploadDeliveryRecieptModal(true)}
                  className="font-semibold cursor-pointer"
                  style={{ color: "inherit" }}
                >
                  <span className=" font-semibold text-start">
                    View Delivery Receipt
                  </span>
                </Button>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Dispatch Date:</span>
                <span>Test2 2, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order En Route Date:</span>
                <span>Test2 3, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order En Freight Date:</span>
                <span>Test2 3, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item sx={{ padding: 0 }}>
                <Button
                  fullWidth
                  size="medium"
                  onClick={() => setOpenUploadDeliveryRecieptModal(true)}
                  className="font-semibold cursor-pointer"
                  style={{ color: "inherit" }}
                >
                  <span className=" font-semibold text-start">
                    View Delivery Receipt
                  </span>
                </Button>
              </Item>
            </Grid>
          </Grid>
        </div>
      </div>

      <UploadDeliveryRecieptModal
        open={openUploadDeliveryRecieptModal}
        onClose={() => setOpenUploadDeliveryRecieptModal(false)}
        setUploadedReciept={undefined}
        isButtonAvailable={false}
      />
    </>
  );
}
