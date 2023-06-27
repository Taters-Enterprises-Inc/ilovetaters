import { Stack, Divider, Paper, styled, Grid, Button } from "@mui/material";
import { PayBillingModal, UploadDeliveryRecieptModal } from "../modals";
import { useState } from "react";
import { left } from "@popperjs/core";

export function StockOrderLogs() {
  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);

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
                <span>Taters Acacia Estates</span>
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Requested Delivery Date:</span>
                <span>July 15, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Commited Delivery Date:</span>
                <span>July 18, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order Review Date:</span>
                <span>July 10, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order Confirm Date:</span>
                <span>July 10, 2023</span>
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
                <span>July 20, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order En Route Date:</span>
                <span>July 20, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Order En Freight Date:</span>
                <span>July 20, 2023</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Actual Delivery Date:</span>
                <span>July 20, 2023</span>
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
                <span className="font-semibold">Billing Information Ready</span>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item sx={{ padding: 0 }}>
                <Button
                  fullWidth
                  size="medium"
                  onClick={() => setOpenPayBillingModal(true)}
                  className="font-semibold cursor-pointer"
                  style={{ color: "inherit" }}
                >
                  <span className=" font-semibold text-start">
                    View payment details
                  </span>
                </Button>
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <span className="font-semibold">Payment Confirmed Date: </span>
                <span>July 24, 2023</span>
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

      <PayBillingModal
        open={openPayBillingModal}
        onClose={() => setOpenPayBillingModal(false)}
        setUploadedReciept={undefined}
        billingInformation={{
          billing_id: "test",
          billing_amount: "test",
        }}
        isButtonAvailable={false}
      />
    </>
  );
}
